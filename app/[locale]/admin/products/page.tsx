"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AffiliatePopup from "@/components/AffiliatePopup";
import { getProductById } from "@/lib/actions/product.actions";
import ProductForm from "../product-form";
import { notFound } from "next/navigation";

export default function UpdateProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<any>(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProductById(params.id);
      if (!data) notFound();
      setProduct(data);
    };
    fetchProduct();
  }, [params.id]);

  if (!product) return <p>Loading...</p>;

  return (
    <main className="max-w-6xl mx-auto p-4">
      <div className="flex mb-4">
        <Link href="/admin/products">Products</Link>
        <span className="mx-1">›</span>
        <Link href={`/admin/products/${product._id}`}>{product._id}</Link>
      </div>

      <div className="my-8">
        <ProductForm type="Update" product={product} productId={product._id} />
      </div>

      {/* Affiliate Link Button */}
      <div className="mt-6">
        <button
          onClick={() => setShowPopup(true)}
          className="border-2 border-yellow-400 text-black px-4 py-2 rounded-md font-medium hover:bg-yellow-50 transition-all"
        >
          Affiliate Link
        </button>
      </div>

      {/* Popup Component */}
      <AffiliatePopup
        productName={product.name}
        refCode={product.slug} // or actual affiliate ref code
        show={showPopup}
        onClose={() => setShowPopup(false)}
      />
    </main>
  );
}
