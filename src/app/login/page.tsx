"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { FenrirLogo, FenrirSymbolV3 } from "@/components/Logo";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("이메일과 비밀번호를 입력해주세요."); return; }
    const result = login(email, password);
    if (result.success) { router.push("/"); } else { setError(result.message); }
  };

  return (
    <div className="min-h-[80vh] flex flex-col">
      {/* 다크 상단 */}
      <div className="bg-secondary relative overflow-hidden">
        <div className="absolute right-[10%] top-1/2 -translate-y-1/2 opacity-[0.03]">
          <FenrirSymbolV3 size={300} color="white" />
        </div>
        <div className="relative max-w-md mx-auto px-4 py-12 text-center">
          <Link href="/">
            <FenrirLogo variant="dark" size="lg" />
          </Link>
          <p className="text-white/30 text-xs tracking-[0.2em] mt-3">BREAK YOUR CHAINS</p>
        </div>
      </div>

      {/* 폼 영역 */}
      <div className="flex-1 flex items-start justify-center px-4 py-8 bg-background">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl border border-gray-medium/50 p-6 sm:p-8">
            <h2 className="text-xl font-black text-secondary mb-6">로그인</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-dark mb-1.5 tracking-wider">EMAIL</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  className="w-full px-4 py-3 border border-gray-medium/50 rounded-xl outline-none focus:border-primary transition-colors text-sm bg-gray-light/50" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-dark mb-1.5 tracking-wider">PASSWORD</label>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} value={password}
                    onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호를 입력하세요"
                    className="w-full px-4 py-3 border border-gray-medium/50 rounded-xl outline-none focus:border-primary transition-colors text-sm bg-gray-light/50 pr-14" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-dark text-xs hover:text-primary">
                    {showPassword ? "숨기기" : "보기"}
                  </button>
                </div>
              </div>

              {error && <p className="text-red-500 text-sm bg-red-50 p-3 rounded-xl">{error}</p>}

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 accent-primary" />
                  <span className="text-gray-dark text-xs">로그인 유지</span>
                </label>
                <Link href="/forgot-password" className="text-gray-dark text-xs hover:text-primary transition-colors">비밀번호 찾기</Link>
              </div>

              <button type="submit"
                className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3.5 rounded-xl transition-colors">
                로그인
              </button>
            </form>

            {/* 소셜 */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-medium/50"></div></div>
                <div className="relative flex justify-center text-xs"><span className="bg-white px-4 text-gray-dark">간편 로그인</span></div>
              </div>
              <div className="grid grid-cols-3 gap-3 mt-4">
                <button className="flex flex-col items-center gap-1.5 py-3 border border-gray-medium/50 rounded-xl hover:bg-gray-light transition-colors">
                  <div className="w-7 h-7 bg-yellow-400 rounded-full flex items-center justify-center text-xs font-bold text-yellow-900">K</div>
                  <span className="text-[10px] text-gray-dark">카카오</span>
                </button>
                <button className="flex flex-col items-center gap-1.5 py-3 border border-gray-medium/50 rounded-xl hover:bg-gray-light transition-colors">
                  <div className="w-7 h-7 bg-green-500 rounded-full flex items-center justify-center text-xs font-bold text-white">N</div>
                  <span className="text-[10px] text-gray-dark">네이버</span>
                </button>
                <button className="flex flex-col items-center gap-1.5 py-3 border border-gray-medium/50 rounded-xl hover:bg-gray-light transition-colors">
                  <div className="w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold text-white">G</div>
                  <span className="text-[10px] text-gray-dark">구글</span>
                </button>
              </div>
            </div>

            <div className="mt-6 text-center text-sm text-gray-dark">
              아직 회원이 아니신가요?{" "}
              <Link href="/signup" className="text-primary font-semibold hover:underline">회원가입</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
