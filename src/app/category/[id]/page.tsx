"use client";

import { categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { useState, use } from "react";
import { useProducts } from "@/contexts/ProductContext";
import { FenrirSymbolV3 } from "@/components/Logo";

export default function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const category = categories.find((c) => c.id === id);
  const [selectedSub, setSelectedSub] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("popular");
  const { allProducts } = useProducts();

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-secondary">카테고리를 찾을 수 없습니다</h2>
        <Link href="/" className="text-primary mt-4 inline-block hover:underline">홈으로 돌아가기</Link>
      </div>
    );
  }

  let filteredProducts = allProducts.filter((p) => p.category === id);
  if (selectedSub) {
    filteredProducts = filteredProducts.filter((p) => p.subcategory === selectedSub);
  }

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low": return a.price - b.price;
      case "price-high": return b.price - a.price;
      case "discount": return b.discount - a.discount;
      case "rating": return b.rating - a.rating;
      default: return b.reviewCount - a.reviewCount;
    }
  });

  return (
    <div>
      {/* 카테고리 히어로 — 메인과 통일된 다크 스타일 */}
      <section className="bg-secondary relative overflow-hidden">
        <div className="absolute right-[5%] top-1/2 -translate-y-1/2 opacity-[0.03] select-none pointer-events-none">
          <FenrirSymbolV3 size={400} color="white" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-14 md:py-20">
          {/* 브레드크럼 */}
          <nav className="text-xs text-white/30 mb-6 tracking-wider">
            <Link href="/" className="hover:text-white transition-colors">HOME</Link>
            <span className="mx-2">/</span>
            <span className="text-white/60">{category.name.toUpperCase()}</span>
          </nav>

          <div className="flex items-center gap-4 mb-3">
            <span className="text-5xl">{category.icon}</span>
            <div>
              <p className="text-primary text-xs font-bold tracking-[0.2em]">CATEGORY</p>
              <h1 className="text-3xl md:text-4xl font-black text-white">{category.name}</h1>
            </div>
          </div>
          <p className="text-white/40 text-sm mt-2">
            총 <strong className="text-white">{filteredProducts.length}</strong>개 상품
          </p>
        </div>
      </section>

      {/* 필터 + 상품 목록 */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* 사이드바 */}
          <aside className="md:w-56 flex-shrink-0">
            <div className="bg-white border border-gray-medium/50 rounded-2xl p-5 md:sticky md:top-32">
              <h3 className="font-bold text-secondary text-sm mb-4 tracking-wider">FILTER</h3>
              <ul className="space-y-1">
                <li>
                  <button
                    onClick={() => setSelectedSub(null)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors ${
                      !selectedSub ? "bg-secondary text-white font-semibold" : "text-gray-dark hover:bg-gray-light"
                    }`}
                  >
                    전체보기
                  </button>
                </li>
                {category.subcategories.map((sub) => (
                  <li key={sub}>
                    <button
                      onClick={() => setSelectedSub(sub)}
                      className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors ${
                        selectedSub === sub ? "bg-secondary text-white font-semibold" : "text-gray-dark hover:bg-gray-light"
                      }`}
                    >
                      {sub}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* 상품 */}
          <div className="flex-1">
            {/* 정렬 바 */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-dark">
                <strong className="text-secondary">{sortedProducts.length}</strong>개 상품
              </p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-medium/50 rounded-lg px-3 py-2 text-sm outline-none bg-white"
              >
                <option value="popular">인기순</option>
                <option value="price-low">가격 낮은순</option>
                <option value="price-high">가격 높은순</option>
                <option value="discount">할인율순</option>
                <option value="rating">평점순</option>
              </select>
            </div>

            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-5xl mb-4">🔍</p>
                <p className="text-lg font-bold text-secondary">상품이 없습니다</p>
                <p className="text-sm text-gray-dark mt-2">곧 새로운 상품이 추가될 예정입니다</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
