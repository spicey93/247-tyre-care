import { NextResponse } from "next/server";
import { z } from "zod";
import { AnalyticsEventType } from "@prisma/client";
import { prisma } from "@/lib/prisma";

const eventSchema = z.object({
  type: z.nativeEnum(AnalyticsEventType),
  sessionId: z.string().min(8).max(80),
  path: z.string().min(1).max(500),
  referrer: z.string().max(2000).optional().nullable(),
  utmSource: z.string().max(200).optional().nullable(),
  utmMedium: z.string().max(200).optional().nullable(),
  utmCampaign: z.string().max(200).optional().nullable(),
  userAgent: z.string().max(500).optional().nullable(),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = eventSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }
    await prisma.analyticsEvent.create({ data: parsed.data });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
