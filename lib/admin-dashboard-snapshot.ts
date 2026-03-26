import type { AdminNewLeadCard } from "@/components/admin-new-lead-cards";
import { getAdminStats } from "@/lib/admin-stats";
import { leadSourceLabel } from "@/lib/lead-source-label";
import { prisma } from "@/lib/prisma";

export type AdminDashboardLivePayload = {
  unreadLeadCount: number;
  stats: Awaited<ReturnType<typeof getAdminStats>>;
  newLeadCards: AdminNewLeadCard[];
};

export async function getAdminDashboardSnapshot(
  from: Date,
  to: Date,
): Promise<AdminDashboardLivePayload> {
  const [stats, newLeads, unreadLeadCount] = await Promise.all([
    getAdminStats(from, to),
    prisma.contactSubmission.findMany({
      where: { readAt: null },
      orderBy: { createdAt: "desc" },
      take: 24,
    }),
    prisma.contactSubmission.count({ where: { readAt: null } }),
  ]);

  const newLeadCards: AdminNewLeadCard[] = newLeads.map((l) => ({
    id: l.id,
    name: l.name,
    phone: l.phone,
    email: l.email,
    postcode: l.postcode,
    registration: l.registration,
    messagePreview: l.message,
    createdAtLabel: l.createdAt.toLocaleString("en-GB", {
      dateStyle: "short",
      timeStyle: "short",
    }),
    sourceLabel: leadSourceLabel(l),
  }));

  return { stats, newLeadCards, unreadLeadCount };
}
