import { ContactForm } from "@/components/contact-form";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Message 247 Tyre Care for a mobile tyre fitting quote, or call our 24/7 line for emergency help.",
};

export default function ContactPage() {
  return (
    <main id="main" className="px-5 py-12">
      <div className="mx-auto max-w-lg">
        <h1 className="text-3xl font-bold tracking-tight text-stone-900">Contact us</h1>
        <p className="mt-4 text-stone-600">
          For a <strong>quote</strong> on mobile fitting, use the form below. For{" "}
          <strong>immediate roadside help</strong>, call us now — we’re available{" "}
          <strong>24 hours a day</strong>.
        </p>
        <p className="mt-4">
          <a
            href={`tel:${PHONE_TEL}`}
            className="inline-flex items-center rounded-lg bg-[#d40d1a] px-5 py-3 text-sm font-semibold text-white hover:bg-[#b30b16] hover:no-underline"
          >
            Call {PHONE_DISPLAY} — 24/7
          </a>
        </p>
        <div className="mt-10">
          <ContactForm idPrefix="contact" />
        </div>
      </div>
    </main>
  );
}
