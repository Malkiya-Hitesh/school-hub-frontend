
// /src/components/schools/Pagination.js

import { cn } from "@/lib/utils";

function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  // Build page numbers with at most 7 slots
  const pages = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (page > 3) pages.push("…");
    const start = Math.max(2, page - 1);
    const end   = Math.min(totalPages - 1, page + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (page < totalPages - 2) pages.push("…");
    pages.push(totalPages);
  }

  const base   = "px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors";
  const normal = "border-[var(--color-border)] bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-bg-page)]";
  const active = "bg-[var(--color-primary)] text-white border-[var(--color-primary)]";
  const disabled = "opacity-40 pointer-events-none";

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-1.5 mt-8 flex-wrap">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className={cn(base, normal, page <= 1 && disabled)}
        aria-label="Previous page"
      >
        ‹
      </button>

      {pages.map((p, i) =>
        p === "…" ? (
          <span key={`ellipsis-${i}`} className="px-2 text-[var(--color-text-muted)] text-xs select-none">…</span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            aria-current={p === page ? "page" : undefined}
            className={cn(base, p === page ? active : normal)}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className={cn(base, normal, page >= totalPages && disabled)}
        aria-label="Next page"
      >
        ›
      </button>
    </nav>
  );
}
export default Pagination
