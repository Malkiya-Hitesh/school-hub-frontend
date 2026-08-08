//   /src/hooks/useSchools.js
"use client";

import { useQuery } from "@tanstack/react-query";
import {
  fetchSchools,
  fetchSchoolBySlug,
  fetchSchoolById,

} from "@/lib/schoolApi";

export const schoolKeys = {
  all:    ()        => ["schools"],
  list:   (qs)      => ["schools", "list", qs],
  slug:   (slug)    => ["schools", "slug", slug],
  byId:   (id)      => ["schools", "id", id],
  nearby: (coords)  => ["schools", "nearby", coords],
};

export function useSchools(queryString = "", options = {}) {
  return useQuery({
    queryKey:        schoolKeys.list(queryString),
    queryFn:         () => fetchSchools(queryString),
     staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime:          1000 * 60 * 5,
     refetchOnWindowFocus: false,
    placeholderData: (prev) => prev,
    enabled:         options.enabled ?? true,
      refetchOnMount: false,
  });
}

export function useSchoolBySlug(slug) {
  return useQuery({
    queryKey:  schoolKeys.slug(slug),
    queryFn:   () => fetchSchoolBySlug(slug),
    enabled:   Boolean(slug),
     staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime:          1000 * 60 * 5,
     refetchOnWindowFocus: false,
       refetchOnMount: false,
  });
}

export function useSchoolById(schoolId) {
  return useQuery({
    queryKey:  schoolKeys.byId(schoolId),
    queryFn:   () => fetchSchoolById(schoolId),
    enabled:   Boolean(schoolId),
    staleTime: 10 * 60_000,
    gcTime:    30 * 60_000,
  });
}

// export function useNearbySchools({ lat, lng, radius = 10, limit = 10 } = {}) {
//   return useQuery({
//     queryKey:  schoolKeys.nearby({ lat, lng, radius }),
//     queryFn:   () => fetchNearbySchools({ lat, lng, radius, limit }),
//     enabled:   Boolean(lat && lng),
//     staleTime: 2 * 60_000,
//     gcTime:    1,
//   });
// }