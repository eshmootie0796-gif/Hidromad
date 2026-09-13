"use client";

import { ChevronDown, ChevronLeft, Grid2X2, Layers, Settings2, Wind, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { categoryTree } from "./catalog";

const icons = [Layers, Settings2, Wind];
const focus = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-700";

export default function ProductCategories({ onNavigate }: { onNavigate?: () => void }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const id = useId();
  const container = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const section = categoryTree[active];
  const groups = active === 0 ? section.children : [section];

  useEffect(() => {
    if (!open) return;
    const dismiss = (event: PointerEvent) => {
      if (event.target instanceof Node && !container.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [open]);

  function close() { setOpen(false); trigger.current?.focus(); }
  function navigate() { onNavigate?.(); close(); }

  return (
    <div ref={container} className="relative border-t border-stone-100 px-4 sm:px-6 lg:px-16" onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }} onKeyDown={(event) => {
      if (event.key === "Escape" && open) { event.stopPropagation(); close(); }
    }}>
      <button ref={trigger} type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)} className={`my-2 flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors hover:bg-orange-50 hover:text-orange-800 ${open ? "bg-orange-50 text-orange-800" : "text-stone-700"} ${focus}`}>
        <Grid2X2 size={19} className="text-orange-700" aria-hidden="true" />دسته بندی محصولات
        <ChevronDown size={16} aria-hidden="true" className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <nav id={id} hidden={!open} aria-label="دسته بندی محصولات" className="absolute inset-x-4 top-full z-50 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-xl shadow-stone-900/10 sm:inset-x-6 lg:inset-x-16">
        <div className="flex items-center justify-between border-b border-stone-100 px-5 py-3">
          <Link href={section.href} onClick={navigate} className="rounded-lg text-xs font-medium text-orange-700 hover:underline">مشاهده همه {section.label}</Link>
          <button type="button" aria-label="بستن دسته‌بندی محصولات" onClick={close} className={`cursor-pointer rounded-lg p-2 text-stone-500 hover:bg-orange-50 hover:text-orange-800 ${focus}`}><X size={17} aria-hidden="true" /></button>
        </div>
        <div className="flex max-h-[30dvh] flex-col overflow-y-auto md:max-h-[min(50dvh,450px)] md:flex-row">
          <div className="flex shrink-0 gap-1 border-b border-stone-100 bg-stone-50 p-2 md:w-48 md:flex-col md:border-b-0 md:border-e" role="group" aria-label="گروه‌های محصولات">
            {categoryTree.map((category, index) => {
              const Icon = icons[index];
              return <button key={category.label} type="button" aria-pressed={active === index} aria-controls={`${id}-content`} onClick={() => setActive(index)} className={`flex flex-1 cursor-pointer items-center justify-between gap-2 rounded-xl px-3 py-3 text-xs font-medium transition-colors md:flex-none md:text-sm ${active === index ? "bg-white text-orange-800 shadow-sm" : "text-stone-600 hover:bg-white hover:text-orange-800"} ${focus}`}>
                <span className="flex items-center gap-2"><Icon size={17} aria-hidden="true" className="hidden sm:block" />{category.label}</span><ChevronLeft size={14} aria-hidden="true" className="hidden md:block" />
              </button>;
            })}
          </div>
          <div id={`${id}-content`} className={`min-w-0 flex-1 p-5 sm:p-6 ${active === 0 ? "grid gap-6 sm:grid-cols-3" : ""}`}>
            {groups.map((group) => <section key={group.label} aria-label={group.label}>
              <h2 className="mb-3 flex items-center gap-2 text-sm font-bold text-stone-800"><span aria-hidden="true" className="h-4 w-0.5 rounded-full bg-orange-600" /><Link href={group.href} onClick={navigate} className="hover:text-orange-700 hover:underline">{group.label}</Link></h2>
              <ul className={`grid gap-1 ${active === 0 ? "" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
                {group.children.map((item) => <li key={item.href}><Link href={item.href} onClick={navigate} className={`block w-full cursor-pointer rounded-lg px-3 py-2 text-start text-xs leading-6 text-stone-600 transition-colors hover:bg-orange-50 hover:text-orange-800 ${focus}`}><span dir="auto">{item.label}</span></Link></li>)}
              </ul>
            </section>)}
          </div>
        </div>
      </nav>
    </div>
  );
}
