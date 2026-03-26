import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/constants";

export function MobileCallBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-[#d40d1a]/25 bg-white/95 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] backdrop-blur-md md:hidden"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <div className="mx-auto max-w-6xl px-4 pt-3">
        <a
          href={`tel:${PHONE_TEL}`}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#d40d1a] py-3.5 text-base font-semibold text-white shadow-[0_2px_16px_rgba(212,13,26,0.45)] hover:bg-[#b30b16] hover:no-underline active:scale-[0.99]"
        >
          Call {PHONE_DISPLAY}
          <span className="text-sm font-medium text-white/90">24/7</span>
        </a>
      </div>
    </div>
  );
}
