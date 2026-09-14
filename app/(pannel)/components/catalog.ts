import menu from "@/public/data/category-menu.json";
import brands from "@/public/data/brands.json";

export const normalize = (value: string) => value.replace(/ي/g, "ی").replace(/ك/g, "ک").replace(/\u200c/g, " ").trim().toLowerCase();
const slug = (value: string) => normalize(value).replace(/\s+/g, "-");
export type CategoryNode = { label: string; slug: string; href: string; tags: string[]; logo?: string; children: CategoryNode[] };
type MenuNode = { label: string; children: MenuNode[] };

function makeNode(item: MenuNode, parents: string[], tags: string[], kind: "root" | "group" | "brand" | "type"): CategoryNode {
  const brand = kind === "brand" ? brands.find((entry) => normalize(entry.name) === normalize(item.label)) : undefined;
  const label = kind === "root" && parents.length === 0 && normalize(item.label) === "برند ها" ? "برندها" : kind === "group" ? `برندهای ${item.label}` : item.label;
  const segment = brand?.id ?? slug(label);
  const path = [...parents, segment];
  const nextTags = label === "برندها" ? [] : [...tags, item.label];
  return { label, slug: segment, href: "/" + path.map(encodeURIComponent).join("/"), tags: nextTags, logo: brand?.logo,
    children: item.children.map((child) => makeNode(child, path, nextTags, label === "برندها" ? "group" : kind === "group" ? "brand" : "type")) };
}
export const categoryTree = menu.categories.map((item) => makeNode(item, [], [], "root"));
export function getBrandRoute(brandId: string) {
  const brandsRoot = categoryTree.find((item) => item.label === "برندها");
  return brandsRoot && brands.some((brand) => brand.id === brandId) ? `${brandsRoot.href}/${encodeURIComponent(brandId)}` : undefined;
}

export function resolveCategory(segments: string[]) {
  const trail: CategoryNode[] = [];
  let options = categoryTree;
  for (const [index, segment] of segments.entries()) {
    let decoded: string;
    try { decoded = decodeURIComponent(segment); } catch { return undefined; }
    const directBrand = index === 1 && trail[0]?.label === "برندها" ? brands.find((brand) => brand.id === decoded) : undefined;
    const node = options.find((entry) => entry.slug === decoded) ?? (directBrand ? {
      label: directBrand.name,
      slug: directBrand.id,
      href: getBrandRoute(directBrand.id)!,
      tags: [directBrand.name],
      logo: directBrand.logo,
      children: [],
    } : undefined);
    if (!node) return undefined;
    trail.push(node);
    options = node.children;
  }
  return trail.length ? trail : undefined;
}

export type CatalogProduct = { category: string[]; createdAt: string; stock: boolean; isOriginal: boolean };
export type CatalogQuery = Record<string, string | string[] | undefined>;
export const sorts = [{ value: "default", label: "پیش فرض" }, { value: "newest", label: "جدیدترین" }];
export function getCatalogPage<T extends CatalogProduct>(products: T[], tags: string[], query: CatalogQuery) {
  const sort = sorts.some((item) => item.value === query.sort) ? query.sort as string : "default";
  const original = query.original === "1";
  const stock = query.stock === "1";
  const alias = (tag: string) => normalize(tag) === "شیرهای پنوماتیک" ? "شیرهای برقی پنوماتیک" : normalize(tag);
  const filtered = products.filter((product) => tags.every((tag) => product.category.some((value) => alias(value) === alias(tag))) && (!original || product.isOriginal) && (!stock || product.stock));
  if (sort === "newest") filtered.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
  const pages = Math.max(1, Math.ceil(filtered.length / 10));
  const requested = typeof query.page === "string" && /^\d+$/.test(query.page) ? Number(query.page) : 1;
  const page = Math.min(pages, Math.max(1, Number.isSafeInteger(requested) ? requested : 1));
  return { products: filtered.slice((page - 1) * 10, page * 10), total: filtered.length, pages, page, sort, original, stock };
}
