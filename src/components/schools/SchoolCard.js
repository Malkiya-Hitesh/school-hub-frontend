/**
 * SchoolCard.jsx
 * ─────────────────────────────────────────────────────────────
 * List-view card. Compact but information-rich.
 * Shows: logo/initials · name · management badge · verified/claimed
 *        location · grade range · medium · board · type · student count
 *        map button
 * ─────────────────────────────────────────────────────────────
 */

import Link from "next/link";
import { cn } from "@/lib/utils";

/* ── Management badge config ─────────────────────────────── */
const MGMT_STYLES = {
  "Government School":         { label: "Govt.",          cls: "bg-emerald-50 text-emerald-800 border-emerald-200" },
  "Government Aided School":   { label: "Govt. Aided",    cls: "bg-sky-50 text-sky-800 border-sky-200" },
  "Private School":            { label: "Private",        cls: "bg-slate-100 text-slate-700 border-slate-200" },
  "Central Government School": { label: "Central Govt.",  cls: "bg-indigo-50 text-indigo-800 border-indigo-200" },
  "Special Government School": { label: "Spec. Govt.",    cls: "bg-teal-50 text-teal-800 border-teal-200" },
  "Recognized Madarsa":        { label: "Madarsa",        cls: "bg-amber-50 text-amber-800 border-amber-200" },
  "Government Aided Madarsa":  { label: "Aided Madarsa",  cls: "bg-amber-50 text-amber-800 border-amber-200" },
  "Unrecognized Madarsa":      { label: "Unrecog. M.",    cls: "bg-orange-50 text-orange-800 border-orange-200" },
  "Unrecognized School":       { label: "Unrecog.",       cls: "bg-red-50 text-red-700 border-red-200" },
};

function getMgmtBadge(management = "") {
  return MGMT_STYLES[management] ?? {
    label: management.slice(0, 14),
    cls:   "bg-slate-100 text-slate-600 border-slate-200",
  };
}

/* ── Helpers ────────────────────────────────────────────── */
function gradeLabel(from, to) {
  if (from == null || to == null) return null;
  return `${from === 0 ? "Nursery" : `Dh.${from}`} – ${to}`;
}

function SchoolAvatar({ logoImg, name }) {
  if (logoImg) {
    return (
      <img
        src={logoImg}
        alt={name}
        width={44}
        height={44}
        className="w-11 h-11 rounded-xl object-cover shrink-0 border border-[var(--color-border)]"
      />
    );
  }
  const initials = (name ?? "S")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div className="w-11 h-11 rounded-xl shrink-0 bg-[var(--color-primary-light)] border border-[var(--color-primary-muted)] flex items-center justify-center text-sm font-extrabold text-[var(--color-primary)] select-none">
      {initials}
    </div>
  );
}

function StatPill({ icon, value }) {
  if (!value) return null;
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[var(--color-text-secondary)] bg-[var(--color-bg-page)] border border-[var(--color-border)] px-2 py-0.5 rounded-md">
      <span className="opacity-60">{icon}</span>
      {value}
    </span>
  );
}

/* ── Skeleton ───────────────────────────────────────────── */
export function SchoolCardSkeleton() {
  return (
    <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl p-4 animate-pulse">
      <div className="flex gap-3 mb-3">
        <div className="w-11 h-11 rounded-xl bg-slate-100 shrink-0" />
        <div className="flex-1 space-y-2 pt-1">
          <div className="h-3.5 bg-slate-100 rounded w-3/4" />
          <div className="h-2.5 bg-slate-100 rounded w-1/3" />
        </div>
      </div>
      <div className="space-y-2 mb-3">
        <div className="h-2.5 bg-slate-100 rounded w-full" />
        <div className="h-2.5 bg-slate-100 rounded w-2/3" />
      </div>
      <div className="flex gap-1.5 pt-3 border-t border-slate-100">
        {[80, 64, 72, 56].map((w, i) => (
          <div key={i} className="h-4 bg-slate-100 rounded" style={{ width: w }} />
        ))}
      </div>
    </div>
  );
}

/* ── SchoolCard ─────────────────────────────────────────── */
export default function SchoolCard({ school }) {
  const slug           = school?.slug                        ?? "#";
  const name           = school?.basics?.schoolName          ?? "—";
  const logoImg        = school?.basics?.logoImg             ?? null;
  const phone          = school?.basics?.phone               ?? null;
  const village        = school?.address?.village            ?? "";
  const taluka         = school?.address?.taluka             ?? "";
  const district       = school?.address?.district           ?? "";
  const mapsUrl        = school?.address?.googleMapsUrl      ?? null;
  const gradeFrom      = school?.academics?.gradeFrom;
  const gradeTo        = school?.academics?.gradeTo;
  const medium         = school?.academics?.medium           ?? [];
  const board          = school?.academics?.board            ?? [];
  const totalStudents  = school?.academics?.totalStudents;
  const totalTeachers  = school?.academics?.totalTeachers;
  const management     = school?.category?.management        ?? "";
  const schoolType     = school?.category?.schoolType        ?? "";
  const locationType   = school?.category?.locationType      ?? "";
  const isVerified     = school?.isVerified                  ?? false;
  const isClaimed      = school?.isClaimed                   ?? false;

  const badge       = getMgmtBadge(management);
  const gradeStr    = gradeLabel(gradeFrom, gradeTo);
  const medStr      = medium.join(" · ");
  const boardStr    = board.join(" / ");
  const typeShort   = schoolType.includes("Co") ? "Co-ed"
                    : schoolType.includes("Boys") ? "Boys"
                    : schoolType.includes("Girls") ? "Girls"
                    : schoolType;

  const locationParts = [village, taluka, district]
    .filter(Boolean)
    .filter((v, i, arr) => arr.indexOf(v) === i);
  const locationLine = locationParts.join(", ");

  return (
    <Link
      href={`/schools/${slug}`}
      className={cn(
        "group block bg-[var(--color-bg-surface)]",
        "border border-[var(--color-border)] rounded-xl p-4",
        "hover:border-[var(--color-primary-muted)] hover:shadow-[var(--shadow-md)]",
        "transition-all duration-200",
      )}
    >
      {/* Top: avatar + name + badges */}
      <div className="flex items-start gap-3 mb-3">
        <SchoolAvatar logoImg={logoImg} name={name} />

        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-1.5">
            <h3 className="text-sm font-bold leading-snug text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors line-clamp-2 flex-1">
              {name}
            </h3>
            {isVerified && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-sky-500 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor" aria-label="Verified">
                <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.491 4.491 0 01-3.497-1.307 4.491 4.491 0 01-1.307-3.497A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
              </svg>
            )}
          </div>

          <div className="flex items-center gap-1 mt-1 flex-wrap">
            <span className={cn("inline-flex text-[10px] font-bold px-2 py-0.5 rounded-md border", badge.cls)}>
              {badge.label}
            </span>
            {isClaimed && (
              <span className="inline-flex text-[10px] font-bold px-2 py-0.5 rounded-md border bg-purple-50 text-purple-700 border-purple-200">
                Claimed
              </span>
            )}
            {locationType && (
              <span className="inline-flex text-[10px] font-semibold px-2 py-0.5 rounded-md border bg-[var(--color-bg-page)] text-[var(--color-text-muted)] border-[var(--color-border)]">
                {locationType}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Location */}
      {locationLine && (
        <div className="flex items-start gap-1.5 mb-2.5">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-[var(--color-text-muted)] mt-px shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0L6.343 16.657a8 8 0 1111.314 0z" />
            <circle cx="12" cy="11" r="3" />
          </svg>
          <span className="text-xs text-[var(--color-text-secondary)] leading-snug line-clamp-1">{locationLine}</span>
        </div>
      )}

      {/* Stats row */}
      {(totalStudents || totalTeachers) && (
        <div className="flex gap-1.5 mb-2.5 flex-wrap">
          {totalStudents && <StatPill icon="👥" value={`${totalStudents} વિદ્યાર્થી`} />}
          {totalTeachers && <StatPill icon="👨‍🏫" value={`${totalTeachers} શિક્ષક`} />}
        </div>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 pt-2.5 border-t border-[var(--color-border)]">
        {gradeStr  && <StatPill icon="📚" value={gradeStr}  />}
        {boardStr  && <StatPill icon="🏛" value={boardStr}  />}
        {medStr    && <StatPill icon="🗣" value={medStr}    />}
        {typeShort && <StatPill icon="🏫" value={typeShort} />}
      </div>

      {/* Map CTA */}
      {mapsUrl && (
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className={cn(
            "mt-3 inline-flex items-center gap-1.5 w-full justify-center",
            "py-1.5 rounded-lg border border-[var(--color-border)]",
            "text-xs font-semibold text-[var(--color-text-secondary)]",
            "hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]",
            "transition-colors",
          )}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 9m0 8V9m0 0L9 7" />
          </svg>
          નકશો જુઓ
        </a>
      )}
    </Link>
  );
}