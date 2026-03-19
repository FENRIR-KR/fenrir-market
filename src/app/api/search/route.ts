import { NextRequest, NextResponse } from "next/server";
import { searchNaverShopping } from "@/lib/crawler";
import { products } from "@/data/products";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");
  const sort = searchParams.get("sort") || "price-low"; // price-low, price-high, discount, review

  if (!query || !query.trim()) {
    return NextResponse.json({ success: false, error: "검색어를 입력해주세요" });
  }

  try {
    // 1. 외부 쇼핑몰에서 최저가 검색 (네이버 API or 데모)
    const crawledProducts = await searchNaverShopping(query.trim(), 20);

    // 2. 내부 상품에서도 검색
    const q = query.trim().toLowerCase();
    const internalResults = products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      )
      .map((p) => ({
        id: `internal-${p.id}`,
        title: p.name,
        price: p.price,
        originalPrice: p.originalPrice,
        discount: p.discount,
        image: "",
        link: `/product/${p.id}`,
        mallName: "FENRIR",
        category: p.subcategory,
        rating: p.rating,
        reviewCount: p.reviewCount,
        source: "internal" as const,
        crawledAt: new Date().toISOString(),
      }));

    // 3. 합치기
    const allResults = [...internalResults, ...crawledProducts];

    // 4. 정렬
    const sorted = allResults.sort((a, b) => {
      switch (sort) {
        case "price-high":
          return b.price - a.price;
        case "discount":
          return b.discount - a.discount;
        case "review":
          return b.reviewCount - a.reviewCount;
        default: // price-low
          return a.price - b.price;
      }
    });

    // 5. 최저가 정보
    const lowestPrice = sorted.length > 0 ? sorted.reduce((min, p) => p.price < min.price ? p : min, sorted[0]) : null;

    return NextResponse.json({
      success: true,
      query: query.trim(),
      count: sorted.length,
      lowestPrice: lowestPrice
        ? { price: lowestPrice.price, mallName: lowestPrice.mallName, title: lowestPrice.title }
        : null,
      products: sorted,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
