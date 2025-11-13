import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import AffiliateLink from "@/lib/db/models/affiliate.model";
import Click from "@/models/Click.model"; //  import Click model for stats tracking

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const refCode = url.searchParams.get("ref");
    if (!refCode)
      return NextResponse.json({ message: "ref code missing" }, { status: 400 });

    await connectToDB();

    const link = await AffiliateLink.findOne({ refCode });
    if (!link)
      return NextResponse.json({ message: "Invalid ref code" }, { status: 404 });

    // Record this click in Click collection (for stats)
    await Click.create({
      link: link.product, // or link._id if you prefer
      affiliateId: link.affiliateId, // make sure your AffiliateLink schema has affiliateId
    });

    // Increment total click counter (optional)
    link.clicks += 1;
    await link.save();

    //  Redirect to the product page
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/product/${link.product}`
    );
  } catch (err) {
    console.error("Affiliate click error:", err);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
