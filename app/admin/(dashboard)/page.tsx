import { AdminDashboardLive } from "@/components/admin-dashboard-live";
import { AdminDateRangeFilter } from "@/components/admin-date-range-filter";
import { getAdminDashboardSnapshot } from "@/lib/admin-dashboard-snapshot";
import Link from "next/link";

function formatInputDate(d: Date) {
  return d.toISOString().slice(0, 10);
}

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string; to?: string }>;
}) {
  const sp = await searchParams;
  const to = sp.to ? new Date(sp.to + "T23:59:59.999Z") : new Date();
  const from = sp.from
    ? new Date(sp.from + "T00:00:00.000Z")
    : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  const initial = await getAdminDashboardSnapshot(from, to);

  const fromStr = formatInputDate(from);
  const toStr = formatInputDate(to);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-stone-900">Dashboard</h1>
        <p className="mt-1 text-stone-600">
          Stats for the selected date range and unread leads.{" "}
          <Link href="/admin/leads" className="font-medium text-[#d40d1a] hover:underline">
            All leads
          </Link>{" "}
          are on a separate page with filters.
        </p>
      </div>

      <AdminDateRangeFilter appliedFrom={fromStr} appliedTo={toStr} />

      <AdminDashboardLive initial={initial} fromStr={fromStr} toStr={toStr} />
    </div>
  );
}
