"use client";

import { useState } from "react";
import AffiliatePopup from "@/components/AffiliatePopup";

interface AffiliateButtonProps {
  productSlug: string;
}

export default function AffiliateButton({ productSlug }: AffiliateButtonProps) {
  const [showPopup, setShowPopup] = useState(false);
  const [affiliateLink, setAffiliateLink] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateLink = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/affiliate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: productSlug }),
      });
      const data = await res.json();
      if (res.ok) {
        setAffiliateLink(data.link);
        setShowPopup(true);
      } else {
        alert(data.message || "Error creating affiliate link");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleGenerateLink}
        disabled={loading}
        className="bg-blue-600 w-full text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-60"
      >
        {loading ? "Generating..." : "Generate Affiliate Link"}
      </button>

      {showPopup && affiliateLink && (
        <AffiliatePopup
          productName={productSlug}
          productSlug={productSlug}
          show={showPopup}
          onClose={() => setShowPopup(false)}
        />
      )}
    </>
  );
}
