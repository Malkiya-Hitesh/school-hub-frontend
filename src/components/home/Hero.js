

import { cn } from "@/lib/utils";

import SchoolScearch from "./SchoolScearch";
import District from "./District";

/* ============================================================
   STATIC DATA
   ============================================================ */
const STATS_STATIC = [
  { value: "53,247", label: "કુલ શાળાઓ" },
  { value: "33", label: "જિલ્લા" },
  { value: "250+", label: "તાલુકા" },
  { value: "1.2 Cr+", label: "વિદ્યાર્થીઓ" },
];








export default function HeroSection() {












  return (
    <section className={cn("w-full bg-[var(--color-primary)]", "pt-28 pb-16 px-4 sm:px-6 lg:px-10",
    )}
    >
      <div className="mx-auto max-w-3xl">


        <div className="inline-flex items-center gap-2 mb-5 bg-white/15 border border-white/25 rounded-full px-4 py-1.5">
          <span className="h-2 w-2 rounded-full bg-[var(--color-accent)] shrink-0" />
          <span className="text-xs font-semibold text-white tracking-wide">
            ગુજરાત સરકાર માન્ય ડેટા
          </span>
        </div>


        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight mb-4">
          તમારા બાળક માટે{" "}
          <em className="not-italic text-[var(--color-accent)]">સાચી શાળા</em>{" "}
          શોધો
        </h1>

        <p className="text-sm sm:text-base text-white/70 leading-relaxed mb-8 max-w-xl">
          ગુજરાતની ૫૩,૦૦૦+ સરકારી અને ખાનગી શાળાઓની સંપૂર્ણ માહિતી — ફી, સુવિધા, રિઝલ્ટ અને વધુ.
        </p>

        <SchoolScearch />


        <div className="grid grid-cols-2 sm:grid-cols-4 bg-white/10 border border-white/15 rounded-2xl overflow-hidden mb-10">
          {STATS_STATIC.map((s, i) => (
            <div
              key={s.label}
              className={cn(
                "py-4 px-5 text-center",
                i < STATS_STATIC.length - 1 && "border-r border-white/10",
              )}
            >
              <p className="text-xl sm:text-2xl font-extrabold text-white leading-none">{s.value}</p>
              <p className="text-[11px] font-medium text-white/60 mt-1">{s.label}</p>
            </div>
          ))}
        </div>


        <p className="text-[11px] font-bold text-white/45 uppercase tracking-widest mb-3">
          લોકપ્રિય જિલ્લા
        </p>

        <District />
      </div>
    </section>
  );
}