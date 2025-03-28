import { prisma } from "@/lib/prisma";
import Razorpay from "razorpay";
import { auth } from "@/auth";
import { generateRandomString } from "@/utils/common";
import { Session } from "next-auth";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  try {
    const {
      user: { id },
    } = (await auth()) as Session;

    const { amount, currency } = await req.json();

    if (!amount || !currency) {
      return Response.json({ error: "Missing fields" }, { status: 400 });
    }

    // ✅ Fetch user using authenticated email
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    // ✅ Use transaction ID as receipt ID
    const options = {
      amount: amount * 100,
      currency,
      receipt: generateRandomString(40), // Unique transaction ID
      notes: { userId: user.id },
    };

    const order = await razorpay.orders.create(options);

    return Response.json({ user, order }, { status: 201 });
  } catch (error) {
    console.error("Razorpay Order Error:", error);
    return Response.json({ error: "Failed to create order" }, { status: 500 });
  }
}
