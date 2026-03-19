import Link from "next/link";
import { FenrirLogo } from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="bg-secondary text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 회사 정보 */}
          <div>
            <div className="mb-4">
              <FenrirLogo variant="dark" size="md" />
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              당신의 변화를 위한 모든 것.
              식품, 의류, 운동용품까지 전 세계 최저가로 제공합니다.
            </p>
          </div>

          {/* 고객센터 */}
          <div>
            <h4 className="font-bold mb-4 text-white/80">고객센터</h4>
            <ul className="space-y-2 text-sm text-white/40">
              <li><Link href="/faq" className="hover:text-white transition-colors">자주 묻는 질문</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">1:1 문의</Link></li>
              <li><Link href="/notice" className="hover:text-white transition-colors">공지사항</Link></li>
              <li><Link href="/return-policy" className="hover:text-white transition-colors">교환/반품 안내</Link></li>
            </ul>
          </div>

          {/* 카테고리 */}
          <div>
            <h4 className="font-bold mb-4 text-white/80">카테고리</h4>
            <ul className="space-y-2 text-sm text-white/40">
              <li><Link href="/category/food" className="hover:text-white transition-colors">식품</Link></li>
              <li><Link href="/category/clothing" className="hover:text-white transition-colors">의류</Link></li>
              <li><Link href="/category/fitness" className="hover:text-white transition-colors">운동/헬스</Link></li>
              <li><Link href="/category/lifestyle" className="hover:text-white transition-colors">라이프스타일</Link></li>
            </ul>
          </div>

          {/* 연락처 */}
          <div>
            <h4 className="font-bold mb-4 text-white/80">CONTACT</h4>
            <div className="mt-2">
              <p className="text-sm text-white/40">고객센터 전화</p>
              <p className="text-2xl font-black text-primary mt-1">1588-0000</p>
              <p className="text-xs text-white/30 mt-1">평일 09:00 - 18:00</p>
            </div>
            <div className="flex gap-2 mt-4">
              <span className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
                <svg className="w-4 h-4 text-white/60" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </span>
              <span className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
                <svg className="w-4 h-4 text-white/60" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </span>
            </div>
          </div>
        </div>

        {/* 하단 */}
        <div className="border-t border-white/10 mt-10 pt-8 text-center text-xs text-white/20">
          <p>&copy; 2026 FENRIR. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
