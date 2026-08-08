/**
 * schoolApi.js
 * ─────────────────────────────────────────────────────────────
 * All school-related API calls.
 * • Uses native fetch (no axios)
 * • next: { revalidate: 86400 }  → 24-hour ISR cache on every request
 * • Throws a typed ApiError so callers can distinguish HTTP errors
 *   from network errors.
 * ─────────────────────────────────────────────────────────────
 */
//  /src/lib/schoolApi.js
const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "http://localhost:5000/api";

/* ── Typed error ─────────────────────────────────────────── */
export class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

/* ── Core fetch wrapper ──────────────────────────────────── */
async function apiFetch(path, init = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...init.headers },
    next: { revalidate: 86400 }, // 24-hour cache (Next.js App Router)
  });

  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new ApiError(res.status, text);
  }

  return res.json();
}

/* ── Schools list (filtered / paginated) ────────────────── */
/**
 * @param {string} queryString  e.g. "district=RAJKOT&page=2&limit=12"
 * @returns {Promise<{ data: School[], total: number, totalPages: number, page: number }>}
 */
export function fetchSchools(queryString = "") {
  const qs = queryString ? `?${queryString}` : "";
  return apiFetch(`/schools${qs}`);
}

/* ── Single school by slug ──────────────────────────────── */
/**
 * @param {string} slug
 * @returns {Promise<School>}
 */
export function fetchSchoolBySlug(slug) {
  return apiFetch(`/schools/slug/${encodeURIComponent(slug)}`);
}

/* ── Single school by UDISE id ──────────────────────────── */
/**
 * @param {string|number} schoolId
 * @returns {Promise<School>}
 */
export function fetchSchoolById(schoolId) {
  return apiFetch(`/schools/by-id/${encodeURIComponent(schoolId)}`);
}

// /* ── Nearby schools ─────────────────────────────────────── */
// /**
//  * @param {{ lat: number, lng: number, radius?: number, limit?: number }}
//  * @returns {Promise<School[]>}
//  */
// export function fetchNearbySchools({ lat, lng, radius = 10, limit = 10 }) {
//   const qs = new URLSearchParams({
//     lat: String(lat),
//     lng: String(lng),
//     radius: String(radius),
//     limit: String(limit),
//   });
//   return apiFetch(`/schools/nearby?${qs}`);
// }