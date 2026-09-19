import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import markAsset from "../assets/aethelis-mark.png.asset.json";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Register — Aethelis Peer Workshops" },
      {
        name: "description",
        content:
          "Register for Aethelis peer-led workshops. All five tracks for Rs 999, or a single track for Rs 299.",
      },
      { property: "og:title", content: "Register — Aethelis Peer Workshops" },
      {
        property: "og:description",
        content:
          "Register for Aethelis peer-led workshops. All five tracks for Rs 999, or a single track for Rs 299.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RegisterPage,
});

const TRACKS = [
  "AI and Human",
  "Financial Literacy",
  "Technology and Science",
  "Culture and Ethics",
  "Spirituality and Subconscious",
];

function RegisterPage() {
  const [plan, setPlan] = useState<"bundle" | "single">("bundle");
  const [track, setTrack] = useState(TRACKS[0]);
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto w-full max-w-5xl px-6 py-16 md:py-24">
        <a href="/" className="flex items-center gap-3">
          <img src={markAsset.url} alt="Aethelis" className="h-9 w-9 object-contain" />
          <span className="font-mono text-[11px] uppercase tracking-[0.34em] text-white/70">
            Aethelis
          </span>
        </a>

        <p className="mt-16 font-mono text-[11px] uppercase tracking-[0.34em] text-white/40">
          02 / Register
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
          Shape the world.{" "}
          <span className="text-white/40">Level up.</span>
        </h1>
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/60 md:text-base">
          Peer-led workshops across five pillars. Pick the full journey or a single
          track, then tell us who you are.
        </p>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <PlanCard
            active={plan === "bundle"}
            onClick={() => setPlan("bundle")}
            label="All 5 tracks"
            price="₹999"
            note="Every pillar, one pass"
            items={TRACKS}
            badge="Best value"
          />
          <PlanCard
            active={plan === "single"}
            onClick={() => setPlan("single")}
            label="Single track"
            price="₹299"
            note="Pick one pillar"
            items={["Choose any one of the five pillars", "Same workshop format"]}
          />
        </div>

        <form
          className="mt-14 border border-white/10 bg-white/[0.02] p-6 md:p-10"
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.34em] text-white/40">
            Your details
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Field label="Full name" name="name" placeholder="Your name" />
            <Field label="Email" name="email" type="email" placeholder="you@email.com" />
            <Field label="Phone" name="phone" type="tel" placeholder="+91" />
            <Field label="School / College" name="school" placeholder="Where you study" />
            <Field label="Grade / Year" name="grade" placeholder="e.g. Class 11" />
            <Field label="City" name="city" placeholder="Your city" />
          </div>

          {plan === "single" && (
            <label className="mt-6 block">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
                Which track
              </span>
              <select
                value={track}
                onChange={(e) => setTrack(e.target.value)}
                className="mt-2 w-full border border-white/15 bg-black px-4 py-3 text-sm text-white outline-none focus:border-white/50"
              >
                {TRACKS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>
          )}

          <label className="mt-6 block">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
              Anything you want to level up in?
            </span>
            <textarea
              name="message"
              rows={4}
              placeholder="Optional"
              className="mt-2 w-full border border-white/15 bg-black px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none focus:border-white/50"
            />
          </label>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
            <p className="text-sm text-white/60">
              Selected:{" "}
              <span className="text-white">
                {plan === "bundle" ? "All 5 tracks — ₹999" : `${track} — ₹299`}
              </span>
            </p>
            <button
              type="submit"
              className="border border-white bg-white px-7 py-3 text-sm font-medium text-black transition-colors hover:bg-transparent hover:text-white"
            >
              Register now
            </button>
          </div>

          {submitted && (
            <p className="mt-6 text-sm text-white/70">
              Thanks — your details are captured here for now. Payments and saved
              registrations come next.
            </p>
          )}
        </form>
      </div>
    </main>
  );
}

function PlanCard({
  active,
  onClick,
  label,
  price,
  note,
  items,
  badge,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  price: string;
  note: string;
  items: string[];
  badge?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative border p-7 text-left transition-colors ${
        active ? "border-white bg-white/[0.06]" : "border-white/12 hover:border-white/40"
      }`}
    >
      {badge && (
        <span className="absolute right-5 top-5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
          {badge}
        </span>
      )}
      <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/50">
        {label}
      </p>
      <p className="mt-4 text-4xl font-semibold tracking-tight">{price}</p>
      <p className="mt-1 text-sm text-white/50">{note}</p>
      <ul className="mt-6 space-y-2">
        {items.map((i) => (
          <li key={i} className="flex gap-3 text-sm text-white/70">
            <span className="text-white/30">—</span>
            {i}
          </li>
        ))}
      </ul>
    </button>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
        {label}
      </span>
      <input
        required={name === "name" || name === "email"}
        name={name}
        type={type}
        placeholder={placeholder}
        className="mt-2 w-full border border-white/15 bg-black px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none focus:border-white/50"
      />
    </label>
  );
}
