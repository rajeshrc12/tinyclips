import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

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
              <p className="text-lg font-semibold">{video.prompt.slice(0, 10)}</p>
              <p className="text-gray-600">Duration: {video.voiceName}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center text-lg">No videos found.</p>
      )}
    </div>
  );
}
