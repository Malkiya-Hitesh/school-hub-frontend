/**
 * useSchools.js
 * ─────────────────────────────────────────────────────────────
 * TanStack Query (React Query) hooks for school data.
 * schoolApi.js does the fetching; these hooks own the cache keys.
 * ─────────────────────────────────────────────────────────────
 */

"use client";

import { useQuery } from "@tanstack/react-query";
import {
  fetchSchools,
  fetchSchoolBySlug,
  fetchSchoolById,
  fetchNearbySchools,
} from "@/lib/schoolApi";

/* ── Stable query-key factory ────────────────────────────── */
export const schoolKeys = {
  all:    ()        => ["schools"],
  list:   (qs)      => ["schools", "list", qs],
  slug:   (slug)    => ["schools", "slug", slug],
  byId:   (id)      => ["schools", "id", id],
  nearby: (coords)  => ["schools", "nearby", coords],
};

/* ── Main list hook ──────────────────────────────────────── */
/**
 * @param {string} queryString  Raw search-params string from useSearchParams()
 */
export function useSchools(queryString = "") {
  return useQuery({
    queryKey:        schoolKeys.list(queryString),
    queryFn:         () => fetchSchools(queryString),
    staleTime:       60_000,          // 1 min in-memory freshness
    gcTime:          5 * 60_000,      // 5 min garbage-collect
    placeholderData: (prev) => prev,  // keep old data while re-fetching
  });
}

/* ── School detail (by slug) ─────────────────────────────── */
export function useSchoolBySlug(slug) {
  return useQuery({
    queryKey:  schoolKeys.slug(slug),
    queryFn:   () => fetchSchoolBySlug(slug),
    enabled:   Boolean(slug),
    staleTime: 10 * 60_000,
    gcTime:    30 * 60_000,
  });
}

/* ── School detail (by UDISE id) ────────────────────────── */
export function useSchoolById(schoolId) {
  return useQuery({
    queryKey:  schoolKeys.byId(schoolId),
    queryFn:   () => fetchSchoolById(schoolId),
    enabled:   Boolean(schoolId),
    staleTime: 10 * 60_000,
    gcTime:    30 * 60_000,
  });
}

/* ── Nearby schools ─────────────────────────────────────── */
export function useNearbySchools({ lat, lng, radius = 10, limit = 10 } = {}) {
  return useQuery({
    queryKey:  schoolKeys.nearby({ lat, lng, radius }),
    queryFn:   () => fetchNearbySchools({ lat, lng, radius, limit }),
    enabled:   Boolean(lat && lng),
    staleTime: 2 * 60_000,
    gcTime:    10 * 60_000,
  });
}