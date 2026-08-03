"use client";

export default function NewsletterForm() {
  return (
    <form
      onSubmit={(event) => event.preventDefault()}
      className="w-full rounded-md border-2 border-white/40 bg-[#2a2a2a]/70 p-6 shadow-2xl shadow-black/60 backdrop-blur-sm"
    >
      <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.22em] text-[#ba0a07]">
        <span aria-hidden="true">★</span> Free weekly newsletter
      </p>
      <p className="mt-3 font-[family-name:var(--font-display)] text-xl font-extrabold leading-snug">
        News, views &amp; carnivore updates, in your inbox.
      </p>
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
  );
}
