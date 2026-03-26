import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/constants";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "247 Tyre Care — Rugby-based emergency mobile tyre fitting, 24/7 call-out, and clear pricing across Warwickshire.",
};

export default function AboutPage() {
  return (
    <main id="main" className="px-5 py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-stone-900">About 247 Tyre Care</h1>
        <p className="mt-4 text-lg text-stone-600">
          We’re a <strong>Rugby-based</strong> mobile tyre team built around one thing: getting you
          moving again when a flat or puncture stops you — <strong>day or night</strong>, on the{" "}
          <strong>motorway</strong>, in a <strong>car park</strong>, or on your{" "}
          <strong>drive</strong>.
        </p>
        <h2 className="mt-10 text-xl font-bold text-stone-900">What we do</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-stone-700">
          <li>
            <strong>24/7 Emergency Tyre Replacement</strong> — fast-response fitting at the
            roadside; typically <strong>15–60 minutes</strong> from Rugby depending on distance,
            with clear safety advice on the phone.
          </li>
          <li>
            <strong>Mobile Tyre Fitting</strong> — pre-booked fitting at your location, timed to
            suit your schedule — home, work, or site. Message us for a quote.
          </li>
          <li>
            <strong>Mobile Tyre Repair</strong> — we repair at your location when safe and legal;
            often cheaper than replacing the tyre.
          </li>
          <li>
            <strong>Wheel Balancing</strong> — carried out whenever we fit or replace a tyre, as
            standard.
          </li>
          <li>
            <strong>Locking Wheel Nut Removal</strong> — if you’ve lost or broken the key and
            can’t get the wheel off, we can remove the nuts and carry on with the job.
          </li>
        </ul>
        <h2 className="mt-10 text-xl font-bold text-stone-900">Areas we cover</h2>
        <p className="mt-4 text-stone-700">
          From our Rugby base we’re well placed for fast response across{" "}
          <strong>Coventry</strong>, <strong>Daventry</strong>, and wider{" "}
          <strong>Warwickshire</strong> — including motorway and A-road call-outs.
        </p>
        <h2 className="mt-10 text-xl font-bold text-stone-900">Why customers choose us</h2>
        <p className="mt-4 text-stone-700">
          We’re <strong>straightforward on price</strong> (agreed before we start), work on{" "}
          <strong>cars, vans and 4x4s</strong>, and answer the phone <strong>24/7</strong> when you
          need help in a hurry.
        </p>
        <div className="mt-12 flex flex-col gap-3 rounded-xl border border-stone-200 bg-white p-6 shadow-sm sm:flex-row">
          <a
            href={`tel:${PHONE_TEL}`}
            className="inline-flex flex-1 items-center justify-center rounded-lg bg-[#d40d1a] px-4 py-3 text-center text-sm font-semibold text-white hover:bg-[#b30b16] hover:no-underline"
          >
            Call {PHONE_DISPLAY}
          </a>
          <Link
            href="/contact"
            className="inline-flex flex-1 items-center justify-center rounded-lg border-2 border-stone-900 px-4 py-3 text-center text-sm font-semibold text-stone-900 hover:bg-stone-100"
          >
            Contact us
          </Link>
        </div>
      </div>
    </main>
  );
}
