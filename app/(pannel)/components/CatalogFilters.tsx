"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import { sorts } from "./catalog";

export default function CatalogFilters({ sort, original, stock }: { sort: string; original: boolean; stock: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();
  function update(key: string, value: string) {
    const query = new URLSearchParams(window.location.search);
    query.delete("page");
    if (value) query.set(key, value); else query.delete(key);
    startTransition(() => router.push(`${pathname}${query.size ? `?${query}` : ""}`, { scroll: false }));
  }
  return <fieldset disabled={pending} aria-busy={pending} className="mb-6 flex flex-wrap items-center gap-5 rounded-2xl border border-stone-200 bg-white p-4 text-sm disabled:opacity-60">
    <legend className="sr-only">مرتب‌سازی و فیلتر محصولات</legend>
    <div className="flex flex-wrap items-center gap-2" role="group" aria-label="مرتب‌سازی محصولات">
      <span className="me-1">مرتب‌سازی:</span>
      {sorts.map((item) => <button key={item.value} type="button" aria-pressed={sort === item.value} onClick={() => update("sort", item.value === "default" ? "" : item.value)} className={`cursor-pointer rounded-xl border px-3 py-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-700 ${sort === item.value ? "border-orange-700 bg-orange-700 text-white" : "border-stone-200 bg-white text-stone-700 hover:border-orange-400 hover:bg-orange-50"}`}>{item.label}</button>)}
    </div>
    <div className="flex flex-wrap gap-5 sm:ms-auto">
      {[{ key: "original", label: "محصولات اصل", checked: original }, { key: "stock", label: "محصولات موجود", checked: stock }].map((item) => <button key={item.key} type="button" role="switch" aria-checked={item.checked} onClick={() => update(item.key, item.checked ? "" : "1")} className="flex cursor-pointer items-center gap-3 rounded-lg py-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-700">
        {item.label}<span aria-hidden="true" dir="ltr" className={`flex h-6 w-11 items-center rounded-full p-1 transition-colors ${item.checked ? "bg-orange-700" : "bg-stone-300"}`}><span className={`h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${item.checked ? "translate-x-5" : ""}`} /></span>
      </button>)}
    </div>
  </fieldset>;
}
