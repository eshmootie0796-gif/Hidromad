"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, Pause, Phone, Play } from "lucide-react";
import { useEffect, useState } from "react";

const slides = [
  { brand: "Rexroth", image: "rexroth", label: "مهندسی حرکت", title: "قدرت، در مسیر کنترل.", description: "با هیدروماد، دنیای پمپ‌ها، شیرها و تجهیزات هیدرولیک Rexroth را کشف کنید.", slogan: "هیدروماد؛ همراه حرکت صنعت." },
  { brand: "HAWE", image: "hawe", label: "قدرت هیدرولیک", title: "حرکت بزرگ، انتخاب دقیق.", description: "از پمپ تا شیر کنترل؛ تجهیزات هیدرولیک HAWE را در هیدروماد بشناسید.", slogan: "هیدروماد؛ قدرت در جزئیات." },
  { brand: "ATOS", image: "atos", label: "کنترل الکتروهیدرولیک", title: "کنترل، در هر حرکت.", description: "هیدروماد، دریچه‌ای به دنیای شیرها و راهکارهای کنترل الکتروهیدرولیک ATOS.", slogan: "هیدروماد؛ انتخاب آگاهانه، حرکت مطمئن." },
  { brand: "ifm", image: "ifm", label: "سنسور و ابزار دقیق", title: "دقت، آغاز هوشمندی.", description: "شناخت بهتر فرایند سنسورها و تجهیزات اندازه‌گیری ifm، با هیدروماد.", slogan: "هیدروماد؛ جزئیات را دقیق‌تر ببینید." },
  { brand: "Sun Hydraulics", image: "sun", label: "شیرهای کارتریجی", title: "قطعات کوچک، نقش بزرگ.", description: "دنیای شیرهای کارتریجی و کنترل جریان Sun Hydraulics را با هیدروماد کشف کنید.", slogan: "هیدروماد؛ کنترل از کوچک‌ترین جزئیات." },
];

const number = (value: number) => value.toLocaleString("fa-IR", { minimumIntegerDigits: 2 });
const control = "flex size-10 cursor-pointer items-center justify-center rounded-full border border-stone-300 bg-white text-stone-700 transition-colors hover:border-orange-600 hover:bg-orange-50 hover:text-orange-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-700";

export default function HeroSection() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => setActive((index) => (index + 1) % slides.length), 6500);
    return () => window.clearTimeout(timer);
  }, [playing, active]);

  function navigate(index: number) {
    setActive((index + slides.length) % slides.length);
  }

  return (
    <section aria-label="برندهای هیدروماد" aria-roledescription="اسلایدر" className="bg-stone-50 px-4 pt-6 pb-10 text-stone-900 sm:px-6 lg:px-16">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h1 className="text-sm font-semibold sm:text-base">هیدروماد؛ نقطه اتصال صنعت و انتخاب</h1>
        <span dir="ltr" className="hidden text-[10px] font-medium tracking-[0.25em] text-stone-500 sm:block">HIDROMAD / INDUSTRIAL COLLECTION</span>
      </div>

      <div className="overflow-hidden rounded-3xl border border-orange-200 bg-white">
        <div className="relative grid" aria-live={playing ? "off" : "polite"}>
          {slides.map((slide, index) => (
            <div key={slide.image} aria-hidden={index !== active} inert={index !== active} role="group" aria-roledescription="اسلاید" aria-label={`${number(index + 1)} از ${number(slides.length)} — ${slide.brand}`} className={`relative col-start-1 row-start-1 overflow-hidden transition-opacity duration-3000 ease-in-out motion-reduce:transition-none ${index === active ? "z-10 opacity-100" : "pointer-events-none opacity-0"}`}>
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-cover bg-right" style={{ backgroundImage: `url(/Images/hidromad-${slide.image}.png)` }} />
              <div className="relative aspect-2083/755 w-full lg:absolute lg:inset-0 lg:aspect-auto">
                <Image src={`/Images/hidromad-${slide.image}.png`} alt={`تجهیزات صنعتی ${slide.brand} در هیدروماد`} fill sizes="(min-width: 1024px) calc(100vw - 128px), (min-width: 640px) calc(100vw - 48px), calc(100vw - 32px)" preload={index === 0} className="object-contain object-left" />
              </div>
              <div className="relative flex flex-col justify-center px-6 py-8 lg:ms-0 lg:me-auto lg:min-h-105 lg:w-[39%] lg:px-8 lg:py-10 xl:min-h-115 xl:px-10">
                <div className="mb-5 flex items-center gap-3 text-xs font-medium text-stone-900">
                  <span dir="ltr" className="rounded-full border border-stone-900/25 px-3 py-1.5">{number(index + 1)} / {number(slides.length)}</span>
                  <span>{slide.label}</span>
                </div>
                <p dir="ltr" className="mb-3 text-right text-3xl font-bold tracking-tight sm:text-4xl xl:text-5xl">{slide.brand}</p>
                <h2 className="text-2xl font-extrabold leading-relaxed xl:text-3xl">{slide.title}</h2>
                <p className="mt-4 max-w-md text-sm leading-8 text-stone-900">{slide.description}</p>
                <p className="mt-6 border-s-2 border-stone-900 ps-3 text-xs font-semibold leading-6">{slide.slogan}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-orange-200 bg-white p-4 sm:px-6">
          <div dir="ltr" className="flex flex-wrap gap-1" role="group" aria-label="انتخاب برند">
            {slides.map((slide, index) => <button key={slide.brand} type="button" onClick={() => navigate(index)} aria-pressed={active === index} className={`cursor-pointer rounded-lg px-3 py-2.5 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-orange-700 ${active === index ? "bg-orange-50 text-orange-800" : "text-stone-500 hover:bg-stone-50 hover:text-stone-900"}`}><span dir="ltr">{slide.brand}</span></button>)}
          </div>
          <div dir="ltr" className="flex items-center gap-2">
            <button type="button" aria-label="اسلاید قبلی" className={control} onClick={() => navigate(active - 1)}><ArrowLeft size={18} aria-hidden="true" /></button>
            <button type="button" aria-label={playing ? "توقف پخش خودکار" : "شروع پخش خودکار"} aria-pressed={playing} className={control} onClick={() => setPlaying(!playing)}>{playing ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}</button>
            <button type="button" aria-label="اسلاید بعدی" className={control} onClick={() => navigate(active + 1)}><ArrowRight size={18} aria-hidden="true" /></button>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-stone-200 bg-white px-6 py-4">
          <div className="flex items-center gap-2 text-sm font-medium text-stone-700">
            <Phone size={18} className="text-orange-700" aria-hidden="true" />
            <span>تماس با هیدروماد</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <a href="tel:02133904804" dir="ltr" className="rounded text-base font-semibold tracking-wide text-stone-800 hover:text-orange-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-700">۰۲۱–۳۳۹۰۴۸۰۴</a>
            <a href="tel:09122348792" dir="ltr" className="rounded text-base font-semibold tracking-wide text-stone-800 hover:text-orange-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-700">۰۹۱۲–۲۳۴۸۷۹۲</a>
          </div>
        </div>
      </div>
    </section>
  );
}
