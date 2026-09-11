"use client";

import { products } from "@/public/data/products.json";
import ProductCard from "./ProductCard";
import { useProductLists } from "./product-store";

export default function ProductGrid({ mode }: { mode: "favorites" | "recent" }) {
  const { favorites, recent } = useProductLists();
  const visible = mode === "favorites" ? products.filter((product) => favorites.includes(product.name)) : recent.flatMap((name) => products.filter((product) => product.name === name));
  const titles = { favorites: "علاقه مندی", recent: "محصولات مشاهده شده" };
  return (
    <main className="flex-1 bg-stone-50 px-4 py-8 text-stone-800 sm:px-6 lg:px-16">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-xl font-bold">{titles[mode]}</h1>
        <span className="text-sm text-stone-500">{visible.length.toLocaleString("fa-IR")} محصول</span>
      </div>
      {visible.length ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{visible.map((product) => <ProductCard key={product.name} product={product} />)}</div> : (
        <div className="rounded-2xl border border-stone-200 bg-white px-6 py-16 text-center">
          <p className="text-stone-600">{mode === "favorites" ? "هنوز محصولی به علاقه‌مندی‌ها اضافه نکرده‌اید." : "هنوز محصولی را مشاهده نکرده‌اید."}</p>
        </div>
      )}
    </main>
  );
}
