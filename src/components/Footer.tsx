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
              <span className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors cursor-pointer text-xs text-white/60 hover:text-white">IG</span>
              <span className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors cursor-pointer text-xs text-white/60 hover:text-white">YT</span>
              <span className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors cursor-pointer text-xs text-white/60 hover:text-white">BG</span>
            </div>
          </div>
        </div>

        {/* 하단 */}
        <div className="border-t border-white/10 mt-10 pt-8 text-center text-xs text-white/20">
          <p>상호명: FENRIR | 대표: 홍길동 | 사업자등록번호: 000-00-00000</p>
          <p className="mt-1">주소: 서울특별시 강남구 테헤란로 000 | 이메일: help@melchimarket.com</p>
          <p className="mt-3">&copy; 2024 FENRIR. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
