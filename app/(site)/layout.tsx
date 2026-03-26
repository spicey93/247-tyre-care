import { AnalyticsTracker } from "@/components/analytics-tracker";
import { MobileCallBar } from "@/components/mobile-call-bar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="absolute left-4 top-0 z-[100] -translate-y-full rounded-lg bg-white px-4 py-2 text-sm font-semibold text-stone-900 shadow focus:translate-y-4 focus:outline focus:outline-2 focus:outline-[#d40d1a]"
      >
        Skip to content
      </a>
      <AnalyticsTracker />
      <SiteHeader />
      <div className="pb-28 md:pb-0">
        {children}
        <SiteFooter />
      </div>
      <MobileCallBar />
    </>
  );
}
