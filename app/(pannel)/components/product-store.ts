"use client";

import { useMemo, useSyncExternalStore } from "react";

type ProductLists = { favorites: string[]; recent: string[] };
const key = "hidromad-product-lists";
const eventName = "hidromad-product-lists-change";
const empty = '{"favorites":[],"recent":[]}';
let memory = empty;

function snapshot() {
  try { return localStorage.getItem(key) ?? memory; } catch { return memory; }
}

function parse(raw: string): ProductLists {
  try {
    const value = JSON.parse(raw);
    const strings = (items: unknown) => Array.isArray(items) ? [...new Set(items.filter((item): item is string => typeof item === "string"))] : [];
    return { favorites: strings(value?.favorites), recent: strings(value?.recent) };
  } catch { return { favorites: [], recent: [] }; }
}

function subscribe(callback: () => void) {
  window.addEventListener(eventName, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(eventName, callback);
    window.removeEventListener("storage", callback);
  };
}

function save(value: ProductLists) {
  memory = JSON.stringify(value);
  try { localStorage.setItem(key, memory); } catch { /* Keep lists available in memory when storage is disabled. */ }
  window.dispatchEvent(new Event(eventName));
}

export function useProductLists() {
  const raw = useSyncExternalStore(subscribe, snapshot, () => empty);
  const lists = useMemo(() => parse(raw), [raw]);
  return {
    ...lists,
    toggleFavorite(name: string) {
      const current = parse(snapshot());
      save({ ...current, favorites: current.favorites.includes(name) ? current.favorites.filter((item) => item !== name) : [...current.favorites, name] });
    },
    markViewed(name: string) {
      const current = parse(snapshot());
      save({ ...current, recent: [name, ...current.recent.filter((item) => item !== name)].slice(0, 100) });
    },
  };
}
