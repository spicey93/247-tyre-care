"use client";

import { useRouter } from "next/navigation";

export type AdminLeadRow = {
  id: string;
  createdAtLabel: string;
  name: string;
  phone: string;
  email: string;
  postcode: string;
  registration: string | null;
  sourceLabel: string;
  messagePreview: string;
  unread: boolean;
};

export function AdminLeadsTable({
  rows,
  emptyLabel = "No submissions yet.",
}: {
  rows: AdminLeadRow[];
  emptyLabel?: string;
}) {
  const router = useRouter();

  if (rows.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan={9} className="px-4 py-8 text-center text-stone-500">
            {emptyLabel}
          </td>
        </tr>
      </tbody>
    );
  }

  function go(id: string) {
    router.push(`/admin/leads/${id}`);
  }

  return (
    <tbody className="divide-y divide-stone-100">
      {rows.map((r) => (
        <tr
          key={r.id}
          role="button"
          tabIndex={0}
          title="View lead details"
          aria-label={`View lead from ${r.name}${r.unread ? " (unread)" : ""}`}
          onClick={() => go(r.id)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              go(r.id);
            }
          }}
          className={`cursor-pointer align-top hover:bg-stone-100 focus:outline-none focus-visible:bg-stone-100 focus-visible:ring-2 focus-visible:ring-[#d40d1a] focus-visible:ring-offset-2 ${r.unread ? "bg-[#fef2f2]/80" : ""}`}
        >
          <td className="whitespace-nowrap px-4 py-3 text-stone-600">
            {r.createdAtLabel}
          </td>
          <td className="w-px whitespace-nowrap px-3 py-3">
            {r.unread ? (
              <span
                className="inline-flex items-center rounded-full bg-[#d40d1a] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white"
                title="Unread"
              >
                New
              </span>
            ) : (
              <span className="inline-block w-9" aria-hidden="true" />
            )}
          </td>
          <td className={`px-4 py-3 ${r.unread ? "font-semibold text-stone-900" : "font-medium text-stone-900"}`}>
            {r.name}
          </td>
          <td className="whitespace-nowrap px-4 py-3 text-stone-700">{r.phone}</td>
          <td className="max-w-[140px] truncate px-4 py-3 text-stone-700">{r.email}</td>
          <td className="whitespace-nowrap px-4 py-3 text-stone-700">{r.postcode}</td>
          <td className="whitespace-nowrap px-4 py-3 font-mono text-sm text-stone-700">
            {r.registration?.trim() ? r.registration.trim() : "—"}
          </td>
          <td className="max-w-[160px] px-4 py-3 text-stone-600">{r.sourceLabel}</td>
          <td className="max-w-xs px-4 py-3 text-stone-600">
            <span className="line-clamp-3 whitespace-pre-wrap">{r.messagePreview}</span>
          </td>
        </tr>
      ))}
    </tbody>
  );
}
