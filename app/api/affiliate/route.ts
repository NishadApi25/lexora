// app/api/affiliate/route.ts
import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db"; 
import AffiliateLink from "@/lib/db/models/affiliate.model"; 

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { productId } = await req.json();

    await connectToDB();

  
    let existing = await AffiliateLink.findOne({
      product: productId,
      user: session.user.id,
    });
    if (existing) {
      return NextResponse.json({ link: existing.link });
    }

   
    const refCode = Math.random().toString(36).substring(2, 10);
    const link = `${process.env.NEXT_PUBLIC_BASE_URL}/product/${productId}?ref=${refCode}`;

    const newLink = await AffiliateLink.create({
      user: session.user.id,
      product: productId,
      refCode,
      link,
    });

    return NextResponse.json({ link: newLink.link });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
