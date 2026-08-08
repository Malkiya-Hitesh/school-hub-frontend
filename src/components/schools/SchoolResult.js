'use client';

import React, { useCallback, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Pagination from './Pagination';
import SchoolCard, { SchoolCardSkeleton } from './SchoolCard';
import { usePushQuery } from '@/hooks/usePushQuery';
import { useSchools } from '@/hooks/useSchools';
import { useFilters } from '@/context/FiltersContext';
import {
  ACTIVE_CHIP_KEYS,
  CHIP_LABELS,
  SORT_OPTIONS,
  getFilterValueLabel,
  getLabel,
} from '@/lib/constants';

const ACTIVE_CHIP_KEY_VALUES = Object.keys(ACTIVE_CHIP_KEYS);
const NEAR_FILTER_KEYS = {
  lat: true,
  lng: true,
  nearRadius: true,
};

function SchoolResult({ resetAll }) {
  const searchParams = useSearchParams();
  const pushQuery = usePushQuery();
  const { values: filterValues, pushQuery: filtersPushQuery } = useFilters();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const nearRadius = searchParams.get("nearRadius") || "10";
  const isNearMode = Boolean(lat && lng);

  const queryString = searchParams.toString();
  const { data, isLoading, isError, isFetching } = useSchools(queryString);

  const schools = data?.data ?? [];
  const total = data?.total ?? 0;
  const totalPages = data?.totalPages ?? 0;
  const page = Math.max(1, Number(searchParams.get("page") ?? 1));

  const goToPage = useCallback((p) => {
    pushQuery({ page: String(p) });
  }, [pushQuery]);

  const removeChip = useCallback((key) => {
    if (key === "__nearMe") {
      pushQuery({ lat: "", lng: "", nearRadius: "" });
    } else {
      pushQuery({ [key]: "" });
    }
  }, [pushQuery]);

  const activeChips = useMemo(() => {
    const district = searchParams.get("district") ?? "";
    const chips = ACTIVE_CHIP_KEY_VALUES
      .filter((k) => !NEAR_FILTER_KEYS[k] && (searchParams.get(k) ?? "") !== "")
      .map((k) => {
        const value = searchParams.get(k);
        return {
          key: k,
          label: `${getLabel(CHIP_LABELS, k)}: ${getFilterValueLabel(k, value, { district })}`,
        };
      });

    if (isNearMode) {
      chips.unshift({ key: "__nearMe", label: `📍 નજીકની શાળાઓ (${nearRadius} કિમી)` });
    }
    return chips;
  }, [isNearMode, nearRadius, searchParams]);

  const hasFilters = activeChips.length > 0;

  return (
    <div className="flex-1 min-w-0">
      <div className="flex items-start justify-between gap-3 mb-4 flex-wrap">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-[var(--color-text-secondary)] mb-2">
            {isLoading ? (
              <span className="inline-block w-24 h-4 bg-slate-100 rounded animate-pulse" />
            ) : (
              <>
                <span className="text-[var(--color-text-primary)] font-bold">{total.toLocaleString()}</span>
                {" "}શાળા મળી
                {isNearMode && <span className="ml-1 text-xs text-[var(--color-text-muted)]">(અંતર પ્રમાણે)</span>}
                {isFetching && !isLoading && (
                  <span className="ml-2 text-[var(--color-text-muted)] text-xs">અપડેટ…</span>
                )}
              </>
            )}
          </p>

          {hasFilters && (
            <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1.5">
              {activeChips.map(({ key, label }) => (
                <span key={key} className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[var(--color-primary-light)] text-[var(--color-primary)] border border-[var(--color-primary-muted)]">
                  {label}
                  <button onClick={() => removeChip(key)} aria-label={`Remove ${label}`} className="opacity-70 hover:opacity-100 leading-none text-sm">×</button>
                </span>
              ))}
              <button onClick={resetAll} className="text-[10px] text-[var(--color-error-text)] underline underline-offset-2 hover:opacity-80">બધા હટાવો</button>
            </div>
          )}
        </div>

        {!isNearMode && (
          <div className="hidden lg:block shrink-0">
            <select
              value={filterValues.sortBy}
              onChange={(e) => filtersPushQuery({ sortBy: e.target.value, page: "1" })}
              className="text-xs rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] px-2.5 py-2 outline-none focus:border-[var(--color-primary)] cursor-pointer"
              aria-label="Sort results"
            >
              {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        )}
      </div>

      {isError && (
        <div role="alert" className="bg-[var(--color-error-light)] border border-red-200 rounded-xl p-4 text-sm text-[var(--color-error-text)] mb-4">
          ⚠ ડેટા લોડ કરવામાં ભૂલ થઈ — ફરી પ્રયાસ કરો.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {isLoading ? (
          Array.from({ length: 8 }, (_, i) => <SchoolCardSkeleton key={i} />)
        ) : schools.length > 0 ? (
          schools.map((s) => <SchoolCard key={s._id ?? s.schoolId} school={s} />)
        ) : (
          <div className="col-span-2 text-center py-16 text-[var(--color-text-muted)]">
            <p className="text-4xl mb-3" role="img" aria-label="School">🏫</p>
            <p className="font-semibold text-[var(--color-text-secondary)]">કોઈ શાળા મળી નહિ</p>
            <p className="text-sm mt-1">{isNearMode ? "radius વધારીને જુઓ" : "ફિલ્ટર બદલો અથવા બીજો શબ્દ search કરો"}</p>
            <button onClick={resetAll} className="mt-4 text-xs text-[var(--color-primary)] underline underline-offset-2 hover:opacity-80">ફિલ્ટર reset કરો</button>
          </div>
        )}
      </div>

      <Pagination page={page} totalPages={totalPages} onPageChange={goToPage} />
      {!isLoading && totalPages > 1 && (
        <p className="text-center text-xs text-[var(--color-text-muted)] mt-3">પૃષ્ઠ {page} / {totalPages}</p>
      )}
    </div>
  );
}

export default React.memo(SchoolResult);
