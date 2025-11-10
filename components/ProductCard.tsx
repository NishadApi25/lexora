"use client";

import { useState } from "react";
import AffiliatePopup from "./AffiliatePopup";

interface Product {
  id: string;
  name: string;
  price: number;
  isAffiliate?: boolean;
}

export default function ProductCard({ product }: { product: Product }) {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="border rounded-xl p-4 hover:shadow-md">
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-500">${product.price}</p>

      <button
        onClick={() => setShowPopup(true)}
        className="mt-3 text-blue-600 hover:underline"
      >
        View Affiliate Offer
      </button>

      <AffiliatePopup
        productName={product.name}
        show={showPopup}
        onClose={() => setShowPopup(false)}
      />
    </div>
  );
}
