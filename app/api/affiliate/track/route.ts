import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import AffiliateLink from "@/lib/db/models/affiliate.model";

export async function POST(req: Request) {
  const { ref } = await req.json();
  if (!ref) return NextResponse.json({ message: "Missing ref" });

  await connectToDB();
  await AffiliateLink.findOneAndUpdate({ refCode: ref }, { $inc: { clicks: 1 } });

  return NextResponse.json({ message: "Tracked" });
}
