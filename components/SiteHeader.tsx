import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Ketovore Resources", href: "/#resources" },
  { label: "Rick's Journey", href: "/#journey" },
];

export default function SiteHeader({ active }: { active?: string }) {
  return (
    <header className="border-b border-black/10 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-3 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <Link href="/" aria-label="Ketovore Canada home" className="block w-full max-w-[260px]">
          <Image
            src="/images/KC_horizontal_logo.webp"
            alt="Ketovore Canada — Transform, Educate, Inspire"
            width={1745}
            height={464}
            sizes="260px"
            className="h-auto w-full"
            priority
          />
        </Link>
        <nav aria-label="Primary navigation" className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-extrabold">
          {navLinks.map((link, index) => (
            <span key={link.label} className="flex items-center gap-x-6">
              <Link
                href={link.href}
                className={
                  active === link.label
                    ? "border-b-2 border-[#ba0a07] py-2"
                    : "py-2 transition hover:text-[#ba0a07]"
                }
              >
                {link.label}
              </Link>
              {index < navLinks.length - 1 ? (
                <span aria-hidden="true" className="text-black/20">|</span>
              ) : null}
            </span>
          ))}
          <Link href="/#newsletter" className="rounded-sm border border-black bg-white px-4 py-2 text-black transition hover:bg-black hover:text-white">Newsletter</Link>
        </nav>
      </div>
    </header>
  );
}
