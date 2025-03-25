import { prisma } from "@/lib/prisma";
import { createVideo } from "@/app/services/video";
import { auth } from "@/auth";

export async function POST(req: Request) {
  const session = await auth();

  const { prompt, imageStyle, voiceName, voiceSpeed } = await req.json();
  if (!prompt || !imageStyle || !voiceName || !voiceSpeed) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    // Ensure email is either a string or undefined
    const userEmail = session?.user?.email ?? undefined;
    if (!userEmail) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch user ID
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
      select: { id: true },
    });

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    // Create video with the user's ID
    const newVideo = await prisma.video.create({
      data: { prompt, imageStyle, voiceName, voiceSpeed, userId: user.id },
    });

    // Call service to process video
    createVideo(newVideo.id, prompt, imageStyle, voiceName, voiceSpeed);

    return Response.json({ newVideo }, { status: 201 });
  } catch (error) {
    console.error("Error creating video:", error);
    return Response.json({ error: "Error creating video" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const offset = (page - 1) * limit;

    const videos = await prisma.video.findMany({
      skip: offset,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: { user: { select: { email: true } } }, // Fetch user's email
    });

    const total = await prisma.video.count(); // Get total video count

    return Response.json({ videos, total, page, limit }, { status: 200 });
  } catch (error) {
    console.error("Error fetching videos:", error);
    return Response.json({ error: "Failed to fetch videos" }, { status: 500 });
  }
}
