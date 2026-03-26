"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const SID_KEY = "tyre_sid";
const ATTR_KEY = "tyre_attr";

function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let id = sessionStorage.getItem(SID_KEY);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(SID_KEY, id);
  }
  return id;
}

function captureAttribution(): {
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  landingPath: string;
  referrer: string | null;
} {
  if (typeof window === "undefined") {
    return {
      utmSource: null,
      utmMedium: null,
      utmCampaign: null,
      landingPath: "",
      referrer: null,
    };
  }
  const existing = sessionStorage.getItem(ATTR_KEY);
  if (existing) {
    try {
      return JSON.parse(existing) as ReturnType<typeof captureAttribution>;
    } catch {
      /* fall through */
    }
  }
  const p = new URLSearchParams(window.location.search);
  const attr = {
    utmSource: p.get("utm_source"),
    utmMedium: p.get("utm_medium"),
    utmCampaign: p.get("utm_campaign"),
    landingPath: window.location.pathname + window.location.search,
    referrer: document.referrer || null,
  };
  sessionStorage.setItem(ATTR_KEY, JSON.stringify(attr));
  return attr;
}

export function AnalyticsTracker() {
  const pathname = usePathname();
  const lastSentPath = useRef<string | null>(null);

  useEffect(() => {
    const sessionId = getSessionId();
    const attr = captureAttribution();
    if (lastSentPath.current === pathname) return;
    lastSentPath.current = pathname;

    fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "page_view",
        sessionId,
        path: pathname || "/",
        referrer: attr.referrer,
        utmSource: attr.utmSource,
        utmMedium: attr.utmMedium,
        utmCampaign: attr.utmCampaign,
        userAgent: typeof navigator !== "undefined"
          ? navigator.userAgent.slice(0, 500)
          : null,
      }),
    }).catch(() => {});
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const a = t.closest('a[href^="tel:"]');
      if (!a) return;
      const sessionId = getSessionId();
      let attr: ReturnType<typeof captureAttribution>;
      try {
        const raw = sessionStorage.getItem(ATTR_KEY);
        attr = raw
          ? JSON.parse(raw)
          : captureAttribution();
      } catch {
        attr = captureAttribution();
      }
      fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "tel_click",
          sessionId,
          path: window.location.pathname || "/",
          referrer: attr.referrer,
          utmSource: attr.utmSource,
          utmMedium: attr.utmMedium,
          utmCampaign: attr.utmCampaign,
          userAgent: navigator.userAgent.slice(0, 500),
        }),
      }).catch(() => {});
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
