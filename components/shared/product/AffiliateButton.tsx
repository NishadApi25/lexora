"use client";

import React from "react";

interface AffiliateButtonProps {
  productSlug: string;
}

export default function AffiliateButton({ productSlug }: AffiliateButtonProps) {
  const handleClick = async () => {
    try {
      const res = await fetch("/api/affiliate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productSlug }),
      });
      if (!res.ok) throw new Error("Failed to generate link");
      const data = await res.json();
      alert("Affiliate link: " + data.link);
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="bg-blue-600 text-white px-4 py-2 rounded"
    >
      Generate Affiliate Link
    </button>
  );
}
