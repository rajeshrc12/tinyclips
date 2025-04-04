import { prisma } from "@/lib/prisma";
const INITIAL_BALANCE = parseFloat(process.env.INITIAL_BALANCE!);

export async function findOrCreateUser(email: string, name: string) {
  if (!email || !name) return null;

  try {
    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name,
          balance: INITIAL_BALANCE, // Default balance
        },
      });
    }

    return user;
  } catch (error) {
    console.error("Error in findOrCreateUser:", error);
    throw new Error("Database operation failed");
  }
}
