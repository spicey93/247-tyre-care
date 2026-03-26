import { auth } from "@/auth";
import { getAdminDashboardSnapshot } from "@/lib/admin-dashboard-snapshot";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * GET /api/admin/live — unread count only (lightweight, for nav polling).
 * GET /api/admin/live?from=YYYY-MM-DD&to=YYYY-MM-DD — full dashboard snapshot.
 */
export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const fromStr = searchParams.get("from");
  const toStr = searchParams.get("to");

  if (!fromStr || !toStr) {
    const unreadLeadCount = await prisma.contactSubmission.count({
      where: { readAt: null },
    });
    return NextResponse.json({ unreadLeadCount });
  }

  const from = new Date(fromStr + "T00:00:00.000Z");
  const to = new Date(toStr + "T23:59:59.999Z");
  if (Number.isNaN(from.getTime()) || Number.isNaN(to.getTime())) {
    return NextResponse.json({ error: "Invalid date range" }, { status: 400 });
  }

  const payload = await getAdminDashboardSnapshot(from, to);
  return NextResponse.json(payload);
}
