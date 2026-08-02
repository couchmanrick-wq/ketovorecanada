import Image from "next/image";

const resources = [
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
  {
    type: "Follow",
    title: "Influencers to Follow",
    description: "A growing list of thoughtful people shaping the low-carb, metabolic health, and carnivore conversation.",
  },
  {
    type: "Learn",
    title: "Trusted Websites",
    description: "Useful destinations for research, practical guidance, recipes, and fresh inspiration.",
  },
  {
    type: "Make",
    title: "Simple Recipes",
    description: "Straightforward meals built around meat, eggs, butter, and other satisfying high-fat staples.",
  },
];

const journey = [
  { title: "About Rick", detail: "The person behind the journey" },
  { title: "Health Issues", detail: "The challenges that started it" },
  { title: "Meds", detail: "Changes being monitored" },
  { title: "Daily Log", detail: "The numbers, meals, and movement" },
  { title: "Blog", detail: "Lessons from the process" },
];

const updates = [
  {
    label: "From the journey",
    title: "Building better health one repeatable choice at a time",
    description: "Progress is rarely one dramatic moment. It is the accumulation of meals, movement, sleep, and honest reflection.",
  },
  {
    label: "Coming next",
    title: "A clearer daily view of the numbers that matter",
    description: "The daily log will bring weight, insulin, steps, gym sessions, measurements, food, and photos into one practical dashboard.",
  },
];

const footerLinks = [
  { title: "Explore", links: ["What is Ketovore", "Resources", "Latest updates", "Recipes"] },
  { title: "Rick's Journey", links: ["About Rick", "Health issues", "Meds", "Daily log"] },
  { title: "Connect", links: ["Newsletter", "YouTube", "Podcasts", "Email"] },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f7f7] text-black">
      <header className="border-b border-black/10 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-5 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <a href="#top" aria-label="Ketovore Canada home" className="block w-full max-w-[360px]">
            <Image
              src="/images/KC_horizontal_logo.webp"
              alt="Ketovore Canada — Transform, Educate, Inspire"
              width={1745}
              height={464}
              sizes="360px"
              className="h-auto w-full"
              priority
            />
          </a>
          <nav aria-label="Primary navigation" className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-extrabold">
            <a href="#top" className="border-b-2 border-[#ba0a07] py-2">Home</a>
            <a href="#about" className="py-2 transition hover:text-[#ba0a07]">About</a>
            <a href="#resources" className="py-2 transition hover:text-[#ba0a07]">Resources</a>
            <a href="#updates" className="py-2 transition hover:text-[#ba0a07]">Updates</a>
            <a href="#journey" className="py-2 transition hover:text-[#ba0a07]">Journey</a>
            <a href="#newsletter" className="rounded-sm bg-[#ba0a07] px-4 py-2 text-white transition hover:bg-black">Newsletter</a>
          </nav>
        </div>
      </header>

      <section id="top" className="relative overflow-hidden bg-black text-white">
        <div className="absolute inset-y-0 left-0 w-2 bg-[#ba0a07]" />
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border-[70px] border-[#ba0a07]/30" />
        <div className="relative mx-auto grid min-h-[390px] max-w-7xl items-center gap-10 px-6 py-14 lg:grid-cols-[1.15fr_0.85fr] lg:px-10">
          <div className="max-w-3xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-white/75">A practical path to better health</p>
            <h1 className="mt-5 font-[family-name:var(--font-display)] text-5xl font-extrabold uppercase leading-[0.95] tracking-[0.02em] sm:text-7xl">
              Carnivore first.
              <span className="block text-[#ba0a07]">Keto inspired.</span>
              Built for real life.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
              Ketovore Canada brings together practical resources, honest progress, and a personal journey toward simpler food and better health.
            </p>
          </div>
          <div className="hidden justify-self-end lg:block">
            <div className="rounded-full bg-white p-3 shadow-2xl shadow-[#ba0a07]/20">
              <Image
                src="/images/KC_round_logo.webp"
                alt="Ketovore Canada round logo"
                width={1254}
                height={1254}
                sizes="300px"
                className="h-auto w-[300px] rounded-full"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[minmax(0,1fr)_340px] lg:px-10 lg:py-20">
        <div className="min-w-0">
          <section id="about">
            <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-[#ba0a07]">Start here</p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-5xl font-extrabold uppercase tracking-[0.03em] sm:text-6xl">What is Ketovore?</h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-black/65">
              Ketovore sits at the intersection of carnivore and keto: an animal-food-focused way of eating with very low carbohydrate intake, nourishing fats, and fewer complications. It is less about perfection and more about finding a sustainable approach that supports your health.
            </p>
          </section>

          <section id="resources" className="mt-16 scroll-mt-6">
            <div className="flex flex-col gap-6 border-b border-black/20 pb-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-[#ba0a07]">Explore</p>
                <h2 className="mt-2 font-[family-name:var(--font-display)] text-5xl font-extrabold uppercase tracking-[0.03em]">Ketovore resources</h2>
              </div>
              <nav aria-label="Resource categories" className="flex flex-wrap gap-4 text-xs font-extrabold uppercase tracking-[0.15em] text-black/55">
                <a href="#resources" className="text-[#ba0a07]">Listen</a>
                <a href="#resources">Watch</a>
                <a href="#resources">Learn</a>
                <a href="#resources">Make</a>
              </nav>
            </div>

            <div>
              {resources.map((item) => (
                <article key={item.title} className="group grid gap-5 border-b border-black/15 py-9 sm:grid-cols-[1fr_auto] sm:items-center">
                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-black/45">{item.type} · Ketovore Canada</p>
                    <h3 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-extrabold leading-tight transition group-hover:text-[#ba0a07] sm:text-3xl">
                      {item.title}
                    </h3>
                    <p className="mt-3 max-w-3xl leading-7 text-black/60">{item.description}</p>
                  </div>
                  <span aria-hidden="true" className="flex h-11 w-11 items-center justify-center rounded-full border border-black/25 text-xl transition group-hover:border-[#ba0a07] group-hover:bg-[#ba0a07] group-hover:text-white">→</span>
                </article>
              ))}
            </div>
          </section>

          <section id="updates" className="mt-20 scroll-mt-6">
            <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-[#ba0a07]">The latest</p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-5xl font-extrabold uppercase tracking-[0.03em]">Notes from the journey</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {updates.map((item) => (
                <article key={item.title} className="border-t-4 border-[#ba0a07] bg-white p-7 shadow-sm">
                  <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#ba0a07]">{item.label}</p>
                  <h3 className="mt-4 font-[family-name:var(--font-display)] text-xl font-extrabold leading-snug">{item.title}</h3>
                  <p className="mt-4 leading-7 text-black/60">{item.description}</p>
                </article>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-10">
          <section id="newsletter" className="bg-black p-7 text-white shadow-lg shadow-black/10">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#ba0a07]">Free newsletter</p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-xl font-extrabold">Practical insights in your inbox.</h2>
            <p className="mt-3 text-sm leading-6 text-white/65">New resources, progress notes, and honest reflections as they are published.</p>
            <a href="mailto:hello@ketovorecanada.com?subject=Ketovore%20Canada%20Newsletter" className="mt-6 flex w-full justify-center bg-[#ba0a07] px-4 py-3 text-sm font-extrabold text-white transition hover:bg-white hover:text-black">
              Join the newsletter
            </a>
            <p className="mt-3 text-xs text-white/45">Free · unsubscribe anytime.</p>
          </section>

          <section id="journey" className="scroll-mt-6 border-t-4 border-black pt-5">
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-[family-name:var(--font-display)] text-3xl font-extrabold uppercase tracking-[0.04em]">Rick&apos;s journey</h2>
              <span className="bg-black px-2 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white">Personal</span>
            </div>
            <div className="mt-4">
              {journey.map((item, index) => (
                <div key={item.title} className="grid grid-cols-[28px_1fr] gap-3 border-b border-black/15 py-4">
                  <span className="font-[family-name:var(--font-display)] text-xl font-bold text-[#ba0a07]">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="font-extrabold">{item.title}</h3>
                    <p className="mt-1 text-sm text-black/50">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="border-t-4 border-[#ba0a07] pt-5">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#ba0a07]">Daily log</p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-extrabold uppercase tracking-[0.04em]">The full picture, tracked honestly.</h2>
            <div className="mt-5 grid grid-cols-2 gap-px bg-black/15 border border-black/15">
              {['Weight', 'Insulin', 'Steps', 'Food', 'Gym', 'Photos'].map((item) => (
                <div key={item} className="bg-white p-4 text-sm font-extrabold">{item}</div>
              ))}
            </div>
          </section>

          <section className="border-t-4 border-black pt-5">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#ba0a07]">The focus</p>
            <blockquote className="mt-4 font-[family-name:var(--font-display)] text-3xl font-extrabold uppercase leading-tight tracking-[0.03em]">
              “Transform. Educate. Inspire.”
            </blockquote>
            <p className="mt-3 text-sm leading-6 text-black/55">Real food, honest measurement, and useful lessons from one Canadian&apos;s health journey.</p>
          </section>
        </aside>
      </div>

      <footer className="mt-12 border-t-8 border-[#ba0a07] bg-black text-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1.2fr_2fr] lg:px-10">
          <div>
            <div className="inline-block rounded-full bg-white p-1.5">
              <Image src="/images/KC_round_logo.webp" alt="Ketovore Canada" width={1254} height={1254} sizes="92px" className="h-[92px] w-[92px] rounded-full" />
            </div>
            <p className="mt-5 max-w-sm leading-7 text-white/60">A practical Canadian resource for carnivore-first eating, metabolic health, useful information, and honest personal change.</p>
          </div>
          <div className="grid gap-10 sm:grid-cols-3">
            {footerLinks.map((group) => (
              <div key={group.title}>
                <h2 className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#ba0a07]">{group.title}</h2>
                <ul className="mt-5 space-y-3 text-sm text-white/70">
                  {group.links.map((link) => <li key={link}><span>{link}</span></li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-white/15">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between lg:px-10">
            <p>© 2026 Ketovore Canada. All rights reserved.</p>
            <p>Transform · Educate · Inspire</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
