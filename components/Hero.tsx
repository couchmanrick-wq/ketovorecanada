import NewsletterForm from "@/components/NewsletterForm";

const titleClasses = "mt-5 whitespace-nowrap font-[family-name:var(--font-display)] text-3xl font-extrabold uppercase leading-[0.95] tracking-[0.02em] sm:text-4xl lg:text-5xl";

function HeroTitle() {
  return (
    <>
      <span className="mb-1 block leading-none text-[#f0211b] [text-shadow:0_2px_3px_rgba(0,0,0,0.95)]">Carnivore first.</span>
      <span className="block">Keto inspired.</span>
      <span className="block">Built for real life.</span>
    </>
  );
}

export default function Hero({ primaryHeading = false }: { primaryHeading?: boolean }) {
  return (
    <section id="top" className="relative overflow-hidden bg-black text-white">
      <link rel="preload" as="image" href="/images/KC_hero_bg-mobile.avif" type="image/avif" media="(max-width: 1023px)" fetchPriority="high" />
      <link rel="preload" as="image" href="/images/KC_hero_bg.avif" type="image/avif" media="(min-width: 1024px)" fetchPriority="high" />
      <picture className="absolute inset-0 block [transform:scaleX(-1)]">
        <source media="(max-width: 1023px)" srcSet="/images/KC_hero_bg-mobile.avif" type="image/avif" />
        <source media="(max-width: 1023px)" srcSet="/images/KC_hero_bg-mobile.webp" type="image/webp" />
        <source srcSet="/images/KC_hero_bg.avif" type="image/avif" />
        <img
          src="/images/KC_hero_bg-optimized.webp"
          alt=""
          width="2172"
          height="724"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover contrast-[1.08] saturate-[1.35] lg:scale-[0.8] lg:object-contain"
        />
      </picture>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_18%_50%,rgba(255,32,25,0.38),transparent_38%)] mix-blend-screen" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-black/20 to-black/60" />
      <div className="absolute inset-y-0 left-0 w-2 bg-[#ba0a07]" />
      <div className="relative mx-auto grid min-h-[390px] max-w-7xl items-center gap-10 px-6 py-14 lg:grid-cols-[1.15fr_0.85fr] lg:px-10">
        <div className="max-w-3xl drop-shadow-[0_2px_3px_rgba(0,0,0,0.85)]">
          <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-white/75">A practical path to better health</p>
          {primaryHeading ? (
            <h1 className={titleClasses}><HeroTitle /></h1>
          ) : (
            <p className={titleClasses}><HeroTitle /></p>
          )}
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
            Ketovore Canada brings together practical resources, honest progress, and a personal journey toward simpler food and better health.
          </p>
        </div>
        <div id="newsletter" className="scroll-mt-6 justify-self-end lg:max-w-sm lg:justify-self-end">
          <NewsletterForm />
        </div>
      </div>
    </section>
  );
}
