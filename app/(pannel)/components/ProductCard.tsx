"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ImageOff } from "lucide-react";
import { useState } from "react";
import { useProductLists } from "./product-store";

export type Product = {
  name: string;
  img: string;
  category: string[];
  description: string;
  stock: boolean;
};

export default function ProductCard({ product }: { product: Product }) {
  const { favorites, toggleFavorite } = useProductLists();
  const [imageFailed, setImageFailed] = useState(false);
  const favorite = favorites.includes(product.name);

  return (
    <article className="relative flex h-full flex-col rounded-2xl border border-stone-200 bg-white p-4 text-stone-800 transition-shadow hover:shadow-md">
      <button type="button" aria-pressed={favorite} aria-label={`${favorite ? "حذف از" : "افزودن به"} علاقه‌مندی‌ها: ${product.name}`} onClick={() => toggleFavorite(product.name)} className="absolute top-3 left-3 z-10 cursor-pointer rounded-full border border-stone-200 bg-white p-2.5 text-orange-700 hover:bg-orange-50 focus-visible:outline-2 focus-visible:outline-orange-700">
        <Heart size={20} fill={favorite ? "currentColor" : "none"} aria-hidden="true" />
      </button>
      <div className="relative mb-4 flex h-48 items-center justify-center rounded-xl bg-white">
        {imageFailed ? <ImageOff size={40} className="text-stone-400" aria-label="تصویر در دسترس نیست" /> : <Image src={product.img} alt={product.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" unoptimized onError={() => setImageFailed(true)} className="object-contain p-4" />}
      </div>
      <h2 className="mb-5 text-sm font-semibold leading-7">{product.name}</h2>
      <Link href={`/products/${encodeURIComponent(product.name)}`} prefetch={false} className="mt-auto w-full cursor-pointer rounded-xl bg-orange-700 px-4 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-orange-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-700">
        اطلاعات بیشتر
      </Link>
    </article>
  );
}
