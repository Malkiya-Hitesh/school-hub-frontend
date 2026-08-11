const normalizeBaseUrl = (value) => (value || "/api").replace(/\/$/, "");
const BASE_URL = normalizeBaseUrl(process.env.NEXT_PUBLIC_API_URL);

const buildUrl = (path) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_URL}${normalizedPath}`;
};

// ─── Core fetcher ─────────────────────────────────────────────
async function apiFetch(path, options = {}) {
  const url = buildUrl(path);

  const config = {
    credentials: "include",           // always send/receive cookies
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  };

  if (options.body instanceof FormData) {
    delete config.headers["Content-Type"];
  }

  try {
    const res  = await fetch(url, config);
    const data = await res.json();

    return { data, status: res.status, ok: res.ok };
  } catch (err) {
    return {
      data:   { success: false, message: "Network error. Please check your connection.", err },
      status: 0,
      ok:     false,
    };
  }
}



export const studentApi = {
  

   login: (url,body) =>
  apiFetch(url, {
      method: "POST",
      body:   JSON.stringify(body),
    }),


  me: (url) =>
    apiFetch(url, {
      method: "GET",
    }),

  register: (url ,body) =>
    apiFetch(url, {
      method: "POST",
      body:   JSON.stringify(body),
    }),


  logout: (url) =>
    apiFetch(url, {
      method: "POST",
    }),

 
};