import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ChevronLeft, Layers } from "lucide-react";
import { products } from "@/public/data/products.json";
import { getCatalogPage, resolveCategory, type CatalogQuery } from "../components/catalog";
import ProductCard from "../components/ProductCard";
import CatalogFilters from "../components/CatalogFilters";

export default async function CategoryPage({ params, searchParams }: { params: Promise<{ category: string[] }>; searchParams: Promise<CatalogQuery> }) {
  const trail = resolveCategory((await params).category);
  if (!trail) notFound();
  const node = trail[trail.length - 1];
  const result = getCatalogPage(products, node.tags, await searchParams);
  const breadcrumbs = [{ label: "خانه", href: "/" }, ...trail];
  const pageHref = (page: number) => {
    const query = new URLSearchParams();
    if (result.sort !== "default") query.set("sort", result.sort);
    if (result.original) query.set("original", "1");
    if (result.stock) query.set("stock", "1");
    query.set("page", String(page));
    return `${node.href}?${query}`;
  };
  return <main className="min-h-screen bg-stone-50 px-4 py-8 text-stone-800 sm:px-6 lg:px-16">
    <div className="mx-auto max-w-7xl">
      <nav aria-label="مسیر صفحه" className="mb-7 text-xs leading-7 text-stone-500 sm:text-sm"><ol className="flex flex-wrap items-center gap-2">
        {breadcrumbs.map((crumb, index) => <li key={crumb.href} className="flex items-center gap-2">{index > 0 && <ChevronLeft size={14} aria-hidden="true" />}<Link href={crumb.href} aria-current={index === breadcrumbs.length - 1 ? "page" : undefined} className="rounded hover:text-orange-700 focus-visible:outline-orange-700"><span dir="auto">{crumb.label}</span></Link></li>)}
      </ol></nav>
      <h1 className="mb-6 text-2xl font-bold sm:text-3xl" dir="auto">{node.label}</h1>
      {node.children.length > 0 && <section aria-label={`دسته‌های ${node.label}`} className="mb-10"><ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {node.children.map((child) => <li key={child.href}><Link href={child.href} className="flex h-full flex-col items-center justify-center gap-4 rounded-2xl border border-stone-200 bg-white p-5 text-center text-sm font-medium transition-colors hover:border-orange-400 hover:bg-orange-50 focus-visible:outline-2 focus-visible:outline-orange-700">
          {child.logo ? <Image src={child.logo} alt="" width={140} height={64} className="h-16 w-32 object-contain" /> : <Layers size={28} className="text-orange-700" aria-hidden="true" />}
          <span dir="auto">{child.label}</span>
        </Link></li>)}
      </ul></section>}
      <div className="mb-4 flex items-center justify-between gap-4"><h2 className="text-lg font-semibold">محصولات</h2><p className="text-sm text-stone-500">{result.total.toLocaleString("fa-IR")} محصول</p></div>
      <CatalogFilters sort={result.sort} original={result.original} stock={result.stock} />
      {result.total ? <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{result.products.map((product) => <li key={product.name}><ProductCard product={product} /></li>)}</ul> : <div role="status" className="rounded-2xl border border-dashed border-stone-300 bg-white px-5 py-14 text-center"><p>محصولی با این مشخصات پیدا نشد.</p>{(result.original || result.stock) && <Link href={node.href} className="mt-4 inline-block text-sm text-orange-700 underline">حذف فیلترها</Link>}</div>}
      {result.total > 0 && <nav aria-label="صفحه‌بندی محصولات" className="mt-8 flex flex-wrap items-center justify-center gap-2">
        {result.page > 1 && <Link href={pageHref(result.page - 1)} className="rounded-xl border border-stone-200 bg-white px-4 py-2 hover:border-orange-500">قبلی</Link>}
        {Array.from({ length: result.pages }, (_, index) => index + 1).map((page) => <Link key={page} href={pageHref(page)} aria-label={`صفحه ${page.toLocaleString("fa-IR")}`} aria-current={page === result.page ? "page" : undefined} className={`rounded-xl border px-4 py-2 ${page === result.page ? "border-orange-700 bg-orange-700 text-white" : "border-stone-200 bg-white hover:border-orange-500"}`}>{page.toLocaleString("fa-IR")}</Link>)}
        {result.page < result.pages && <Link href={pageHref(result.page + 1)} className="rounded-xl border border-stone-200 bg-white px-4 py-2 hover:border-orange-500">بعدی</Link>}
      </nav>}
    </div>
  </main>;
}
