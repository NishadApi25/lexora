import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Order from "@/models/Order.model";

export async function POST(req: Request) {
  try {
    await connectToDB();
    const { orderId, amount, affiliateId, shipped } = await req.json();

    const order = await Order.findOneAndUpdate(
      { orderId },
      { amount, affiliateId, shipped },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error("Error saving order:", error);
    return NextResponse.json({ success: false, error: "Database error" }, { status: 500 });
  }
}
