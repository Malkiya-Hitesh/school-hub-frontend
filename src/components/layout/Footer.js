import Link from "next/link";
import { footerGroups } from "@/lib/staticPages";
import { cn } from "@/lib/utils";

const STATS = [
  { value: "53,000+", label: "Schools" },
  { value: "33", label: "Districts" },
  { value: "250+", label: "Talukas" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "mt-auto w-full",
        "border-t border-[var(--color-border)]",
        "bg-[var(--color-bg-surface)]"
      )}
    >
      <div className="bg-[var(--color-primary)] px-4 py-5 sm:px-6 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-8 sm:gap-16">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-0.5">
              <span className="text-2xl font-bold leading-tight text-white">{stat.value}</span>
              <span className="text-sm font-medium text-indigo-200">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 lg:grid-cols-5">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex w-fit items-center gap-2.5">
              <span
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-xl",
                  "bg-[var(--color-primary)] text-lg font-bold text-white"
                )}
              >
                S
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-base font-bold text-[var(--color-text-primary)]">School Hub</span>
                <span className="text-[11px] font-medium text-[var(--color-text-accent)]">
                  Gujarat school information
                </span>
              </span>
            </Link>

            <p className="max-w-[260px] text-sm leading-relaxed text-[var(--color-text-secondary)]">
              Search, compare, and review useful school information across Gujarat. Verify important details directly with schools before making decisions.
            </p>
          </div>

          {footerGroups.map((group) => (
            <nav key={group.heading} aria-label={`${group.heading} footer links`} className="flex flex-col gap-3">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">
                {group.heading}
              </h2>
              <ul className="flex flex-col gap-2">
                {group.links.map((link) => (
                  <li key={`${group.heading}-${link.href}-${link.label}`}>
                    <Link
                      href={link.href}
                      className={cn(
                        "text-sm text-[var(--color-text-secondary)]",
                        "transition-colors duration-[var(--transition-fast)]",
                        "hover:text-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-muted)]"
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="border-t border-[var(--color-border)] px-4 py-4 sm:px-6 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 sm:flex-row">
          <p className="text-xs text-[var(--color-text-muted)]">
            Copyright {year} School Hub Gujarat. All rights reserved.
          </p>
          <Link href="/sitemap" className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-primary)]">
            Sitemap
          </Link>
        </div>
      </div>
    </footer>
  );
}
