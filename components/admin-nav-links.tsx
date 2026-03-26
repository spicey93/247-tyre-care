"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const POLL_MS = 5000;

export function AdminNavLinks({ initialUnreadCount }: { initialUnreadCount: number }) {
  const [unread, setUnread] = useState(initialUnreadCount);

  useEffect(() => {
    setUnread(initialUnreadCount);
  }, [initialUnreadCount]);

  const poll = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/live", { credentials: "same-origin", cache: "no-store" });
      if (!res.ok) return;
      const json = (await res.json()) as { unreadLeadCount?: number };
      if (typeof json.unreadLeadCount === "number") setUnread(json.unreadLeadCount);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const id = window.setInterval(poll, POLL_MS);
    const onVis = () => {
      if (!document.hidden) void poll();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [poll]);

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
      <Link
        href="/admin"
        className="text-sm font-semibold text-stone-900 hover:text-[#d40d1a]"
      >
        Dashboard
      </Link>
      <span className="text-stone-300">|</span>
      <Link
        href="/admin/leads"
        className="inline-flex items-center gap-2 text-sm font-semibold text-stone-900 hover:text-[#d40d1a]"
      >
        Leads
        {unread > 0 ? (
          <span
            className="min-w-[1.25rem] rounded-full bg-[#d40d1a] px-1.5 py-0.5 text-center text-[10px] font-bold leading-none text-white"
            aria-label={`${unread} unread lead${unread === 1 ? "" : "s"}`}
          >
            {unread > 99 ? "99+" : unread}
          </span>
        ) : null}
      </Link>
    </div>
  );
}
