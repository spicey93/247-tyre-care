import { leadSourceLabel } from "@/lib/lead-source-label";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

function Detail({
  label,
  value,
  mono,
}: {
  label: string;
  value: string | null | undefined;
  mono?: boolean;
}) {
  const display = value && value.trim() !== "" ? value : "—";
  return (
    <div className="border-b border-stone-100 py-4 last:border-0 sm:grid sm:grid-cols-[minmax(140px,200px)_1fr] sm:gap-4">
      <dt className="text-xs font-semibold uppercase tracking-wide text-stone-500">{label}</dt>
      <dd
        className={`mt-1 text-stone-900 sm:mt-0 ${mono ? "break-all font-mono text-sm" : "whitespace-pre-wrap"}`}
      >
        {display}
      </dd>
    </div>
  );
}

export default async function AdminLeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lead = await prisma.contactSubmission.findUnique({ where: { id } });
  if (!lead) notFound();

  if (!lead.readAt) {
    await prisma.contactSubmission.update({
      where: { id },
      data: { readAt: new Date() },
    });
  }

  const submitted = lead.createdAt.toLocaleString("en-GB", {
    dateStyle: "full",
    timeStyle: "short",
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-stone-900">Lead</h1>
        <p className="mt-1 text-sm text-stone-600">{submitted}</p>
      </div>

      <div className="rounded-xl border border-stone-200 bg-white px-5 py-2 shadow-sm sm:px-8">
        <h2 className="sr-only">Contact details</h2>
        <dl>
          <Detail label="Name" value={lead.name} />
          <Detail label="Phone" value={lead.phone} />
          <Detail label="Email" value={lead.email} />
          <Detail label="Postcode" value={lead.postcode} />
          <Detail label="Registration" value={lead.registration} />
          <Detail label="Message" value={lead.message} />
        </dl>
      </div>

      <div className="rounded-xl border border-stone-200 bg-white px-5 py-2 shadow-sm sm:px-8">
        <h2 className="border-b border-stone-100 py-4 text-sm font-semibold text-stone-900">
          Attribution
        </h2>
        <dl>
          <Detail label="Source summary" value={leadSourceLabel(lead)} />
          <Detail label="UTM source" value={lead.utmSource} mono />
          <Detail label="UTM medium" value={lead.utmMedium} mono />
          <Detail label="UTM campaign" value={lead.utmCampaign} mono />
          <Detail label="Referrer" value={lead.referrer} mono />
          <Detail label="Landing path" value={lead.landingPath} mono />
          <Detail label="Session ID" value={lead.sessionId} mono />
        </dl>
      </div>

      <p className="text-xs text-stone-400">Lead ID: {lead.id}</p>
    </div>
  );
}
