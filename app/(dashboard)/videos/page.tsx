import { auth } from "@/auth"; // Make sure this points to your NextAuth setup
import { prisma } from "@/lib/prisma";

export default async function VideosPage() {
  const session = await auth(); // Get the authenticated user session

  if (session?.user?.email) {
    try {
      const userData = await prisma.user.findUnique({
        where: { email: session.user.email },
        include: { Video: true },
      });
      const videos = userData?.Video || [];
      return (
        <div className="w-full p-4 min-h-screen">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Your Videos</h1>
          {videos.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {videos.map((video) => (
                <div key={video.id} className="border border-gray-300 rounded-xl shadow-lg p-2 flex flex-col items-center w-full">
                  <div className="w-full h-40 bg-gray-200 rounded-md"></div>
                  <p className="text-sm font-semibold text-gray-700 mt-2 text-center">{video.prompt}</p>
                  <p className="text-xs text-gray-600">Style: {video.imageStyle}</p>
                  <p className="text-xs text-gray-600">
                    Voice: {video.voiceName} (Speed: {video.voiceSpeed})
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center">No videos found.</p>
          )}
        </div>
      );
    } catch (error) {
      console.error("Error fetching videos:", error);
      return <p className="text-red-500 text-center">Failed to load videos.</p>;
    }
  }
}
