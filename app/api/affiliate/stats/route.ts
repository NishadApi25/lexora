// app/api/affiliate/stats/route.ts

import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import AffiliateLink from "@/lib/db/models/affiliate.model";

export async function GET() {
  try {
    await connectToDB();

    // Dummy data (replace with real aggregation later)
    const stats = {
      totalClicks: 1099,
      totalOrders: 81,
      totalEarnings: 94.1,
      conversion: 7.37,
    };

    return NextResponse.json(stats);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Error loading affiliate stats" }, { status: 500 });
  }
}
