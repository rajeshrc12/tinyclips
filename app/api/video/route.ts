import { prisma } from "@/lib/prisma";
import { createVideo } from "@/app/services/video";
// POST handler
export async function POST(req: Request) {
  const { prompt, imageStyle, voiceName, voiceSpeed, email } = await req.json();

  if (!prompt || !imageStyle || !voiceName || !voiceSpeed || !email) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
  }

  try {
    // Fetch user ID using email
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    // Create video with the user's ID
    const newVideo = await prisma.video.create({
      data: { prompt, imageStyle, voiceName, voiceSpeed, userId: user.id },
    });
    createVideo(newVideo.id, prompt, imageStyle, voiceName, voiceSpeed);
    return new Response(JSON.stringify({ newVideo }), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Error creating video" }), { status: 500 });
  }
}
