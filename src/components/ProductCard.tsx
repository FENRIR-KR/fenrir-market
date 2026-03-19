import Link from "next/link";
import { Product } from "@/data/products";
import ProductImage from "@/components/ProductImage";
import StarRating from "@/components/StarRating";

export default function ProductCard({ product }: { product: Product }) {
  const formattedPrice = product.price.toLocaleString();
  const formattedOriginalPrice = product.originalPrice.toLocaleString();

  return (
    <Link href={`/product/${product.id}`} className="group block">
      <div className="bg-white rounded-2xl border border-gray-medium/50 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        {/* 이미지 영역 */}
        <div className="relative aspect-square overflow-hidden">
          <div className="w-full h-full group-hover:scale-105 transition-transform duration-300">
            <ProductImage category={product.category} image={product.image} name={product.name} />
          </div>

          {/* 뱃지 */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isBest && (
              <span className="bg-primary/90 text-white text-[10px] px-2 py-0.5 rounded font-bold tracking-wider">BEST</span>
            )}
            {product.isNew && (
              <span className="bg-accent text-secondary text-[10px] px-2 py-0.5 rounded font-bold tracking-wider">NEW</span>
            )}
          </div>

          {product.discount > 0 && (
            <div className="absolute top-2 right-2 bg-primary text-white text-xs font-black px-2 py-1 rounded-md">
              -{product.discount}%
            </div>
          )}

          {/* 호버 오버레이 */}
          <div className="absolute inset-0 bg-secondary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="bg-white text-secondary text-xs font-bold px-4 py-2 rounded-full">상세보기</span>
          </div>
        </div>

        {/* 상품 정보 */}
        <div className="p-3.5">
          <h3 className="text-sm font-medium text-secondary line-clamp-2 group-hover:text-primary transition-colors min-h-[2.5rem]">
            {product.name}
          </h3>

          <div className="mt-2">
            {product.discount > 0 && (
              <p className="text-xs text-gray-dark line-through">{formattedOriginalPrice}원</p>
            )}
            <p className="text-lg font-black text-secondary">
              {product.discount > 0 && <span className="text-primary mr-1">{product.discount}%</span>}
              {formattedPrice}
              <span className="text-sm font-normal">원</span>
            </p>
          </div>

          <div className="mt-2">
            <StarRating rating={product.rating} count={product.reviewCount} />
          </div>

          <div className="flex flex-wrap gap-1 mt-2">
            {product.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="text-xs bg-secondary/5 text-gray-dark px-2 py-0.5 rounded-md">#{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
