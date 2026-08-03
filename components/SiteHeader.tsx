"use client";

import { Fragment, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Daily News & Views", href: "/#resources" },
  { label: "Influencers/Authorities Accts to Follow", href: "/ketovore-links" },
  { label: "About", href: "/rick" },
];

export default function SiteHeader({ active }: { active?: string }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b border-black/10 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-10">
        <Link href="/" aria-label="Ketovore Canada home" className="no-underline block w-full max-w-[200px] lg:max-w-[260px]">
          <Image
            src="/images/KC_horizontal_logo-header-final.avif"
            alt="Ketovore Canada — Transform, Educate, Inspire"
            width={260}
            height={69}
            sizes="260px"
            className="h-auto w-full"
            priority
          />
        </Link>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-x-4 text-sm font-extrabold lg:flex"
        >
          {navLinks.map((link, index) => (
            <Fragment key={link.label}>
              <Link
                href={link.href}
                aria-current={active === link.label ? "page" : undefined}
                className={`no-underline border-b-2 py-2 transition hover:text-[#ba0a07] ${
                  active === link.label ? "border-[#ba0a07]" : "border-transparent"
                }`}
              >
                {link.label}
              </Link>
              {index < navLinks.length - 1 ? (
                <span aria-hidden="true" className="text-lg leading-none text-[#ba0a07]">•</span>
              ) : null}
            </Fragment>
          ))}
          <Link href="/#newsletter" className="no-underline ml-4 rounded-sm border border-black bg-white px-4 py-2 text-black transition hover:bg-black hover:text-white">Newsletter</Link>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span className={`block h-0.5 w-6 bg-black transition ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block h-0.5 w-6 bg-black transition ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 bg-black transition ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {menuOpen ? (
        <nav
          aria-label="Mobile navigation"
          className="flex flex-col gap-4 border-t border-black/10 px-6 py-4 text-sm font-extrabold lg:hidden"
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              aria-current={active === link.label ? "page" : undefined}
              className={`no-underline w-fit border-b-2 py-1 transition hover:text-[#ba0a07] ${
                active === link.label ? "border-[#ba0a07]" : "border-transparent"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#newsletter"
            onClick={() => setMenuOpen(false)}
            className="no-underline w-fit rounded-sm border border-black bg-white px-4 py-2 text-black transition hover:bg-black hover:text-white"
          >
            Newsletter
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
