import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    // Fetch paginated transactions
    const transactions = await prisma.transaction.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    });

    // Get total count for pagination
    const total = await prisma.transaction.count();

    return NextResponse.json({ transactions, total, page, limit }, { status: 200 });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 });
  }
}
