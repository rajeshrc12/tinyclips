import { prisma } from "@/lib/prisma";
// import { createVideo } from "@/app/services/video";
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
    // createVideo(newVideo.id, prompt, imageStyle, voiceName, voiceSpeed);

    return Response.json({ newVideo }, { status: 201 });
  } catch (error) {
    console.error("Error creating video:", error);
    return Response.json({ error: "Error creating video" }, { status: 500 });
  }
}
