"use client";

import { AdminNewLeadCards } from "@/components/admin-new-lead-cards";
import { AdminStatCard } from "@/components/admin-stat-card";
import type { AdminDashboardLivePayload } from "@/lib/admin-dashboard-snapshot";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

const POLL_MS = 6000;

export function AdminDashboardLive({
  initial,
  fromStr,
  toStr,
}: {
  initial: AdminDashboardLivePayload;
  fromStr: string;
  toStr: string;
}) {
  const [data, setData] = useState(initial);
  const [liveOk, setLiveOk] = useState(true);
  const fromTo = `${fromStr}|${toStr}`;
  const fromToRef = useRef(fromTo);

  useEffect(() => {
    fromToRef.current = fromTo;
    setData(initial);
  }, [fromTo, initial]);

  const fetchSnapshot = useCallback(async () => {
    try {
      const res = await fetch(
        `/api/admin/live?from=${encodeURIComponent(fromStr)}&to=${encodeURIComponent(toStr)}`,
        { credentials: "same-origin", cache: "no-store" },
      );
      if (!res.ok) return;
      const json = (await res.json()) as AdminDashboardLivePayload;
      if (fromToRef.current !== `${fromStr}|${toStr}`) return;
      setData(json);
      setLiveOk(true);
    } catch {
      setLiveOk(false);
    }
  }, [fromStr, toStr]);

  useEffect(() => {
    const id = window.setInterval(fetchSnapshot, POLL_MS);
    const onVis = () => {
      if (!document.hidden) void fetchSnapshot();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [fetchSnapshot]);

  return (
    <div className="space-y-6">
      <p className="flex flex-wrap items-center gap-2 text-xs text-stone-500">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 font-medium ${
            liveOk
              ? "border-green-200 bg-green-50 text-green-800"
              : "border-amber-200 bg-amber-50 text-amber-900"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 shrink-0 rounded-full ${liveOk ? "animate-pulse bg-green-600" : "bg-amber-500"}`}
            aria-hidden
          />
          {liveOk ? "Live" : "Reconnecting…"}
        </span>
        <span className="text-stone-400">Updates about every {POLL_MS / 1000}s while this tab is open.</span>
      </p>

      <div className="grid gap-3 lg:grid-cols-3">
        <AdminStatCard
          label="Unique visitors"
          value={data.stats.uniqueVisitors}
          breakdownTitle="By first-touch source (session)"
          breakdown={data.stats.visitorSources}
        />
        <AdminStatCard
          label="Phone link clicks"
          value={data.stats.telClicks}
          breakdownTitle="By source at click"
          breakdown={data.stats.telClickSources}
        />
        <AdminStatCard
          label="Contact submissions"
          value={data.stats.contactSubmissions}
          breakdownTitle="By source on form"
          breakdown={data.stats.submissionSources}
        />
      </div>

      <section className="mt-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="flex flex-wrap items-center gap-2 text-lg font-semibold text-stone-900">
              New leads
              {data.unreadLeadCount > 0 ? (
                <span
                  className="inline-flex items-center rounded-full bg-[#d40d1a] px-2.5 py-0.5 text-xs font-bold text-white"
                  title={`${data.unreadLeadCount} unread lead${data.unreadLeadCount === 1 ? "" : "s"}`}
                >
                  {data.unreadLeadCount} unread
                </span>
              ) : null}
            </h2>
            <p className="mt-1 text-sm text-stone-600">
              Unread submissions only (up to 24 here).{" "}
              <Link href="/admin/leads" className="font-medium text-[#d40d1a] hover:underline">
                View all with filters
              </Link>
              .
            </p>
          </div>
        </div>
        <div className="mt-4">
          <AdminNewLeadCards leads={data.newLeadCards} />
        </div>
        {data.unreadLeadCount > data.newLeadCards.length ? (
          <p className="mt-3 text-center text-sm text-stone-500">
            <Link
              href="/admin/leads?status=unread"
              className="font-semibold text-[#d40d1a] hover:underline"
            >
              Show all {data.unreadLeadCount} unread leads →
            </Link>
          </p>
        ) : null}
      </section>
    </div>
  );
}
