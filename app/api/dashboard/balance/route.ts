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
    const successfulPaymentsCount = await prisma.payment.count({
      where: {
        userId: id, // Replace with the specific userId
        status: "successful", // Filter by successful status
      },
    });

    return Response.json({ balance: user?.balance, trialUser: successfulPaymentsCount === 0 }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return Response.json({ error: "Error fetching user" }, { status: 500 });
  }
}
