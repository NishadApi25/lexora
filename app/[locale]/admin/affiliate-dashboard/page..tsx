import { connectToDB } from "@/lib/db";
import AffiliateLink from "@/lib/db/models/affiliate.model";

export default async function AffiliateDashboard() {
  await connectToDB();
  const links = await AffiliateLink.find().populate("user", "name email");

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Affiliate Dashboard</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Affiliate Name</th>
            <th className="border p-2">Product ID</th>
            <th className="border p-2">Ref Code</th>
            <th className="border p-2">Clicks</th>
            <th className="border p-2">Link</th>
          </tr>
        </thead>
        <tbody>
          {links.map((link) => (
            <tr key={link._id}>
              <td className="border p-2">{link.user?.name || "Unknown"}</td>
              <td className="border p-2">{link.product.toString()}</td>
              <td className="border p-2">{link.refCode}</td>
              <td className="border p-2">{link.clicks}</td>
              <td className="border p-2">
                <a
                  href={`${process.env.NEXT_PUBLIC_BASE_URL}/api/affiliate/click?ref=${link.refCode}`}
                  target="_blank"
                  className="text-blue-600"
                >
                  Visit
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
