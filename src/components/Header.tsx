"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { categories } from "@/data/products";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { FenrirLogo } from "@/components/Logo";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { cartCount, wishlist } = useCart();
  const router = useRouter();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50">
      {/* 상단 바 - 다크 */}
      <div className="bg-secondary text-white/70 text-xs py-1.5">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <span className="tracking-wide">FENRIR — BREAK YOUR CHAINS</span>
          <div className="hidden sm:flex gap-4">
            {user ? (
              <>
                <Link href="/mypage" className="hover:text-white transition-colors">
                  <strong className="text-primary">{user.name}</strong>님
                </Link>
                <button onClick={logout} className="hover:text-white transition-colors">로그아웃</button>
                <Link href="/mypage" className="hover:text-white transition-colors">마이페이지</Link>
              </>
            ) : (
              <>
                <Link href="/login" className="hover:text-white transition-colors">로그인</Link>
                <Link href="/signup" className="hover:text-white transition-colors">회원가입</Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 메인 헤더 - 다크 */}
      <div className="bg-secondary border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            {/* 로고 */}
            <Link href="/" className="flex-shrink-0">
              <FenrirLogo variant="dark" size="md" />
            </Link>

            {/* 검색바 */}
            <div className="flex-1 max-w-2xl">
              <div className="relative flex">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.nativeEvent.isComposing && handleSearch()}
                  placeholder="어떤 상품을 찾고 있나요?"
                  className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-l-lg outline-none text-sm text-white placeholder-white/40 focus:border-primary focus:bg-white/15 transition-all"
                />
                <button onClick={handleSearch} className="bg-primary hover:bg-primary-dark text-white px-6 rounded-r-lg transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* 우측 아이콘 */}
            <div className="hidden md:flex items-center gap-5">
              <Link href="/cart" className="relative flex flex-col items-center text-white/60 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
                <span className="text-xs mt-0.5">장바구니</span>
              </Link>
              <Link href="/wishlist" className="relative flex flex-col items-center text-white/60 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {wishlist.length > 99 ? "99+" : wishlist.length}
                  </span>
                )}
                <span className="text-xs mt-0.5">찜</span>
              </Link>
            </div>

            {/* 모바일 메뉴 */}
            <button
              className="md:hidden text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* 카테고리 네비게이션 - 블랙 */}
      <nav className="bg-[#1a1a2e] overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-1 min-w-max">
            <div
              className="relative"
              onMouseEnter={() => setIsCategoryOpen(true)}
              onMouseLeave={() => setIsCategoryOpen(false)}
            >
              <button className="flex items-center gap-2 py-2.5 px-4 font-semibold text-sm text-white/80 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                전체 카테고리
              </button>

              {isCategoryOpen && (
                <div className="absolute left-0 top-full bg-secondary border border-white/10 rounded-b-lg shadow-2xl w-56 z-50">
                  {categories.map((cat) => (
                    <div key={cat.id} className="group relative">
                      <Link
                        href={`/category/${cat.id}`}
                        className="flex items-center gap-2 px-4 py-3 hover:bg-white/10 text-sm text-white/80 hover:text-white transition-colors"
                      >
                        <span>{cat.icon}</span>
                        <span>{cat.name}</span>
                      </Link>
                      <div className="hidden group-hover:block absolute left-full top-0 bg-secondary border border-white/10 rounded-r-lg shadow-2xl w-48">
                        {cat.subcategories.map((sub) => (
                          <Link
                            key={sub}
                            href={`/category/${cat.id}?sub=${encodeURIComponent(sub)}`}
                            className="block px-4 py-2.5 hover:bg-white/10 text-sm text-white/70 hover:text-white transition-colors"
                          >
                            {sub}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Link href="/category/food" className="hidden sm:block py-2.5 px-3 text-sm text-white/60 hover:text-white transition-colors">식품</Link>
            <Link href="/category/clothing" className="hidden sm:block py-2.5 px-3 text-sm text-white/60 hover:text-white transition-colors">의류</Link>
            <Link href="/category/fitness" className="hidden sm:block py-2.5 px-3 text-sm text-white/60 hover:text-white transition-colors">운동/헬스</Link>
            <Link href="/category/lifestyle" className="hidden sm:block py-2.5 px-3 text-sm text-white/60 hover:text-white transition-colors">라이프스타일</Link>
            <span className="hidden sm:block py-2.5 px-3 text-sm text-primary font-bold animate-pulse">SALE</span>
          </div>
        </div>
      </nav>

      {/* 모바일 메뉴 */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-secondary border-t border-white/10 p-4">
          <div className="flex flex-col gap-3">
            {user ? (
              <>
                <span className="text-sm py-2 font-semibold text-white">{user.name}님</span>
                <button onClick={logout} className="text-sm py-2 text-left text-white/70">로그아웃</button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-sm py-2 text-white/70">로그인</Link>
                <Link href="/signup" className="text-sm py-2 text-white/70">회원가입</Link>
              </>
            )}
            <Link href="/cart" className="text-sm py-2 text-white/70">장바구니</Link>
            <Link href="/wishlist" className="text-sm py-2 text-white/70">찜 목록</Link>
            <hr className="border-white/10" />
            {categories.map((cat) => (
              <Link key={cat.id} href={`/category/${cat.id}`} className="text-sm py-2 text-white/70">
                {cat.icon} {cat.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
