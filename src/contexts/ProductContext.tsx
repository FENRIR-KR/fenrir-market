"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product, products as staticProducts } from "@/data/products";
import type { CrawledProduct } from "@/lib/crawler";

interface ProductContextType {
  allProducts: Product[];
  registeredProducts: Product[];
  registerProduct: (crawled: CrawledProduct, category: string) => void;
  removeRegistered: (id: number) => void;
  registeredCount: number;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

// 크롤링 상품 → 내부 Product 형식으로 변환
function crawledToProduct(crawled: CrawledProduct, category: string, id: number): Product {
  const subcategoryMap: Record<string, string> = {
    food: "고칼로리 식품",
    clothing: "상의",
    fitness: "헬스용품",
    lifestyle: "건강관리",
  };

  return {
    id,
    name: crawled.title,
    price: crawled.price,
    originalPrice: crawled.originalPrice,
    discount: crawled.discount,
    image: crawled.image || "",
    category,
    subcategory: subcategoryMap[category] || "기타",
    rating: crawled.rating || 4.5,
    reviewCount: crawled.reviewCount || 0,
    description: `${crawled.mallName}에서 가져온 최저가 상품`,
    tags: [crawled.mallName, category],
    isBest: false,
    isNew: true,
  };
}

export function ProductProvider({ children }: { children: ReactNode }) {
  const [registeredProducts, setRegisteredProducts] = useState<Product[]>([]);

  // localStorage에서 복원
  useEffect(() => {
    const saved = localStorage.getItem("fenrir-registered-products");
    if (saved) setRegisteredProducts(JSON.parse(saved));
  }, []);

  // 변경 시 저장
  useEffect(() => {
    localStorage.setItem("fenrir-registered-products", JSON.stringify(registeredProducts));
  }, [registeredProducts]);

  const registerProduct = (crawled: CrawledProduct, category: string) => {
    // 중복 체크 (같은 제목이면 스킵)
    if (registeredProducts.some((p) => p.name === crawled.title)) return;

    const newId = 10000 + Date.now();
    const product = crawledToProduct(crawled, category, newId);
    setRegisteredProducts((prev) => [product, ...prev]);
  };

  const removeRegistered = (id: number) => {
    setRegisteredProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // 기존 정적 상품 + 등록된 크롤링 상품
  const allProducts = [...registeredProducts, ...staticProducts];

  return (
    <ProductContext.Provider
      value={{
        allProducts,
        registeredProducts,
        registerProduct,
        removeRegistered,
        registeredCount: registeredProducts.length,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
}
