import Link from "next/link";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/constants";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t-4 border-[#d40d1a] bg-[#080808] text-zinc-400">
      <div className="mx-auto max-w-6xl px-5 py-10 text-center">
        <p className="text-lg font-bold tracking-tight text-white">
          247 <span className="text-[#ff4d5c]">Tyre Care</span>
        </p>
        <div className="mx-auto mt-5 flex max-w-md flex-col gap-2 sm:flex-row sm:justify-center">
          <a
            href={`tel:${PHONE_TEL}`}
            className="rounded-lg bg-[#d40d1a] px-4 py-3 text-center text-sm font-semibold text-white hover:bg-[#b30b16] hover:no-underline"
          >
            Call {PHONE_DISPLAY}
          </a>
          <Link
            href="/contact"
            className="rounded-lg border-2 border-white/35 px-4 py-3 text-center text-sm font-semibold text-white hover:border-white/55 hover:bg-white/10 hover:no-underline"
          >
            Message for a quote
          </Link>
        </div>
        <p className="mt-6 text-xs leading-relaxed text-zinc-500">
          Rugby · Coventry · Daventry · Warwickshire · emergency mobile fitting &amp; flat
          tyre repair
        </p>
        <div className="mt-8 border-t border-white/10 pt-6 text-xs text-zinc-600">
          <p>
            &copy; {year} 247 Tyre Care ·{" "}
            <Link href="/contact" className="text-zinc-400 hover:text-white hover:underline">
              Contact
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
