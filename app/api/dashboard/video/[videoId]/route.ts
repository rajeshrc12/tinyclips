import { getPresignedUrl } from "@/app/services/wasabi";
import { prisma } from "@/lib/prisma"; // Prisma import for accessing your database

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
      return Response.json({ error: "Video not found" }, { status: 404 });
    }

    // Generate the pre-signed URL for the video file in Wasabi
    const signedUrl = await getPresignedUrl(`video/${videoId}.mp4`);
    if (!signedUrl) {
      throw new Error("Failed to generate signed URL");
    }
    // Return the signed URL
    return Response.json({ ...video, url: signedUrl }, { status: 200 });
  } catch (error) {
    console.error("Error generating signed URL:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
