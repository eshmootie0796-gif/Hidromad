"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, History, Search } from "lucide-react";
import { useId, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { products } from "@/public/data/products.json";
import CategorySelect from "./CategorySelect";
import ProductCard from "./ProductCard";
import ProductCategories from "./ProductCategories";

type Panel = "search";
type HeaderProps = { searchAction?: string; children?: ReactNode };
const categories = [...new Set(products.flatMap((product) => product.category.slice(0, -1)))];
const normalize = (text: string) => text.replace(/ي/g, "ی").replace(/ك/g, "ک").toLowerCase().trim();
const focus = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-700";

function Icon({ name }: { name: "search" | "heart" | "history" }) {
  const LucideIcon = { search: Search, heart: Heart, history: History }[name];
  return <LucideIcon size={21} strokeWidth={1.7} aria-hidden="true" />;
}

export default function Header({ searchAction, children }: HeaderProps) {
  const panelId = useId();
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [panel, setPanel] = useState<Panel | null>(null);
  const matches = products.filter((product) =>
    (!category || product.category.some((item) => normalize(item) === normalize(category))) &&
    normalize(`${product.name} ${product.description} ${product.category.join(" ")}`).includes(normalize(query)),
  );
  const visible = matches;
  const titles = { search: "نتایج جستجو", recent: "محصولات مشاهده شده", favorites: "علاقه مندی" };

  return (
    <header dir="rtl" lang="fa" className="sticky top-0 z-40 border-t-4 border-t-orange-600 border-b border-b-stone-200 bg-white font-sans text-stone-800" onKeyDown={(event) => { if (event.key === "Escape") setPanel(null); }}>
      <div className="border-b border-orange-100 bg-orange-50/70">
      </div>
      <div className="flex w-full flex-wrap items-center gap-7 px-4 py-5 sm:px-6 lg:gap-7 lg:px-16">
        <Link href="/" aria-label="هیدروماد — صفحه اصلی" className={`shrink-0 rounded-lg ${focus}`}>
          <Image src="/Images/Logo.svg" alt="هیدروماد" width={145} height={80} className="h-14 w-auto sm:h-18" />
        </Link>
        <form action={searchAction} method="get" role="search" aria-label="جستجوی محصولات" onSubmit={(event) => { if (!searchAction) { event.preventDefault(); setPanel("search"); } }} className="order-last flex w-full flex-wrap items-center gap-1 rounded-2xl border border-stone-200 bg-stone-50 p-1.5 transition-colors focus-within:border-orange-600 lg:order-0 lg:w-auto lg:flex-1">
          <CategorySelect value={category} options={category && !categories.includes(category) ? [...categories, category] : categories} onChange={(value) => { setCategory(value); }} />
          <span aria-hidden="true" className="hidden h-6 w-px bg-stone-200 sm:block" />
          <input type="search" name="q" aria-label="نام یا کد محصول" placeholder="نام یا کد محصول..." value={query} onChange={(event) => setQuery(event.target.value)} className="min-w-0 flex-1 rounded-lg bg-transparent px-3 py-2.5 text-sm outline-none placeholder:text-stone-500 focus-visible:ring-2 focus-visible:ring-orange-700" />
          <button type="submit" aria-label="جستجو" className={`rounded-xl bg-orange-700 p-3 text-white transition-colors cursor-pointer hover:bg-orange-800 ${focus}`}><Icon name="search" /></button>
        </form>
        <div className="ms-auto flex items-center gap-1 sm:gap-3">
          {(["recent", "favorites"] as const).map((item) => (
            <Link key={item} href={item === "recent" ? "/recently-viewed" : "/favorites"} aria-current={pathname === (item === "recent" ? "/recently-viewed" : "/favorites") ? "page" : undefined} onClick={() => setPanel(null)} className={`flex flex-col items-center gap-1.5 rounded-xl px-2 py-2 text-[10px] font-medium transition-colors hover:bg-orange-50 hover:text-orange-800 sm:px-3 sm:text-xs ${pathname === (item === "recent" ? "/recently-viewed" : "/favorites") ? "bg-orange-50 text-orange-800" : "text-stone-600"} ${focus}`}>
              <Icon name={item === "recent" ? "history" : "heart"} />
              <span>{titles[item]}</span>
            </Link>
          ))}
          {children}
        </div>
      </div>
      <ProductCategories onNavigate={() => setPanel(null)} />
      <section id={panelId} hidden={!panel} aria-label={panel ? titles[panel] : undefined} className="border-t border-stone-200 bg-stone-50">
        {panel && <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold">{titles[panel]} <span className="text-orange-800">({visible.length.toLocaleString("fa-IR")})</span></h2>
            <button type="button" onClick={() => setPanel(null)} className={`rounded-lg px-3 py-1 text-xs text-stone-600 hover:bg-stone-200 ${focus}`}>بستن</button>
          </div>
          {visible.length === 0 ? <p role="status" className="py-6 text-center text-sm text-stone-500">محصولی با این مشخصات پیدا نشد.</p> : (
            <ul className="grid max-h-96 gap-3 overflow-y-auto p-1 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((product) => (
                <li key={product.name}><ProductCard product={product} /></li>
              ))}
            </ul>
          )}
        </div>}
      </section>
    </header>
  );
}
