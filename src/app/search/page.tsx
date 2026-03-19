"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useProducts } from "@/contexts/ProductContext";
import { FenrirSymbolV3 } from "@/components/Logo";
import type { Product } from "@/data/products";

interface SearchResult {
  id: string;
  title: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  link: string;
  mallName: string;
  category: string;
  rating: number;
  reviewCount: number;
  source: "internal" | "naver" | "demo";
  crawledAt: string;
}

interface SearchResponse {
  success: boolean;
  query: string;
  count: number;
  lowestPrice: { price: number; mallName: string; title: string } | null;
  products: SearchResult[];
}

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<SearchResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState("price-low");
  const { addToCart } = useCart();

  useEffect(() => {
    if (!query.trim()) return;
    setIsLoading(true);
    fetch(`/api/search?q=${encodeURIComponent(query)}&sort=${sortBy}`)
      .then((res) => res.json())
      .then((data) => { setResults(data); setIsLoading(false); })
      .catch(() => setIsLoading(false));
  }, [query, sortBy]);

  const handleAddToCart = (item: SearchResult) => {
    const product: Product = {
      id: parseInt(item.id.replace("internal-", "")),
      name: item.title, price: item.price, originalPrice: item.originalPrice,
      discount: item.discount, image: "", category: "food", subcategory: item.category,
      rating: item.rating, reviewCount: item.reviewCount, description: "", tags: [],
      isBest: false, isNew: false,
    };
    addToCart(product);
  };

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
            <p className="text-white/40 text-sm mb-8">전 세계 쇼핑몰에서 최저가를 찾아드립니다</p>
            <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto">
              {["게이너 프로틴", "오버핏 맨투맨", "홈트레이닝 덤벨", "크레아틴", "체중계"].map((kw) => (
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

  // 로딩 중
  if (isLoading) {
    return (
      <div>
        <div className="bg-secondary py-20 text-center">
          <div className="inline-block w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-white/60">최저가 검색 중...</p>
          <p className="text-xs text-white/30 mt-1">여러 쇼핑몰을 비교하고 있습니다</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* 다크 헤더 + 최저가 하이라이트 */}
      <section className="bg-secondary relative overflow-hidden">
        <div className="absolute right-[5%] top-1/2 -translate-y-1/2 opacity-[0.03]">
          <FenrirSymbolV3 size={300} color="white" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-10 md:py-14">
          <p className="text-xs text-white/30 tracking-[0.2em] mb-2">PRICE COMPARISON</p>
          <h1 className="text-2xl md:text-3xl font-black text-white">
            &ldquo;{query}&rdquo; <span className="text-white/40 font-normal text-lg">최저가 검색</span>
          </h1>

          {/* 최저가 하이라이트 */}
          {results?.lowestPrice && (
            <div className="mt-6 bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold bg-primary text-white px-2 py-0.5 rounded tracking-wider">LOWEST PRICE</span>
                  <span className="text-white/30 text-xs">{results.lowestPrice.mallName}</span>
                </div>
                <p className="text-white/50 text-sm line-clamp-1">{results.lowestPrice.title}</p>
              </div>
              <p className="text-3xl md:text-4xl font-black text-primary flex-shrink-0 ml-4">
                {results.lowestPrice.price.toLocaleString()}<span className="text-base text-white/40">원</span>
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 결과 목록 */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* 정렬 바 */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm text-gray-dark">
            <strong className="text-secondary">{results?.count || 0}</strong>개 상품
            {results?.products[0]?.source === "demo" && (
              <span className="ml-2 text-[10px] bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">데모 데이터</span>
            )}
          </p>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-medium/50 rounded-lg px-3 py-2 text-sm outline-none bg-white">
            <option value="price-low">가격 낮은순</option>
            <option value="price-high">가격 높은순</option>
            <option value="discount">할인율순</option>
            <option value="review">리뷰 많은순</option>
          </select>
        </div>

        {results && results.count > 0 ? (
          <div className="space-y-3">
            {results.products.map((item, index) => (
              <div key={item.id}
                className={`bg-white border rounded-2xl p-3 sm:p-4 flex gap-3 sm:gap-4 hover:shadow-md transition-shadow ${
                  index === 0 ? "border-primary" : "border-gray-medium/50"
                }`}>
                <div className="hidden sm:block flex-shrink-0 w-8 text-center pt-1">
                  <span className={`text-sm font-black ${index === 0 ? "text-primary" : "text-gray-dark"}`}>{index + 1}</span>
                </div>

                <div className="w-14 h-14 sm:w-20 sm:h-20 bg-gray-light rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden">
                  {item.image ? (
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-secondary to-[#1a1a2e] flex items-center justify-center">
                      <FenrirSymbolV3 size={16} color="rgba(230,57,70,0.3)" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded tracking-wider ${
                      item.source === "internal" ? "bg-primary/10 text-primary" : "bg-blue-50 text-blue-600"
                    }`}>{item.mallName}</span>
                    {index === 0 && <span className="text-[10px] font-bold bg-primary text-white px-2 py-0.5 rounded">최저가</span>}
                  </div>
                  <h3 className="text-sm font-medium text-secondary line-clamp-1">{item.title}</h3>
                  <div className="flex items-center gap-2 mt-1.5">
                    {item.discount > 0 && <span className="text-sm font-black text-primary">{item.discount}%</span>}
                    <span className="text-lg font-black text-secondary">{item.price.toLocaleString()}원</span>
                    {item.discount > 0 && <span className="text-xs text-gray-dark line-through">{item.originalPrice.toLocaleString()}원</span>}
                  </div>
                  {item.rating > 0 && (
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-yellow-400 text-xs">★</span>
                      <span className="text-xs text-gray-dark">{item.rating} ({item.reviewCount.toLocaleString()})</span>
                    </div>
                  )}
                </div>

                <div className="hidden sm:flex flex-col gap-2 flex-shrink-0 justify-center">
                  {item.source === "internal" ? (
                    <>
                      <Link href={item.link} className="text-xs bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary-dark transition-colors text-center font-semibold">상세보기</Link>
                      <button onClick={() => handleAddToCart(item)}
                        className="text-xs border border-primary text-primary px-4 py-2 rounded-xl hover:bg-primary hover:text-white transition-colors font-semibold">장바구니</button>
                    </>
                  ) : (
                    <a href={item.link !== "#" ? item.link : undefined} target="_blank" rel="noopener noreferrer"
                      className="text-xs bg-secondary text-white px-4 py-2 rounded-xl hover:bg-primary transition-colors text-center font-semibold">구매하러 가기</a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🔍</p>
            <h2 className="text-xl font-bold text-secondary mb-2">검색 결과가 없습니다</h2>
            <p className="text-sm text-gray-dark mb-8">다른 키워드로 검색해보세요</p>
            <div className="flex flex-wrap justify-center gap-2">
              {["게이너 프로틴", "오버핏 맨투맨", "홈트레이닝 덤벨", "크레아틴"].map((kw) => (
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
    <Suspense fallback={<div className="bg-secondary py-20 text-center"><p className="text-white/40">최저가 검색 중...</p></div>}>
      <SearchResults />
    </Suspense>
  );
}
