export function leadSourceLabel(row: {
  utmSource: string | null;
  utmMedium: string | null;
  referrer: string | null;
}) {
  if (row.utmSource) {
    return `utm: ${row.utmSource}${row.utmMedium ? ` / ${row.utmMedium}` : ""}`;
  }
  if (row.referrer) {
    try {
      return new URL(row.referrer).hostname || row.referrer.slice(0, 60);
    } catch {
      return row.referrer.slice(0, 60);
    }
  }
  return "—";
}
