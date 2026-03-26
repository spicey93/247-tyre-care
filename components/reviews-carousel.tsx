"use client";

import type { GoogleReview } from "@/data/reviews";
import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  reviews: GoogleReview[];
};

const DOT_NAV_MAX = 12;

export function ReviewsCarousel({ reviews }: Props) {
  const [index, setIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const count = reviews.length;
  const safeIndex =
    count === 0 ? 0 : ((index % count) + count) % count;
  const current = count > 0 ? reviews[safeIndex] : null;
  const useDotNav = count > 0 && count <= DOT_NAV_MAX;

  const go = useCallback(
    (delta: number) => {
      if (count === 0) return;
      setIndex((i) => (i + delta + count) % count);
    },
    [count],
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion || count <= 1) return;
    const id = window.setInterval(() => go(1), 9000);
    return () => window.clearInterval(id);
  }, [go, reducedMotion, count]);

  if (count === 0 || !current) return null;

  return (
    <div className="relative mx-auto max-w-3xl">
      <div
        className="min-h-[220px] sm:min-h-[200px]"
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={(e) => {
          const start = touchStartX.current;
          touchStartX.current = null;
          if (start == null) return;
          const end = e.changedTouches[0]?.clientX;
          if (end == null) return;
          const dx = end - start;
          if (dx > 56) go(-1);
          else if (dx < -56) go(1);
        }}
      >
        <blockquote
          key={safeIndex}
          className="rounded-2xl border border-stone-200/80 bg-white p-6 shadow-[0_8px_40px_rgba(0,0,0,0.06)] transition-opacity duration-300 sm:p-8"
        >
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-stone-400">
              Google review
            </p>
            <div
              className="flex gap-0.5 text-amber-500"
              aria-label="5 out of 5 stars"
              role="img"
            >
              {Array.from({ length: 5 }).map((_, si) => (
                <span key={si} className="text-lg leading-none" aria-hidden="true">
                  ★
                </span>
              ))}
            </div>
          </div>
          <p className="mt-4 text-base leading-relaxed text-stone-700">
            &ldquo;{current.text}&rdquo;
          </p>
          <footer className="mt-5 border-t border-stone-100 pt-4 text-sm font-semibold text-stone-900">
            {current.name}
          </footer>
        </blockquote>
      </div>

      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => go(-1)}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-stone-200 bg-white text-lg text-stone-700 shadow-sm transition hover:border-[#d40d1a]/40 hover:bg-stone-50 hover:text-[#d40d1a]"
          aria-label="Previous review"
        >
          ‹
        </button>
        {useDotNav ? (
          <div className="flex max-w-[min(100%,14rem)] flex-wrap justify-center gap-2 px-2">
            {reviews.map((_, j) => (
              <button
                key={j}
                type="button"
                onClick={() => setIndex(j)}
                className={`h-2 rounded-full transition-all ${
                  j === safeIndex
                    ? "w-8 bg-[#d40d1a]"
                    : "w-2 bg-stone-300 hover:bg-stone-400"
                }`}
                aria-label={`Show review ${j + 1} of ${count}`}
                aria-current={j === safeIndex ? "true" : undefined}
              />
            ))}
          </div>
        ) : (
          <p
            className="min-w-[5.5rem] text-center text-sm tabular-nums text-stone-600"
            aria-live="polite"
            aria-atomic="true"
          >
            {safeIndex + 1} / {count}
          </p>
        )}
        <button
          type="button"
          onClick={() => go(1)}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-stone-200 bg-white text-lg text-stone-700 shadow-sm transition hover:border-[#d40d1a]/40 hover:bg-stone-50 hover:text-[#d40d1a]"
          aria-label="Next review"
        >
          ›
        </button>
      </div>
      <p className="mt-3 text-center text-xs text-stone-400 md:hidden">
        Swipe to change review
      </p>
    </div>
  );
}
