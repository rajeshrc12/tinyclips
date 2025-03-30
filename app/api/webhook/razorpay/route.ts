import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import axios from "axios";

const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET!;
let USD_RATE = parseFloat(process.env.USD_RATE!);
const FREECURRENCY_API_KEY = process.env.FREECURRENCY_API_KEY!;

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = req.headers.get("x-razorpay-signature") as string;

    // ✅ Verify Razorpay Webhook Signature
    const expectedSignature = crypto.createHmac("sha256", RAZORPAY_KEY_SECRET).update(body).digest("hex");

    if (signature !== expectedSignature) {
      return Response.json({ error: "Invalid signature" }, { status: 400 });
    }

    const data = JSON.parse(body);
    const event = data.event;
    const payment = data.payload.payment.entity;
    const userId = payment.notes.userId;
    const paymentId = payment.id;
    let amount = payment.amount / 100;
    const currency = payment.currency;

    if (event === "payment.captured") {
      // SUCCESS: Payment received
      console.log("Payment Success");

      // Update payment status
      // ✅ Create payment in database
      const paymentResponse = await prisma.payment.create({
        data: {
          userId: userId,
          paymentId: paymentId,
          status: "successful",
          amount,
          currency,
        },
      });

      if (paymentResponse) {
        console.log("Transaction successful:", paymentResponse);
      } else {
        console.error("Failed to create payment");
      }
      if (currency === "INR") {
        const conversionResponse = await axios.get(`https://api.freecurrencyapi.com/v1/latest?apikey=${FREECURRENCY_API_KEY}&currencies=INR`);
        USD_RATE = conversionResponse?.data?.data?.INR || USD_RATE;
        amount = amount / USD_RATE;
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
      const paymentResponse = await prisma.payment.create({
        data: {
          userId: userId,
          paymentId: paymentId,
          status: "failed",
          amount,
          currency,
        },
      });
      if (paymentResponse) {
        console.log("Transaction details:", paymentResponse);
      } else {
        console.error("Failed to create payment");
      }
    }

    return Response.json({ status: "success" });
  } catch (error) {
    console.error("⚠️ Webhook Error:", error);
    return Response.json({ error: "Webhook handling failed" }, { status: 500 });
  }
}
