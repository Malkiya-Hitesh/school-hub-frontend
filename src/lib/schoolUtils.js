// Shared helpers used across the school detail page.
// Centralized so "what counts as empty" is defined once.

/**
 * Treats null/undefined/""/0/empty-array as "no real data".
 * We treat 0 as empty on purpose: a school card showing "0 students"
 * or "0% passing" almost always means the field was never filled in,
 * not that it's genuinely zero. If you ever need a real zero to show,
 * use hasValueStrict() instead.
 */
export function hasValue(v) {
  if (v === null || v === undefined || v === "") return false;
  if (typeof v === "number" && v === 0) return false;
  if (Array.isArray(v) && v.length === 0) return false;
  return true;
}

// Strict version: only null/undefined/""/empty-array count as empty (0 is valid)
export function hasValueStrict(v) {
  if (v === null || v === undefined || v === "") return false;
  if (Array.isArray(v) && v.length === 0) return false;
  return true;
}

export function safeArray(v) {
  return Array.isArray(v) ? v : [];
}

export function safeString(v) {
  return typeof v === "string" ? v : v == null ? "" : String(v);
}

export function safeJoin(parts, sep = ", ") {
  return parts.filter(Boolean).join(sep);
}

export function formatPercent(v) {
  return hasValue(v) ? `${v}%` : null;
}

export function getInitials(name = "") {
  const words = safeString(name).trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "?";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

export function getAvatarColor(name = "") {
  const colors = [
    "bg-indigo-500", "bg-blue-500", "bg-sky-500", "bg-teal-500",
    "bg-emerald-500", "bg-amber-500", "bg-rose-500", "bg-purple-500",
  ];
  const str = safeString(name);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}



export function toDisplayString(value) {
  if (value === null || value === undefined || value === "") return null;

  if (Array.isArray(value)) {
    return value.length > 0 ? value.filter(Boolean).join(", ") : null;
  }

  if (typeof value === "object") {
    const parts = Object.entries(value)
      .filter(([, v]) => v !== null && v !== undefined && v !== "")
      .map(([key, v]) => {
        const label = key.charAt(0).toUpperCase() + key.slice(1);
        return `${label}: ${v}`;
      });
    return parts.length > 0 ? parts.join(" · ") : null;
  }

  if (typeof value === "number" && value === 0) return null;

  return String(value);
}