import { categories } from "@/data/products";
import Link from "next/link";
import { FenrirSymbolV3 } from "@/components/Logo";
import { BestProducts, NewProducts, AllProducts } from "@/components/ProductSection";

export default function Home() {
  return (
    <div>
      {/* 히어로 */}
      <section className="bg-secondary relative overflow-hidden min-h-[85vh] flex items-center">
        <div className="absolute right-[5%] top-1/2 -translate-y-1/2 opacity-[0.03] select-none pointer-events-none">
          <FenrirSymbolV3 size={600} color="white" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 w-full">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-8">
              <FenrirSymbolV3 size={18} />
              <p className="text-white/30 text-xs tracking-[0.3em]">BREAK YOUR CHAINS</p>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-8xl font-black text-white leading-[0.95] tracking-tight">
              UNLEASH
              <br />
              <span className="text-primary">YOURSELF.</span>
            </h2>
            <p className="mt-8 text-base md:text-lg text-white/40 max-w-md leading-relaxed">
              한계를 깨고 나와.
              <br />
              식품, 의류, 운동용품 — 전 세계 최저가로 모았습니다.
            </p>
            <div className="mt-10 flex items-center gap-4">
              <Link href="/category/food" className="bg-white text-secondary font-bold px-8 py-4 rounded-full text-sm hover:bg-primary hover:text-white transition-all duration-300">
                쇼핑 시작하기
              </Link>
              <Link href="/category/fitness" className="text-white/50 hover:text-white text-sm font-medium transition-colors">
                둘러보기 &rarr;
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-white/20 text-[10px] tracking-widest">SCROLL</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
        </div>
      </section>

      {/* 숫자 통계 */}
      <section className="bg-white border-b border-gray-medium/50">
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-black text-secondary">12K<span className="text-primary">+</span></p>
            <p className="text-xs text-gray-dark mt-1 tracking-wider">PRODUCTS</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-black text-secondary">40<span className="text-primary">%</span></p>
            <p className="text-xs text-gray-dark mt-1 tracking-wider">MAX SALE</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-black text-secondary">24<span className="text-primary">H</span></p>
            <p className="text-xs text-gray-dark mt-1 tracking-wider">DELIVERY</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-black text-secondary">100<span className="text-primary">%</span></p>
            <p className="text-xs text-gray-dark mt-1 tracking-wider">AUTHENTIC</p>
          </div>
        </div>
      </section>

      {/* 카테고리 */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <p className="text-xs text-gray-dark tracking-[0.2em] mb-2">CATEGORIES</p>
        <h2 className="text-2xl font-black text-secondary mb-8">뭘 찾고 있나요?</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:grid-rows-2">
          {/* 식품 — 크게 */}
          <Link href="/category/food" className="md:col-span-2 md:row-span-2 group relative rounded-3xl overflow-hidden flex flex-col justify-end min-h-[220px] md:min-h-[420px]">
            {/* 멀티 레이어 그라데이션 */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-900 via-orange-950 to-red-950" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            {/* 빛 효과 */}
            <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-amber-500/15 rounded-full blur-3xl group-hover:bg-amber-500/25 transition-all duration-700" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-600/10 rounded-full blur-3xl" />
            {/* 대형 타이포 배경 */}
            <div className="absolute top-6 right-6 md:top-8 md:right-8">
              <p className="text-[60px] md:text-[120px] font-black text-white/[0.04] leading-none tracking-tighter select-none">
                FUEL
              </p>
            </div>
            {/* 텍스트 영역 */}
            <div className="relative z-20 p-6 md:p-8">
              <span className="text-amber-400 text-[10px] font-bold tracking-[0.2em] bg-amber-400/10 px-2.5 py-1 rounded">BEST SELLER</span>
              <h3 className="text-2xl md:text-3xl font-black text-white mt-3">식품</h3>
              <p className="text-white/40 text-sm mt-1.5">프로틴 · 게이너 · 고칼로리 식품</p>
              <div className="mt-4 flex items-center gap-2 text-amber-400/60 text-xs font-medium group-hover:text-amber-400 transition-colors">
                <span>둘러보기</span>
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </div>
            </div>
          </Link>

          {/* 의류 */}
          <Link href="/category/clothing" className="group relative rounded-3xl overflow-hidden flex flex-col justify-end min-h-[180px]">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-950" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute top-[-20%] right-[-20%] w-[70%] h-[70%] bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all duration-700" />
            <div className="absolute top-3 right-4">
              <p className="text-[40px] md:text-[50px] font-black text-white/[0.04] leading-none tracking-tighter select-none">FIT</p>
            </div>
            <div className="relative z-20 p-5 md:p-6">
              <h3 className="text-lg font-black text-white">의류</h3>
              <p className="text-white/35 text-xs mt-0.5">오버핏 · 체형보완</p>
              <div className="mt-3 flex items-center gap-1.5 text-blue-400/50 text-[11px] font-medium group-hover:text-blue-400 transition-colors">
                <span>둘러보기</span><span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </div>
            </div>
          </Link>

          {/* 운동/헬스 */}
          <Link href="/category/fitness" className="group relative rounded-3xl overflow-hidden flex flex-col justify-end min-h-[180px]">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-950 to-cyan-950" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-[-20%] left-[-20%] w-[70%] h-[70%] bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all duration-700" />
            <div className="absolute top-3 right-4">
              <p className="text-[40px] md:text-[50px] font-black text-white/[0.04] leading-none tracking-tighter select-none">GYM</p>
            </div>
            <div className="relative z-20 p-5 md:p-6">
              <h3 className="text-lg font-black text-white">운동/헬스</h3>
              <p className="text-white/35 text-xs mt-0.5">덤벨 · 크레아틴</p>
              <div className="mt-3 flex items-center gap-1.5 text-emerald-400/50 text-[11px] font-medium group-hover:text-emerald-400 transition-colors">
                <span>둘러보기</span><span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </div>
            </div>
          </Link>

          {/* 라이프스타일 */}
          <Link href="/category/lifestyle" className="group relative rounded-3xl overflow-hidden flex flex-col justify-end min-h-[180px]">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-900 via-pink-950 to-purple-950" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-rose-500/10 rounded-full blur-3xl group-hover:bg-rose-500/20 transition-all duration-700" />
            <div className="absolute top-3 right-4">
              <p className="text-[40px] md:text-[50px] font-black text-white/[0.04] leading-none tracking-tighter select-none">LIFE</p>
            </div>
            <div className="relative z-20 p-5 md:p-6">
              <h3 className="text-lg font-black text-white">라이프스타일</h3>
              <p className="text-white/35 text-xs mt-0.5">체성분계 · 건강관리</p>
              <div className="mt-3 flex items-center gap-1.5 text-rose-400/50 text-[11px] font-medium group-hover:text-rose-400 transition-colors">
                <span>둘러보기</span><span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </div>
            </div>
          </Link>

          {/* 전체보기 */}
          <Link href="/category/food" className="group relative rounded-3xl overflow-hidden flex flex-col justify-end min-h-[180px]">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 group-hover:from-secondary group-hover:to-[#1a1a2e] transition-all duration-500" />
            <div className="relative z-20 p-5 md:p-6">
              <p className="text-3xl font-black text-secondary group-hover:text-white transition-colors duration-500">&rarr;</p>
              <p className="text-sm font-semibold text-gray-dark group-hover:text-white/60 mt-1 transition-colors duration-500">전체보기</p>
            </div>
          </Link>
        </div>
      </section>

      {/* 상품 섹션들 — 크롤링 등록 상품 포함 */}
      <BestProducts />

      {/* 배너 */}
      <section className="max-w-7xl mx-auto px-4 mt-20">
        <div className="bg-secondary rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.02]">
            <FenrirSymbolV3 size={400} color="white" />
          </div>
          <div className="relative">
            <p className="text-white/20 text-[10px] tracking-[0.3em] mb-6">FENRIR MEMBERSHIP</p>
            <h3 className="text-2xl md:text-3xl font-black text-white">
              최저가, 매일 업데이트.
            </h3>
            <p className="text-white/30 text-sm mt-3">가입하고 신상품 알림을 받아보세요</p>
            <Link href="/signup" className="mt-6 inline-block bg-primary hover:bg-primary-dark text-white font-bold px-8 py-3.5 rounded-full text-sm transition-all hover:scale-105">
              무료 가입하기
            </Link>
          </div>
        </div>
      </section>

      <NewProducts />

      {/* 강점 */}
      <section className="max-w-7xl mx-auto px-4 mt-20 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-secondary rounded-3xl overflow-hidden">
          <div className="bg-secondary p-8 md:p-10 text-center md:border-r border-b md:border-b-0 border-white/5">
            <p className="text-4xl font-black text-primary">01</p>
            <h3 className="font-bold text-white mt-3 text-lg">최저가 보장</h3>
            <p className="text-sm text-white/30 mt-2 leading-relaxed">국내외 수백 개 쇼핑몰<br />실시간 가격 비교</p>
          </div>
          <div className="bg-secondary p-8 md:p-10 text-center md:border-r border-b md:border-b-0 border-white/5">
            <p className="text-4xl font-black text-primary">02</p>
            <h3 className="font-bold text-white mt-3 text-lg">전문 큐레이션</h3>
            <p className="text-sm text-white/30 mt-2 leading-relaxed">체형에 최적화된<br />상품만 엄선</p>
          </div>
          <div className="bg-secondary p-8 md:p-10 text-center">
            <p className="text-4xl font-black text-primary">03</p>
            <h3 className="font-bold text-white mt-3 text-lg">빠른 배송</h3>
            <p className="text-sm text-white/30 mt-2 leading-relaxed">국내 익일 배송<br />해외 최단 배송</p>
          </div>
        </div>
      </section>

      <AllProducts />
    </div>
  );
}
