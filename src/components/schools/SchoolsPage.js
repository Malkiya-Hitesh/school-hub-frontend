
"use client";

import { useState, useCallback, useMemo } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

import { FiltersProvider } from "@/context/FiltersContext";
import { FILTER_KEYS } from "@/lib/constants";

import SchoolResult from "./SchoolResult";
import SearchBar from "./SearchBar.js";
import FilterSidebar from "./FilterSidebar";
import { usePushQuery } from "@/hooks/usePushQuery";

const FILTER_KEY_VALUES = Object.keys(FILTER_KEYS);

export default function SchoolsPage() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const pushQuery = usePushQuery();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleSearch = useCallback((v) => {
    pushQuery({ q: v, page: "1" });
  }, [pushQuery]);

  const resetAll = useCallback(() => {
    router.push(pathname);
  }, [router, pathname]);

  const filterValues = useMemo(() => {
    const obj = {};
    FILTER_KEY_VALUES.forEach((k) => { obj[k] = searchParams.get(k) ?? ""; });
    return obj;
  }, [searchParams]);

  // Context value — memoized so it only changes when pushQuery or filterValues actually change
  const filtersContextValue = useMemo(
    () => ({ pushQuery, values: filterValues, resetAll }),
    [pushQuery, filterValues, resetAll]
  );

  const hasFilters = FILTER_KEY_VALUES.some((k) => filterValues[k] !== "") || Boolean(searchParams.get("q"));

  return (
    <main className="page-top min-h-screen bg-[var(--color-bg-page)]">

      {/* ══ Search hero ══ */}
      <div className="bg-[var(--color-primary)] px-4 sm:px-6 lg:px-10 py-5">
        <div className="mx-auto max-w-7xl flex items-center gap-3">
          <SearchBar
            initialValue={searchParams.get("q") ?? ""}
            onSearch={handleSearch}
          />

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
              <span className="bg-white text-[var(--color-primary)] rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-extrabold leading-none" />
            )}
          </button>
        </div>
      </div>

      <FiltersProvider value={filtersContextValue}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-6 flex gap-6 items-start">

          {/* Desktop sidebar */}
          <div className="hidden lg:block">
            <FilterSidebar />
          </div>

          {/* Mobile drawer */}
          {drawerOpen && (
            <div className="lg:hidden fixed inset-0 z-40 flex" role="dialog" aria-modal="true" aria-label="Filters">
              <div className="absolute inset-0 bg-black/40" onClick={() => setDrawerOpen(false)} />
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

          <SchoolResult resetAll={resetAll} />
        </div>
      </FiltersProvider>
    </main>
  );
}
