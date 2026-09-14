"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, PackageOpen } from "lucide-react";
import { useId, useRef } from "react";
import type { Swiper as SwiperInstance } from "swiper";
import { A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/a11y";
import ProductCard, { type Product } from "./ProductCard";

type BrandProductSliderProps = {
  brand: { name: string; logo: string };
  href: string;
  products: Product[];
};

export default function BrandProductSlider({ brand, href, products }: BrandProductSliderProps) {
  const id = useId();
  const swiper = useRef<SwiperInstance | null>(null);
  const visibleProducts = products.slice(0, 10);
  const arrowClass = "flex size-10 cursor-pointer items-center justify-center rounded-full border border-stone-200 bg-white text-stone-600 transition-colors hover:border-orange-300 hover:bg-orange-50 hover:text-orange-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-700 disabled:cursor-default disabled:opacity-40";

  return <section dir="rtl" aria-labelledby={`${id}-title`} className="min-w-0 rounded-3xl border border-stone-200 bg-white p-5 text-stone-800 sm:p-7">
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-stone-100 pb-5">
      <div className="flex items-center gap-4">
        <div className="relative flex h-16 w-32 items-center justify-center rounded-2xl border border-stone-100 bg-stone-50 p-2 sm:w-36">
          <Image src={brand.logo} alt={`لوگوی ${brand.name}`} fill sizes="144px" className="object-contain p-3" />
        </div>
        <div>
          <p className="mb-1 text-xs font-medium text-orange-700">محصولات برند</p>
          <h2 id={`${id}-title`} dir="ltr" className="text-lg font-bold sm:text-xl">{brand.name}</h2>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Link href={href} className="inline-flex items-center gap-2 rounded-xl bg-orange-700 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-orange-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-700">مشاهده همه <ArrowLeft size={16} aria-hidden="true" /></Link>
        <div dir="ltr" className="hidden gap-2 sm:flex">
          <button type="button" aria-label={`محصولات بعدی ${brand.name}`} aria-controls={`${id}-slider`} disabled={visibleProducts.length < 2} onClick={() => swiper.current?.slideNext()} className={arrowClass}><ArrowLeft size={18} aria-hidden="true" /></button>
          <button type="button" aria-label={`محصولات قبلی ${brand.name}`} aria-controls={`${id}-slider`} disabled={visibleProducts.length < 2} onClick={() => swiper.current?.slidePrev()} className={arrowClass}><ArrowRight size={18} aria-hidden="true" /></button>
        </div>
      </div>
    </div>
    {visibleProducts.length ? <Swiper id={`${id}-slider`} dir="rtl" modules={[A11y]} onSwiper={(instance) => { swiper.current = instance; }} slidesPerView={1.08} spaceBetween={16} breakpointsBase="container" breakpoints={{ 480: { slidesPerView: 1.7 }, 640: { slidesPerView: 2.25 }, 900: { slidesPerView: 3.25 }, 1180: { slidesPerView: 4 } }} rewind watchOverflow grabCursor speed={400} a11y={{ containerMessage: `محصولات ${brand.name}`, itemRoleDescriptionMessage: "محصول", slideLabelMessage: "{{index}} از {{slidesLength}}" }} className="p-1!">
      {visibleProducts.map((product) => <SwiperSlide key={product.name} className="h-auto!"><ProductCard product={product} /></SwiperSlide>)}
    </Swiper> : <div className="flex min-h-48 flex-col items-center justify-center rounded-2xl bg-stone-50 px-5 text-center text-sm text-stone-500"><PackageOpen size={32} className="mb-3 text-orange-700" aria-hidden="true" /><p>محصولی از این برند یافت نشد.</p></div>}
  </section>;
}
