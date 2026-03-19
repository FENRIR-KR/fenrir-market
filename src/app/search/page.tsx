"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense, useState } from "react";
import { useProducts } from "@/contexts/ProductContext";
import { FenrirSymbolV3 } from "@/components/Logo";
import ProductCard from "@/components/ProductCard";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [sortBy, setSortBy] = useState("popular");
  const { allProducts } = useProducts();

  // 등록된 상품에서만 검색
  const results = query.trim()
    ? allProducts.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.subcategory.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
        );
      })
    : [];

  // 정렬
  const sorted = [...results].sort((a, b) => {
    switch (sortBy) {
      case "price-low": return a.price - b.price;
      case "price-high": return b.price - a.price;
      case "discount": return b.discount - a.discount;
      case "rating": return b.rating - a.rating;
      default: return b.reviewCount - a.reviewCount;
    }
  });

  // 검색어 없을 때
  if (!query.trim()) {
    return (
      <div>
        <div className="bg-secondary py-20 text-center relative overflow-hidden">
          <div className="absolute right-[10%] top-1/2 -translate-y-1/2 opacity-[0.03]">
            <FenrirSymbolV3 size={300} color="white" />
          </div>
          <div className="relative">
            <p className="text-white/20 text-xs tracking-[0.3em] mb-4">SEARCH</p>
            <h2 className="text-2xl font-black text-white mb-2">검색어를 입력해주세요</h2>
            <p className="text-white/40 text-sm mb-8">FENRIR의 엄선된 상품을 검색하세요</p>
            <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto">
              {["프로틴", "오버핏", "덤벨", "크레아틴", "맨투맨", "게이너"].map((kw) => (
                <Link key={kw} href={`/search?q=${encodeURIComponent(kw)}`}
                  className="text-sm bg-white/10 text-white/60 px-4 py-2 rounded-full hover:bg-primary hover:text-white transition-colors border border-white/10">
                  {kw}
                </Link>
              ))}
            </div>
          </div>
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
          <p className="text-xs text-white/30 tracking-[0.2em] mb-2">SEARCH RESULTS</p>
          <h1 className="text-2xl md:text-3xl font-black text-white">
            &ldquo;{query}&rdquo; <span className="text-white/40 font-normal text-lg">{sorted.length}개 상품</span>
          </h1>
        </div>
      </section>

      {/* 결과 */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {sorted.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-dark">
                <strong className="text-secondary">{sorted.length}</strong>개 상품
              </p>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-medium/50 rounded-lg px-3 py-2 text-sm outline-none bg-white">
                <option value="popular">인기순</option>
                <option value="price-low">가격 낮은순</option>
                <option value="price-high">가격 높은순</option>
                <option value="discount">할인율순</option>
                <option value="rating">평점순</option>
              </select>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {sorted.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🔍</p>
            <h2 className="text-xl font-bold text-secondary mb-2">검색 결과가 없습니다</h2>
            <p className="text-sm text-gray-dark mb-8">다른 키워드로 검색해보세요</p>
            <div className="flex flex-wrap justify-center gap-2">
              {["프로틴", "오버핏", "덤벨", "크레아틴"].map((kw) => (
                <Link key={kw} href={`/search?q=${encodeURIComponent(kw)}`}
                  className="text-sm bg-gray-light text-gray-dark px-4 py-2 rounded-full hover:bg-primary hover:text-white transition-colors">{kw}</Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="bg-secondary py-20 text-center"><p className="text-white/40">검색 중...</p></div>}>
      <SearchResults />
    </Suspense>
  );
}
