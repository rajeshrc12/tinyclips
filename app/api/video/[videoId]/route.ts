import { prisma } from "@/lib/prisma"; // Prisma import for accessing your database
import { getPresignedUrl } from "@/app/services/wasabi";

// Define GET method handler
export async function GET(req: Request) {
  const url = new URL(req.url);
  const videoId = url.pathname.split("/").pop(); // Extract videoId from URL path

  try {
    // Fetch video data from the database using Prisma
    const video = await prisma.video.findUnique({
      where: { id: videoId },
    });

    // If video does not exist, return an error
    if (!video) {
      return new Response(JSON.stringify({ error: "Video not found" }), { status: 404 });
    }

    // Generate the pre-signed URL for the video file in Wasabi
    const signedUrl = await getPresignedUrl(`video/${videoId}.mp4`);

    // Return the signed URL
    return new Response(JSON.stringify({ ...video, url: signedUrl }), { status: 200 });
  } catch (error) {
    console.error("Error generating signed URL:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
