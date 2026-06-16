import Link from "next/link";
import { cn } from "@/lib/utils";

/* ============================================================
   FOOTER DATA
   ============================================================ */
const FOOTER_LINKS = [
  {
    heading: "પ્લેટફોર્મ",
    links: [
      { label: "શાળા શોધો",    href: "/schools"   },
      { label: "જિલ્લા પ્રમાણે",href: "/districts" },
      { label: "સરખામણી",      href: "/compare"   },
      { label: "નકશો",          href: "/map"       },
    ],
  },
  {
    heading: "માહિતી",
    links: [
      { label: "અમારા વિશે",     href: "/about"   },
      { label: "ડેટા સ્ત્રોત",   href: "/data"    },
      { label: "સંપર્ક",         href: "/contact" },
      { label: "FAQ",            href: "/faq"     },
    ],
  },
  {
    heading: "કાનૂની",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Use",   href: "/terms"   },
    ],
  },
];

const STATS = [
  { value: "53,000+", label: "શાળાઓ"    },
  { value: "33",      label: "જિલ્લા"   },
  { value: "250+",    label: "તાલુકા"   },
];

/* ============================================================
   FOOTER
   ============================================================ */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "w-full",
        "bg-[var(--color-bg-surface)]",
        "border-t border-[var(--color-border)]",
        "mt-auto",
      )}
    >
      {/* ── Stats bar ── */}
      <div
        className={cn(
          "bg-[var(--color-primary)]",
          "px-4 sm:px-6 lg:px-10 py-5",
        )}
      >
        <div className="mx-auto max-w-7xl flex flex-wrap justify-center gap-8 sm:gap-16">
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-0.5">
              <span className="text-2xl font-bold text-white leading-tight">
                {s.value}
              </span>
              <span className="text-sm font-medium text-indigo-200">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Main footer body ── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand column */}
          <div className="flex flex-col gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 w-fit">
              <span
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-xl",
                  "bg-[var(--color-primary)] text-white",
                  "text-lg font-bold select-none",
                )}
              >
                શ
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-base font-bold text-[var(--color-text-primary)]">
                  School Hub
                </span>
                <span className="text-[11px] font-medium text-[var(--color-text-accent)]">
                  ગુજરાત શાળા માહિતી
                </span>
              </span>
            </Link>

            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed max-w-[220px]">
              ગુજરાતની તમામ ૫૩,૦૦૦+ સરકારી અને ખાનગી શાળાઓની સંપૂર્ણ માહિતી એક જ જગ્યાએ.
            </p>

            {/* Social icons — placeholder links */}
            <div className="flex items-center gap-3 mt-1">
              {[
                { icon: "M22 4.01c-1 .49-1.98.689-3 .99-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.323 12 8v1c-3.245.083-6.135-1.395-8-4 0 0-4.182 7.433 4 11-1.872 1.245-3.74 2.094-6 2 3.308 1.803 6.913 2.ignite 10 2 6.015 0 11-5.040 11-11V6l2.5-2zM4 22H2v-2h2v2z", label: "Twitter" },
                { icon: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z", label: "Facebook" },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-lg",
                    "border border-[var(--color-border)]",
                    "text-[var(--color-text-muted)]",
                    "hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]",
                    "transition-colors duration-[var(--transition-fast)]",
                  )}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d={s.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map((col) => (
            <div key={col.heading} className="flex flex-col gap-3">
              <h4
                className={cn(
                  "text-xs font-semibold uppercase tracking-widest",
                  "text-[var(--color-text-muted)]",
                )}
              >
                {col.heading}
              </h4>
              <ul className="flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "text-sm text-[var(--color-text-secondary)]",
                        "hover:text-[var(--color-primary)]",
                        "transition-colors duration-[var(--transition-fast)]",
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div
        className={cn(
          "border-t border-[var(--color-border)]",
          "px-4 sm:px-6 lg:px-10 py-4",
        )}
      >
        <div
          className={cn(
            "mx-auto max-w-7xl",
            "flex flex-col sm:flex-row items-center justify-between gap-2",
          )}
        >
          <p className="text-xs text-[var(--color-text-muted)]">
            © {year} School Hub Gujarat. All rights reserved.
          </p>
          <p className="text-xs text-[var(--color-text-muted)]">
            ડેટા સ્ત્રોત: Gujarat Government Education Department
          </p>
        </div>
      </div>
    </footer>
  );
}