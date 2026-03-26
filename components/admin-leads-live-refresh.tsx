"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const DEFAULT_MS = 8000;

/**
 * Periodically re-fetches server components for this route (same as a soft refresh).
 */
export function AdminLeadsLiveRefresh({ intervalMs = DEFAULT_MS }: { intervalMs?: number }) {
  const router = useRouter();

  useEffect(() => {
    const id = window.setInterval(() => {
      if (!document.hidden) router.refresh();
    }, intervalMs);
    const onVis = () => {
      if (!document.hidden) router.refresh();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [router, intervalMs]);

  return (
    <p className="text-xs text-stone-400">
      <span className="inline-flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-600" aria-hidden />
        List refreshes about every {intervalMs / 1000}s while this tab is open.
      </span>
    </p>
  );
}
