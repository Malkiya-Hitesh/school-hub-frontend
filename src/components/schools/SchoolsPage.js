/**
 * SchoolsPage.jsx
 * ─────────────────────────────────────────────────────────────
 * Main schools listing page.
 * Features:
 *   • Debounced search bar (400 ms)
 *   • Active filter chips from URL (with per-chip ×)
 *   • Sort dropdown
 *   • FilterSidebar (desktop sticky + mobile drawer)
 *   • Responsive 2-col grid with skeleton loading
 *   • Full Pagination with ellipsis
 * ─────────────────────────────────────────────────────────────
 */

"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useSchools } from "@/hooks/useSchools";
import FilterSidebar from "./FilterSidebar";
import SchoolCard, { SchoolCardSkeleton } from "./SchoolCard";
import { cn } from "@/lib/utils";
import { usePushQuery } from "@/hooks/usePushQuery";

/* ── Constants ─────────────────────────────────────────────── */
const SORT_OPTIONS = [
  { value: "",         label: "ડિફૉલ્ટ"     },
  { value: "students", label: "વિદ્યાર્થી ↓" },
  { value: "name",     label: "નામ A–Z"      },
  { value: "district", label: "જિલ્લો A–Z"   },
  { value: "newest",   label: "નવી પહેલા"    },
];

// Keys that appear as removable chips in the results header
const ACTIVE_CHIP_KEYS = [
  "q", "district", "taluka", "medium", "board",
  "management", "schoolType", "locationType", "sortBy",
];
const CHIP_LABELS = {
  q:            "શોધ",
  district:     "જિલ્લો",
  taluka:       "તાલુકો",
  medium:       "માધ્યમ",
  board:        "બોર્ડ",
  management:   "વ્યવ.",
  schoolType:   "પ્રકાર",
  locationType: "વિસ્તાર",
  sortBy:       "ક્રમ",
};

/* ═══════════════════════════════════════════════════════════
   Pagination
   ═══════════════════════════════════════════════════════════ */
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

/* ═══════════════════════════════════════════════════════════
   SchoolsPage
   ═══════════════════════════════════════════════════════════ */
export default function SchoolsPage() {
  const searchParams = useSearchParams();
  const pathname     = usePathname();
  const router       = useRouter();
  const pushQuery    = usePushQuery();

  /* ── Search input (local state + debounce) ───────────────── */
  const [searchInput, setSearchInput] = useState(searchParams.get("q") ?? "");
  const debounceRef  = useRef(null);

  // Keep local input in sync when URL changes (e.g. browser back/forward)
  useEffect(() => {
    setSearchInput(searchParams.get("q") ?? "");
  }, [searchParams]);

  const handleSearchChange = useCallback((value) => {
    setSearchInput(value);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      pushQuery({ q: value || "", page: "1" });
    }, 400);
  }, [pushQuery]);

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      clearTimeout(debounceRef.current);
      pushQuery({ q: searchInput, page: "1" });
    }
  };

  /* ── Query ───────────────────────────────────────────────── */
  const queryString = searchParams.toString();
  const { data, isLoading, isError, isFetching } = useSchools(queryString);

  const schools    = data?.data       ?? [];
  const total      = data?.total      ?? 0;
  const totalPages = data?.totalPages ?? 0;
  const page       = Math.max(1, Number(searchParams.get("page") ?? 1));

  /* ── Pagination handler ──────────────────────────────────── */
  const goToPage = (p) => {
    pushQuery({ page: String(p) });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ── Active filter chips (from URL, excluding page/limit) ── */
  const activeChips = ACTIVE_CHIP_KEYS
    .filter((k) => (searchParams.get(k) ?? "") !== "")
    .map((k) => ({
      key:   k,
      value: searchParams.get(k),
      label: `${CHIP_LABELS[k]}: ${searchParams.get(k)}`,
    }));

  const hasFilters = activeChips.length > 0;

  const removeChip = (key) => pushQuery({ [key]: "", page: "1" });
  const resetAll   = () => router.push(pathname);

  /* ── Mobile filter drawer ────────────────────────────────── */
  const [drawerOpen, setDrawerOpen] = useState(false);

  /* ── Render ──────────────────────────────────────────────── */
  return (
    <main className="page-top min-h-screen bg-[var(--color-bg-page)]">

      {/* ══ Search hero ══════════════════════════════════════ */}
      <div className="bg-[var(--color-primary)] px-4 sm:px-6 lg:px-10 py-5">
        <div className="mx-auto max-w-7xl flex items-center gap-3">

          {/* Search input */}
          <div className="flex-1 flex items-center bg-white rounded-xl overflow-hidden shadow-[var(--shadow-md)]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400 shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <input
              type="search"
              value={searchInput}
              onChange={(e) => handleSearchChange(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              placeholder="શાળાનું નામ, જિલ્લો, તાલુકો..."
              className="flex-1 py-3 px-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none bg-transparent"
              aria-label="Search schools"
            />
            {searchInput && (
              <button
                onClick={() => handleSearchChange("")}
                aria-label="Clear search"
                className="px-3 text-slate-400 hover:text-slate-600 text-xl leading-none"
              >
                ×
              </button>
            )}
          </div>

          {/* Mobile filter toggle */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="lg:hidden flex items-center gap-1.5 bg-white/15 border border-white/25 rounded-xl px-3 py-3 text-white text-xs font-semibold"
            aria-label="Open filters"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18M7 12h10M11 20h2" />
            </svg>
            ફિલ્ટર
            {hasFilters && (
              <span className="bg-white text-[var(--color-primary)] rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-extrabold leading-none">
                {activeChips.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ══ Body ═════════════════════════════════════════════ */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-6 flex gap-6 items-start">

        {/* Sidebar — desktop */}
        <div className="hidden lg:block">
          <FilterSidebar />
        </div>

        {/* Mobile filter drawer */}
        {drawerOpen && (
          <div className="lg:hidden fixed inset-0 z-40 flex" role="dialog" aria-modal="true" aria-label="Filters">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setDrawerOpen(false)}
            />
            <div className="relative ml-auto w-72 bg-[var(--color-bg-page)] h-full overflow-y-auto p-4 z-50 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-[var(--color-text-primary)]">ફિલ્ટર</h2>
                <button
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close filters"
                  className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] text-xl leading-none"
                >
                  ✕
                </button>
              </div>
              <FilterSidebar onClose={() => setDrawerOpen(false)} />
            </div>
          </div>
        )}

        {/* ── Results panel ─────────────────────────────────── */}
        <div className="flex-1 min-w-0">

          {/* Results header: count + active chips + sort */}
          <div className="flex items-start justify-between gap-3 mb-4 flex-wrap">

            {/* Left: count + chips */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[var(--color-text-secondary)] mb-2">
                {isLoading ? (
                  <span className="inline-block w-24 h-4 bg-slate-100 rounded animate-pulse" />
                ) : (
                  <>
                    <span className="text-[var(--color-text-primary)] font-bold">{total.toLocaleString()}</span>
                    {" "}શાળા મળી
                    {isFetching && !isLoading && (
                      <span className="ml-2 text-[var(--color-text-muted)] text-xs">અપડેટ…</span>
                    )}
                  </>
                )}
              </p>

              {/* Active filter chips */}
              {hasFilters && (
                <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1.5">
                  {activeChips.map(({ key, label }) => (
                    <span
                      key={key}
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[var(--color-primary-light)] text-[var(--color-primary)] border border-[var(--color-primary-muted)]"
                    >
                      {label}
                      <button
                        onClick={() => removeChip(key)}
                        aria-label={`Remove ${label}`}
                        className="opacity-70 hover:opacity-100 leading-none text-sm"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  <button
                    onClick={resetAll}
                    className="text-[10px] text-[var(--color-error-text)] underline underline-offset-2 hover:opacity-80"
                  >
                    બધા હટાવો
                  </button>
                </div>
              )}
            </div>

            {/* Right: sort (desktop only — sidebar has it on mobile) */}
            <div className="hidden lg:block shrink-0">
              <select
                value={searchParams.get("sortBy") ?? ""}
                onChange={(e) => pushQuery({ sortBy: e.target.value, page: "1" })}
                className="text-xs rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] px-2.5 py-2 outline-none focus:border-[var(--color-primary)] cursor-pointer"
                aria-label="Sort results"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Error state */}
          {isError && (
            <div role="alert" className="bg-[var(--color-error-light)] border border-red-200 rounded-xl p-4 text-sm text-[var(--color-error-text)] mb-4">
              ⚠ ડેટા લોડ કરવામાં ભૂલ થઈ — ફરી પ્રયાસ કરો.
            </div>
          )}

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {isLoading ? (
              Array.from({ length: 8 }, (_, i) => <SchoolCardSkeleton key={i} />)
            ) : schools.length > 0 ? (
              schools.map((s) => <SchoolCard key={s._id ?? s.schoolId} school={s} />)
            ) : (
              <div className="col-span-2 text-center py-16 text-[var(--color-text-muted)]">
                <p className="text-4xl mb-3" role="img" aria-label="School">🏫</p>
                <p className="font-semibold text-[var(--color-text-secondary)]">કોઈ શાળા મળી નહિ</p>
                <p className="text-sm mt-1">ફિલ્ટર બદલો અથવા બીજો શબ્દ search કરો</p>
                <button
                  onClick={resetAll}
                  className="mt-4 text-xs text-[var(--color-primary)] underline underline-offset-2 hover:opacity-80"
                >
                  ફિલ્ટર reset કરો
                </button>
              </div>
            )}
          </div>

          {/* Pagination */}
          <Pagination page={page} totalPages={totalPages} onPageChange={goToPage} />

          {/* Page info */}
          {!isLoading && totalPages > 1 && (
            <p className="text-center text-xs text-[var(--color-text-muted)] mt-3">
              પૃષ્ઠ {page} / {totalPages}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}