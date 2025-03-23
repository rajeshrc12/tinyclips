import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

// GET handler
export async function GET() {
  const session = await auth();

  if (!session?.user?.email) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Fetch user details
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { email: true, balance: true, name: true },
    });

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    return Response.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return Response.json({ error: "Error fetching user" }, { status: 500 });
  }
}
