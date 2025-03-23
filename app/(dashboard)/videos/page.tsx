import { auth } from "@/auth"; // Make sure this points to your NextAuth setup
import { prisma } from "@/lib/prisma";

export default async function VideosPage() {
  const session = await auth(); // Get the authenticated user session

  if (session?.user?.email) {
    try {
      const userData = await prisma.user.findUnique({
        where: { email: session.user.email },
        include: {
          Video: {
            orderBy: { createdAt: "desc" },
            take: 10,
          },
        },
      });
      const videos = userData?.Video || [];
      return (
        <div className="w-full p-6 min-h-screen bg-gray-100">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Your Videos</h1>
          {videos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {videos.map((video) => (
                <div key={video.id} className="bg-white border border-gray-200 rounded-xl shadow-md p-4 flex flex-col items-center transition-transform transform hover:scale-105">
                  <div className="w-full h-40 bg-gray-300 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500">Thumbnail</span>
                  </div>
                  <p className="text-sm font-medium text-gray-800 mt-3 text-center">{video.prompt.slice(0, 20)}</p>
                  <p className="text-xs text-gray-600">
                    🎨 Style: <span className="font-semibold">{video.imageStyle}</span>
                  </p>
                  <p className="text-xs text-gray-600">
                    🔊 Voice: <span className="font-semibold">{video.voiceName}</span> (Speed: {video.voiceSpeed})
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center text-lg">No videos found.</p>
          )}
        </div>
      );
    } catch (error) {
      console.error("Error fetching videos:", error);
      return <p className="text-red-500 text-center">Failed to load videos.</p>;
    }
  }
}
