"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { FenrirLogo, FenrirSymbolV3 } from "@/components/Logo";

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", passwordConfirm: "", phone: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [agreeAll, setAgreeAll] = useState(false);
  const [agreements, setAgreements] = useState({ terms: false, privacy: false, marketing: false });
  const { signup } = useAuth();
  const router = useRouter();

  const updateForm = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
    if (errors[field]) setErrors({ ...errors, [field]: "" });
  };

  const handleAgreeAll = () => {
    const s = !agreeAll;
    setAgreeAll(s);
    setAgreements({ terms: s, privacy: s, marketing: s });
  };

  const handleAgreement = (key: keyof typeof agreements) => {
    const n = { ...agreements, [key]: !agreements[key] };
    setAgreements(n);
    setAgreeAll(Object.values(n).every(Boolean));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "이름을 입력해주세요.";
    if (!form.email.trim()) e.email = "이메일을 입력해주세요.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "올바른 이메일 형식이 아닙니다.";
    if (!form.password) e.password = "비밀번호를 입력해주세요.";
    else if (form.password.length < 8) e.password = "비밀번호는 8자 이상이어야 합니다.";
    else if (!/(?=.*[a-zA-Z])(?=.*[0-9])/.test(form.password)) e.password = "비밀번호는 영문과 숫자를 포함해야 합니다.";
    if (form.password !== form.passwordConfirm) e.passwordConfirm = "비밀번호가 일치하지 않습니다.";
    if (!form.phone.trim()) e.phone = "전화번호를 입력해주세요.";
    if (!agreements.terms) e.terms = "이용약관에 동의해주세요.";
    if (!agreements.privacy) e.privacy = "개인정보 처리방침에 동의해주세요.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    const result = signup({ email: form.email, password: form.password, name: form.name, phone: form.phone });
    if (result.success) router.push("/");
    else setErrors({ email: result.message });
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3 border rounded-xl outline-none focus:border-primary transition-colors text-sm bg-gray-light/50 ${errors[field] ? "border-red-500" : "border-gray-medium/50"}`;

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
          <p className="text-white/30 text-xs tracking-[0.2em] mt-3">JOIN THE PACK</p>
        </div>
      </div>

      {/* 폼 */}
      <div className="flex-1 flex items-start justify-center px-4 py-8 bg-background">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl border border-gray-medium/50 p-6 sm:p-8">
            <h2 className="text-xl font-black text-secondary mb-6">회원가입</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-dark mb-1.5 tracking-wider">NAME <span className="text-primary">*</span></label>
                <input type="text" value={form.name} onChange={(e) => updateForm("name", e.target.value)}
                  placeholder="홍길동" className={inputClass("name")} />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-dark mb-1.5 tracking-wider">EMAIL <span className="text-primary">*</span></label>
                <input type="email" value={form.email} onChange={(e) => updateForm("email", e.target.value)}
                  placeholder="example@email.com" className={inputClass("email")} />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-dark mb-1.5 tracking-wider">PASSWORD <span className="text-primary">*</span></label>
                <input type="password" value={form.password} onChange={(e) => updateForm("password", e.target.value)}
                  placeholder="영문, 숫자 포함 8자 이상" className={inputClass("password")} />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                {form.password && !errors.password && (
                  <div className="flex gap-1 mt-2">
                    <div className={`h-1 flex-1 rounded ${form.password.length >= 8 ? "bg-accent" : "bg-gray-medium"}`} />
                    <div className={`h-1 flex-1 rounded ${form.password.length >= 10 ? "bg-accent" : "bg-gray-medium"}`} />
                    <div className={`h-1 flex-1 rounded ${form.password.length >= 12 && /[!@#$%^&*]/.test(form.password) ? "bg-accent" : "bg-gray-medium"}`} />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-dark mb-1.5 tracking-wider">CONFIRM PASSWORD <span className="text-primary">*</span></label>
                <input type="password" value={form.passwordConfirm} onChange={(e) => updateForm("passwordConfirm", e.target.value)}
                  placeholder="비밀번호를 다시 입력하세요" className={inputClass("passwordConfirm")} />
                {errors.passwordConfirm && <p className="text-red-500 text-xs mt-1">{errors.passwordConfirm}</p>}
                {form.passwordConfirm && form.password === form.passwordConfirm && (
                  <p className="text-accent text-xs mt-1">비밀번호가 일치합니다.</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-dark mb-1.5 tracking-wider">PHONE <span className="text-primary">*</span></label>
                <input type="tel" value={form.phone} onChange={(e) => updateForm("phone", e.target.value)}
                  placeholder="010-0000-0000" className={inputClass("phone")} />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              {/* 약관 */}
              <div className="border border-gray-medium/50 rounded-xl p-4 mt-2">
                <label className="flex items-center gap-2 cursor-pointer pb-3 border-b border-gray-medium/50 mb-3">
                  <input type="checkbox" checked={agreeAll} onChange={handleAgreeAll} className="w-5 h-5 accent-primary" />
                  <span className="font-semibold text-sm text-secondary">전체 동의</span>
                </label>
                <div className="space-y-2.5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={agreements.terms} onChange={() => handleAgreement("terms")} className="w-4 h-4 accent-primary" />
                    <span className="text-sm text-gray-dark"><span className="text-primary">[필수]</span> 이용약관 동의</span>
                  </label>
                  {errors.terms && <p className="text-red-500 text-xs ml-6">{errors.terms}</p>}
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={agreements.privacy} onChange={() => handleAgreement("privacy")} className="w-4 h-4 accent-primary" />
                    <span className="text-sm text-gray-dark"><span className="text-primary">[필수]</span> 개인정보 처리방침 동의</span>
                  </label>
                  {errors.privacy && <p className="text-red-500 text-xs ml-6">{errors.privacy}</p>}
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={agreements.marketing} onChange={() => handleAgreement("marketing")} className="w-4 h-4 accent-primary" />
                    <span className="text-sm text-gray-dark">[선택] 마케팅 정보 수신 동의</span>
                  </label>
                </div>
              </div>

              <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3.5 rounded-xl transition-colors mt-2">
                가입하기
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-dark">
              이미 회원이신가요?{" "}
              <Link href="/login" className="text-primary font-semibold hover:underline">로그인</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
