import brands from "@/public/data/brands.json";
import BrandCarousel from "./BrandCarousel";

export default function FeaturedBrands() {
  return <div className="min-w-0 bg-stone-50 px-4 pb-10 sm:px-6 lg:px-16"><BrandCarousel brands={brands} /></div>;
}
