/**
 * FilterSidebar.jsx
 * ─────────────────────────────────────────────────────────────
 * Reads/writes URL search-params via usePushQuery.
 * Features:
 *   • District → Taluka cascade
 *   • Medium, Board, Management, School type, Location chips
 *   • Sort-by selector
 *   • Active filter chips row at the top with ×  per chip
 *   • Full reset button
 * ─────────────────────────────────────────────────────────────
 */

"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { usePushQuery } from "@/hooks/usePushQuery";
import {
  GUJARAT_DISTRICTS,
  DISTRICTS_WITH_TALUKA,
  STATIC_MEDIUMS,
  STATIC_BOARDS,
  STATIC_SCHOOL_MaNAGEMENTS,
  STATIC_SCHOOL_TYPES,
  STATIC_LOCATION_TYPES,
} from "@/lib/constants";

/* ── Constants ─────────────────────────────────────────────── */
const SORT_OPTIONS = [
  { value: "",         label: "ડિફૉલ્ટ"     },
  { value: "students", label: "વિદ્યાર્થી ↓" },
  { value: "name",     label: "નામ A–Z"      },
  { value: "district", label: "જિલ્લો A–Z"   },
  { value: "newest",   label: "નવી પહેલા"    },
];

/* ── Filter param keys that show as chips ───────────────────── */
const CHIP_KEYS = ["district", "taluka", "medium", "board", "management", "schoolType", "locationType"];

const CHIP_LABELS = {
  district:     "જિલ્લો",
  taluka:       "તાલુકો",
  medium:       "માધ્યમ",
  board:        "બોર્ડ",
  management:   "વ્યવ.",
  schoolType:   "પ્રકાર",
  locationType: "વિસ્તાર",
};

/* ═══════════════════════════════════════════════════════════
   Sub-components
   ═══════════════════════════════════════════════════════════ */
function Section({ title, children }) {
  return (
    <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl p-4 mb-3">
      <h4 className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest mb-3">
        {title}
      </h4>
      {children}
    </div>
  );
}

function Chip({ label, active, onClick, onRemove }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold",
        "border transition-colors mr-1.5 mb-1.5",
        active
          ? "bg-[var(--color-primary-light)] text-[var(--color-primary)] border-[var(--color-primary-muted)]"
          : "bg-[var(--color-bg-page)] text-[var(--color-text-secondary)] border-[var(--color-border)] hover:border-[var(--color-border-strong)]",
      )}
    >
      {label}
      {active && onRemove && (
        <span
          role="button"
          aria-label="Remove filter"
          onClick={(e) => { e.stopPropagation(); onRemove(); }}
          className="ml-0.5 text-[var(--color-primary)] opacity-70 hover:opacity-100 leading-none"
        >
          ×
        </span>
      )}
    </button>
  );
}

function CheckRow({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-2 py-1.5 cursor-pointer select-none">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="accent-[var(--color-primary)] w-3.5 h-3.5 shrink-0"
      />
      <span className={cn(
        "text-xs flex-1 leading-tight",
        checked ? "text-[var(--color-text-primary)] font-semibold" : "text-[var(--color-text-secondary)]",
      )}>
        {label}
      </span>
    </label>
  );
}

/* ═══════════════════════════════════════════════════════════
   FilterSidebar
   ═══════════════════════════════════════════════════════════ */
export default function FilterSidebar({ onClose }) {
  const pushQuery    = usePushQuery();
  const searchParams = useSearchParams();
  const router       = useRouter();
  const pathname     = usePathname();

  /* ── Helpers ─────────────────────────────────────────────── */
  const get    = (key)        => searchParams.get(key) ?? "";
  const isOn   = (key, value) => get(key) === String(value);
  const toggle = (key, value) => pushQuery({ [key]: value, page: "1" });

  /* ── District → Taluka cascade ───────────────────────────── */
  const selectedDistrict = get("district");
  const talukas          = selectedDistrict ? (DISTRICTS_WITH_TALUKA[selectedDistrict] ?? []) : [];

  function handleDistrictToggle(d) {
    const same = isOn("district", d);
    // If deselecting district, also clear taluka
    pushQuery({ district: same ? "" : d, taluka: "", page: "1" });
  }

  /* ── Active filter chips ─────────────────────────────────── */
  const activeFilters = CHIP_KEYS
    .filter((k) => get(k) !== "")
    .map((k) => ({ key: k, value: get(k), label: `${CHIP_LABELS[k]}: ${get(k)}` }));

  const hasFilters = activeFilters.length > 0 || get("q") !== "" || get("sortBy") !== "";

  function resetAll() {
    router.push(pathname);
    onClose?.();
  }

  /* ── Render ──────────────────────────────────────────────── */
  return (
    <aside className="w-60 shrink-0 sticky top-[calc(var(--navbar-height,64px)+16px)] self-start min-h-[calc(100vh-96px)]  max-h-[100%]: overflow-y-auto pr-1 scrollbar-thin">

      {/* ── Active chips ── */}
      {activeFilters.length > 0 && (
        <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl p-3 mb-3">
          <p className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest mb-2">
            સક્રિય ફિલ્ટર
          </p>
          <div className="flex flex-wrap">
            {activeFilters.map(({ key, value, label }) => (
              <Chip
                key={key}
                label={label}
                active
                onRemove={() => pushQuery({ [key]: "", page: "1" })}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── Reset button ── */}
      {hasFilters && (
        <button
          onClick={resetAll}
          className="w-full mb-3 py-2 rounded-xl text-xs font-bold bg-[var(--color-error-light)] text-[var(--color-error-text)] border border-red-200 hover:opacity-80 transition-opacity"
        >
          ✕ બધા ફિલ્ટર હટાવો
        </button>
      )}

      {/* ── Sort ── */}
      <Section title="ક્રમ">
        <select
          value={get("sortBy")}
          onChange={(e) => pushQuery({ sortBy: e.target.value, page: "1" })}
          className="w-full text-xs rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-page)] text-[var(--color-text-primary)] px-2.5 py-2 outline-none focus:border-[var(--color-primary)]"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </Section>

      {/* ── District ── */}
      <Section title="જિલ્લો">
        <div className="max-h-48 overflow-y-auto flex flex-col pr-1 scrollbar-thin">
          {GUJARAT_DISTRICTS.map((d) => (
            <CheckRow
              key={d}
              label={d}
              checked={isOn("district", d)}
              onChange={() => handleDistrictToggle(d)}
            />
          ))}
        </div>
      </Section>

      {/* ── Taluka (only when a district is selected) ── */}
      {talukas.length > 0 && (
        <Section title={`તાલુકો — ${selectedDistrict}`}>
          <div className="max-h-48 overflow-y-auto flex flex-col pr-1 scrollbar-thin">
            {talukas.map((t) => (
              <CheckRow
                key={t}
                label={t}
                checked={isOn("taluka", t)}
                onChange={() => toggle("taluka", t)}
              />
            ))}
          </div>
        </Section>
      )}

      {/* ── Medium ── */}
      <Section title="માધ્યમ">
        <div className="flex flex-wrap">
          {STATIC_MEDIUMS.map((m) => (
            <Chip
              key={m}
              label={m}
              active={isOn("medium", m)}
              onClick={() => toggle("medium", m)}
              onRemove={() => toggle("medium", m)}
            />
          ))}
        </div>
      </Section>

      {/* ── Board ── */}
      <Section title="બોર્ડ">
        <div className="flex flex-wrap">
          {STATIC_BOARDS.map((b) => (
            <Chip
              key={b}
              label={b}
              active={isOn("board", b)}
              onClick={() => toggle("board", b)}
              onRemove={() => toggle("board", b)}
            />
          ))}
        </div>
      </Section>

      {/* ── Management ── */}
      <Section title="વ્યવસ્થાપન">
        <div className="flex flex-col">
          {STATIC_SCHOOL_MaNAGEMENTS.map((m) => (
            <CheckRow
              key={m}
              label={m}
              checked={isOn("management", m)}
              onChange={() => toggle("management", m)}
            />
          ))}
        </div>
      </Section>

      {/* ── School type ── */}
      <Section title="શાળા પ્રકાર">
        <div className="flex flex-wrap">
          {STATIC_SCHOOL_TYPES.map((t) => (
            <Chip
              key={t}
              label={t}
              active={isOn("schoolType", t)}
              onClick={() => toggle("schoolType", t)}
              onRemove={() => toggle("schoolType", t)}
            />
          ))}
        </div>
      </Section>

      {/* ── Location type ── */}
      <Section title="વિસ્તાર">
        <div className="flex flex-wrap">
          {STATIC_LOCATION_TYPES.map((l) => (
            <Chip
              key={l}
              label={l}
              active={isOn("locationType", l)}
              onClick={() => toggle("locationType", l)}
              onRemove={() => toggle("locationType", l)}
            />
          ))}
        </div>
      </Section>

    </aside>
  );
}