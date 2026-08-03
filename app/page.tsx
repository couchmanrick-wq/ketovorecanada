import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Hero from "@/components/Hero";

const resourceItems = [
  {
    type: null as string | null,
    title: "Metabolic health research roundup",
    description: "A running list of studies and headlines relevant to low-carb, keto, and carnivore approaches to health.",
  },
];

const journey = [
  { title: "Who Is Rick", detail: "The guy behind Ketovore Canada", href: "/rick" },
  { title: "Health Issues", detail: "The challenges that started it", href: "/issues" },
  { title: "Daily Log", detail: "The numbers, meals, and movement", href: "/log" },
  { title: "Blog", detail: "Thoughts, lessons along the journey", href: "/blog" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f7f7] text-black">
      <SiteHeader active="Daily News & Views" />

      <Hero primaryHeading />

      <section id="about" className="w-full bg-[#FFEBEE]">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10 lg:py-10">
          <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-[#ba0a07]">Start here</p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-[42px] font-extrabold uppercase tracking-[0.03em]">What is Ketovore?</h2>
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
                <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-[#ba0a07]">Updated Results 3 Times Daily</p>
                <h2 className="mt-2 font-[family-name:var(--font-display)] text-[42px] font-extrabold uppercase tracking-[0.03em]">Ketovore Daily News, Views &amp; Video</h2>
              </div>

              <div className="mt-10">
                {resourceItems.map((item) => (
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
                <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-[#ba0a07]">Meet the site owner</p>
                <div className="mt-2 flex items-end justify-between gap-4">
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
                        <p className="mt-1 text-sm text-black/65">{item.detail}</p>
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
