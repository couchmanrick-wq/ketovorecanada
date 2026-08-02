import Image from "next/image";

const footerLinks = [
  { title: "Explore", links: ["What is Ketovore", "Resources", "Recipes", "YouTube", "Podcasts"] },
  { title: "Rick's Journey", links: ["About Rick", "Health issues", "Daily log"] },
  { title: "Connect", links: ["Newsletter", "Email"] },
];

export default function SiteFooter() {
  return (
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
  );
}
