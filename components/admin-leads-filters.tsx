import Link from "next/link";

type Status = "all" | "unread" | "read";

function buildHref(status: Status, q: string) {
  const params = new URLSearchParams();
  if (status !== "all") params.set("status", status);
  if (q.trim()) params.set("q", q.trim());
  const s = params.toString();
  return s ? `/admin/leads?${s}` : "/admin/leads";
}

export function AdminLeadsFilters({
  status,
  q,
  unreadCount,
  totalShown,
}: {
  status: Status;
  q: string;
  unreadCount: number;
  totalShown: number;
}) {
  const tabs: { id: Status; label: string }[] = [
    { id: "all", label: "All" },
    { id: "unread", label: "Unread" },
    { id: "read", label: "Read" },
  ];

  return (
    <div className="space-y-4 rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
          Status
        </span>
        <div className="flex flex-wrap gap-1.5">
          {tabs.map((t) => {
            const active = status === t.id;
            const href = buildHref(t.id, q);
            return (
              <Link
                key={t.id}
                href={href}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                  active
                    ? "border-[#d40d1a] bg-[#d40d1a]/10 text-[#9f0a14]"
                    : "border-stone-200 bg-stone-50 text-stone-700 hover:border-stone-300 hover:bg-white"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {t.label}
                {t.id === "unread" && unreadCount > 0 ? (
                  <span className="ml-1.5 tabular-nums text-[10px] font-bold text-[#d40d1a]">
                    ({unreadCount})
                  </span>
                ) : null}
              </Link>
            );
          })}
        </div>
      </div>

      <form method="get" className="flex flex-wrap items-end gap-2">
        {status !== "all" ? <input type="hidden" name="status" value={status} /> : null}
        <div className="min-w-[min(100%,16rem)] flex-1">
          <label htmlFor="leads-search" className="block text-[10px] font-bold uppercase tracking-wider text-stone-400">
            Search
          </label>
          <input
            id="leads-search"
            name="q"
            type="search"
            defaultValue={q}
            placeholder="Name, email, phone, postcode, registration, message…"
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm text-stone-900 focus:border-[#d40d1a] focus:outline-none focus:ring-2 focus:ring-[#d40d1a]/20"
          />
        </div>
        <button
          type="submit"
          className="h-[42px] shrink-0 rounded-lg bg-stone-900 px-4 text-sm font-semibold text-white hover:bg-stone-800"
        >
          Search
        </button>
        {q ? (
          <Link
            href={buildHref(status, "")}
            className="flex h-[42px] items-center rounded-lg border border-stone-300 px-3 text-sm font-medium text-stone-700 hover:bg-stone-50"
          >
            Clear
          </Link>
        ) : null}
      </form>

      <p className="text-xs text-stone-500">
        Showing <span className="font-semibold text-stone-700">{totalShown}</span> lead
        {totalShown === 1 ? "" : "s"}
        {status === "unread" ? " (unread only)" : null}
        {status === "read" ? " (opened before)" : null}
        {q ? ` matching “${q}”` : null}.
      </p>
    </div>
  );
}
