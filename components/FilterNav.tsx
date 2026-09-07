"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export type FilterItem = { href: string; label: string };

export const FILTER_ITEMS: FilterItem[] = [
  { href: "/news", label: "News" },
  { href: "/videos", label: "Videos" },
  { href: "/blogs", label: "Blogs" },
];

/**
 * News / Videos / Blogs tabs. Links to the filtered routes (tmltoday style).
 * Collapses to a native select below `sm`.
 */
export default function FilterNav({ items = FILTER_ITEMS }: { items?: FilterItem[] }) {
  const pathname = usePathname();
  const router = useRouter();
  const active = items.find(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
  );

  return (
    <div className="min-w-0 flex-1">
      <label htmlFor="content-filter" className="sr-only">
        Filter content
      </label>
      <select
        id="content-filter"
        value={active?.href ?? ""}
        onChange={(event) => router.push(event.target.value)}
        className="w-full rounded-sm border border-black/20 bg-white px-3 py-2.5 text-xs font-extrabold uppercase tracking-[0.14em] text-black outline-none focus:border-[#ba0a07] sm:hidden"
      >
        {!active && (
          <option value="" disabled>
            Browse
          </option>
        )}
        {items.map((item) => (
          <option key={item.href} value={item.href}>
            {item.label}
          </option>
        ))}
      </select>

      <nav aria-label="Content filters" className="hidden gap-7 sm:flex">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={item === active ? "page" : undefined}
            className={[
              "no-underline shrink-0 border-b-[3px] px-1 pb-3.5 text-xs font-extrabold uppercase tracking-[0.14em] transition",
              item === active
                ? "border-[#ba0a07] text-[#ba0a07]"
                : "border-transparent text-black/45 hover:text-[#ba0a07]",
            ].join(" ")}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
