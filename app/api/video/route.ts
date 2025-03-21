import { prisma } from "@/lib/prisma";
import { mergeWords, getSubtitleWithImageIndex, splitTimeSeries } from "@/app/utils/common.js";
import { generateAudio } from "@/app/services/replicate.js";
import { transcribeAudio } from "@/app/services/firework.js";
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
    const audioBlob = await generateAudio({ prompt, voiceName, voiceSpeed });
    const subtitleWord = await transcribeAudio(audioBlob);
    const subtitleSegment = mergeWords(subtitleWord);
    const subtitlesTimeSeries = splitTimeSeries(subtitleSegment);
    const subtitleWithImageIndex = getSubtitleWithImageIndex(subtitlesTimeSeries);
    // for (let sub in subtitlesTimeSeries) {

    // }
    return new Response(JSON.stringify({ newVideo, subtitleSegment, subtitleWithImageIndex }), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Error creating video" }), { status: 500 });
  }
}
