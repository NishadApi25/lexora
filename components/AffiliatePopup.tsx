"use client";

import { useState, useEffect } from "react";

interface AffiliatePopupProps {
  productName: string;
  refCode: string;
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
    process.env.NEXT_PUBLIC_BASE_URL || "https:localhost:4007/"
  }/api/affiliate/click?ref=${refCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(affiliateLink);
    alert("Affiliate link copied!");
    setVisible(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full text-center relative border-2 border-yellow-400">
        <button
          onClick={() => {
            setVisible(false);
            onClose();
          }}
          className="absolute top-2 right-3 text-gray-400 hover:text-gray-700 text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold mb-3 text-yellow-500">
          Affiliate Link
        </h2>

        <p className="text-gray-600 mb-4">
          Share <strong>{productName}</strong> and earn rewards!
        </p>

        <div className="bg-yellow-50 text-yellow-600 border border-yellow-400 rounded-md px-3 py-2 mb-4 text-sm break-all">
          {affiliateLink}
        </div>

        <button
          onClick={handleCopy}
          className="bg-yellow-500 text-white font-medium px-4 py-2 rounded-md hover:bg-yellow-600 transition-all"
        >
          Copy Affiliate Link
        </button>
      </div>
    </div>
  );
}
