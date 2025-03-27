import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Session } from "next-auth";

export async function POST(req: Request) {
  const {
    user: { id },
  } = (await auth()) as Session;

  const { prompt, imageStyle, voiceName, voiceSpeed } = await req.json();
  if (!prompt || !imageStyle || !voiceName || !voiceSpeed) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    // Create video with the user's ID
    const newVideo = await prisma.video.create({
      data: { prompt, imageStyle, voiceName, voiceSpeed, userId: id },
    });

    // Call service to process video
    // createVideo(user.id, newVideo.id, prompt, imageStyle, voiceName, voiceSpeed);

    return Response.json({ ...newVideo }, { status: 201 });
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

    const videos = await prisma.payment.findMany({
      skip: offset,
      take: limit,
      orderBy: { createdAt: "desc" },
      where: { userId: id },
    });

    const total = await prisma.payment.count(); // Get total payment count

    return Response.json({ videos, total, page, limit }, { status: 200 });
  } catch (error) {
    console.error("Error fetching payments:", error);
    return Response.json({ error: "Failed to fetch payments" }, { status: 500 });
  }
}
