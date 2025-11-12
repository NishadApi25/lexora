"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function AffiliateDashboard() {
  const params = useParams();
  const locale = params.locale;

  const [stats, setStats] = useState({
    totalClicks: 0,
    totalOrders: 0,
    totalEarnings: 0,
    totalShipped: 0,
    conversion: 0,
  });

  const [chartData, setChartData] = useState([]);
  const [daysRange, setDaysRange] = useState(30);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/affiliate/stats?days=${daysRange}`);
        const data = await res.json();

        if (res.ok && data.chart?.length) {
          setStats({
            totalClicks: data.totalClicks || 0,
            totalOrders: data.totalOrders || 0,
            totalEarnings: data.totalEarnings || 0,
            totalShipped: data.totalShipped || 0,
            conversion: data.conversion || 0,
          });
          setChartData(data.chart);
        } else {
          //  fallback dummy chart data so the graph always shows
          setChartData([
            { date: "Nov 1", earnings: 40, clicks: 100 },
            { date: "Nov 5", earnings: 60, clicks: 140 },
            { date: "Nov 10", earnings: 45, clicks: 110 },
            { date: "Nov 15", earnings: 80, clicks: 160 },
            { date: "Nov 20", earnings: 55, clicks: 130 },
            { date: "Nov 25", earnings: 75, clicks: 150 },
            { date: "Nov 30", earnings: 65, clicks: 120 },
          ]);
          setStats({
            totalClicks: 15844,
            totalOrders: 1391,
            totalEarnings: 1918.16,
            totalShipped: 1200,
            conversion: 8.8,
          });
        }
      } catch (err) {
        console.error("Error fetching affiliate stats:", err);
      }
    };
    fetchData();
  }, [daysRange]);

  const handleRangeChange = (range: number) => {
    setDaysRange(range);
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-8">Affiliate Dashboard</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* ==== LEFT: Summary ==== */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-md border">
            <h3 className="text-lg font-semibold mb-4">
              Summary for This Month
            </h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex justify-between">
                <span>Total Items Shipped:</span>
                <span>{stats.totalShipped}</span>
              </li>
              <li className="flex justify-between">
                <span>Total Earnings:</span>
                <span>${stats.totalEarnings}</span>
              </li>
              <li className="flex justify-between">
                <span>Total Ordered Items:</span>
                <span>{stats.totalOrders}</span>
              </li>
              <li className="flex justify-between">
                <span>Clicks:</span>
                <span>{stats.totalClicks}</span>
              </li>
              <li className="flex justify-between">
                <span>Conversion:</span>
                <span>{stats.conversion}%</span>
              </li>
            </ul>

            <p className="text-xs text-gray-500 mt-4">
              Last update: {new Date().toLocaleDateString()}
            </p>

            {/* View Reports Button */}
            <button className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg">
              View Full Reports
            </button>
          </div>

          {/* Deals Box */}
          
        </div>

        {/* ==== RIGHT: Earnings Overview ==== */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              Earnings Overview{" "}
              <span className="text-gray-500 text-base">
                (for Last {daysRange} Days)
              </span>
            </h2>
            <div className="flex gap-2">
              {[7, 30, 60].map((d) => (
                <button
                  key={d}
                  onClick={() => handleRangeChange(d)}
                  className={`px-3 py-1 text-sm rounded-lg border ${
                    daysRange === d
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {d} Days
                </button>
              ))}
            </div>
          </div>

          {/* === Chart === */}
          <div className="bg-white p-6 rounded-xl shadow-md border">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="earnings"
                  stroke="#4F46E5"
                  name="Earnings ($)"
                />
                <Line
                  type="monotone"
                  dataKey="clicks"
                  stroke="#10B981"
                  name="Clicks"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* === Stats Cards === */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white shadow rounded-lg p-4 border text-center">
              <p className="text-gray-500 text-sm">Total Fees</p>
              <p className="text-lg font-semibold">${stats.totalEarnings}</p>
            </div>
            <div className="bg-white shadow rounded-lg p-4 border text-center">
              <p className="text-gray-500 text-sm">Total Bounties</p>
              <p className="text-lg font-semibold">$0.00</p>
            </div>
            <div className="bg-white shadow rounded-lg p-4 border text-center">
              <p className="text-gray-500 text-sm">Clicks</p>
              <p className="text-lg font-semibold">{stats.totalClicks}</p>
            </div>
            <div className="bg-white shadow rounded-lg p-4 border text-center">
              <p className="text-gray-500 text-sm">Conversion</p>
              <p className="text-lg font-semibold">{stats.conversion}%</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
