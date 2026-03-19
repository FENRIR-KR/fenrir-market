"use client";

import { useCart } from "@/contexts/CartContext";
import Link from "next/link";
import { FenrirSymbolV3 } from "@/components/Logo";
import ProductImage from "@/components/ProductImage";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col">
        <div className="bg-secondary py-20 text-center">
          <p className="text-5xl mb-4">🛒</p>
          <h2 className="text-2xl font-black text-white mb-2">장바구니가 비었습니다</h2>
          <p className="text-white/40 text-sm mb-6">마음에 드는 상품을 담아보세요!</p>
          <Link href="/" className="bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3 rounded-xl transition-colors">
            쇼핑하러 가기
          </Link>
        </div>
      </div>
    );
  }

  const deliveryFee = cartTotal >= 30000 ? 0 : 3000;
  const finalTotal = cartTotal + deliveryFee;

  return (
    <div>
      {/* 다크 헤더 */}
      <section className="bg-secondary relative overflow-hidden">
        <div className="absolute right-[5%] top-1/2 -translate-y-1/2 opacity-[0.03]">
          <FenrirSymbolV3 size={300} color="white" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 py-10 md:py-14">
          <p className="text-xs text-white/30 tracking-[0.2em] mb-2">SHOPPING CART</p>
          <h1 className="text-2xl md:text-3xl font-black text-white">
            장바구니 <span className="text-primary">{cart.length}</span>
          </h1>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 상품 목록 */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-gray-dark">총 {cart.length}개 상품</p>
              <button onClick={clearCart} className="text-xs text-gray-dark hover:text-red-500 transition-colors">전체 삭제</button>
            </div>

            <div className="space-y-3">
              {cart.map((item) => (
                <div key={item.product.id}
                  className="bg-white border border-gray-medium/50 rounded-2xl p-3 sm:p-4 flex gap-3 sm:gap-4">
                  <Link href={`/product/${item.product.id}`} className="flex-shrink-0">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden">
                      <ProductImage category={item.product.category} image={item.product.image} name={item.product.name} size="sm" />
                    </div>
                  </Link>

                  <div className="flex-1 min-w-0">
                    <Link href={`/product/${item.product.id}`}>
                      <h3 className="text-sm font-medium text-secondary hover:text-primary transition-colors line-clamp-2">
                        {item.product.name}
                      </h3>
                    </Link>

                    <div className="mt-1.5 flex items-center gap-2">
                      {item.product.discount > 0 && (
                        <span className="text-[11px] text-gray-dark line-through">{item.product.originalPrice.toLocaleString()}원</span>
                      )}
                      <span className="font-bold text-secondary text-sm">{item.product.price.toLocaleString()}원</span>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-gray-medium/50 rounded-lg">
                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2.5 py-1.5 hover:bg-gray-light transition-colors text-sm">-</button>
                        <span className="px-3 py-1.5 border-x border-gray-medium/50 text-sm min-w-[2.5rem] text-center font-semibold">
                          {item.quantity}
                        </span>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2.5 py-1.5 hover:bg-gray-light transition-colors text-sm">+</button>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-bold text-primary text-sm">
                          {(item.product.price * item.quantity).toLocaleString()}원
                        </span>
                        <button onClick={() => removeFromCart(item.product.id)}
                          className="text-gray-dark hover:text-red-500 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 주문 요약 */}
          <div className="lg:w-80">
            <div className="bg-secondary rounded-2xl p-6 lg:sticky lg:top-32 text-white">
              <h3 className="font-black text-sm tracking-wider mb-5">ORDER SUMMARY</h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/40">상품 금액</span>
                  <span>{cartTotal.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">배송비</span>
                  <span className={deliveryFee === 0 ? "text-accent font-semibold" : ""}>
                    {deliveryFee === 0 ? "무료" : `${deliveryFee.toLocaleString()}원`}
                  </span>
                </div>
                {deliveryFee > 0 && (
                  <p className="text-xs text-accent">{(30000 - cartTotal).toLocaleString()}원 더 구매하면 무료배송!</p>
                )}
                <div className="border-t border-white/10 pt-3 flex justify-between text-lg font-black">
                  <span>합계</span>
                  <span className="text-primary">{finalTotal.toLocaleString()}원</span>
                </div>
              </div>

              <button className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl transition-colors mt-6">
                주문하기
              </button>
              <Link href="/" className="block text-center text-xs text-white/30 hover:text-white mt-3 transition-colors">
                쇼핑 계속하기
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
