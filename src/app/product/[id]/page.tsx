"use client";

import ProductCard from "@/components/ProductCard";
import ProductImage from "@/components/ProductImage";
import Link from "next/link";
import { useState, use } from "react";
import { useCart } from "@/contexts/CartContext";
import { useProducts } from "@/contexts/ProductContext";
import { FenrirSymbolV3 } from "@/components/Logo";

const categoryNames: Record<string, string> = {
  food: "식품",
  clothing: "의류",
  fitness: "운동/헬스",
  lifestyle: "라이프스타일",
};

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { allProducts } = useProducts();
  const product = allProducts.find((p) => p.id === Number(id));
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("detail");
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-secondary">상품을 찾을 수 없습니다</h2>
        <Link href="/" className="text-primary mt-4 inline-block hover:underline">홈으로 돌아가기</Link>
      </div>
    );
  }

  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const totalPrice = (product.price * quantity).toLocaleString();

  return (
    <div>
      {/* 상단 다크 영역 — 브레드크럼 + 상품 정보 */}
      <section className="bg-secondary relative overflow-hidden">
        <div className="absolute right-[5%] top-1/2 -translate-y-1/2 opacity-[0.03] select-none pointer-events-none">
          <FenrirSymbolV3 size={400} color="white" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 pt-8 pb-12">
          {/* 브레드크럼 */}
          <nav className="text-xs text-white/30 mb-8 tracking-wider">
            <Link href="/" className="hover:text-white transition-colors">HOME</Link>
            <span className="mx-2">/</span>
            <Link href={`/category/${product.category}`} className="hover:text-white transition-colors">
              {(categoryNames[product.category] || "기타").toUpperCase()}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white/50 line-clamp-1">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* 이미지 */}
            <div className="bg-white/5 border border-white/10 rounded-3xl aspect-square overflow-hidden">
              <ProductImage category={product.category} image={product.image} name={product.name} size="lg" />
            </div>

            {/* 상품 정보 */}
            <div className="flex flex-col justify-center">
              {/* 뱃지 */}
              <div className="flex gap-2 mb-3">
                {product.isBest && (
                  <span className="bg-white/10 text-white text-[10px] px-2.5 py-1 rounded-md font-bold tracking-wider">BEST</span>
                )}
                {product.isNew && (
                  <span className="bg-accent/20 text-accent text-[10px] px-2.5 py-1 rounded-md font-bold tracking-wider">NEW</span>
                )}
                <span className="bg-white/5 text-white/40 text-[10px] px-2.5 py-1 rounded-md tracking-wider">
                  {categoryNames[product.category]}
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl font-black text-white leading-snug">{product.name}</h1>

              {/* 별점 */}
              <div className="flex items-center gap-2 mt-3">
                <div className="flex text-yellow-400 text-sm">
                  {"★".repeat(Math.floor(product.rating))}
                  {"☆".repeat(5 - Math.floor(product.rating))}
                </div>
                <span className="text-sm text-white/40">
                  {product.rating} ({product.reviewCount.toLocaleString()})
                </span>
              </div>

              {/* 가격 */}
              <div className="mt-6 bg-white/5 border border-white/10 rounded-2xl p-5">
                {product.discount > 0 && (
                  <p className="text-sm text-white/30 line-through">
                    {product.originalPrice.toLocaleString()}원
                  </p>
                )}
                <div className="flex items-end gap-2 mt-1">
                  {product.discount > 0 && (
                    <span className="text-3xl font-black text-primary">{product.discount}%</span>
                  )}
                  <span className="text-3xl font-black text-white">
                    {product.price.toLocaleString()}
                  </span>
                  <span className="text-lg text-white/60">원</span>
                </div>
                {product.discount > 0 && (
                  <p className="text-sm text-accent mt-1 font-semibold">
                    {(product.originalPrice - product.price).toLocaleString()}원 절약
                  </p>
                )}
              </div>

              {/* 설명 */}
              <p className="mt-4 text-sm text-white/40 leading-relaxed">{product.description}</p>

              {/* 태그 */}
              <div className="flex flex-wrap gap-2 mt-4">
                {product.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-white/5 text-white/40 px-3 py-1 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* 배송 */}
              <div className="mt-5 flex items-center gap-3 text-sm">
                <span className="bg-accent/20 text-accent text-xs font-bold px-2.5 py-1 rounded">무료배송</span>
                <span className="text-white/30">내일 도착 예정</span>
              </div>

              {/* 수량 */}
              <div className="mt-6 flex items-center gap-4">
                <span className="text-sm font-semibold text-white/60">수량</span>
                <div className="flex items-center border border-white/20 rounded-lg">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-white/60 hover:text-white transition-colors">-</button>
                  <span className="px-4 py-2 border-x border-white/20 min-w-[3rem] text-center text-white font-semibold">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-white/60 hover:text-white transition-colors">+</button>
                </div>
                <span className="text-sm text-white/40">
                  총 <strong className="text-white text-lg">{totalPrice}원</strong>
                </span>
              </div>

              {/* 구매 버튼 */}
              <div className="mt-6 grid grid-cols-[1fr_auto_auto] sm:flex gap-2 sm:gap-3">
                <button
                  onClick={() => { addToCart(product, quantity); setAddedToCart(true); setTimeout(() => setAddedToCart(false), 2000); }}
                  className="flex-1 bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl transition-colors text-lg"
                >
                  바로 구매
                </button>
                <button
                  onClick={() => { addToCart(product, quantity); setAddedToCart(true); setTimeout(() => setAddedToCart(false), 2000); }}
                  className="px-6 border-2 border-white/20 text-white font-bold py-4 rounded-xl hover:border-primary hover:text-primary transition-colors"
                >
                  {addedToCart ? "담았어요!" : "장바구니"}
                </button>
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`px-4 border rounded-xl transition-colors ${
                    isInWishlist(product.id)
                      ? "border-primary text-primary bg-primary/10"
                      : "border-white/20 text-white/40 hover:border-primary hover:text-primary"
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6"
                    fill={isInWishlist(product.id) ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>

              {/* 장바구니 알림 */}
              {addedToCart && (
                <div className="mt-3 bg-accent/10 text-accent text-sm p-3 rounded-xl flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  장바구니에 담았습니다!
                  <Link href="/cart" className="ml-auto font-semibold hover:underline">바로가기 &gt;</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 하단 화이트 영역 — 탭 + 관련 상품 */}
      <div className="max-w-7xl mx-auto px-4">
        {/* 탭 */}
        <div className="mt-10 border-b border-gray-medium/50 overflow-x-auto">
          <div className="flex min-w-max">
            {[
              { id: "detail", label: "상품상세" },
              { id: "review", label: `리뷰 (${product.reviewCount.toLocaleString()})` },
              { id: "qna", label: "Q&A" },
              { id: "shipping", label: "배송/교환/반품" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3.5 text-sm font-semibold transition-colors ${
                  activeTab === tab.id
                    ? "text-primary border-b-2 border-primary"
                    : "text-gray-dark hover:text-secondary"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 탭 컨텐츠 */}
        <div className="mt-8 min-h-[250px]">
          {activeTab === "detail" && (
            <div className="text-center py-12 text-gray-dark">
              <p className="text-lg font-semibold mb-2 text-secondary">{product.name}</p>
              <p className="text-sm">{product.description}</p>
              <div className="mt-8 bg-gray-light rounded-2xl max-w-2xl mx-auto aspect-video overflow-hidden">
                <ProductImage category={product.category} image={product.image} name={product.name} size="lg" />
              </div>
            </div>
          )}
          {activeTab === "review" && (
            <div className="text-center py-12 text-gray-dark">
              <p>아직 리뷰가 없습니다. 첫 번째 리뷰를 작성해보세요!</p>
            </div>
          )}
          {activeTab === "qna" && (
            <div className="text-center py-12 text-gray-dark">
              <p>문의사항이 없습니다.</p>
            </div>
          )}
          {activeTab === "shipping" && (
            <div className="max-w-2xl mx-auto py-8 text-sm text-gray-dark space-y-4">
              <h3 className="font-bold text-secondary text-lg">배송 안내</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>배송비: 무료 (3만원 이상 구매 시)</li>
                <li>배송 기간: 국내 1~3일, 해외 7~14일</li>
              </ul>
              <h3 className="font-bold text-secondary text-lg mt-6">교환/반품 안내</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>수령 후 7일 이내 교환/반품 가능</li>
                <li>고객 변심 반품 시 왕복 배송비 고객 부담</li>
                <li>상품 하자 시 무료 교환/반품</li>
              </ul>
            </div>
          )}
        </div>

        {/* 관련 상품 */}
        {relatedProducts.length > 0 && (
          <section className="mt-12 mb-8">
            <div className="mb-6">
              <p className="text-gray-dark text-xs font-bold tracking-[0.2em]">RELATED</p>
              <h2 className="text-xl font-black text-secondary mt-1">관련 상품</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
