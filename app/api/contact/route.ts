import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { isContactRateLimited } from "@/lib/contact-rate-limit";

const bodySchema = z.object({
  name: z.string().min(1).max(200),
  phone: z.string().min(6).max(40),
  email: z.string().email().max(320),
  registration: z.string().max(20).optional().nullable(),
  postcode: z.string().min(2).max(16),
  message: z.string().min(1).max(8000),
  referrer: z.string().max(2000).optional().nullable(),
  utmSource: z.string().max(200).optional().nullable(),
  utmMedium: z.string().max(200).optional().nullable(),
  utmCampaign: z.string().max(200).optional().nullable(),
  landingPath: z.string().max(500).optional().nullable(),
  sessionId: z.string().max(80).optional().nullable(),
  /** Honeypot — must stay empty */
  website: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = bodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: parsed.error.flatten() },
        { status: 400 },
      );
    }
    const data = parsed.data;
    if (data.website && data.website.trim().length > 0) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const emailNorm = data.email.trim().toLowerCase();
    if (await isContactRateLimited(emailNorm)) {
      return NextResponse.json(
        { error: "Too many submissions. Try again later." },
        { status: 429 },
      );
    }

    const submission = await prisma.contactSubmission.create({
      data: {
        name: data.name.trim(),
        phone: data.phone.trim(),
        email: emailNorm,
        registration: data.registration?.trim() || null,
        postcode: data.postcode.trim(),
        message: data.message.trim(),
        referrer: data.referrer?.trim() || null,
        utmSource: data.utmSource?.trim() || null,
        utmMedium: data.utmMedium?.trim() || null,
        utmCampaign: data.utmCampaign?.trim() || null,
        landingPath: data.landingPath?.trim() || null,
        sessionId: data.sessionId?.trim() || null,
      },
    });

    return NextResponse.json({ id: submission.id }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
