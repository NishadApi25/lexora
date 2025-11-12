// app/[locale]/admin/affiliate/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function AffiliateDashboard() {
  const params = useParams();
  const locale = params.locale; // this will get "en", "bn", etc. from URL

  const [stats, setStats] = useState({
    totalClicks: 0,
    totalEarnings: 0,
    totalOrders: 0,
    conversion: 0,
  });

  useEffect(() => {
    // Fetch affiliate stats from backend API (replace with real DB data later)
    const fetchData = async () => {
      try {
        const res = await fetch("/api/affiliate/stats");
        const data = await res.json();
        if (res.ok) {
          setStats(data);
        }
      } catch (err) {
        console.error("Error fetching affiliate stats", err);
      }
    };
    fetchData();
  }, []);

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Affiliate Dashboard ({locale})
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white shadow-md rounded-xl p-5 border">
          <h3 className="text-gray-500">Total Clicks</h3>
          <p className="text-2xl font-semibold">{stats.totalClicks}</p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-5 border">
          <h3 className="text-gray-500">Total Orders</h3>
          <p className="text-2xl font-semibold">{stats.totalOrders}</p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-5 border">
          <h3 className="text-gray-500">Total Earnings</h3>
          <p className="text-2xl font-semibold">${stats.totalEarnings}</p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-5 border">
          <h3 className="text-gray-500">Conversion Rate</h3>
          <p className="text-2xl font-semibold">{stats.conversion}%</p>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-bold mb-3">Earnings Overview (Last 30 Days)</h2>
        <div className="bg-white p-6 rounded-xl shadow-md border">
          <p className="text-gray-500 italic">
            (Graph feature coming soon — similar to Amazon dashboard)
          </p>
        </div>
      </div>
    </main>
  );
}
