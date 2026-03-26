import { leadSourceLabel } from "@/lib/lead-source-label";
import { prisma } from "@/lib/prisma";
import { AnalyticsEventType } from "@prisma/client";

type AttributionRow = {
  utmSource: string | null;
  utmMedium: string | null;
  referrer: string | null;
};

function statsSourceLabel(row: AttributionRow): string {
  const l = leadSourceLabel(row);
  return l === "—" ? "Direct / unknown" : l;
}

function sortBreakdown(map: Map<string, number>): { label: string; count: number }[] {
  return [...map.entries()]
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count);
}

export async function getAdminStats(from: Date, to: Date) {
  const [pageViews, telEvents, submissionRows] = await Promise.all([
    prisma.analyticsEvent.findMany({
      where: {
        type: AnalyticsEventType.page_view,
        createdAt: { gte: from, lte: to },
      },
      select: {
        sessionId: true,
        utmSource: true,
        utmMedium: true,
        referrer: true,
        createdAt: true,
      },
      orderBy: { createdAt: "asc" },
    }),
    prisma.analyticsEvent.findMany({
      where: {
        type: AnalyticsEventType.tel_click,
        createdAt: { gte: from, lte: to },
      },
      select: {
        utmSource: true,
        utmMedium: true,
        referrer: true,
      },
    }),
    prisma.contactSubmission.findMany({
      where: { createdAt: { gte: from, lte: to } },
      select: {
        utmSource: true,
        utmMedium: true,
        referrer: true,
      },
    }),
  ]);

  /** First page_view in range per session → attribution for that visitor */
  const sessionSource = new Map<string, string>();
  for (const ev of pageViews) {
    if (!sessionSource.has(ev.sessionId)) {
      sessionSource.set(ev.sessionId, statsSourceLabel(ev));
    }
  }
  const visitorBySource = new Map<string, number>();
  for (const label of sessionSource.values()) {
    visitorBySource.set(label, (visitorBySource.get(label) ?? 0) + 1);
  }

  const telBySource = new Map<string, number>();
  for (const ev of telEvents) {
    const label = statsSourceLabel(ev);
    telBySource.set(label, (telBySource.get(label) ?? 0) + 1);
  }

  const submissionBySource = new Map<string, number>();
  for (const row of submissionRows) {
    const label = statsSourceLabel(row);
    submissionBySource.set(label, (submissionBySource.get(label) ?? 0) + 1);
  }

  return {
    uniqueVisitors: sessionSource.size,
    visitorSources: sortBreakdown(visitorBySource),
    telClicks: telEvents.length,
    telClickSources: sortBreakdown(telBySource),
    contactSubmissions: submissionRows.length,
    submissionSources: sortBreakdown(submissionBySource),
  };
}
