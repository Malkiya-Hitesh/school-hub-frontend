// lib.js
// Central API helper for School Hub
// Rules:
//   - fetch only (no axios)
//   - credentials: "include" always (cookie-based auth)
//   - returns { data, error, status }

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// ─── Core fetcher ─────────────────────────────────────────────
async function apiFetch(path, options = {}) {
  const url = `${BASE_URL}${path}`;

  const config = {
    credentials: "include",           // always send/receive cookies
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  };

  // Don't set Content-Type for FormData
  if (options.body instanceof FormData) {
    delete config.headers["Content-Type"];
  }

  try {
    const res  = await fetch(url, config);
    const data = await res.json();
    return { data, status: res.status, ok: res.ok };
  } catch (err) {
    return {
      data:   { success: false, message: "Network error. Please check your connection." },
      status: 0,
      ok:     false,
    };
  }
}

// ─── Auth API ─────────────────────────────────────────────────

export const authApi = {
  // POST /auth/register
  register: (body) =>
    apiFetch("/auth/register", {
      method: "POST",
      body:   JSON.stringify(body),
    }),

  // POST /auth/login
  login: (body) =>
    apiFetch("/auth/login", {
      method: "POST",
      body:   JSON.stringify(body),
    }),

  // POST /auth/logout
  logout: () =>
    apiFetch("/auth/logout", {
      method: "POST",
    }),

  // GET /auth/me
  me: () =>
    apiFetch("/auth/me", {
      method: "GET",
    }),

  // PATCH /auth/me
  updateMe: (body) =>
    apiFetch("/auth/me", {
      method: "PATCH",
      body:   JSON.stringify(body),
    }),

  // PATCH /auth/change-password
  changePassword: (body) =>
    apiFetch("/auth/change-password", {
      method: "PATCH",
      body:   JSON.stringify(body),
    }),
};

// ─── Dashboard API ────────────────────────────────────────────

export const dashboardApi = {
  // GET /dashboard/stats
  stats: () =>
    apiFetch("/dashboard/stats", { method: "GET" }),

  // GET /dashboard/school
  getSchool: () =>
    apiFetch("/dashboard/school", { method: "GET" }),

  // POST /dashboard/school/register
  registerSchool: (body) =>
    apiFetch("/dashboard/school/register", {
      method: "POST",
      body:   JSON.stringify(body),
    }),

  // PATCH /dashboard/school/basics
  updateBasics: (body) =>
    apiFetch("/dashboard/school/basics", {
      method: "PATCH",
      body:   JSON.stringify(body),
    }),

  // PATCH /dashboard/school/address
  updateAddress: (body) =>
    apiFetch("/dashboard/school/address", {
      method: "PATCH",
      body:   JSON.stringify(body),
    }),

  // PATCH /dashboard/school/academics
  updateAcademics: (body) =>
    apiFetch("/dashboard/school/academics", {
      method: "PATCH",
      body:   JSON.stringify(body),
    }),

  // PATCH /dashboard/school/fees
  updateFees: (body) =>
    apiFetch("/dashboard/school/fees", {
      method: "PATCH",
      body:   JSON.stringify(body),
    }),

  // PATCH /dashboard/school/category
  updateCategory: (body) =>
    apiFetch("/dashboard/school/category", {
      method: "PATCH",
      body:   JSON.stringify(body),
    }),

  // PATCH /dashboard/school/contact
  updateContact: (body) =>
    apiFetch("/dashboard/school/contact", {
      method: "PATCH",
      body:   JSON.stringify(body),
    }),
};

// ─── Claim API ───────────────────────────────────────────────

export const claimApi = {
  // GET /claim/search?last5=xxxxx
  search: (last5) =>
    apiFetch(`/claim/search?last5=${last5}`, {
      method: "GET",
    }),

  // POST /claim/initiate
  initiate: (body) =>
    apiFetch("/claim/initiate", {
      method: "POST",
      body:   JSON.stringify(body),
    }),

  // POST /claim/verify-otp
  verifyOtp: (body) =>
    apiFetch("/claim/verify-otp", {
      method: "POST",
      body:   JSON.stringify(body),
    }),

  // POST /claim/submit
  submit: (body) =>
    apiFetch("/claim/submit", {
      method: "POST",
      body:   JSON.stringify(body),
    }),
};

export default apiFetch;