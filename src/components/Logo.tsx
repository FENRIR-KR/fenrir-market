"use client";

// A안 (유지)
export function FenrirSymbol({ size = 32, color = "#E63946" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="14" stroke={color} strokeWidth="3.5" strokeDasharray="6 4" fill="none" />
      <path d="M20 10 L16 22 L20 19 L24 22 Z" fill={color} />
    </svg>
  );
}

// B안 업그레이드: 늑대 눈 — 더 날카롭고 입체적
export function FenrirSymbolV2({ size = 32, color = "#E63946" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* 외곽 다이아몬드 프레임 — 늑대 얼굴 윤곽 */}
      <path d="M20 2 L38 20 L20 38 L2 20 Z" stroke={color} strokeWidth="1.5" fill="none" />
      {/* 왼쪽 눈 — 길고 날카로운 슬릿, 약간 위로 기울어짐 */}
      <path d="M7 20 L17 14.5 L17 23 Z" fill={color} />
      {/* 오른쪽 눈 — 대칭 */}
      <path d="M33 20 L23 14.5 L23 23 Z" fill={color} />
      {/* 눈 사이 코/브릿지 — 작은 다이아몬드 */}
      <path d="M20 16 L18.5 20 L20 24 L21.5 20 Z" fill={color} opacity="0.4" />
    </svg>
  );
}

// B안 v2: 프레임 없이 더 미니멀
export function FenrirSymbolV2b({ size = 32, color = "#E63946" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* 왼쪽 눈 — 곡선 포함, 더 유기적 */}
      <path d="M4 20 L18 13 L18 20 L16 24 Z" fill={color} />
      {/* 오른쪽 눈 */}
      <path d="M36 20 L22 13 L22 20 L24 24 Z" fill={color} />
      {/* 눈동자 하이라이트 — 작은 원 */}
      <circle cx="14" cy="18.5" r="1.2" fill="white" opacity="0.9" />
      <circle cx="26" cy="18.5" r="1.2" fill="white" opacity="0.9" />
      {/* 코끝 마크 */}
      <path d="M18.5 28 L20 25 L21.5 28 Z" fill={color} opacity="0.5" />
    </svg>
  );
}

// C안 업그레이드: F 마크 — 더 세련된 비율, 상단에 늑대 귀 포인트
export function FenrirSymbolV3({ size = 32, color = "#E63946" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* F 본체 — 세로 기둥 */}
      <rect x="8" y="6" width="7" height="30" rx="1" fill={color} />
      {/* 상단 가로 — 끝이 날카롭게 올라감 (늑대 귀 암시) */}
      <path d="M15 6 L33 6 L30 2 L33 6 L28 13 L15 13 Z" fill={color} />
      {/* 중간 가로 — 짧고 날카롭게 */}
      <path d="M15 18 L27 18 L23 24 L15 24 Z" fill={color} />
    </svg>
  );
}

// C안 v2: F를 더 기하학적으로 — 사선 컷
export function FenrirSymbolV3b({ size = 32, color = "#E63946" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* F — 모든 끝이 사선으로 잘림 (속도감/날카로움) */}
      <path d="
        M8 38 L8 4
        L34 4 L28 12 L16 12
        L16 17 L28 17 L24 23 L16 23
        L16 38 Z
      " fill={color} />
      {/* 상단 오른쪽 끝 — 위로 솟은 포인트 (귀) */}
      <path d="M32 4 L35 1 L34 4 Z" fill={color} />
    </svg>
  );
}

export function FenrirLogo({
  variant = "dark",
  size = "md",
  symbolVersion = 1,
}: {
  variant?: "dark" | "light";
  size?: "sm" | "md" | "lg";
  symbolVersion?: 1 | 2 | 3;
}) {
  const textColor = variant === "dark" ? "text-white" : "text-secondary";
  const fontSize = { sm: "text-lg", md: "text-2xl", lg: "text-4xl" }[size];
  const symbolSize = { sm: 24, md: 32, lg: 48 }[size];

  const Symbol = symbolVersion === 1 ? FenrirSymbolV3 : symbolVersion === 2 ? FenrirSymbolV2 : FenrirSymbolV3;

  return (
    <div className="flex items-center gap-2.5">
      <Symbol size={symbolSize} />
      <span className={`${fontSize} font-black tracking-[0.08em] ${textColor}`}>
        FENRIR
      </span>
    </div>
  );
}
