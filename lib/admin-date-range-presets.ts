export type AdminDateRangePreset = {
  id: string;
  label: string;
  from: string;
  to: string;
};

function ymd(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function addDays(d: Date, n: number) {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

/** Monday (local) as first day of week. */
function weekStartMonday(ref: Date) {
  const d = startOfDay(ref);
  const day = d.getDay();
  const offset = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + offset);
  return d;
}

/**
 * Preset ranges using the viewer’s local calendar (same basis as `input type="date"`).
 * `now` should be the current instant; ranges are computed from its local date.
 */
export function getAdminDateRangePresets(now: Date): AdminDateRangePreset[] {
  const today = startOfDay(now);
  const yesterday = addDays(today, -1);

  const thisWeekStart = weekStartMonday(today);
  const lastWeekEnd = addDays(thisWeekStart, -1);
  const lastWeekStart = addDays(lastWeekEnd, -6);

  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const prevMonthEnd = addDays(monthStart, -1);
  const prevMonthStart = new Date(prevMonthEnd.getFullYear(), prevMonthEnd.getMonth(), 1);

  return [
    { id: "today", label: "Today", from: ymd(today), to: ymd(today) },
    { id: "yesterday", label: "Yesterday", from: ymd(yesterday), to: ymd(yesterday) },
    {
      id: "this-week",
      label: "This week",
      from: ymd(thisWeekStart),
      to: ymd(today),
    },
    {
      id: "last-week",
      label: "Last week",
      from: ymd(lastWeekStart),
      to: ymd(lastWeekEnd),
    },
    {
      id: "last-7",
      label: "Last 7 days",
      from: ymd(addDays(today, -6)),
      to: ymd(today),
    },
    {
      id: "last-30",
      label: "Last 30 days",
      from: ymd(addDays(today, -29)),
      to: ymd(today),
    },
    {
      id: "this-month",
      label: "This month",
      from: ymd(monthStart),
      to: ymd(today),
    },
    {
      id: "last-month",
      label: "Last month",
      from: ymd(prevMonthStart),
      to: ymd(prevMonthEnd),
    },
  ];
}
