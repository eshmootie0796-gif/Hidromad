import { ArrowUpLeft, MapPin } from "lucide-react";

const address = "تهران، خیابان لاله زار جنوبی، بعد از کوچه علیپور، پاساژ ابهری، پلاک ۲۲۹، هیدرولیک پنوماتیک جمالی";
const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

export default function AddressSection() {
  return (
    <section aria-labelledby="address-heading" className="bg-stone-50 px-4 pb-10 text-stone-800 sm:px-6 lg:px-16">
      <div className="flex flex-col gap-6 rounded-2xl border border-stone-200 bg-white p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-orange-700">
            <MapPin size={24} strokeWidth={1.7} aria-hidden="true" />
          </div>
          <div>
            <p className="mb-1 text-xs font-medium text-orange-700">هیدرولیک و پنوماتیک جمالی</p>
            <h2 id="address-heading" className="text-lg font-bold">نشانی هیدروماد</h2>
            <address className="mt-3 max-w-2xl text-sm leading-8 text-stone-600 not-italic">{address}</address>
          </div>
        </div>
        <a href={mapUrl} target="_blank" rel="noopener noreferrer" aria-label="نمایش نشانی هیدروماد در نقشه (پنجره جدید)" className="flex shrink-0 items-center justify-center gap-3 rounded-xl border border-orange-200 bg-orange-50 px-5 py-3 text-sm font-semibold text-orange-800 transition-colors hover:border-orange-300 hover:bg-orange-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-700">
          نمایش روی نقشه
          <ArrowUpLeft size={18} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
