import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Click from "@/lib/db/models/Click.model";
import Order from "@/lib/db/models/Order.model";


export async function GET(req: Request) {
  try {
    await connectToDB();

    const url = new URL(req.url);
    const days = parseInt(url.searchParams.get("days") || "30", 10);
    const affiliateId = url.searchParams.get("affiliateId"); //  allow filtering by affiliate
    const since = new Date();
    since.setDate(since.getDate() - days + 1);

    //  Build filter (if affiliateId given)
    const clickFilter: any = { createdAt: { $gte: since } };
    const orderFilter: any = { createdAt: { $gte: since } };
    if (affiliateId) {
      clickFilter.affiliateId = affiliateId;
      orderFilter.affiliateId = affiliateId;
    }

    //  Query DB
    const totalClicks = await Click.countDocuments(clickFilter);
    const orders = await Order.find(orderFilter);
    const totalOrders = orders.length;
    const totalEarnings = orders.reduce((sum, o) => sum + o.amount, 0);
    const conversion = totalClicks ? (totalOrders / totalClicks) * 100 : 0;

    //  Build chart data
    const chart = [];
    for (let i = 0; i < days; i++) {
      const d = new Date(since);
      d.setDate(since.getDate() + i);
      const dayStart = new Date(d.setHours(0, 0, 0, 0));
      const dayEnd = new Date(d.setHours(23, 59, 59, 999));

      const dayClicks = await Click.countDocuments({
        ...clickFilter,
        createdAt: { $gte: dayStart, $lte: dayEnd },
      });

      const dayOrders = orders.filter(
        (o) => o.createdAt >= dayStart && o.createdAt <= dayEnd
      );
      const dayEarnings = dayOrders.reduce((sum, o) => sum + o.amount, 0);

      chart.push({
        date: dayStart.toISOString().slice(5, 10),
        clicks: dayClicks,
        earnings: parseFloat(dayEarnings.toFixed(2)),
      });
    }

    // Return response
    return NextResponse.json({
      totalClicks,
      totalOrders,
      totalEarnings: parseFloat(totalEarnings.toFixed(2)),
      conversion: parseFloat(conversion.toFixed(2)),
      chart,
    });
  } catch (error) {
    console.error("Stats error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
