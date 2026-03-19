"use client";

// 카테고리별 프리미엄 SVG 일러스트 — 라인아트 스타일
export function FoodIllust({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className={className}>
      {/* 쉐이커 보틀 */}
      <rect x="65" y="50" width="70" height="110" rx="12" stroke="currentColor" strokeWidth="1.5" />
      <rect x="60" y="40" width="80" height="16" rx="4" stroke="currentColor" strokeWidth="1.5" />
      <line x1="60" y1="48" x2="140" y2="48" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      {/* 뚜껑 */}
      <path d="M85 40 L85 28 Q85 22 100 22 Q115 22 115 28 L115 40" stroke="currentColor" strokeWidth="1.5" />
      {/* 라벨 */}
      <rect x="75" y="80" width="50" height="30" rx="4" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <line x1="82" y1="90" x2="118" y2="90" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <line x1="85" y1="97" x2="115" y2="97" stroke="currentColor" strokeWidth="1" opacity="0.2" />
      <line x1="88" y1="104" x2="112" y2="104" stroke="currentColor" strokeWidth="1" opacity="0.2" />
      {/* 액체 레벨 */}
      <path d="M67 120 Q100 115 133 120 L133 148 Q133 158 123 158 L77 158 Q67 158 67 148 Z" stroke="currentColor" strokeWidth="1" opacity="0.15" fill="currentColor" fillOpacity="0.05" />
      {/* 스쿱 옆에 */}
      <ellipse cx="155" cy="140" rx="18" ry="10" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
      <line x1="155" y1="130" x2="160" y2="100" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
      {/* 데코 점들 */}
      <circle cx="45" cy="70" r="2" fill="currentColor" opacity="0.1" />
      <circle cx="160" cy="60" r="3" fill="currentColor" opacity="0.08" />
      <circle cx="50" cy="150" r="2.5" fill="currentColor" opacity="0.06" />
    </svg>
  );
}

export function ClothingIllust({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className={className}>
      {/* 후드티/맨투맨 */}
      <path d="M60 60 L50 80 L55 82 L62 70 L62 160 L138 160 L138 70 L145 82 L150 80 L140 60"
        stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      {/* 넥라인 */}
      <path d="M60 60 Q80 75 100 78 Q120 75 140 60" stroke="currentColor" strokeWidth="1.5" />
      {/* 후드 */}
      <path d="M60 60 Q55 45 65 35 Q80 22 100 20 Q120 22 135 35 Q145 45 140 60"
        stroke="currentColor" strokeWidth="1.5" />
      {/* 앞판 중심선 */}
      <line x1="100" y1="78" x2="100" y2="160" stroke="currentColor" strokeWidth="1" opacity="0.2" />
      {/* 주머니 */}
      <path d="M72 120 L128 120 L128 145 L72 145 Z" stroke="currentColor" strokeWidth="1" opacity="0.3" rx="3" />
      {/* 후드 끈 */}
      <line x1="92" y1="78" x2="90" y2="100" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <line x1="108" y1="78" x2="110" y2="100" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      {/* 데코 */}
      <circle cx="40" cy="100" r="2" fill="currentColor" opacity="0.08" />
      <circle cx="165" cy="130" r="3" fill="currentColor" opacity="0.06" />
    </svg>
  );
}

export function FitnessIllust({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className={className}>
      {/* 덤벨 */}
      {/* 바 */}
      <rect x="45" y="95" width="110" height="10" rx="5" stroke="currentColor" strokeWidth="1.5" />
      {/* 왼쪽 웨이트 큰것 */}
      <rect x="25" y="65" width="25" height="70" rx="4" stroke="currentColor" strokeWidth="1.5" />
      {/* 왼쪽 웨이트 작은것 */}
      <rect x="35" y="75" width="15" height="50" rx="3" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
      {/* 오른쪽 웨이트 큰것 */}
      <rect x="150" y="65" width="25" height="70" rx="4" stroke="currentColor" strokeWidth="1.5" />
      {/* 오른쪽 웨이트 작은것 */}
      <rect x="150" y="75" width="15" height="50" rx="3" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
      {/* 그립 */}
      <rect x="70" y="92" width="60" height="16" rx="8" stroke="currentColor" strokeWidth="1" opacity="0.2" />
      {/* 바닥 그림자 */}
      <ellipse cx="100" cy="155" rx="60" ry="6" fill="currentColor" opacity="0.05" />
      {/* 데코 */}
      <circle cx="100" cy="45" r="2" fill="currentColor" opacity="0.1" />
      <circle cx="170" cy="45" r="1.5" fill="currentColor" opacity="0.08" />
      <circle cx="30" cy="150" r="2" fill="currentColor" opacity="0.06" />
    </svg>
  );
}

export function LifestyleIllust({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className={className}>
      {/* 체중계/스마트워치 */}
      {/* 스마트워치 본체 */}
      <rect x="65" y="45" width="70" height="90" rx="20" stroke="currentColor" strokeWidth="1.5" />
      {/* 화면 */}
      <rect x="75" y="58" width="50" height="55" rx="8" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      {/* 화면 안 데이터 */}
      <circle cx="100" cy="78" r="12" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <path d="M100 70 L100 78 L106 82" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <line x1="82" y1="98" x2="105" y2="98" stroke="currentColor" strokeWidth="1" opacity="0.2" />
      <line x1="82" y1="105" x2="118" y2="105" stroke="currentColor" strokeWidth="1" opacity="0.15" />
      {/* 밴드 상단 */}
      <path d="M78 45 L78 25 Q78 15 88 15 L112 15 Q122 15 122 25 L122 45"
        stroke="currentColor" strokeWidth="1.5" />
      {/* 밴드 하단 */}
      <path d="M78 135 L78 165 Q78 175 88 175 L112 175 Q122 175 122 165 L122 135"
        stroke="currentColor" strokeWidth="1.5" />
      {/* 밴드 구멍 */}
      <circle cx="100" cy="155" r="2" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <circle cx="100" cy="165" r="2" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      {/* 버튼 */}
      <rect x="135" y="75" width="6" height="15" rx="3" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      {/* 데코 */}
      <circle cx="45" cy="90" r="2.5" fill="currentColor" opacity="0.06" />
      <circle cx="160" cy="50" r="2" fill="currentColor" opacity="0.08" />
    </svg>
  );
}
