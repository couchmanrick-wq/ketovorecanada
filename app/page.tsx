"use client";

import { useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const tabs = [
  {
    id: "news",
    label: "In The News",
    items: [
      {
        type: null as string | null,
        title: "Metabolic health research roundup",
        description: "A running list of studies and headlines relevant to low-carb, keto, and carnivore approaches to health.",
      },
    ],
  },
  {
    id: "pods",
    label: "Pods & Youtube",
    items: [
      {
        type: "Listen",
        title: "Podcasts",
        description: "Stories, interviews, and practical guidance from voices across the keto and carnivore communities.",
      },
      {
        type: "Watch",
        title: "YouTube",
        description: "Clear video explainers, conversations, and personal experiences with a carnivore-first approach.",
      },
    ],
  },
  {
    id: "folks",
    label: "Folks to Follow",
    items: [
      {
        type: "Follow",
        title: "Influencers to Follow",
        description: "A growing list of thoughtful people shaping the low-carb, metabolic health, and carnivore conversation.",
      },
    ],
  },
  {
    id: "websites",
    label: "Websites",
    items: [
      {
        type: "Learn",
        title: "Trusted Websites",
        description: "Useful destinations for research, practical guidance, recipes, and fresh inspiration.",
      },
    ],
  },
  {
    id: "foodies",
    label: "Foodies",
    items: [
      {
        type: "Make",
        title: "Simple Recipes",
        description: "Straightforward meals built around meat, eggs, butter, and other satisfying high-fat staples.",
      },
    ],
  },
];

const journey = [
  { title: "Who Is Rick", detail: "The guy behind Ketovore Canada", href: "/rick" },
  { title: "Health Issues", detail: "The challenges that started it", href: "/issues" },
  { title: "Daily Log", detail: "The numbers, meals, and movement" },
  { title: "Blog", detail: "Thoughts, lessons along the journey" },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const activeTabData = tabs.find((tab) => tab.id === activeTab) ?? tabs[0];

  return (
    <main className="min-h-screen bg-[#f7f7f7] text-black">
      <SiteHeader active="Home" />

      <section id="top" className="relative overflow-hidden bg-black text-white">
        <div className="absolute inset-y-0 left-0 w-2 bg-[#ba0a07]" />
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border-[70px] border-[#ba0a07]/30" />
        <div className="relative mx-auto grid min-h-[390px] max-w-7xl items-center gap-10 px-6 py-14 lg:grid-cols-[1.15fr_0.85fr] lg:px-10">
          <div className="max-w-3xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-white/75">A practical path to better health</p>
            <h1 className="mt-5 whitespace-nowrap font-[family-name:var(--font-display)] text-3xl font-extrabold uppercase leading-[0.95] tracking-[0.02em] sm:text-4xl lg:text-5xl">
              <span className="block text-[#ba0a07]">Carnivore first.</span>
              <span className="block">Keto inspired.</span>
              <span className="block">Built for real life.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
              Ketovore Canada brings together practical resources, honest progress, and a personal journey toward simpler food and better health.
            </p>
          </div>
          <div id="newsletter" className="scroll-mt-6 justify-self-end lg:max-w-sm lg:justify-self-end">
            <form
              onSubmit={(event) => event.preventDefault()}
              className="w-full rounded-md border-2 border-white/40 bg-black p-6 shadow-2xl shadow-black/60"
            >
              <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.22em] text-[#ba0a07]">
                <span aria-hidden="true">★</span> Free newsletter
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-xl font-extrabold leading-snug">
                Practical keto &amp; carnivore updates, in your inbox.
              </h2>
              <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                <label htmlFor="hero-newsletter-email" className="sr-only">Email address</label>
                <input
                  id="hero-newsletter-email"
                  type="email"
                  required
                  placeholder="you@email.com"
                  className="w-full flex-1 border-2 border-white bg-white px-4 py-3 text-sm text-black placeholder:text-black/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-[#ba0a07]"
                />
                <button
                  type="submit"
                  className="whitespace-nowrap bg-[#ba0a07] px-4 py-3 text-xs font-extrabold uppercase tracking-[0.1em] text-white transition hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white"
                >
                  Join free
                </button>
              </div>
              <p className="mt-3 text-xs text-white/70">Free · unsubscribe anytime.</p>
            </form>
          </div>
        </div>
      </section>

      <section id="about" className="w-full bg-[#FFEBEE]">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10 lg:py-10">
          <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-[#ba0a07]">Start here</p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-[48px] font-extrabold uppercase tracking-[0.03em]">What is Ketovore?</h2>
          <p className="mt-5 text-lg leading-8 text-black/65">
            Ketovore sits at the intersection of carnivore and keto: an animal-food-focused way of eating with very low carbohydrate intake, nourishing fats, and fewer complications. It is less about perfection and more about finding a sustainable approach that supports your health.
          </p>
        </div>
      </section>

      <section id="resources" className="w-full scroll-mt-6 border-t border-black/10">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_340px]">
            <div className="min-w-0">
              <div className="border-b border-black/20 pb-5">
                <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-[#ba0a07]">Explore</p>
                <h2 className="mt-2 font-[family-name:var(--font-display)] text-5xl font-extrabold uppercase tracking-[0.03em]">Ketovore resources</h2>
              </div>

              <div role="tablist" aria-label="Resource categories" className="mt-8 flex flex-wrap gap-1 rounded-lg border border-black/10 bg-black/[0.03] p-1.5">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={activeTab === tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`rounded-md px-4 py-2.5 text-xs font-extrabold uppercase tracking-[0.1em] transition ${
                      activeTab === tab.id
                        ? "bg-black text-white shadow-sm"
                        : "text-black/60 hover:bg-black/5 hover:text-black"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div role="tabpanel" className="mt-10">
                {activeTabData.items.map((item) => (
                  <article key={item.title} className="group grid gap-5 border-b border-black/15 py-9 sm:grid-cols-[1fr_auto] sm:items-center">
                    <div>
                      {item.type ? (
                        <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-black/45">{item.type} · Ketovore Canada</p>
                      ) : null}
                      <h3 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-extrabold leading-tight transition group-hover:text-[#ba0a07] sm:text-3xl">
                        {item.title}
                      </h3>
                      <p className="mt-3 max-w-3xl leading-7 text-black/60">{item.description}</p>
                    </div>
                    <span aria-hidden="true" className="flex h-11 w-11 items-center justify-center rounded-full border border-black/25 text-xl transition group-hover:border-[#ba0a07] group-hover:bg-[#ba0a07] group-hover:text-white">→</span>
                  </article>
                ))}
              </div>
            </div>

            <aside className="space-y-10 bg-[#f0f0f0] p-6">
              <section id="journey" className="scroll-mt-6">
                <div className="flex items-end justify-between gap-4">
                  <h2 className="whitespace-nowrap font-[family-name:var(--font-display)] text-[22px] font-extrabold uppercase tracking-[0.04em]">About Rick Couchman</h2>
                </div>
                <div className="mt-4">
                  {journey.map((item, index) => (
                    <div key={item.title} className="grid grid-cols-[28px_1fr] gap-3 border-b border-black/15 py-4">
                      <span className="font-[family-name:var(--font-display)] text-xl font-bold text-[#ba0a07]">{String(index + 1).padStart(2, "0")}</span>
                      <div>
                        {item.href ? (
                          <h3 className="font-extrabold">
                            <a href={item.href} className="transition hover:text-[#ba0a07]">{item.title}</a>
                          </h3>
                        ) : (
                          <h3 className="font-extrabold">{item.title}</h3>
                        )}
                        <p className="mt-1 text-sm text-black/50">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="border-t-4 border-black pt-5">
                <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#ba0a07]">Rick&apos;s focus for Ketovore Canada</p>
                <blockquote className="mt-4 font-[family-name:var(--font-display)] text-[22px] font-extrabold uppercase leading-tight tracking-[0.03em]">
                  Transform. Educate. Inspire.
                </blockquote>
                <p className="mt-3 text-sm leading-6 text-black/55">Real food, honest measurement, and useful lessons from one Canadian&apos;s health journey.</p>
              </section>
            </aside>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
