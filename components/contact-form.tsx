"use client";

import { useState } from "react";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/constants";

const ATTR_KEY = "tyre_attr";
const SID_KEY = "tyre_sid";

function readClientMeta() {
  if (typeof window === "undefined") {
    return {
      sessionId: null as string | null,
      referrer: null as string | null,
      utmSource: null as string | null,
      utmMedium: null as string | null,
      utmCampaign: null as string | null,
      landingPath: null as string | null,
    };
  }
  let sessionId = sessionStorage.getItem(SID_KEY);
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem(SID_KEY, sessionId);
  }
  let attr: Record<string, string | null> = {};
  try {
    const raw = sessionStorage.getItem(ATTR_KEY);
    if (raw) attr = JSON.parse(raw) as Record<string, string | null>;
  } catch {
    /* ignore */
  }
  return {
    sessionId,
    referrer: attr.referrer ?? null,
    utmSource: attr.utmSource ?? null,
    utmMedium: attr.utmMedium ?? null,
    utmCampaign: attr.utmCampaign ?? null,
    landingPath: attr.landingPath ?? window.location.pathname,
  };
}

export function ContactForm({ idPrefix = "" }: { idPrefix?: string }) {
  const p = idPrefix ? `${idPrefix}-` : "";
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setMessage(null);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const meta = readClientMeta();
    const body = {
      name: String(fd.get("name") || ""),
      phone: String(fd.get("phone") || ""),
      email: String(fd.get("email") || ""),
      registration: String(fd.get("registration") || "") || null,
      postcode: String(fd.get("postcode") || ""),
      message: String(fd.get("message") || ""),
      website: String(fd.get("website") || ""),
      ...meta,
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.status === 429) {
        setStatus("error");
        setMessage("Too many attempts. Please try again later or call us.");
        return;
      }
      if (!res.ok) {
        setStatus("error");
        setMessage("Something went wrong. Please call us or try again.");
        return;
      }
      setStatus("ok");
      setMessage("Thanks — we’ll get back to you with a quote.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again or call us.");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="w-full rounded-xl border border-stone-200 bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.08)]"
    >
      <p className="mb-4 text-sm text-stone-600">
        We’ll reply with a <strong>clear quote</strong>.{" "}
        <strong>Need help right now?</strong>{" "}
        <a href={`tel:${PHONE_TEL}`} className="font-semibold text-[#d40d1a] hover:underline">
          Call {PHONE_DISPLAY}
        </a>{" "}
        — don’t use this form for emergencies.
      </p>
      {status === "ok" && message && (
        <p className="mb-4 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-900">{message}</p>
      )}
      {status === "error" && message && (
        <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-900">{message}</p>
      )}

      <div className="hidden" aria-hidden="true">
        <label htmlFor={`${p}website`}>Leave blank</label>
        <input tabIndex={-1} id={`${p}website`} name="website" type="text" autoComplete="off" />
      </div>

      <label htmlFor={`${p}name`} className="mb-1 block text-xs font-semibold text-stone-900">
        Name
      </label>
      <input
        id={`${p}name`}
        name="name"
        type="text"
        autoComplete="name"
        required
        className="mb-4 w-full rounded-lg border border-stone-200 px-3 py-2 text-stone-900 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-[#d40d1a]"
      />

      <label htmlFor={`${p}phone`} className="mb-1 block text-xs font-semibold text-stone-900">
        Phone
      </label>
      <input
        id={`${p}phone`}
        name="phone"
        type="tel"
        autoComplete="tel"
        required
        className="mb-4 w-full rounded-lg border border-stone-200 px-3 py-2 text-stone-900 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-[#d40d1a]"
      />

      <label htmlFor={`${p}email`} className="mb-1 block text-xs font-semibold text-stone-900">
        Email
      </label>
      <input
        id={`${p}email`}
        name="email"
        type="email"
        autoComplete="email"
        required
        className="mb-4 w-full rounded-lg border border-stone-200 px-3 py-2 text-stone-900 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-[#d40d1a]"
      />

      <label
        htmlFor={`${p}registration`}
        className="mb-1 block text-xs font-semibold text-stone-900"
      >
        Vehicle registration (optional)
      </label>
      <input
        id={`${p}registration`}
        name="registration"
        type="text"
        autoComplete="off"
        placeholder="e.g. AB12 CDE"
        className="mb-4 w-full rounded-lg border border-stone-200 px-3 py-2 text-stone-900 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-[#d40d1a]"
      />

      <label htmlFor={`${p}postcode`} className="mb-1 block text-xs font-semibold text-stone-900">
        Postcode
      </label>
      <input
        id={`${p}postcode`}
        name="postcode"
        type="text"
        autoComplete="postal-code"
        required
        placeholder="e.g. CV1 2TT"
        className="mb-4 w-full rounded-lg border border-stone-200 px-3 py-2 text-stone-900 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-[#d40d1a]"
      />

      <label htmlFor={`${p}message`} className="mb-1 block text-xs font-semibold text-stone-900">
        Message
      </label>
      <textarea
        id={`${p}message`}
        name="message"
        required
        rows={5}
        placeholder="What you need — tyres, puncture, how many wheels, when you’re usually available…"
        className="mb-4 w-full resize-y rounded-lg border border-stone-200 px-3 py-2 text-stone-900 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-[#d40d1a]"
      />

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-lg bg-stone-900 py-3 text-sm font-semibold text-white hover:bg-stone-800 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
