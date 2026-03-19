"use client";

const categoryStyles: Record<string, {
  bg: string;
  glow: string;
  glowHover: string;
  accent: string;
  text: string;
  label: string;
}> = {
  food: {
    bg: "from-amber-950 via-orange-950 to-red-950",
    glow: "bg-amber-500/10",
    glowHover: "group-hover:bg-amber-500/20",
    accent: "text-amber-400/80",
    text: "text-amber-400/[0.04]",
    label: "PROTEIN",
  },
  clothing: {
    bg: "from-blue-950 via-indigo-950 to-slate-950",
    glow: "bg-blue-500/10",
    glowHover: "group-hover:bg-blue-500/20",
    accent: "text-blue-400/80",
    text: "text-blue-400/[0.04]",
    label: "WEAR",
  },
  fitness: {
    bg: "from-emerald-950 via-teal-950 to-cyan-950",
    glow: "bg-emerald-500/10",
    glowHover: "group-hover:bg-emerald-500/20",
    accent: "text-emerald-400/80",
    text: "text-emerald-400/[0.04]",
    label: "TRAIN",
  },
  lifestyle: {
    bg: "from-rose-950 via-pink-950 to-purple-950",
    glow: "bg-rose-500/10",
    glowHover: "group-hover:bg-rose-500/20",
    accent: "text-rose-400/80",
    text: "text-rose-400/[0.04]",
    label: "LIFE",
  },
};

export default function ProductImage({
  category,
  image,
  name,
  size = "md",
}: {
  category: string;
  image?: string;
  name: string;
  size?: "sm" | "md" | "lg";
}) {
  // 실제 이미지가 있으면 그 이미지를 보여줌
  if (image && image.length > 0 && !image.includes("placeholder")) {
    return (
      <div className="w-full h-full overflow-hidden bg-gray-light">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
    );
  }

  const style = categoryStyles[category] || categoryStyles.lifestyle;

  if (size === "sm") {
    // 장바구니 등 작은 썸네일
    return (
      <div className={`w-full h-full bg-gradient-to-br ${style.bg} flex items-center justify-center relative overflow-hidden`}>
        <div className={`absolute top-[-30%] right-[-30%] w-[80%] h-[80%] ${style.glow} rounded-full blur-2xl`} />
        <p className={`text-[10px] font-black ${style.accent} tracking-wider relative z-10`}>
          {style.label}
        </p>
      </div>
    );
  }

  // 큰 사이즈 (상품 카드, 상세 페이지)
  return (
    <div className={`w-full h-full bg-gradient-to-br ${style.bg} flex flex-col items-center justify-center relative overflow-hidden`}>
      {/* 글로우 효과 */}
      <div className={`absolute top-[-20%] right-[-20%] w-[60%] h-[60%] ${style.glow} ${style.glowHover} rounded-full blur-3xl transition-all duration-700`} />
      <div className={`absolute bottom-[-15%] left-[-15%] w-[40%] h-[40%] ${style.glow} rounded-full blur-3xl opacity-50`} />

      {/* 대형 배경 타이포 */}
      <p className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[50px] md:text-[70px] font-black ${style.text} leading-none tracking-tighter select-none`}>
        {style.label}
      </p>

      {/* F 마크 */}
      <div className="relative z-10 mb-3">
        <svg width={size === "lg" ? 40 : 28} height={size === "lg" ? 40 : 28} viewBox="0 0 40 40" fill="none">
          <rect x="8" y="6" width="7" height="30" rx="1" fill="currentColor" className={style.accent} opacity={0.3} />
          <path d="M15 6 L33 6 L30 2 L33 6 L28 13 L15 13 Z" fill="currentColor" className={style.accent} opacity={0.3} />
          <path d="M15 18 L27 18 L23 24 L15 24 Z" fill="currentColor" className={style.accent} opacity={0.3} />
        </svg>
      </div>

      {/* 상품명 */}
      <p className="relative z-10 text-[9px] text-white/20 text-center line-clamp-2 px-4 font-medium tracking-wider uppercase max-w-[85%] leading-relaxed">
        {name}
      </p>
    </div>
  );
}
