const BREAKDOWN_CAP = 8;

export function AdminStatCard({
  label,
  value,
  breakdownTitle,
  breakdown,
}: {
  label: string;
  value: number;
  breakdownTitle: string;
  breakdown: { label: string; count: number }[];
}) {
  const shown = breakdown.slice(0, BREAKDOWN_CAP);
  const rest = breakdown.slice(BREAKDOWN_CAP);
  const restCount = rest.reduce((s, r) => s + r.count, 0);

  return (
    <div className="flex flex-col rounded-lg border border-stone-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-medium text-stone-600">{label}</p>
      <p className="mt-1 text-2xl font-bold tabular-nums text-stone-900">{value}</p>

      <div className="mt-3 flex min-h-0 flex-1 flex-col border-t border-stone-100 pt-3">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-stone-500">
          {breakdownTitle}
        </p>
        {breakdown.length === 0 ? (
          <p className="mt-1.5 text-[11px] text-stone-400">No attribution in this range.</p>
        ) : (
          <ul className="mt-1.5 max-h-40 space-y-1 overflow-y-auto pr-1">
            {shown.map((row) => (
              <li
                key={row.label}
                className="flex items-baseline justify-between gap-2 text-[11px]"
              >
                <span className="min-w-0 truncate text-stone-600" title={row.label}>
                  {row.label}
                </span>
                <span className="shrink-0 font-semibold tabular-nums text-stone-900">
                  {row.count}
                  {value > 0 ? (
                    <span className="ml-1 font-normal text-stone-400">
                      ({Math.round((row.count / value) * 100)}%)
                    </span>
                  ) : null}
                </span>
              </li>
            ))}
            {rest.length > 0 ? (
              <li className="flex justify-between gap-2 border-t border-stone-100 pt-1 text-[11px] text-stone-500">
                <span>Other ({rest.length} sources)</span>
                <span className="font-semibold tabular-nums text-stone-700">
                  {restCount}
                </span>
              </li>
            ) : null}
          </ul>
        )}
      </div>
    </div>
  );
}
