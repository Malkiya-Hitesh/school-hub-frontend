/**
 * app/schools/[slug]/page.jsx   (Next.js App Router)
 * ─────────────────────────────────────────────────────────────
 * Full school profile page.
 *
 * Sections:
 *   1. Hero — cover/avatar, name, badges, quick-stats bar
 *   2. Overview — established, category, UDISE, address
 *   3. Academics — grades, medium, board, shifts, streams
 *   4. Students & Teachers — totals, gender breakdown, ratio
 *   5. Facilities — visual icon grid
 *   6. Computers & Tech — detailed tech inventory
 *   7. Contact — phone, email, website
 *   8. Map — embedded iframe + directions link
 *
 * Uses only CSS variables + Tailwind (no extra deps).
 * ─────────────────────────────────────────────────────────────
 */

"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useSchoolBySlug } from "@/hooks/useSchools";
import { cn } from "@/lib/utils";

/* ══════════════════════════════════════════════════════════════
   CONSTANTS / HELPERS
   ══════════════════════════════════════════════════════════════ */

const MGMT_STYLES = {
  "Government School":         "bg-emerald-50 text-emerald-800 border-emerald-200",
  "Government Aided School":   "bg-sky-50 text-sky-800 border-sky-200",
  "Private School":            "bg-slate-100 text-slate-700 border-slate-200",
  "Central Government School": "bg-indigo-50 text-indigo-800 border-indigo-200",
  "Special Government School": "bg-teal-50 text-teal-800 border-teal-200",
  "Recognized Madarsa":        "bg-amber-50 text-amber-800 border-amber-200",
  "Government Aided Madarsa":  "bg-amber-50 text-amber-800 border-amber-200",
  "Unrecognized Madarsa":      "bg-orange-50 text-orange-800 border-orange-200",
  "Unrecognized School":       "bg-red-50 text-red-700 border-red-200",
};

function gradeLabel(from, to) {
  if (from == null || to == null) return "—";
  return `${from === 0 ? "Nursery" : `Dh. ${from}`} – Dh. ${to}`;
}

function pct(part, total) {
  if (!part || !total) return 0;
  return Math.round((part / total) * 100);
}

/* ══════════════════════════════════════════════════════════════
   SMALL SHARED COMPONENTS
   ══════════════════════════════════════════════════════════════ */

/** Section card wrapper */
function Card({ children, className }) {
  return (
    <div className={cn("bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-2xl p-5 sm:p-6", className)}>
      {children}
    </div>
  );
}

/** Section heading */
function SectionTitle({ icon, children }) {
  return (
    <h2 className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
      <span className="text-base">{icon}</span>
      {children}
    </h2>
  );
}

/** Key-value row */
function DataRow({ label, value, mono = false }) {
  if (!value && value !== 0) return null;
  return (
    <div className="flex justify-between items-start gap-4 py-2 border-b border-[var(--color-border)] last:border-0">
      <span className="text-xs text-[var(--color-text-muted)] shrink-0">{label}</span>
      <span className={cn("text-xs font-semibold text-[var(--color-text-primary)] text-right", mono && "font-mono")}>
        {value}
      </span>
    </div>
  );
}

/** Inline badge */
function Badge({ children, className }) {
  if (!children) return null;
  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-bold border",
      className ?? "bg-[var(--color-bg-page)] text-[var(--color-text-secondary)] border-[var(--color-border)]",
    )}>
      {children}
    </span>
  );
}

/** Facility tile */
function FacilityTile({ icon, label, active }) {
  return (
    <div className={cn(
      "flex flex-col items-center gap-1.5 rounded-xl p-3 border text-center",
      active
        ? "bg-emerald-50 border-emerald-200 text-emerald-800"
        : "bg-[var(--color-bg-page)] border-[var(--color-border)] text-[var(--color-text-muted)] opacity-50",
    )}>
      <span className="text-xl leading-none">{icon}</span>
      <span className="text-[10px] font-semibold leading-tight">{label}</span>
    </div>
  );
}

/** Gender bar */
function GenderBar({ boys, girls, total }) {
  if (!total) return null;
  const boyPct  = pct(boys, total);
  const girlPct = 100 - boyPct;
  return (
    <div className="mt-2">
      <div className="flex rounded-full overflow-hidden h-3 w-full">
        <div className="bg-sky-400 transition-all" style={{ width: `${boyPct}%` }} title={`Boys ${boyPct}%`} />
        <div className="bg-pink-400 transition-all" style={{ width: `${girlPct}%` }} title={`Girls ${girlPct}%`} />
      </div>
      <div className="flex justify-between mt-1.5 text-[10px] font-semibold">
        <span className="text-sky-600">👦 Boys {boys} ({boyPct}%)</span>
        <span className="text-pink-600">👧 Girls {girls} ({girlPct}%)</span>
      </div>
    </div>
  );
}

/** Quick-stat card in the hero */
function HeroStat({ icon, label, value }) {
  if (!value && value !== 0) return null;
  return (
    <div className="flex flex-col items-center gap-0.5 px-4 py-2.5 bg-white/10 rounded-xl border border-white/20 min-w-[72px]">
      <span className="text-lg leading-none">{icon}</span>
      <span className="text-base font-extrabold text-white leading-none">{value}</span>
      <span className="text-[10px] text-white/70 font-medium">{label}</span>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   SKELETON
   ══════════════════════════════════════════════════════════════ */
function DetailSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-44 bg-slate-200 rounded-2xl" />
      <div className="h-6 bg-slate-100 rounded w-2/3" />
      <div className="grid grid-cols-2 gap-3">
        {[1,2,3,4].map(i => <div key={i} className="h-32 bg-slate-100 rounded-2xl" />)}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN PAGE
   ══════════════════════════════════════════════════════════════ */
export default function SchoolDetailPage() {
  const { slug }  = useParams();
  const router    = useRouter();

  const { data: res, isLoading, isError } = useSchoolBySlug(slug);
  const s = res?.data ?? res; // handle both { data: ... } and direct object

  if (isLoading) {
    return (
      <main className="page-top max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <DetailSkeleton />
      </main>
    );
  }

  if (isError || !s) {
    return (
      <main className="page-top max-w-4xl mx-auto px-4 sm:px-6 py-8 text-center">
        <p className="text-4xl mb-3">🏫</p>
        <p className="font-bold text-[var(--color-text-primary)]">શાળા મળી નહિ</p>
        <button onClick={() => router.back()} className="mt-4 text-xs text-[var(--color-primary)] underline">
          ← પાછા જાઓ
        </button>
      </main>
    );
  }

  /* ── Destructure all fields ────────────────────────────── */
  const name            = s.basics?.schoolName        ?? "—";
  const logoImg         = s.basics?.logoImg           ?? null;
  const coverImg        = s.basics?.coverImg          ?? null;
  const phone           = s.basics?.phone             ?? null;
  const email           = s.basics?.email             ?? null;
  const website         = s.basics?.website           ?? null;
  const description     = s.basics?.description       ?? null;
  const trustName       = s.basics?.trustName         ?? null;
  const estYear         = s.basics?.establishedYear   ?? null;

  const fullAddress     = s.address?.full             ?? null;
  const village         = s.address?.village          ?? "";
  const taluka          = s.address?.taluka           ?? "";
  const district        = s.address?.district         ?? "";
  const state           = s.address?.state            ?? "";
  const pincode         = s.address?.pincode          ?? null;
  const coords          = s.address?.geo?.coordinates ?? null; // [lng, lat]
  const mapsUrl         = s.address?.googleMapsUrl    ?? null;

  const gradeFrom       = s.academics?.gradeFrom;
  const gradeTo         = s.academics?.gradeTo;
  const medium          = s.academics?.medium         ?? [];
  const board           = s.academics?.board          ?? [];
  const streams         = s.academics?.streams        ?? [];
  const shifts          = s.academics?.shifts         ?? [];
  const totalStudents   = s.academics?.totalStudents;
  const totalTeachers   = s.academics?.totalTeachers;
  const totalBoys       = s.academics?.totalBoys;
  const totalGirls      = s.academics?.totalGirls;
  const teacherMale     = s.academics?.totalTeacherMale;
  const teacherFemale   = s.academics?.totalTeacherFemale;
  const stRatio         = s.academics?.studentTeacherRatio;

  const management      = s.category?.management      ?? "";
  const schoolType      = s.category?.schoolType      ?? "";
  const locationType    = s.category?.locationType    ?? "";
  const categoryType    = s.category?.type            ?? "";

  const udiseCode       = s.udiseCode                 ?? null;
  const schoolId        = s.schoolId                  ?? null;
  const isVerified      = s.isVerified                ?? false;
  const isClaimed       = s.isClaimed                 ?? false;
  const yearDesc        = s._udiseRaw?.yearDesc        ?? null;

  const fac             = s.facility                  ?? {};
  const computers       = fac.computers               ?? {};

  const mgmtCls = MGMT_STYLES[management] ?? "bg-slate-100 text-slate-600 border-slate-200";

  // Initials avatar
  const initials = name.trim().split(/\s+/).slice(0, 2).map(w => w[0]).join("").toUpperCase();

  /* ── Map embed src ─────────────────────────────────────── */
  const mapSrc = coords
    ? `https://maps.google.com/maps?q=${coords[1]},${coords[0]}&z=15&output=embed`
    : null;

  /* ── Facility list ─────────────────────────────────────── */
  const FACILITIES = [
    { icon: "💧", label: "Drinking Water",  key: "drinkingWater"  },
    { icon: "⚡",  label: "Electricity",    key: "electricity"    },
    { icon: "📚",  label: "Library",        key: "library"        },
    { icon: "⚽",  label: "Playground",     key: "playground"     },
    { icon: "🌐",  label: "Internet",       key: "internet"       },
    { icon: "☀️",  label: "Solar Panel",    key: "solarPanel"     },
    { icon: "♿",  label: "Ramps",          key: "ramps"          },
    { icon: "🏥",  label: "Medical Checkup",key: "medicalCheckup" },
    { icon: "🔬",  label: "Integrated Lab", key: "integratedLab"  },
  ];

  /* ══════════════════════════════════════════════════════════
     RENDER
     ══════════════════════════════════════════════════════════ */
  return (
    <main className="page-top min-h-screen bg-[var(--color-bg-page)]">

      {/* ── Back link ── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-4 pb-2">
        <Link
          href="/schools"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          બધી શાળા
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-12 space-y-4">

        {/* ══ HERO CARD ══════════════════════════════════════ */}
        <div className="relative rounded-2xl overflow-hidden bg-[var(--color-primary)] shadow-lg">

          {/* Cover image or gradient pattern */}
          {coverImg ? (
            <img src={coverImg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
          ) : (
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
          )}

          <div className="relative z-10 p-5 sm:p-7">
            {/* Avatar + name */}
            <div className="flex items-start gap-4 mb-5">
              {logoImg ? (
                <img
                  src={logoImg}
                  alt={name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-white/30 shrink-0 shadow-lg"
                />
              ) : (
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/20 border-2 border-white/30 shrink-0 flex items-center justify-center text-xl sm:text-2xl font-extrabold text-white shadow-lg">
                  {initials}
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-2 flex-wrap mb-2">
                  <h1 className="text-lg sm:text-2xl font-extrabold text-white leading-tight flex-1">
                    {name}
                  </h1>
                  {isVerified && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-sky-300 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.491 4.491 0 01-3.497-1.307 4.491 4.491 0 01-1.307-3.497A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>

                {/* Location line */}
                <p className="text-white/75 text-sm mb-2">
                  {[village, taluka, district, state].filter(Boolean).join(", ")}
                  {pincode && ` – ${pincode}`}
                </p>

                {/* Management + other badges */}
                <div className="flex flex-wrap gap-1.5">
                  <span className={cn("inline-flex text-[11px] font-bold px-2.5 py-0.5 rounded-lg border", mgmtCls)}>
                    {management}
                  </span>
                  {schoolType && (
                    <span className="inline-flex text-[11px] font-bold px-2.5 py-0.5 rounded-lg border bg-white/15 text-white border-white/25">
                      {schoolType}
                    </span>
                  )}
                  {locationType && (
                    <span className="inline-flex text-[11px] font-bold px-2.5 py-0.5 rounded-lg border bg-white/15 text-white border-white/25">
                      {locationType}
                    </span>
                  )}
                  {isClaimed && (
                    <span className="inline-flex text-[11px] font-bold px-2.5 py-0.5 rounded-lg border bg-purple-100 text-purple-800 border-purple-200">
                      Claimed
                    </span>
                  )}
                  {yearDesc && (
                    <span className="inline-flex text-[11px] font-bold px-2.5 py-0.5 rounded-lg border bg-white/10 text-white/80 border-white/20">
                      {yearDesc}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Quick stats row */}
            <div className="flex flex-wrap gap-2">
              <HeroStat icon="👥" label="Students"     value={totalStudents} />
              <HeroStat icon="👨‍🏫" label="Teachers"     value={totalTeachers} />
              <HeroStat icon="📚" label="Grades"       value={gradeLabel(gradeFrom, gradeTo)} />
              <HeroStat icon="📅" label="Est."         value={estYear} />
              {stRatio && <HeroStat icon="📊" label="S:T Ratio" value={`1:${stRatio}`} />}
            </div>
          </div>
        </div>

        {/* ══ TWO-COLUMN GRID ════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* ── Overview ── */}
          <Card>
            <SectionTitle icon="ℹ️">Overview</SectionTitle>
            <div className="space-y-0">
              <DataRow label="School ID (UDISE)"  value={schoolId}    mono />
              <DataRow label="UDISE Code"         value={udiseCode}   mono />
              <DataRow label="Established"        value={estYear}          />
              <DataRow label="Category"           value={categoryType}     />
              <DataRow label="Trust / Society"    value={trustName}        />
              {description && (
                <p className="pt-3 text-xs text-[var(--color-text-secondary)] leading-relaxed border-t border-[var(--color-border)]">
                  {description}
                </p>
              )}
            </div>
          </Card>

          {/* ── Academics ── */}
          <Card>
            <SectionTitle icon="🎓">Academics</SectionTitle>
            <div className="space-y-0">
              <DataRow label="Grades"    value={gradeLabel(gradeFrom, gradeTo)} />
              <DataRow label="Medium"    value={medium.join(", ") || null}      />
              <DataRow label="Board"     value={board.join(", ")  || null}      />
              <DataRow label="Shifts"    value={shifts.join(", ") || null}      />
              <DataRow label="Streams"   value={streams.join(", ") || null}     />
            </div>
          </Card>

          {/* ── Students & Staff ── */}
          <Card>
            <SectionTitle icon="👥">Students & Staff</SectionTitle>
            <div className="space-y-0 mb-4">
              <DataRow label="Total Students"  value={totalStudents} />
              <DataRow label="Total Teachers"  value={totalTeachers} />
              <DataRow label="S:T Ratio"       value={stRatio ? `${stRatio} : 1` : null} />
              <DataRow label="Male Teachers"   value={teacherMale}   />
              <DataRow label="Female Teachers" value={teacherFemale} />
            </div>

            {/* Student gender bar */}
            {(totalBoys != null || totalGirls != null) && totalStudents && (
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-1">
                  Gender Split
                </p>
                <GenderBar boys={totalBoys} girls={totalGirls} total={totalStudents} />
              </div>
            )}

            {/* Teacher gender bar */}
            {(teacherMale != null || teacherFemale != null) && totalTeachers && (
              <div className="mt-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-1">
                  Teacher Gender
                </p>
                <GenderBar boys={teacherMale} girls={teacherFemale} total={totalTeachers} />
              </div>
            )}
          </Card>

          {/* ── Infrastructure ── */}
          <Card>
            <SectionTitle icon="🏗️">Infrastructure</SectionTitle>
            <div className="space-y-0 mb-4">
              <DataRow label="Total Classrooms" value={fac.totalClassrooms} />
              <DataRow label="Good Classrooms"  value={fac.goodClassrooms}  />
              <DataRow label="Boys Toilets"     value={fac.toiletBoys}      />
              <DataRow label="Girls Toilets"    value={fac.toiletGirls}     />
              <DataRow label="Boundary Wall"    value={fac.boundaryWall}    />
            </div>
          </Card>
        </div>

        {/* ══ FACILITIES GRID ════════════════════════════════ */}
        <Card>
          <SectionTitle icon="🏫">Facilities</SectionTitle>
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
            {FACILITIES.map(({ icon, label, key }) => (
              <FacilityTile key={key} icon={icon} label={label} active={Boolean(fac[key])} />
            ))}
          </div>
        </Card>

        {/* ══ COMPUTERS & TECH ═══════════════════════════════ */}
        {Object.values(computers).some(Boolean) && (
          <Card>
            <SectionTitle icon="💻">Computers & Tech</SectionTitle>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {[
                { icon: "🖥️",  label: "Desktops",   value: computers.desktops  },
                { icon: "💻",  label: "Laptops",    value: computers.laptops   },
                { icon: "📱",  label: "Tablets",    value: computers.tablets   },
                { icon: "📽️",  label: "Projectors", value: computers.projector },
                { icon: "🖨️",  label: "Printers",   value: computers.printer   },
              ]
                .filter(({ value }) => value != null)
                .map(({ icon, label, value }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center gap-1.5 bg-[var(--color-bg-page)] border border-[var(--color-border)] rounded-xl p-3 text-center"
                  >
                    <span className="text-2xl leading-none">{icon}</span>
                    <span className="text-xl font-extrabold text-[var(--color-text-primary)]">{value}</span>
                    <span className="text-[10px] text-[var(--color-text-muted)] font-medium">{label}</span>
                  </div>
                ))}
            </div>
          </Card>
        )}

        {/* ══ CONTACT ════════════════════════════════════════ */}
        {(phone || email || website) && (
          <Card>
            <SectionTitle icon="📞">Contact</SectionTitle>
            <div className="flex flex-wrap gap-3">
              {phone && (
                <a
                  href={`tel:${phone}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] hover:underline"
                >
                  <span className="text-base">📞</span> {phone}
                </a>
              )}
              {email && (
                <span className="inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] break-all">
                  <span className="text-base">✉️</span>
                  {/* API delivers obfuscated email — display as-is */}
                  {email.replace("[at]", "@").replace("[dot]", ".")}
                </span>
              )}
              {website && (
                <a
                  href={website.startsWith("http") ? website : `https://${website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] hover:underline"
                >
                  <span className="text-base">🌐</span> {website}
                </a>
              )}
            </div>
          </Card>
        )}

        {/* ══ ADDRESS + MAP ══════════════════════════════════ */}
        <Card>
          <SectionTitle icon="📍">Location</SectionTitle>

          {/* Full address text */}
          {fullAddress && (
            <p className="text-sm text-[var(--color-text-secondary)] mb-4 leading-relaxed">
              {fullAddress}
            </p>
          )}

          {/* Address chips */}
          <div className="flex flex-wrap gap-2 mb-4">
            {[
              { label: "Village",  value: village   },
              { label: "Taluka",   value: taluka    },
              { label: "District", value: district  },
              { label: "State",    value: state     },
              { label: "Pincode",  value: pincode   },
            ].filter(({ value }) => value).map(({ label, value }) => (
              <div key={label} className="text-center">
                <span className="text-[9px] font-bold uppercase tracking-wider text-[var(--color-text-muted)] block mb-0.5">{label}</span>
                <Badge>{value}</Badge>
              </div>
            ))}
          </div>

          {/* Map embed */}
          {mapSrc && (
            <div className="rounded-xl overflow-hidden border border-[var(--color-border)] aspect-video w-full mb-3">
              <iframe
                title="School location"
                src={mapSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          )}

          {/* Directions button */}
          {mapsUrl && (
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center gap-2 w-full justify-center",
                "py-2.5 rounded-xl border border-[var(--color-border)]",
                "text-sm font-semibold text-[var(--color-text-secondary)]",
                "hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]",
                "transition-colors",
              )}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 9m0 8V9m0 0L9 7" />
              </svg>
              Google Maps માં ખોલો
            </a>
          )}
        </Card>

      </div>
    </main>
  );
}