import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ page, pageCount, onChange }) {
  const paginationStyle =
    "mt-9 flex flex-wrap items-center justify-center gap-2 sm:justify-between";
  const buttonStyle =
    "inline-flex h-10 items-center gap-2 rounded-full border border-black/10 px-4 text-sm font-medium transition hover:border-black hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-black/10 disabled:hover:bg-white disabled:hover:text-black dark:border-white/15 dark:hover:border-white dark:hover:bg-white dark:hover:text-black dark:disabled:hover:border-white/15 dark:disabled:hover:bg-zinc-950 dark:disabled:hover:text-white";
  const pageStyle =
    "grid size-10 place-items-center rounded-full text-sm transition hover:bg-black/5 dark:hover:bg-white/10";
  const activePageStyle = "bg-black font-semibold text-white hover:bg-black dark:bg-white dark:text-black dark:hover:bg-white";
  const pagesStyle = "flex items-center gap-1";
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

  if (pageCount < 2) return null;
  return (
    <nav className={paginationStyle} aria-label="Product pages">
      <button
        className={buttonStyle}
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
      >
        <ChevronLeft size={16} /> Previous
      </button>
      <div className={pagesStyle}>
        {pages.map((number) => (
          <button
            key={number}
            onClick={() => onChange(number)}
            aria-label={`Page ${number}`}
            aria-current={number === page ? "page" : undefined}
            className={`${pageStyle} ${number === page ? activePageStyle : ""}`}
          >
            {number}
          </button>
        ))}
      </div>
      <button
        className={buttonStyle}
        onClick={() => onChange(page + 1)}
        disabled={page === pageCount}
      >
        Next <ChevronRight size={16} />
      </button>
    </nav>
  );
}
