import { createVideo } from "@/app/services/video";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Session } from "next-auth";

const IMAGE_PRICE = parseFloat(process.env.NEXT_PUBLIC_IMAGE_PRICE!);

export async function POST(req: Request) {
  const {
    user: { id },
  } = (await auth()) as Session;

  const { prompt, imageStyle, voiceName, voiceSpeed } = await req.json();
  if (!prompt || !imageStyle || !voiceName || !voiceSpeed) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) return Response.json({ error: "User not found" }, { status: 401 });
    const balance = user?.balance?.toNumber();
    if (balance <= 0) {
      return Response.json({ error: "Insufficient balance for this prompt. Please add funds" }, { status: 400 });
    }
    const imageCount = Math.round(prompt.length / 40);
    const estimatedCharges = imageCount * IMAGE_PRICE;
    console.log("estimated cost", estimatedCharges, prompt.length);
    if (balance - estimatedCharges < 0) {
      return Response.json({ error: "Insufficient balance for this script. Please add funds or make script short" }, { status: 400 });
    }
    // Create video with the user's ID
    const video = await prisma.video.create({
      data: { prompt, imageStyle, voiceName, voiceSpeed, userId: id, balance },
    });
    if (video) {
      const response = await prisma.user.update({
        where: { id },
        data: {
          balance: { decrement: estimatedCharges }, // Subtract `amount` from the balance
        },
      });
      if (response) {
        createVideo(id, video.id, prompt, imageStyle, voiceName, voiceSpeed, estimatedCharges);
      }
    }

    return Response.json({ ...video }, { status: 201 });
  } catch (error) {
    console.error("Error creating video:", error);
    return Response.json({ error: "Error creating video" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const {
      user: { id },
    } = (await auth()) as Session;
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const offset = (page - 1) * limit;

    const videos = await prisma.video.findMany({
      skip: offset,
      take: limit,
      orderBy: { createdAt: "desc" },
      where: { userId: id },
    });

    const total = await prisma.video.count({ where: { userId: id } }); // Get total video count

    return Response.json({ videos, total, page, limit }, { status: 200 });
  } catch (error) {
    console.error("Error fetching videos:", error);
    return Response.json({ error: "Failed to fetch videos" }, { status: 500 });
  }
}
