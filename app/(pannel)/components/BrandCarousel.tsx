"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useId, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper";
import "swiper/css";
import "swiper/css/a11y";
import { getBrandRoute } from "./catalog";

export type Brand = {
  id: string;
  name: string;
  logo: string;
  categories: string[];
};

type BrandCarouselProps = {
  brands: readonly Brand[];
  title?: string;
  description?: string;
};

export default function BrandCarousel({ brands, title = "برندهای ویژه", description = "نام‌های آشنا در دنیای هیدرولیک، پنوماتیک و ابزار دقیق" }: BrandCarouselProps) {
  const id = useId();
  const swiper = useRef<SwiperInstance | null>(null);
  const arrowClass = "flex size-10 cursor-pointer items-center justify-center rounded-full border border-stone-200 bg-white text-stone-600 transition-colors hover:border-orange-300 hover:bg-orange-50 hover:text-orange-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-700 disabled:cursor-default disabled:opacity-40";

  if (!brands.length) return null;

  return (
    <section dir="rtl" aria-labelledby={`${id}-title`} className="min-w-0 rounded-2xl border border-stone-200 bg-white p-5 text-stone-800 sm:p-7">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="h-5 w-1 rounded-full bg-orange-600" />
            <h2 id={`${id}-title`} className="text-lg font-bold sm:text-xl">{title}</h2>
            <span className="rounded-full bg-stone-100 px-2.5 py-1 text-xs text-stone-500">{brands.length.toLocaleString("fa-IR")}</span>
          </div>
          {description && <p className="mt-2 text-xs leading-6 text-stone-500">{description}</p>}
        </div>
        <div dir="ltr" className="flex shrink-0 gap-2">
          <button type="button" aria-label="برندهای بعدی" aria-controls={`${id}-slider`} disabled={brands.length < 2} onClick={() => swiper.current?.slideNext()} className={arrowClass}><ArrowLeft size={18} aria-hidden="true" /></button>
          <button type="button" aria-label="برندهای قبلی" aria-controls={`${id}-slider`} disabled={brands.length < 2} onClick={() => swiper.current?.slidePrev()} className={arrowClass}><ArrowRight size={18} aria-hidden="true" /></button>
        </div>
      </div>
      <Swiper id={`${id}-slider`} dir="rtl" modules={[A11y]} onSwiper={(instance) => { swiper.current = instance; }} slidesPerView={1.6} spaceBetween={12} breakpointsBase="container" breakpoints={{ 360: { slidesPerView: 2.2 }, 560: { slidesPerView: 3 }, 760: { slidesPerView: 4 }, 960: { slidesPerView: 5 }, 1160: { slidesPerView: 6 } }} rewind watchOverflow grabCursor speed={400} a11y={{ containerMessage: title, itemRoleDescriptionMessage: "برند", slideLabelMessage: "{{index}} از {{slidesLength}}" }} className="p-1!">
        {brands.map((brand) => {
          const content = <><div className="relative h-24 w-full"><Image src={brand.logo} alt={`لوگوی ${brand.name}`} fill sizes="180px" className="object-contain p-3" /></div><span dir="ltr" className="mt-3 block text-center text-xs font-medium text-stone-600 group-hover:text-orange-800">{brand.name}</span></>;
          const cardClass = "group block w-full rounded-xl border border-stone-100 bg-white px-3 py-4 transition-colors hover:border-orange-300 hover:bg-orange-50/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-700";
          const href = getBrandRoute(brand.id);
          return <SwiperSlide key={brand.id}>
            {href ? <Link href={href} aria-label={`مشاهده محصولات ${brand.name}`} className={cardClass}>{content}</Link> : <div className={cardClass}>{content}</div>}
          </SwiperSlide>;
        })}
      </Swiper>
    </section>
  );
}
