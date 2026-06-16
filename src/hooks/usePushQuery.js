"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

/** Read the current value of a single query param */
export function useQueryParam(key) {
  const searchParams = useSearchParams();
  return searchParams.get(key) ?? "";
}

/** Read ALL current query params as a plain object */
export function useQueryParams() {
  const searchParams = useSearchParams();
  const obj = {};
  for (const [k, v] of searchParams.entries()) obj[k] = v;
  return obj;
}

/** Returns a push function — does NOT return a boolean */
export function usePushQuery() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (queries) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(queries).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") {
        params.delete(key);
      } else {
        // Toggle: if the value is already set, remove it; otherwise set it
        if (params.get(key) === String(value)) {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      }
    });
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };
}