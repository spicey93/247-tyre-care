import Link from "next/link";
import Image from "next/image";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/constants";

const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b-[3px] border-[#d40d1a] bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2.5 sm:px-5 sm:py-3 md:gap-4">
        <Link href="/" className="shrink-0 leading-none" aria-label="247 Tyre Care — home">
          <Image
            src="/brand/logo.jpg"
            alt="247 Tyre Care"
            width={200}
            height={42}
            className="h-9 w-auto max-h-[42px] object-contain object-left sm:h-[42px]"
            priority
          />
        </Link>

        {/* Mobile: links share the top row — no empty strip */}
        <nav
          className="flex min-w-0 flex-1 flex-wrap items-center justify-end gap-x-3 gap-y-1 text-xs font-semibold text-stone-800 sm:gap-x-4 md:hidden"
          aria-label="Primary"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap text-[#d40d1a] hover:underline"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop: centred nav */}
        <nav
          className="hidden flex-1 items-center justify-center gap-6 text-sm font-semibold text-stone-800 md:flex"
          aria-label="Primary"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-[#d40d1a] hover:underline"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 md:block">
          <a
            href={`tel:${PHONE_TEL}`}
            className="inline-flex rounded-lg bg-[#d40d1a] px-3 py-2 text-sm font-semibold text-white shadow-[0_2px_16px_rgba(212,13,26,0.45)] hover:bg-[#b30b16] hover:no-underline"
          >
            Call {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </header>
  );
}
