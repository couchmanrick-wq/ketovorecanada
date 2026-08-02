import Image from "next/image";

const resources = [
  { title: "Podcasts", description: "Stories, interviews, and practical guidance from the Ketovore community." },
  { title: "YouTube", description: "Video explains the keto-carnivore approach in plain language." },
  { title: "Influencers to Follow", description: "A growing list of voices shaping the low-carb and carnivore conversation." },
  { title: "Websites", description: "Trusted resources for research, recipes, and inspiration." },
  { title: "Recipes", description: "Simple meals built around meat, eggs, butter, and high-fat staples." },
];

const updates = [
  { title: "Latest Updates", description: "Fresh notes, interviews, and community highlights from the journey." },
  { title: "Newsletter", description: "Subscribe for practical insights, progress updates, and new resources." },
];

const journey = [
  { title: "About Rick", description: "Rick Couchman shares his personal experience with health, food, and discipline." },
  { title: "Meds", description: "A candid look at medications, changes, and what is being monitored." },
  { title: "Health Issues", description: "A framework for understanding the health challenges behind the journey." },
  { title: "Daily Log", description: "Weight, insulin, steps, gym, measurements, food, and photos in one place." },
  { title: "Blog", description: "Thoughtful write-ups that connect personal progress to practical lessons." },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f5f5] text-black">
      <section className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-10 lg:px-10 lg:py-16">
        <header className="rounded-[2rem] border-2 border-[#ba0a07] bg-white p-5 shadow-sm sm:p-8 lg:p-10">
          <h1 className="sr-only">Ketovore Canada</h1>
          <Image
            src="/images/KC_horizontal_logo.webp"
            alt="Ketovore Canada — Transform, Educate, Inspire"
            width={1745}
            height={464}
            sizes="(min-width: 1280px) 1152px, (min-width: 1024px) calc(100vw - 160px), (min-width: 640px) calc(100vw - 112px), calc(100vw - 64px)"
            className="mx-auto h-auto w-full max-w-6xl"
            priority
          />
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="rounded-[2rem] bg-black p-8 text-white shadow-xl sm:p-10">
            <p className="inline-flex rounded-full bg-white px-3 py-1 text-sm font-semibold uppercase tracking-[0.35em] text-[#ba0a07]">What Is Ketovore…</p>
            <h2 className="mt-4 font-[family-name:var(--font-brusher)] text-4xl sm:text-5xl">
              A carnivore-first, keto-inspired way of eating.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/80">
              Ketovore is the intersection of carnivore and keto: a practical approach built around animal foods, high fat, low carbohydrate intake, and a focus on simplicity. It is a lifestyle rooted in nourishment, discipline, and personal experimentation.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#resources" className="rounded-full bg-[#ba0a07] px-5 py-3 font-semibold text-white transition hover:bg-white hover:text-black">Explore resources</a>
              <a href="#journey" className="rounded-full border border-white/30 px-5 py-3 font-semibold text-white transition hover:bg-white/10">Read Rick&apos;s story</a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-black/15 bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#ba0a07]">Who is Rick Couchman</p>
            <h3 className="mt-3 font-[family-name:var(--font-bebas)] text-3xl uppercase tracking-[0.16em]">
              A practical guide through health, food, and change.
            </h3>
            <p className="mt-4 text-base leading-7 text-black/70">
              Rick Couchman is sharing the lessons from his own health journey, including the ups and downs of trying new ways of eating and building consistency over time.
            </p>
          </div>
        </section>

        <section id="resources" className="rounded-[2rem] border border-black/15 bg-white p-8 shadow-sm sm:p-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#ba0a07]">Resources…</p>
              <h2 className="font-[family-name:var(--font-bebas)] text-3xl uppercase tracking-[0.16em] sm:text-4xl">Useful tools, voices, and links.</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-black/65">A curated collection of podcasts, videos, websites, recipes, and people worth following as you explore this path.</p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {resources.map((item) => (
              <article key={item.title} className="rounded-2xl border border-black/10 border-t-[#ba0a07] bg-[#f7f7f7] p-5">
                <h3 className="font-[family-name:var(--font-bebas)] text-2xl uppercase tracking-[0.12em] text-black">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-black/65">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="updates" className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-black/15 bg-[#f0f0f0] p-8 shadow-sm sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#ba0a07]">The Latest Updates…</p>
            <h2 className="mt-3 font-[family-name:var(--font-bebas)] text-3xl uppercase tracking-[0.16em] sm:text-4xl">Stories, notes, and fresh thinking.</h2>
            <div className="mt-6 space-y-4">
              {updates.map((item) => (
                <div key={item.title} className="rounded-2xl border border-black/10 bg-white p-4">
                  <h3 className="font-semibold text-black">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-black/65">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-black/15 bg-white p-8 shadow-sm sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#ba0a07]">Newsletter</p>
            <h3 className="mt-3 font-[family-name:var(--font-bebas)] text-3xl uppercase tracking-[0.16em]">Stay in touch.</h3>
            <p className="mt-4 text-base leading-7 text-black/65">Subscribe for updates, new resources, and reflections from the journey as they are released.</p>
            <a href="mailto:hello@ketovorecanada.com" className="mt-6 inline-flex rounded-full bg-black px-5 py-3 font-semibold text-white transition hover:bg-[#ba0a07]">hello@ketovorecanada.com</a>
          </div>
        </section>

        <section id="journey" className="rounded-[2rem] border border-black/15 bg-white p-8 shadow-sm sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#ba0a07]">Rick&apos;s Journey…</p>
          <h2 className="mt-3 font-[family-name:var(--font-bebas)] text-3xl uppercase tracking-[0.16em] sm:text-4xl">A personal path toward better health and better habits.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {journey.map((item) => (
              <article key={item.title} className="rounded-2xl border border-black/10 border-t-[#ba0a07] bg-[#f7f7f7] p-5">
                <h3 className="font-[family-name:var(--font-bebas)] text-2xl uppercase tracking-[0.12em] text-black">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-black/65">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] border border-[#ba0a07] bg-black p-8 text-white shadow-sm sm:p-10">
          <p className="inline-flex rounded-full bg-white px-3 py-1 text-sm font-semibold uppercase tracking-[0.35em] text-[#ba0a07]">Daily Log…</p>
          <h2 className="mt-3 font-[family-name:var(--font-bebas)] text-3xl uppercase tracking-[0.16em] sm:text-4xl">Weight, insulin, steps, gym, measurements, food, and photos.</h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-white/80">The daily log section will become a richer dashboard over time, with charts, food timing details, body measurements, and progress photos that make the journey easier to follow.</p>
        </section>
      </section>
    </main>
  );
}
