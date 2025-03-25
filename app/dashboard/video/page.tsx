import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function VideosPage() {
  const session = await auth();

  if (!session?.user?.email) {
    return <p className="text-center text-red-500">Unauthorized</p>;
  }

  const videos = await prisma.video.findMany({
    where: { user: { email: session.user.email } }, // Fetch videos only for this user
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  return (
    <div className="w-full p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Your Videos</h1>

      {videos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {videos.map((video) => (
            <div key={video.id} className="bg-white border border-gray-200 rounded-xl shadow-md p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">{video.prompt.slice(0, 20)}</h2>
              <p className="text-gray-600 text-sm mb-1">
                <span className="font-medium">Voice:</span> {video.voiceName}
              </p>
              <p className="text-gray-600 text-sm mb-1">
                <span className="font-medium">Speed:</span> {video.voiceSpeed}
              </p>
              <p className="text-gray-600 text-sm mb-1">
                <span className="font-medium">Style:</span> {video.imageStyle}
              </p>
              <p className={`text-sm font-semibold ${video.imageCount > 0 ? "text-green-600" : "text-yellow-600"}`}>Status: {video.imageCount > 0 ? "Completed" : "Pending"}</p>

              {video.imageCount > 0 ? (
                <Link href={`video/${video.id}`} className="mt-3 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition">
                  Show
                </Link>
              ) : (
                <p className="text-gray-500 text-sm mt-3">Processing...</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center text-lg">No videos found.</p>
      )}
    </div>
  );
}
