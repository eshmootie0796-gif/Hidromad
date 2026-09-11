"use client";

import { Check, ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

type CategorySelectProps = {
  value: string;
  options: string[];
  onChange: (value: string) => void;
};

export default function CategorySelect({ value, options, onChange }: CategorySelectProps) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const items = useRef<(HTMLButtonElement | null)[]>([]);
  const choices = ["", ...options];
  const selectedIndex = Math.max(0, choices.indexOf(value));

  useEffect(() => {
    if (!open) return;
    items.current[selectedIndex]?.focus();
    const dismiss = (event: PointerEvent) => {
      if (event.target instanceof Node && !container.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [open, selectedIndex]);

  function close() {
    setOpen(false);
    trigger.current?.focus();
  }

  return (
    <div ref={container} className="relative w-full sm:w-36" onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
    }}>
      <input type="hidden" name="category" value={value} />
      <button
        ref={trigger}
        type="button"
        aria-label={`دسته‌بندی محصولات: ${value || "همه دسته‌ها"}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(!open)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            setOpen(true);
          }
        }}
        className="flex w-full cursor-pointer items-center justify-between gap-4 rounded-xl border border-stone-200 bg-white py-2.5 ps-3 pe-5 text-xs font-medium text-stone-700 transition-colors hover:border-orange-300 hover:bg-orange-50 hover:text-orange-800 focus-visible:bg-orange-50 focus-visible:text-orange-800 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-orange-700"
      >
        <span className="truncate">{value || "همه دسته‌ها"}</span>
        <ChevronDown size={16} strokeWidth={1.7} aria-hidden="true" className={`shrink-0 text-orange-700 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <ul id={id} role="listbox" aria-label="دسته‌بندی محصولات" hidden={!open} className="absolute start-0 top-full z-50 mt-2 max-h-72 w-full min-w-60 overflow-y-auto rounded-2xl border border-stone-200 bg-white p-1.5 shadow-lg shadow-stone-900/10">
        {choices.map((choice, index) => (
          <li key={choice} role="presentation">
            <button
              ref={(element) => { items.current[index] = element; }}
              type="button"
              role="option"
              aria-selected={value === choice}
              tabIndex={-1}
              onClick={() => { onChange(choice); close(); }}
              onKeyDown={(event) => {
                let next: number | undefined;
                if (event.key === "ArrowDown") next = (index + 1) % choices.length;
                if (event.key === "ArrowUp") next = (index - 1 + choices.length) % choices.length;
                if (event.key === "Home") next = 0;
                if (event.key === "End") next = choices.length - 1;
                if (next !== undefined) {
                  event.preventDefault();
                  items.current[next]?.focus();
                }
                if (event.key === "Escape") {
                  event.preventDefault();
                  event.stopPropagation();
                  close();
                }
              }}
              className="flex w-full cursor-pointer items-center justify-between gap-4 rounded-lg bg-white px-3 py-2.5 text-start text-xs leading-6 text-stone-700 transition-colors hover:bg-orange-50 hover:text-orange-800 focus:bg-orange-50 focus:text-orange-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 focus-visible:ring-inset"
            >
              <span>{choice || "همه دسته‌ها"}</span>
              {value === choice && <Check size={16} aria-hidden="true" className="shrink-0 text-orange-700" />}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
