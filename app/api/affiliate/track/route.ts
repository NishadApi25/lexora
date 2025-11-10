import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import AffiliateLink from "@/lib/db/models/affiliate.model";

export async function POST(req: Request) {
  const { productId } = await req.json();

  await connectToDB();

  let existing = await AffiliateLink.findOne({ productId });
  if (existing) return NextResponse.json(existing);

  const newLink = await AffiliateLink.create({ productId });
  return NextResponse.json(newLink);
}
