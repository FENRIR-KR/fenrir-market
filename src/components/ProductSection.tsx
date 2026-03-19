"use client";

import { useProducts } from "@/contexts/ProductContext";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

export function BestProducts() {
  const { allProducts } = useProducts();
  const bestProducts = allProducts.filter((p) => p.isBest);

  return (
    <section className="max-w-7xl mx-auto px-4">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-primary text-xs font-bold tracking-[0.2em]">BEST SELLERS</p>
          <h2 className="text-2xl font-black text-secondary mt-1">가장 많이 팔린 상품</h2>
        </div>
        <Link href="/best" className="text-sm text-gray-dark hover:text-primary transition-colors">전체보기 &rarr;</Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {bestProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export function NewProducts() {
  const { allProducts } = useProducts();
  const newProducts = allProducts.filter((p) => p.isNew);

  if (newProducts.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 mt-20">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-accent text-xs font-bold tracking-[0.2em]">NEW ARRIVALS</p>
          <h2 className="text-2xl font-black text-secondary mt-1">신상품</h2>
        </div>
        <Link href="/new" className="text-sm text-gray-dark hover:text-primary transition-colors">전체보기 &rarr;</Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {newProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export function AllProducts() {
  const { allProducts } = useProducts();

  return (
    <section className="max-w-7xl mx-auto px-4 mt-16 mb-8">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-gray-dark text-xs font-bold tracking-[0.2em]">ALL PRODUCTS</p>
          <h2 className="text-2xl font-black text-secondary mt-1">전체 상품 ({allProducts.length})</h2>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {allProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
