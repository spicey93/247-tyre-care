import { AdminLeadsFilters } from "@/components/admin-leads-filters";
import { AdminLeadsLiveRefresh } from "@/components/admin-leads-live-refresh";
import { AdminLeadsTable } from "@/components/admin-leads-table";
import { leadSourceLabel } from "@/lib/lead-source-label";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";

const TAKE = 400;

function parseStatus(raw: string | undefined): "all" | "unread" | "read" {
  if (raw === "unread" || raw === "read") return raw;
  return "all";
}

export default async function AdminLeadsListPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string }>;
}) {
  const sp = await searchParams;
  const status = parseStatus(sp.status);
  const q = (sp.q ?? "").trim();

  const conditions: Prisma.ContactSubmissionWhereInput[] = [];
  if (status === "unread") conditions.push({ readAt: null });
  if (status === "read") conditions.push({ readAt: { not: null } });
  if (q) {
    conditions.push({
      OR: [
        { name: { contains: q, mode: "insensitive" } },
        { email: { contains: q, mode: "insensitive" } },
        { phone: { contains: q, mode: "insensitive" } },
        { postcode: { contains: q, mode: "insensitive" } },
        { registration: { contains: q, mode: "insensitive" } },
        { message: { contains: q, mode: "insensitive" } },
      ],
    });
  }
  const where: Prisma.ContactSubmissionWhereInput =
    conditions.length > 0 ? { AND: conditions } : {};

  const [leads, unreadTotal] = await Promise.all([
    prisma.contactSubmission.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: TAKE,
    }),
    prisma.contactSubmission.count({ where: { readAt: null } }),
  ]);

  const rows = leads.map((l) => ({
    id: l.id,
    createdAtLabel: l.createdAt.toLocaleString("en-GB", {
      dateStyle: "short",
      timeStyle: "short",
    }),
    name: l.name,
    phone: l.phone,
    email: l.email,
    postcode: l.postcode,
    registration: l.registration,
    sourceLabel: leadSourceLabel(l),
    messagePreview: l.message,
    unread: l.readAt == null,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-stone-900">Leads</h1>
        <p className="mt-1 text-sm text-stone-600">
          All contact form submissions. Unread leads show a <span className="font-medium text-[#d40d1a]">New</span> badge
          until you open the detail page.
        </p>
        <div className="mt-2">
          <AdminLeadsLiveRefresh />
        </div>
      </div>

      <AdminLeadsFilters
        status={status}
        q={q}
        unreadCount={unreadTotal}
        totalShown={leads.length}
      />

      <div className="overflow-x-auto rounded-xl border border-stone-200 bg-white">
        <table className="w-full min-w-[860px] text-left text-sm">
          <thead className="border-b border-stone-200 bg-stone-50 text-xs font-semibold uppercase tracking-wide text-stone-600">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="w-px whitespace-nowrap px-3 py-3">
                <span className="sr-only">Status</span>
              </th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Postcode</th>
              <th className="px-4 py-3">Reg</th>
              <th className="px-4 py-3">Source</th>
              <th className="px-4 py-3">Message</th>
            </tr>
          </thead>
          <AdminLeadsTable
            rows={rows}
            emptyLabel={
              q || status !== "all"
                ? "No leads match these filters. Try clearing search or switching status."
                : "No submissions yet."
            }
          />
        </table>
      </div>

      {leads.length >= TAKE ? (
        <p className="text-xs text-stone-500">
          Showing the {TAKE} most recent matches. Refine filters or search to narrow results.
        </p>
      ) : null}
    </div>
  );
}
