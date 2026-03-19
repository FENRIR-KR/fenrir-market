import { NextRequest, NextResponse } from "next/server";
import { searchNaverShopping, MELCHI_KEYWORDS } from "@/lib/crawler";

// 키워드로 상품 검색 크롤링
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");
  const category = searchParams.get("category");
  const limit = parseInt(searchParams.get("limit") || "50");

  try {
    // 특정 키워드 검색
    if (query) {
      const products = await searchNaverShopping(query, limit);
      return NextResponse.json({
        success: true,
        query,
        count: products.length,
        products,
      });
    }

    // 카테고리별 자동 크롤링
    if (category && category in MELCHI_KEYWORDS) {
      const keywords = MELCHI_KEYWORDS[category as keyof typeof MELCHI_KEYWORDS];
      const allProducts = [];

      for (const keyword of keywords.slice(0, 3)) {
        const products = await searchNaverShopping(keyword, 5);
        allProducts.push(...products);
      }

      return NextResponse.json({
        success: true,
        category,
        count: allProducts.length,
        products: allProducts,
      });
    }

    // 전체 카테고리 크롤링
    const allProducts: Record<string, unknown[]> = {};
    for (const [cat, keywords] of Object.entries(MELCHI_KEYWORDS)) {
      allProducts[cat] = [];
      for (const keyword of keywords.slice(0, 2)) {
        const products = await searchNaverShopping(keyword, 3);
        allProducts[cat].push(...products);
      }
    }

    return NextResponse.json({
      success: true,
      count: Object.values(allProducts).flat().length,
      products: allProducts,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
