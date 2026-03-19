"use client";

import { useCart } from "@/contexts/CartContext";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { FenrirSymbolV3 } from "@/components/Logo";

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col">
        <div className="bg-secondary py-20 text-center">
          <FenrirSymbolV3 size={48} color="rgba(255,255,255,0.15)" />
          <h2 className="text-2xl font-black text-white mb-2 mt-4">찜 목록이 비었습니다</h2>
          <p className="text-white/40 text-sm mb-6">마음에 드는 상품을 찜해보세요!</p>
          <Link href="/" className="bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3 rounded-xl transition-colors">
            쇼핑하러 가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* 다크 헤더 */}
      <section className="bg-secondary relative overflow-hidden">
        <div className="absolute right-[5%] top-1/2 -translate-y-1/2 opacity-[0.03]">
          <FenrirSymbolV3 size={300} color="white" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-10 md:py-14">
          <p className="text-xs text-white/30 tracking-[0.2em] mb-2">WISHLIST</p>
          <h1 className="text-2xl md:text-3xl font-black text-white">
            찜 목록 <span className="text-primary">{wishlist.length}</span>
          </h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {wishlist.map((item) => (
            <div key={item.product.id} className="relative">
              <ProductCard product={item.product} />
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => addToCart(item.product)}
                  className="flex-1 bg-primary hover:bg-primary-dark text-white text-xs font-semibold py-2.5 rounded-xl transition-colors"
                >
                  장바구니 담기
                </button>
                <button
                  onClick={() => toggleWishlist(item.product)}
                  className="px-3 border border-gray-medium/50 rounded-xl hover:border-red-500 hover:text-red-500 transition-colors text-xs"
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
