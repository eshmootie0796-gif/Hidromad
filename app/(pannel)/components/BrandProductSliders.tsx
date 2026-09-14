import brands from "@/public/data/brands.json";
import { products } from "@/public/data/products.json";
import { getBrandRoute, normalize } from "./catalog";
import BrandProductSlider from "./BrandProductSlider";

const sliderBrands = [
  { id: "hawe" },
  { id: "sun-hydraulics" },
  { id: "rexroth" },
  { id: "ifm" },
  { id: "atos" },
];

export default function BrandProductSliders() {
  return <section aria-label="محصولات منتخب برندها" className="min-w-0 bg-stone-50 px-4 pb-10 sm:px-6 lg:px-16">
    <div className="mx-auto max-w-7xl space-y-6">
      {sliderBrands.map(({ id }) => {
        const brand = brands.find((item) => item.id === id);
        const href = getBrandRoute(id);
        if (!brand || !href) return null;
        const brandProducts = products.filter((product) => product.category.some((category) => normalize(category) === normalize(brand.name)));
        return <BrandProductSlider key={id} brand={brand} href={href} products={brandProducts} />;
      })}
    </div>
  </section>;
}
