import { auth } from "@/auth";
import { connectToDB } from "@/lib/db";
import AffiliateLink from "@/lib/db/models/affiliate.model";

export default async function AffiliateDashboard() {
  const session = await auth();
  if (!session?.user) throw new Error("Login required");

  await connectToDB();
  const links = await AffiliateLink.find({ user: session.user.id }).lean();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Affiliate Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-green-100 p-4 rounded">Total Links: {links.length}</div>
        <div className="bg-blue-100 p-4 rounded">
          Total Clicks: {links.reduce((a, l) => a + l.clicks, 0)}
        </div>
        <div className="bg-yellow-100 p-4 rounded">
          Total Earnings: ${links.reduce((a, l) => a + l.earnings, 0).toFixed(2)}
        </div>
      </div>

      <table className="w-full mt-6 border">
        <thead className="bg-gray-200">
          <tr>
            <th>Product</th>
            <th>Clicks</th>
            <th>Sales</th>
            <th>Earnings</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {links.map((l: any) => (
            <tr key={l._id} className="text-center border-t">
              <td>{l.product}</td>
              <td>{l.clicks}</td>
              <td>{l.sales}</td>
              <td>${l.earnings.toFixed(2)}</td>
              <td>
                <a
                  href={l.link}
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  View
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
