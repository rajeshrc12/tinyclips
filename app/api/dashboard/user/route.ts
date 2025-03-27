import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Session } from "next-auth";

// GET handler
export async function GET() {
  const {
    user: { id },
  } = (await auth()) as Session;

  try {
    // Fetch user details
    const user = await prisma.user.findUnique({
      where: { id },
    });

    return Response.json({ ...user }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return Response.json({ error: "Error fetching user" }, { status: 500 });
  }
}
