"use client";

import { useState } from "react";
import { MELCHI_KEYWORDS } from "@/lib/crawler";
import type { CrawledProduct } from "@/lib/crawler";
import Link from "next/link";
import { useProducts } from "@/contexts/ProductContext";

// 카테고리 자동 감지
function detectCategory(title: string): string {
  const t = title.toLowerCase();
  if (t.includes("프로틴") || t.includes("게이너") || t.includes("칼로리") || t.includes("에너지바") || t.includes("식품") || t.includes("보충제") || t.includes("말토"))
    return "food";
  if (t.includes("맨투맨") || t.includes("후드") || t.includes("팬츠") || t.includes("자켓") || t.includes("티셔츠") || t.includes("오버핏") || t.includes("와이드"))
    return "clothing";
  if (t.includes("덤벨") || t.includes("크레아틴") || t.includes("풀업") || t.includes("운동") || t.includes("밴드") || t.includes("아령") || t.includes("푸쉬업"))
    return "fitness";
  return "lifestyle";
}

const categoryLabels: Record<string, string> = {
  food: "🍖 식품",
  clothing: "👕 의류",
  fitness: "💪 운동/헬스",
  lifestyle: "✨ 라이프스타일",
};

// 등록 편집 모달에서 쓸 데이터 타입
interface EditingProduct {
  crawled: CrawledProduct;
  name: string;
  sellPrice: number;
  originalPrice: number;
  category: string;
  description: string;
  margin: number; // 마진율 %
}

export default function AdminPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<CrawledProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [crawlLog, setCrawlLog] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"search" | "auto" | "registered" | "settings">("search");
  const { registerProduct, registeredProducts, removeRegistered, registeredCount } = useProducts();

  // 편집 모달 상태
  const [editing, setEditing] = useState<EditingProduct | null>(null);

  const addLog = (msg: string) => {
    setCrawlLog((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev]);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsLoading(true);
    addLog(`"${searchQuery}" 검색 크롤링 시작...`);
    try {
      const res = await fetch(`/api/crawl?q=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      if (data.success) {
        setResults(data.products);
        addLog(`${data.count}개 상품 수집 완료`);
      }
    } catch (err) { addLog(`오류: ${err}`); }
    setIsLoading(false);
  };

  const handleAutoCrawl = async (category: string) => {
    setIsLoading(true);
    addLog(`"${category}" 카테고리 자동 크롤링 시작...`);
    try {
      const res = await fetch(`/api/crawl?category=${category}`);
      const data = await res.json();
      if (data.success) {
        setResults(data.products);
        addLog(`${data.count}개 상품 수집 완료`);
      }
    } catch (err) { addLog(`오류: ${err}`); }
    setIsLoading(false);
  };

  const handleFullCrawl = async () => {
    setIsLoading(true);
    addLog("전체 카테고리 크롤링 시작...");
    try {
      const res = await fetch("/api/crawl");
      const data = await res.json();
      if (data.success) {
        const allProducts = Object.values(data.products).flat() as CrawledProduct[];
        setResults(allProducts);
        addLog(`전체 ${data.count}개 상품 수집 완료`);
      }
    } catch (err) { addLog(`오류: ${err}`); }
    setIsLoading(false);
  };

  // "상품 등록" 버튼 → 편집 모달 열기
  const openEditModal = (product: CrawledProduct) => {
    const category = detectCategory(product.title);
    const margin = 5; // 기본 마진 5%
    const sellPrice = Math.round(product.price * (1 - margin / 100));

    setEditing({
      crawled: product,
      name: product.title,
      sellPrice,
      originalPrice: product.price,
      category,
      description: `${product.mallName}에서 가져온 최저가 상품`,
      margin,
    });
  };

  // 마진 변경 시 판매가 자동 계산
  const updateMargin = (margin: number) => {
    if (!editing) return;
    const sellPrice = Math.round(editing.originalPrice * (1 - margin / 100));
    setEditing({ ...editing, margin, sellPrice });
  };

  // 판매가 직접 입력 시 마진 자동 계산
  const updateSellPrice = (price: number) => {
    if (!editing) return;
    const margin = Math.round((1 - price / editing.originalPrice) * 100);
    setEditing({ ...editing, sellPrice: price, margin });
  };

  // 최종 등록
  const confirmRegister = () => {
    if (!editing) return;

    const modified: CrawledProduct = {
      ...editing.crawled,
      title: editing.name,
      price: editing.sellPrice,
      originalPrice: editing.originalPrice,
      discount: Math.max(0, Math.round((1 - editing.sellPrice / editing.originalPrice) * 100)),
    };

    registerProduct(modified, editing.category);
    addLog(`"${editing.name}" 등록 완료 → ${categoryLabels[editing.category]} (${editing.sellPrice.toLocaleString()}원, 마진 ${editing.margin}%)`);
    setEditing(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-secondary">관리자 페이지</h1>
          <p className="text-sm text-gray-dark mt-1">
            상품 크롤링 및 관리 · 등록된 상품 <strong className="text-primary">{registeredCount}</strong>개
          </p>
        </div>
        <Link href="/" className="text-sm text-gray-dark hover:text-primary transition-colors">← 사이트로 돌아가기</Link>
      </div>

      {/* 탭 */}
      <div className="flex gap-1 border-b border-gray-medium mb-6">
        {[
          { id: "search" as const, label: "키워드 검색" },
          { id: "auto" as const, label: "자동 크롤링" },
          { id: "registered" as const, label: `등록된 상품 (${registeredCount})` },
          { id: "settings" as const, label: "설정" },
        ].map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 text-sm font-semibold transition-colors ${activeTab === tab.id ? "text-primary border-b-2 border-primary" : "text-gray-dark hover:text-secondary"}`}>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* 키워드 검색 */}
          {activeTab === "search" && (
            <div className="bg-white border border-gray-medium rounded-xl p-6">
              <h2 className="font-bold text-secondary mb-4">키워드로 상품 검색</h2>
              <div className="flex gap-2">
                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="예: 게이너 프로틴, 오버핏 맨투맨"
                  className="flex-1 px-4 py-3 border border-gray-medium rounded-lg outline-none focus:border-primary text-sm" />
                <button onClick={handleSearch} disabled={isLoading}
                  className="bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors disabled:opacity-50">
                  {isLoading ? "검색 중..." : "크롤링"}
                </button>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {["게이너 프로틴", "오버핏 맨투맨", "홈트레이닝 덤벨", "체중계 체성분", "크레아틴"].map((kw) => (
                  <button key={kw} onClick={() => setSearchQuery(kw)}
                    className="text-xs bg-gray-light text-gray-dark px-3 py-1.5 rounded-full hover:bg-primary hover:text-white transition-colors">{kw}</button>
                ))}
              </div>
            </div>
          )}

          {/* 자동 크롤링 */}
          {activeTab === "auto" && (
            <div className="bg-white border border-gray-medium rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-secondary">카테고리별 자동 크롤링</h2>
                <button onClick={handleFullCrawl} disabled={isLoading}
                  className="bg-primary hover:bg-primary-dark text-white font-semibold px-4 py-2 rounded-lg text-sm disabled:opacity-50">
                  {isLoading ? "크롤링 중..." : "전체 크롤링"}
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Object.entries(MELCHI_KEYWORDS).map(([cat, keywords]) => (
                  <div key={cat} className="border border-gray-medium rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-sm">{categoryLabels[cat]}</h3>
                      <button onClick={() => handleAutoCrawl(cat)} disabled={isLoading}
                        className="text-xs bg-gray-light hover:bg-primary hover:text-white px-3 py-1 rounded transition-colors disabled:opacity-50">크롤링</button>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {keywords.slice(0, 4).map((kw) => (
                        <span key={kw} className="text-xs text-gray-dark bg-gray-light px-2 py-0.5 rounded">{kw}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 등록된 상품 관리 */}
          {activeTab === "registered" && (
            <div className="bg-white border border-gray-medium rounded-xl p-6">
              <h2 className="font-bold text-secondary mb-4">등록된 상품 ({registeredCount}개)</h2>
              {registeredProducts.length === 0 ? (
                <div className="text-center py-12 text-gray-dark">
                  <p className="text-4xl mb-3">📦</p>
                  <p>등록된 상품이 없습니다</p>
                  <p className="text-xs mt-1">크롤링 후 &quot;상품 등록&quot; 버튼을 눌러보세요</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {registeredProducts.map((product) => (
                    <div key={product.id} className="flex items-center gap-3 p-3 border border-gray-medium/50 rounded-lg">
                      <div className="w-12 h-12 bg-gray-light rounded-lg flex items-center justify-center text-xl flex-shrink-0">
                        {product.category === "food" && "🍖"}
                        {product.category === "clothing" && "👕"}
                        {product.category === "fitness" && "💪"}
                        {product.category === "lifestyle" && "✨"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-secondary line-clamp-1">{product.name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-primary font-bold">{product.price.toLocaleString()}원</span>
                          {product.originalPrice > product.price && (
                            <span className="text-[10px] text-gray-dark line-through">{product.originalPrice.toLocaleString()}원</span>
                          )}
                          <span className="text-[10px] bg-gray-light text-gray-dark px-1.5 py-0.5 rounded">{categoryLabels[product.category]}</span>
                        </div>
                      </div>
                      <button onClick={() => removeRegistered(product.id)}
                        className="text-xs text-gray-dark hover:text-red-500 transition-colors px-2 py-1">삭제</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 설정 */}
          {activeTab === "settings" && (
            <div className="bg-white border border-gray-medium rounded-xl p-6">
              <h2 className="font-bold text-secondary mb-4">API 설정</h2>
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-4">
                <h3 className="font-semibold text-yellow-800 text-sm mb-1">현재 데모 모드</h3>
                <p className="text-xs text-yellow-700">실제 상품을 가져오려면 네이버 API 키가 필요합니다.</p>
              </div>
              <div className="mt-4 bg-secondary text-white p-4 rounded-lg text-sm font-mono">
                <p className="text-gray-400"># .env.local</p>
                <p>NAVER_CLIENT_ID=발급받은_ID</p>
                <p>NAVER_CLIENT_SECRET=발급받은_시크릿</p>
              </div>
            </div>
          )}

          {/* 크롤링 결과 */}
          {results.length > 0 && (activeTab === "search" || activeTab === "auto") && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-secondary">크롤링 결과 ({results.length}개)</h3>
              </div>
              <div className="space-y-2">
                {results.map((product) => {
                  const isRegistered = registeredProducts.some((p) => p.name === product.title);
                  return (
                    <div key={product.id} className="bg-white border border-gray-medium rounded-lg p-4 flex gap-4">
                      <div className="w-16 h-16 bg-gray-light rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden">
                        {product.image ? (
                          <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-xl">📦</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-secondary line-clamp-1">{product.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded">{product.mallName}</span>
                          {product.discount > 0 && (
                            <span className="text-xs font-bold text-primary">{product.discount}%</span>
                          )}
                          <span className="text-sm font-bold text-secondary">{product.price.toLocaleString()}원</span>
                        </div>
                      </div>
                      <button
                        onClick={() => openEditModal(product)}
                        disabled={isRegistered}
                        className={`text-xs px-4 py-2 rounded-lg font-semibold flex-shrink-0 transition-colors ${
                          isRegistered ? "bg-gray-light text-gray-dark" : "bg-primary text-white hover:bg-primary-dark"
                        }`}>
                        {isRegistered ? "등록됨" : "상품 등록"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* 로그 */}
        <div className="lg:col-span-1">
          <div className="bg-secondary rounded-xl p-4 sticky top-32">
            <h3 className="text-white font-semibold text-sm mb-3">크롤링 로그</h3>
            <div className="h-96 overflow-y-auto space-y-1">
              {crawlLog.length === 0 ? (
                <p className="text-gray-400 text-xs">크롤링을 시작하면 로그가 표시됩니다...</p>
              ) : (
                crawlLog.map((log, i) => (
                  <p key={i} className="text-xs text-gray-300 font-mono">{log}</p>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 상품 등록 편집 모달 */}
      {editing && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto mx-4">
            {/* 모달 헤더 */}
            <div className="p-6 border-b border-gray-medium">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-secondary">상품 등록</h2>
                <button onClick={() => setEditing(null)} className="text-gray-dark hover:text-secondary text-xl">&times;</button>
              </div>
              <p className="text-xs text-gray-dark mt-1">가격과 정보를 수정한 후 등록하세요</p>
            </div>

            <div className="p-6 space-y-5">
              {/* 원본 정보 */}
              <div className="bg-gray-light rounded-xl p-4">
                <p className="text-[10px] text-gray-dark tracking-widest mb-2">원본 상품 정보</p>
                <p className="text-sm font-medium text-secondary">{editing.crawled.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded">{editing.crawled.mallName}</span>
                  <span className="text-sm font-bold text-secondary">{editing.crawled.price.toLocaleString()}원</span>
                </div>
              </div>

              {/* 상품명 수정 */}
              <div>
                <label className="block text-sm font-semibold text-secondary mb-1">상품명</label>
                <input
                  type="text"
                  value={editing.name}
                  onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-medium rounded-lg outline-none focus:border-primary text-sm"
                />
              </div>

              {/* 카테고리 */}
              <div>
                <label className="block text-sm font-semibold text-secondary mb-1">카테고리</label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(categoryLabels).map(([value, label]) => (
                    <button
                      key={value}
                      onClick={() => setEditing({ ...editing, category: value })}
                      className={`py-2.5 px-3 rounded-lg text-sm font-medium transition-colors ${
                        editing.category === value
                          ? "bg-primary text-white"
                          : "bg-gray-light text-gray-dark hover:bg-gray-medium"
                      }`}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 가격 설정 */}
              <div className="bg-secondary rounded-xl p-5">
                <p className="text-white font-semibold text-sm mb-4">가격 설정</p>

                {/* 시중가 (원본 가격) */}
                <div className="mb-3">
                  <label className="block text-xs text-white/50 mb-1">시중 판매가 (원본)</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={editing.originalPrice}
                      onChange={(e) => {
                        const orig = parseInt(e.target.value) || 0;
                        const sellPrice = Math.round(orig * (1 - editing.margin / 100));
                        setEditing({ ...editing, originalPrice: orig, sellPrice });
                      }}
                      className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white font-bold outline-none focus:border-primary text-lg"
                    />
                    <span className="text-white/50">원</span>
                  </div>
                </div>

                {/* 할인율 직접 입력 */}
                <div className="mb-3">
                  <label className="block text-xs text-white/50 mb-1">할인율 (시중가 대비)</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="0"
                      max="90"
                      value={editing.margin}
                      onChange={(e) => updateMargin(parseInt(e.target.value) || 0)}
                      className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white font-bold outline-none focus:border-primary text-lg"
                    />
                    <span className="text-white/50">%</span>
                  </div>
                </div>

                {/* 판매가 */}
                <div>
                  <label className="block text-xs text-white/50 mb-1">우리 판매가</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={editing.sellPrice}
                      onChange={(e) => updateSellPrice(parseInt(e.target.value) || 0)}
                      className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white font-bold outline-none focus:border-primary text-lg"
                    />
                    <span className="text-white/50">원</span>
                  </div>
                </div>

                {/* 차액 */}
                <div className="mt-3 bg-white/5 rounded-lg p-3 flex justify-between items-center">
                  <span className="text-xs text-white/40">시중가 대비 할인액</span>
                  <span className="text-primary font-bold">
                    -{(editing.originalPrice - editing.sellPrice).toLocaleString()}원
                  </span>
                </div>
              </div>

              {/* 상품 설명 */}
              <div>
                <label className="block text-sm font-semibold text-secondary mb-1">상품 설명</label>
                <textarea
                  value={editing.description}
                  onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-medium rounded-lg outline-none focus:border-primary text-sm resize-none"
                />
              </div>
            </div>

            {/* 모달 하단 */}
            <div className="p-6 border-t border-gray-medium flex gap-3">
              <button onClick={() => setEditing(null)}
                className="flex-1 py-3 border border-gray-medium rounded-lg text-sm font-semibold text-gray-dark hover:bg-gray-light transition-colors">
                취소
              </button>
              <button onClick={confirmRegister}
                className="flex-1 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm font-bold transition-colors">
                {editing.sellPrice.toLocaleString()}원으로 등록
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
