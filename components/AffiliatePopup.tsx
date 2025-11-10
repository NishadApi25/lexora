"use client";

import { useState, useEffect } from "react";

interface AffiliatePopupProps {
  productName: string;
  refCode: string;  // Add this
  show: boolean;
  onClose: () => void;
}

export default function AffiliatePopup({
  productName,
  refCode,
  show,
  onClose,
}: AffiliatePopupProps) {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    setVisible(show);
  }, [show]);

  if (!visible) return null;

  const affiliateLink = `${
    process.env.NEXT_PUBLIC_BASE_URL || "https://yourdomain.com"
  }/api/affiliate/click?ref=${refCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(affiliateLink);
    alert("✅ Affiliate link copied!");
    setVisible(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full text-center relative">
        <button
          onClick={() => {
            setVisible(false);
            onClose();
          }}
          className="absolute top-2 right-3 text-gray-500 hover:text-black text-lg"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-3">Affiliate Program</h2>
        <p className="text-gray-600 mb-4">
          Share <strong>{productName}</strong> and earn rewards!
        </p>

        <button
          onClick={handleCopy}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Copy Affiliate Link
        </button>
      </div>
    </div>
  );
}
