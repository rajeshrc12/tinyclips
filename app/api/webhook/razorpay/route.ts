import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET!;

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = req.headers.get("x-razorpay-signature") as string;

    // ✅ Verify Razorpay Webhook Signature
    const expectedSignature = crypto.createHmac("sha256", RAZORPAY_KEY_SECRET).update(body).digest("hex");

    if (signature !== expectedSignature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const data = JSON.parse(body);
    const event = data.event;
    const payment = data.payload.payment.entity;
    const userId = payment.notes.userId;
    const paymentId = payment.id;
    const amount = payment.amount / 100;
    const currency = payment.currency;

    if (event === "payment.captured") {
      // SUCCESS: Payment received
      console.log("Payment Success");

      // Update transaction status
      // ✅ Create transaction in database
      const transactionResponse = await prisma.transaction.create({
        data: {
          userId: userId,
          paymentId: paymentId,
          status: "successful",
          amount,
          currency,
        },
      });

      if (transactionResponse) {
        console.log("Transaction successful:", transactionResponse);
      } else {
        console.error("Failed to create transaction");
      }

      // Update user balance
      const userResponse = await prisma.user.update({
        where: { id: userId },
        data: {
          balance: {
            increment: amount,
          },
        },
      });

      if (userResponse) {
        console.log("User balance updated:", userResponse.balance);
      } else {
        console.error("Failed to update user balance");
      }
    }

    if (event === "payment.failed") {
      // ❌ FAILURE: Payment failed
      console.error(`❌ Payment Failed: ${payment.id}, Reason: ${payment.error_description}`);
      // TODO: Update database: Mark order as FAILED
      const transactionResponse = await prisma.transaction.create({
        data: {
          userId: userId,
          paymentId: paymentId,
          status: "failed",
          amount,
          currency,
        },
      });
      if (transactionResponse) {
        console.log("Transaction details:", transactionResponse);
      } else {
        console.error("Failed to create transaction");
      }
    }

    return NextResponse.json({ status: "success" });
  } catch (error) {
    console.error("⚠️ Webhook Error:", error);
    return NextResponse.json({ error: "Webhook handling failed" }, { status: 500 });
  }
}
