import { ContactForm } from "@/components/contact-form";
import { ReviewsCarousel } from "@/components/reviews-carousel";
import { googleReviews, googleReviewsPublicStats } from "@/data/reviews";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/constants";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Flat tyre? Emergency mobile tyre fitting and 24-hour tyre service across Rugby, Coventry, Daventry and Warwickshire.",
};

export default function HomePage() {
  return (
    <main id="main">
      <section
        className="overflow-hidden bg-gradient-to-br from-black via-[#0c0c0c] to-[#160808] px-5 py-10 text-stone-100 md:py-14"
        aria-labelledby="hero-heading"
      >
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[1fr_minmax(260px,42%)]">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.06em] text-[#ff4d5c]">
              24/7 · Flat tyre? We’re on it
            </p>
            <h1
              id="hero-heading"
              className="text-balance text-2xl font-bold leading-tight tracking-tight md:text-4xl"
            >
              <span className="text-white">Flat tyre?</span>{" "}
              <span className="text-white">We’re ready to help</span> —{" "}
              <span className="text-white">emergency mobile tyre fitting</span>,{" "}
              <span className="text-white">24-hour tyre service</span> &amp;{" "}
              <span className="text-white">flat tyre repair</span> wherever you’re stuck.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-[#c5cdd6]">
              Whether you’re on a <strong className="text-red-200">hard shoulder</strong>, in a{" "}
              <strong className="text-red-200">car park</strong>, or on your{" "}
              <strong className="text-red-200">drive</strong> —{" "}
              <strong className="text-red-200">one call</strong> and we’re rolling. We answer{" "}
              <strong className="text-red-200">day and night</strong>, help you stay safe on the
              phone, and bring everything needed to{" "}
              <strong className="text-red-200">repair or replace on the spot</strong>. 
            </p>
            <div className="mt-8 flex max-w-2xl flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={`tel:${PHONE_TEL}`}
                className="inline-flex min-h-12 min-w-[200px] flex-1 items-center justify-center rounded-lg bg-[#d40d1a] px-5 py-3 text-center text-sm font-semibold text-white shadow-[0_2px_16px_rgba(212,13,26,0.45)] hover:bg-[#b30b16] hover:no-underline"
              >
                Call now — {PHONE_DISPLAY}
              </a>
              <a
                href="#quote"
                className="inline-flex min-h-12 min-w-[200px] flex-1 items-center justify-center rounded-lg border-2 border-[#ff4d5ca6] bg-transparent px-5 py-3 text-center text-sm font-semibold text-white hover:bg-red-500/10 hover:no-underline"
              >
                Message for a quote
              </a>
            </div>
            <p className="mt-6 max-w-lg text-sm text-[#9ca8b4]">
              <strong className="text-[#fca5a5]">Stuck at the roadside?</strong> Call us first —
              we’ll guide you while help is on the way.
            </p>
          </div>
          <figure className="overflow-hidden rounded-xl shadow-[0_16px_48px_rgba(0,0,0,0.45)] ring-1 ring-[#ff4d5c]/20">
            <Image
              src="/brand/flat-tyre-warwickshire.jpg"
              alt="Emergency flat tyre repair and mobile tyre fitting at the roadside"
              width={800}
              height={600}
              className="aspect-[4/3] w-full object-cover"
              priority
            />
          </figure>
        </div>
      </section>

      <section
        className="border-b border-stone-200 bg-gradient-to-b from-stone-100 to-stone-50 px-5 py-10 md:py-12"
        aria-labelledby="reviews-heading"
      >
        <div className="mx-auto max-w-6xl">
          <header className="mb-8 text-center">
            <h2
              id="reviews-heading"
              className="text-xl font-bold tracking-tight text-stone-900 md:text-2xl"
            >
              What customers say
            </h2>
            <div
              className="mt-5 flex flex-col items-center gap-2 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-4 sm:gap-y-2"
              role="group"
              aria-label="Google review summary"
            >
              <div className="flex items-baseline gap-2">
                <span
                  className="flex gap-0.5 text-xl leading-none text-amber-500"
                  aria-hidden="true"
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </span>
                <span className="text-2xl font-bold tabular-nums text-stone-900 md:text-3xl">
                  {googleReviewsPublicStats.rating.toFixed(1)}
                </span>
                <span className="text-sm font-medium text-stone-500">out of 5</span>
              </div>
              <span
                className="hidden h-4 w-px bg-stone-300 sm:block"
                aria-hidden="true"
              />
              <p className="text-sm text-stone-600 sm:text-base">
                Average rating from{" "}
                <span className="font-semibold text-stone-800">
                  {googleReviewsPublicStats.countOnGoogle} Google reviews
                </span>
              </p>
            </div>
          </header>
          <ReviewsCarousel reviews={googleReviews} />
        </div>
      </section>

      <section className="px-5 py-12" aria-labelledby="problem-heading">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          <div>
            <h2
              id="problem-heading"
              className="text-2xl font-bold tracking-tight text-stone-900 md:text-3xl"
            >
              Stranded with a flat? Don’t wait — get help now!
            </h2>
            <p className="mt-4 max-w-xl text-stone-600">
              A flat tyre tends to happen at the worst possible time — and when you’re at the
              roadside with cars flying past, you need help <strong>fast</strong>. We run a{" "}
              <strong>fast-response emergency tyre fitting and replacement</strong> service for
              drivers across <strong>Warwickshire</strong>.
            </p>
            <p className="mt-4 max-w-xl text-stone-600">
              Whether it’s on the motorway (<strong>M1</strong>, <strong>M6</strong>), at{" "}
              <strong>work</strong> or at <strong>home</strong>, we’ll come to you, get it sorted,
              and help you get on with your day. <strong>24/7</strong> — call{" "}
              <a
                href={`tel:${PHONE_TEL}`}
                className="font-semibold text-[#d40d1a] underline decoration-[#d40d1a]/40 underline-offset-2 hover:decoration-[#d40d1a]"
              >
                {PHONE_DISPLAY}
              </a>
              .
            </p>
          </div>
          <figure className="overflow-hidden rounded-xl border border-stone-200 shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
            <Image
              src="/brand/flat-tyre-roadside.jpg"
              alt="Flat tyre at the roadside — we come to you"
              width={800}
              height={600}
              className="aspect-[4/3] w-full object-cover"
            />
          </figure>
        </div>
      </section>

      <section
        className="border-y border-stone-200 bg-white px-5 py-12 shadow-[0_4px_24px_rgba(0,0,0,0.08)]"
        aria-labelledby="services-heading"
      >
        <div className="mx-auto max-w-6xl">
          <h2
            id="services-heading"
            className="text-2xl font-bold tracking-tight text-stone-900 md:text-3xl"
          >
            Emergency call-outs, booked mobile fitting &amp; mobile tyre repairs
          </h2>
          <p className="mt-3 max-w-2xl text-stone-600">
            <strong>Call</strong> when you need us straight away — we’re <strong>24/7</strong> for
            roadside emergencies. <strong>Message</strong> to book a fitting, get a quote, or ask
            about a repair at your location. We bring the kit to <strong>you</strong> — roadside,
            work, or home — and <strong>wheel balancing</strong> is included whenever we fit or
            replace a tyre.
          </p>
          <figure className="mt-8 overflow-hidden rounded-xl border border-stone-200 shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
            <Image
              src="/brand/tyre-callout.jpg"
              alt="247 Tyre Care emergency call-out and on-site fitting"
              width={1200}
              height={480}
              className="max-h-80 w-full object-cover"
            />
          </figure>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              {
                t: "24/7 Emergency Tyre Replacement",
                d: "Fast-response tyre fitting at the side of the road — motorway, A-road, or wherever you’re stopped. Typical arrival in 15–60 minutes depending on distance from Rugby. We work safely and talk you through staying safe on the phone.",
              },
              {
                t: "Mobile Tyre Fitting",
                d: "Convenient pre-booked tyre fitting at your location — home, work, or site — timed to suit your schedule. No garage queue; we bring the tyres and fit on the spot. Message us for a quote and a time that works.",
              },
              {
                t: "Mobile Tyre Repair",
                d: "We can repair your tyre at your location when it’s safe and legal to do so — often cheaper than a full replacement, and you’re back on the road without a trip to the tyre shop.",
              },
              {
                t: "Locking Wheel Nut Removal",
                d: "Lost or broken your locking wheel nut key? We can remove security nuts so the wheel comes off — then get you back on the road.",
              },
            ].map((c) => (
              <li
                key={c.t}
                className="rounded-xl border border-stone-200 bg-stone-50 p-5 md:p-6"
              >
                <h3 className="text-lg font-semibold text-stone-900">{c.t}</h3>
                <p className="mt-2 text-sm text-stone-600">{c.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-5 py-12" aria-labelledby="steps-heading">
        <div className="mx-auto max-w-6xl">
          <h2
            id="steps-heading"
            className="text-2xl font-bold tracking-tight text-stone-900 md:text-3xl"
          >
            How our service works
          </h2>
          <ol className="mt-8 grid list-none gap-5 p-0 md:grid-cols-3">
            {[
              {
                s: "Contact Us",
                d: "Immediate help — phone us; we’re 24/7. Prefer a quote first? Fill in the form below.",
              },
              {
                s: "Tyre Size & Location",
                d: "Tell us the tyre size for your vehicle and where you are. We’ll confirm price and ETA.",
              },
              {
                s: "Pay Upon Completion",
                d: "Once our fitter has arrived and sorted the issue on-site, pay by cash or card at the end.",
              },
            ].map((step, i) => (
              <li
                key={step.s}
                className="relative rounded-xl border border-stone-200 bg-white p-6 pl-14"
              >
                <span className="absolute left-5 top-6 flex h-7 w-7 items-center justify-center rounded-full bg-[#d40d1a] text-sm font-bold text-white">
                  {i + 1}
                </span>
                <strong className="block text-stone-900">{step.s}</strong>
                <p className="mt-2 text-sm text-stone-600">{step.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        className="border-y border-stone-200 bg-white px-5 py-12"
        aria-labelledby="trust-heading"
      >
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          <div>
            <h2
              id="trust-heading"
              className="text-2xl font-bold tracking-tight text-stone-900 md:text-3xl"
            >
              Why choose us for emergency tyre fitting &amp; flat tyre repair
            </h2>
            <ul className="mt-6 grid gap-3 text-sm text-stone-700">
              {[
                "Rugby base — three major networks; fast to Coventry, Daventry & Warwickshire.",
                "24/7 — nights, weekends, bank holidays.",
                "Roadside-first — motorways, commutes, tight deadlines.",
                "Quotes for fitting — message us; we fit at your drive or workplace, skip the tyre shop.",
                "Clear prices — cars, vans, 4x4s — agreed before we start.",
              ].map((t) => (
                <li key={t} className="relative pl-6 before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-[#d40d1a]">
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <figure className="overflow-hidden rounded-xl border border-stone-200 shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
            <Image
              src="/brand/247-tyre-van.jpg"
              alt="247 Tyre Care mobile tyre fitting van"
              width={800}
              height={600}
              className="aspect-[4/3] w-full object-cover"
            />
          </figure>
        </div>
      </section>

      <section
        className="border-t border-stone-200 bg-gradient-to-b from-white to-stone-100 px-5 py-12"
        id="quote"
        aria-labelledby="quote-heading"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-lg">
            <h2
              id="quote-heading"
              className="text-2xl font-bold tracking-tight text-stone-900 md:text-3xl"
            >
              Message us for a quote — mobile fitting
            </h2>
            <div className="mt-8">
              <ContactForm idPrefix="home" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}