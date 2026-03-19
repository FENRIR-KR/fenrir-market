// 크롤링된 상품 타입
export interface CrawledProduct {
  id: string;
  title: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  link: string;
  mallName: string; // 판매처 (쿠팡, 11번가 등)
  category: string;
  rating: number;
  reviewCount: number;
  source: "naver" | "demo";
  crawledAt: string;
}

// 네이버 쇼핑 API 검색
export async function searchNaverShopping(
  query: string,
  display: number = 20
): Promise<CrawledProduct[]> {
  const clientId = process.env.NAVER_CLIENT_ID;
  const clientSecret = process.env.NAVER_CLIENT_SECRET;

  // API 키가 없으면 데모 데이터 반환
  if (!clientId || !clientSecret) {
    return getDemoProducts(query);
  }

  const url = `https://openapi.naver.com/v1/search/shop.json?query=${encodeURIComponent(query)}&display=${display + 10}&sort=asc`;

  const res = await fetch(url, {
    headers: {
      "X-Naver-Client-Id": clientId,
      "X-Naver-Client-Secret": clientSecret,
    },
  });

  if (!res.ok) {
    console.error("Naver API error:", res.status);
    return getDemoProducts(query);
  }

  const data = await res.json();

  const MIN_PRICE = 1000; // 1,000원 이하 미끼 상품 제외

  return data.items.filter((item: { lprice: string }) => parseInt(item.lprice) >= MIN_PRICE).slice(0, display).map((item: {
    productId: string;
    title: string;
    lprice: string;
    hprice: string;
    image: string;
    link: string;
    mallName: string;
    category1: string;
    category2: string;
  }) => {
    const price = parseInt(item.lprice);
    const highPrice = parseInt(item.hprice) || Math.round(price * 1.3);
    const discount = highPrice > price ? Math.round((1 - price / highPrice) * 100) : 0;

    return {
      id: `naver-${item.productId}`,
      title: item.title.replace(/<[^>]*>/g, ""), // HTML 태그 제거
      price,
      originalPrice: highPrice,
      discount,
      image: item.image,
      link: item.link,
      mallName: item.mallName,
      category: item.category1 + (item.category2 ? ` > ${item.category2}` : ""),
      rating: 0,
      reviewCount: 0,
      source: "naver" as const,
      crawledAt: new Date().toISOString(),
    };
  });
}

// 멸치 관련 키워드로 자동 크롤링
export const MELCHI_KEYWORDS = {
  food: [
    "게이너 프로틴",
    "체중증가 보충제",
    "고칼로리 식품",
    "말토덱스트린",
    "고칼로리 에너지바",
    "체중증가 쉐이크",
    "고단백 식품",
    "벌크업 식단",
    "닭가슴살",
    "견과류 선물세트",
  ],
  clothing: [
    "오버핏 맨투맨",
    "오버핏 후드티",
    "와이드 팬츠 남자",
    "레이어드 티셔츠",
    "어깨뽕 자켓",
    "볼륨 패딩",
    "오버사이즈 코트",
    "와이드 슬랙스",
  ],
  fitness: [
    "홈트레이닝 덤벨",
    "풀업바",
    "저항밴드 세트",
    "크레아틴",
    "아령 세트",
    "푸쉬업바",
    "치닝디핑",
    "운동 장갑",
  ],
  lifestyle: [
    "체중계 체성분",
    "식단 관리 앱",
    "보충제 쉐이커",
    "필라테스 매트",
    "마사지건",
    "자세교정밴드",
  ],
};

// 데모 상품 데이터 (API 키 없을 때 사용)
function getDemoProducts(query: string): CrawledProduct[] {
  const demoData: Record<string, CrawledProduct[]> = {
    "게이너 프로틴": [
      {
        id: "demo-1",
        title: "옵티멈뉴트리션 시리어스매스 게이너 2.72kg 초코",
        price: 39800,
        originalPrice: 59000,
        discount: 33,
        image: "",
        link: "#",
        mallName: "쿠팡",
        category: "식품 > 보충제",
        rating: 4.8,
        reviewCount: 3241,
        source: "demo",
        crawledAt: new Date().toISOString(),
      },
      {
        id: "demo-2",
        title: "BSN 트루매스 게이너 4.65kg 바닐라",
        price: 52900,
        originalPrice: 79000,
        discount: 33,
        image: "",
        link: "#",
        mallName: "11번가",
        category: "식품 > 보충제",
        rating: 4.6,
        reviewCount: 1823,
        source: "demo",
        crawledAt: new Date().toISOString(),
      },
      {
        id: "demo-3",
        title: "머슬팜 컴뱃 XL 매스게이너 5.44kg",
        price: 61900,
        originalPrice: 89000,
        discount: 30,
        image: "",
        link: "#",
        mallName: "G마켓",
        category: "식품 > 보충제",
        rating: 4.5,
        reviewCount: 987,
        source: "demo",
        crawledAt: new Date().toISOString(),
      },
      {
        id: "demo-4",
        title: "마이프로틴 임팩트 웨이트 게이너 2.5kg",
        price: 29900,
        originalPrice: 45000,
        discount: 34,
        image: "",
        link: "#",
        mallName: "네이버",
        category: "식품 > 보충제",
        rating: 4.7,
        reviewCount: 5432,
        source: "demo",
        crawledAt: new Date().toISOString(),
      },
    ],
    "오버핏 맨투맨": [
      {
        id: "demo-5",
        title: "무지 오버핏 맨투맨 남녀공용 10컬러",
        price: 15900,
        originalPrice: 29000,
        discount: 45,
        image: "",
        link: "#",
        mallName: "쿠팡",
        category: "의류 > 상의",
        rating: 4.3,
        reviewCount: 8921,
        source: "demo",
        crawledAt: new Date().toISOString(),
      },
      {
        id: "demo-6",
        title: "헤비웨이트 460g 오버핏 맨투맨 체형보완",
        price: 28900,
        originalPrice: 42000,
        discount: 31,
        image: "",
        link: "#",
        mallName: "무신사",
        category: "의류 > 상의",
        rating: 4.6,
        reviewCount: 2341,
        source: "demo",
        crawledAt: new Date().toISOString(),
      },
      {
        id: "demo-7",
        title: "프리미엄 기모 오버핏 맨투맨 두꺼운 겨울용",
        price: 22900,
        originalPrice: 35000,
        discount: 35,
        image: "",
        link: "#",
        mallName: "11번가",
        category: "의류 > 상의",
        rating: 4.4,
        reviewCount: 1567,
        source: "demo",
        crawledAt: new Date().toISOString(),
      },
    ],
    "홈트레이닝 덤벨": [
      {
        id: "demo-8",
        title: "조절식 덤벨 24kg 2개 세트 홈트레이닝",
        price: 89000,
        originalPrice: 139000,
        discount: 36,
        image: "",
        link: "#",
        mallName: "쿠팡",
        category: "운동 > 헬스용품",
        rating: 4.9,
        reviewCount: 4521,
        source: "demo",
        crawledAt: new Date().toISOString(),
      },
      {
        id: "demo-9",
        title: "크롬 아령 덤벨 세트 5kg~20kg 선택",
        price: 32900,
        originalPrice: 49000,
        discount: 33,
        image: "",
        link: "#",
        mallName: "G마켓",
        category: "운동 > 헬스용품",
        rating: 4.7,
        reviewCount: 2100,
        source: "demo",
        crawledAt: new Date().toISOString(),
      },
      {
        id: "demo-10",
        title: "보우플렉스 셀렉트테크 552 덤벨 2~24kg",
        price: 289000,
        originalPrice: 399000,
        discount: 28,
        image: "",
        link: "#",
        mallName: "네이버",
        category: "운동 > 헬스용품",
        rating: 4.8,
        reviewCount: 876,
        source: "demo",
        crawledAt: new Date().toISOString(),
      },
    ],
    "체중계 체성분": [
      {
        id: "demo-11",
        title: "인바디 다이얼 H20N 체성분 체중계",
        price: 89000,
        originalPrice: 129000,
        discount: 31,
        image: "",
        link: "#",
        mallName: "쿠팡",
        category: "생활 > 건강관리",
        rating: 4.8,
        reviewCount: 6543,
        source: "demo",
        crawledAt: new Date().toISOString(),
      },
      {
        id: "demo-12",
        title: "샤오미 체성분 분석 체중계 2세대",
        price: 19900,
        originalPrice: 35000,
        discount: 43,
        image: "",
        link: "#",
        mallName: "11번가",
        category: "생활 > 건강관리",
        rating: 4.5,
        reviewCount: 12340,
        source: "demo",
        crawledAt: new Date().toISOString(),
      },
    ],
  };

  // 정확한 키워드 매치
  if (demoData[query]) return demoData[query];

  // 부분 매치
  for (const [key, products] of Object.entries(demoData)) {
    if (query.includes(key) || key.includes(query)) return products;
  }

  // 매치 안 되면 기본 데이터
  return [
    {
      id: `demo-search-1`,
      title: `${query} - 최저가 상품 A`,
      price: 25900,
      originalPrice: 39000,
      discount: 34,
      image: "",
      link: "#",
      mallName: "쿠팡",
      category: "검색결과",
      rating: 4.5,
      reviewCount: 1234,
      source: "demo",
      crawledAt: new Date().toISOString(),
    },
    {
      id: `demo-search-2`,
      title: `${query} - 인기 상품 B`,
      price: 31900,
      originalPrice: 45000,
      discount: 29,
      image: "",
      link: "#",
      mallName: "11번가",
      category: "검색결과",
      rating: 4.3,
      reviewCount: 567,
      source: "demo",
      crawledAt: new Date().toISOString(),
    },
    {
      id: `demo-search-3`,
      title: `${query} - 할인 상품 C`,
      price: 18900,
      originalPrice: 32000,
      discount: 41,
      image: "",
      link: "#",
      mallName: "G마켓",
      category: "검색결과",
      rating: 4.6,
      reviewCount: 890,
      source: "demo",
      crawledAt: new Date().toISOString(),
    },
  ];
}
