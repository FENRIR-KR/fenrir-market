"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FenrirSymbolV3 } from "@/components/Logo";
import { useCart } from "@/contexts/CartContext";

export default function MyPage() {
  const { user, logout, isLoading } = useAuth();
  const { cartCount, wishlist } = useCart();
  const router = useRouter();

  if (isLoading) {
    return <div className="min-h-[60vh] flex items-center justify-center"><p className="text-gray-dark">로딩 중...</p></div>;
  }

  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col">
        <div className="bg-secondary py-20 text-center">
          <p className="text-5xl mb-4">🔒</p>
          <h2 className="text-2xl font-black text-white mb-2">로그인이 필요합니다</h2>
          <p className="text-white/40 text-sm mb-6">마이페이지를 이용하려면 로그인해주세요.</p>
          <Link href="/login" className="bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3 rounded-xl transition-colors">
            로그인하기
          </Link>
        </div>
      </div>
    );
  }

  const handleLogout = () => { logout(); router.push("/"); };

  const menuItems = [
    { icon: "📦", title: "주문/배송 조회", desc: "주문 내역과 배송 상태", count: 0, href: "#" },
    { icon: "❤️", title: "찜 목록", desc: "관심 상품 모아보기", count: wishlist.length, href: "/wishlist" },
    { icon: "🛒", title: "장바구니", desc: "담은 상품 확인", count: cartCount, href: "/cart" },
    { icon: "⭐", title: "내 리뷰", desc: "작성한 리뷰 관리", count: 0, href: "#" },
    { icon: "💬", title: "1:1 문의", desc: "문의 내역 확인", count: 0, href: "#" },
    { icon: "🎫", title: "쿠폰함", desc: "보유 쿠폰 확인", count: 0, href: "#" },
  ];

  return (
    <div>
      {/* 다크 프로필 영역 */}
      <section className="bg-secondary relative overflow-hidden">
        <div className="absolute right-[5%] top-1/2 -translate-y-1/2 opacity-[0.03]">
          <FenrirSymbolV3 size={350} color="white" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 py-10 md:py-14">
          <p className="text-xs text-white/30 tracking-[0.2em] mb-6">MY PAGE</p>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-white/10 rounded-2xl flex items-center justify-center">
              <FenrirSymbolV3 size={28} color="rgba(230,57,70,0.8)" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl md:text-2xl font-black text-white">{user.name}님</h2>
              <p className="text-white/40 text-sm mt-0.5">{user.email}</p>
            </div>
            <button onClick={handleLogout}
              className="text-xs text-white/40 hover:text-white border border-white/20 hover:border-white/40 px-4 py-2 rounded-xl transition-colors">
              로그아웃
            </button>
          </div>

          {/* 요약 */}
          <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/10">
            <div className="text-center">
              <p className="text-2xl font-black text-white">0</p>
              <p className="text-xs text-white/30 mt-1">주문</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-black text-white">0</p>
              <p className="text-xs text-white/30 mt-1">쿠폰</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-black text-white">0<span className="text-sm">P</span></p>
              <p className="text-xs text-white/30 mt-1">포인트</p>
            </div>
          </div>
        </div>
      </section>

      {/* 컨텐츠 */}
      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* 주문 상태 */}
        <div className="bg-white border border-gray-medium/50 rounded-2xl p-6 mb-6">
          <h3 className="font-black text-secondary text-sm tracking-wider mb-4">ORDER STATUS</h3>
          <div className="grid grid-cols-4 gap-4 text-center">
            {[
              { label: "결제완료", count: 0 },
              { label: "배송준비", count: 0 },
              { label: "배송중", count: 0 },
              { label: "배송완료", count: 0 },
            ].map((status) => (
              <div key={status.label} className="cursor-pointer hover:text-primary transition-colors">
                <p className="text-xl md:text-2xl font-black text-secondary">{status.count}</p>
                <p className="text-xs text-gray-dark mt-1">{status.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 메뉴 */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          {menuItems.map((item) => (
            <Link key={item.title} href={item.href}
              className="bg-white border border-gray-medium/50 rounded-2xl p-5 cursor-pointer hover:border-primary transition-all group">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{item.icon}</span>
                {item.count > 0 && (
                  <span className="bg-primary text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">{item.count}</span>
                )}
              </div>
              <h4 className="font-semibold text-secondary text-sm group-hover:text-primary transition-colors">{item.title}</h4>
              <p className="text-[11px] text-gray-dark mt-0.5">{item.desc}</p>
            </Link>
          ))}
        </div>

        {/* 회원 정보 */}
        <div className="bg-white border border-gray-medium/50 rounded-2xl p-6">
          <h3 className="font-black text-secondary text-sm tracking-wider mb-4">PROFILE</h3>
          <div className="space-y-0 text-sm">
            {[
              { label: "이름", value: user.name },
              { label: "이메일", value: user.email },
              { label: "전화번호", value: user.phone },
              { label: "가입일", value: new Date(user.createdAt).toLocaleDateString("ko-KR") },
            ].map((info, i) => (
              <div key={info.label} className={`flex justify-between py-3 ${i < 3 ? "border-b border-gray-light" : ""}`}>
                <span className="text-gray-dark">{info.label}</span>
                <span className="text-secondary font-medium">{info.value}</span>
              </div>
            ))}
          </div>
          <button className="mt-4 text-xs text-primary font-semibold hover:underline">회원정보 수정</button>
        </div>
      </div>
    </div>
  );
}
