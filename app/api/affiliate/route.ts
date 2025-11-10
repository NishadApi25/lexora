import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db"; 
import AffiliateLink from "@/lib/db/models/affiliate.model"; 
import Product from "@/lib/db/models/product.model"; //  Import Product model

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { productId } = await req.json(); // frontend slug

    await connectToDB();

    // Find product by slug
    const product = await Product.findOne({ slug: productId });
    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    // Check if affiliate link already exists
    let existing = await AffiliateLink.findOne({
      product: product._id,  // ObjectId
      user: session.user.id,
    });

    if (existing) {
      return NextResponse.json({ link: existing.link });
    }

    //  Generate referral code
    const refCode = Math.random().toString(36).substring(2, 10);
    const link = `${process.env.NEXT_PUBLIC_BASE_URL}/product/${product.slug}?ref=${refCode}`;

    // Save new affiliate link
    const newLink = await AffiliateLink.create({
      user: session.user.id,
      product: product._id,
      refCode,
      link,
    });

    return NextResponse.json({ link: newLink.link });
  } catch (err) {
    console.error("Affiliate API Error:", err);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
