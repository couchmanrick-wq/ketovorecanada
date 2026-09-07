import Link from "next/link";

export default function FeedPagination({
  page,
  pageCount,
  basePath,
}: {
  page: number;
  pageCount: number;
  basePath: string;
}) {
  if (pageCount <= 1) return null;

  const href = (p: number) => (p <= 1 ? basePath : `${basePath}?page=${p}`);
  const linkClass = "no-underline transition hover:text-[#ba0a07]";
  const mutedClass = "text-black/25";

  return (
    <nav
      aria-label="Pagination"
      className="mt-10 flex items-center justify-between border-t-2 border-black pt-6 text-sm font-extrabold uppercase tracking-wide"
    >
      {page > 1 ? (
        <Link href={href(page - 1)} className={linkClass}>
          ← Newer
        </Link>
      ) : (
        <span className={mutedClass}>← Newer</span>
      )}
      <span className="text-black/55">
        Page {page} of {pageCount}
      </span>
      {page < pageCount ? (
        <Link href={href(page + 1)} className={linkClass}>
          Older →
        </Link>
      ) : (
        <span className={mutedClass}>Older →</span>
      )}
    </nav>
  );
}
