import Link from "next/link";

export type AdminNewLeadCard = {
  id: string;
  name: string;
  phone: string;
  email: string;
  postcode: string;
  registration: string | null;
  messagePreview: string;
  createdAtLabel: string;
  sourceLabel: string;
};

export function AdminNewLeadCards({ leads }: { leads: AdminNewLeadCard[] }) {
  if (leads.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-stone-200 bg-stone-50/80 px-6 py-10 text-center">
        <p className="text-sm text-stone-600">You’re caught up — no unread leads.</p>
        <p className="mt-2 text-sm text-stone-500">
          <Link
            href="/admin/leads"
            className="font-semibold text-[#d40d1a] underline decoration-[#d40d1a]/30 underline-offset-2 hover:decoration-[#d40d1a]"
          >
            View all leads
          </Link>
        </p>
      </div>
    );
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {leads.map((l) => (
        <li key={l.id}>
          <Link
            href={`/admin/leads/${l.id}`}
            className="block h-full rounded-xl border border-stone-200 bg-white p-4 shadow-sm transition hover:border-[#d40d1a]/35 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d40d1a] focus-visible:ring-offset-2"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="font-semibold text-stone-900">{l.name}</span>
              <span className="shrink-0 rounded-full bg-[#d40d1a] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                New
              </span>
            </div>
            <p className="mt-1 text-xs text-stone-500">{l.createdAtLabel}</p>
            <p className="mt-2 text-sm text-stone-700">
              <span className="font-medium text-stone-600">Phone:</span> {l.phone}
            </p>
            <p className="mt-0.5 truncate text-sm text-stone-700" title={l.email}>
              <span className="font-medium text-stone-600">Email:</span> {l.email}
            </p>
            <p className="mt-0.5 text-sm text-stone-700">
              <span className="font-medium text-stone-600">Postcode:</span> {l.postcode}
            </p>
            <p className="mt-0.5 text-sm text-stone-700">
              <span className="font-medium text-stone-600">Registration:</span>{" "}
              <span className="font-mono">
                {l.registration?.trim() ? l.registration.trim() : "—"}
              </span>
            </p>
            <p className="mt-2 line-clamp-3 text-sm text-stone-600 whitespace-pre-wrap">
              {l.messagePreview}
            </p>
            <p className="mt-3 text-[11px] text-stone-400">Source: {l.sourceLabel}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
