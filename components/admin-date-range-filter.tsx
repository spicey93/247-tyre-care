"use client";

import { getAdminDateRangePresets } from "@/lib/admin-date-range-presets";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  appliedFrom: string;
  appliedTo: string;
};

export function AdminDateRangeFilter({ appliedFrom, appliedTo }: Props) {
  const router = useRouter();
  const [from, setFrom] = useState(appliedFrom);
  const [to, setTo] = useState(appliedTo);

  useEffect(() => {
    setFrom(appliedFrom);
    setTo(appliedTo);
  }, [appliedFrom, appliedTo]);

  const presets = getAdminDateRangePresets(new Date());

  function applyRange(nextFrom: string, nextTo: string) {
    router.push(
      `/admin?from=${encodeURIComponent(nextFrom)}&to=${encodeURIComponent(nextTo)}`,
    );
  }

  function onApply(e: React.FormEvent) {
    e.preventDefault();
    if (!from || !to) return;
    if (from > to) {
      applyRange(to, from);
      return;
    }
    applyRange(from, to);
  }

  const inputClass =
    "h-8 w-[9.5rem] shrink-0 rounded-md border border-stone-300 bg-white px-2 text-xs text-stone-900 focus:border-[#d40d1a] focus:outline-none focus:ring-1 focus:ring-[#d40d1a]/30";

  return (
    <form
      onSubmit={onApply}
      className="rounded-lg border border-stone-200 bg-white p-3 shadow-sm"
      title="Dashboard stats use the selected dates."
    >
      <p className="sr-only">Date range — stats below reflect the From and To dates.</p>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
          Range
        </span>
        <div className="flex items-center gap-1.5">
          <label
            htmlFor="admin-range-from"
            className="whitespace-nowrap text-[11px] font-medium text-stone-500"
          >
            From
          </label>
          <input
            id="admin-range-from"
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className={inputClass}
          />
        </div>
        <span className="text-[10px] text-stone-300 select-none" aria-hidden="true">
          →
        </span>
        <div className="flex items-center gap-1.5">
          <label
            htmlFor="admin-range-to"
            className="whitespace-nowrap text-[11px] font-medium text-stone-500"
          >
            To
          </label>
          <input
            id="admin-range-to"
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className={inputClass}
          />
        </div>
        <button
          type="submit"
          className="h-8 shrink-0 rounded-md bg-[#d40d1a] px-3 text-xs font-semibold text-white hover:bg-[#b30b16]"
        >
          Apply
        </button>
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-stone-100 pt-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
          Quick
        </span>
        <div className="flex flex-wrap gap-1">
          {presets.map((p) => {
            const active = p.from === appliedFrom && p.to === appliedTo;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => applyRange(p.from, p.to)}
                className={`rounded border px-2 py-0.5 text-[11px] font-medium leading-tight transition ${
                  active
                    ? "border-[#d40d1a] bg-[#d40d1a]/10 text-[#9f0a14]"
                    : "border-stone-200 bg-stone-50 text-stone-600 hover:border-stone-300 hover:bg-white hover:text-stone-900"
                }`}
                aria-pressed={active}
              >
                {p.label}
              </button>
            );
          })}
        </div>
      </div>
    </form>
  );
}
