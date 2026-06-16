"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

/* ============================================================
   NAV LINKS — Gujarati labels, English routes
   ============================================================ */
const NAV_LINKS = [
  { label: "હોમ",          href: "/"              },
  { label: "શાળા શોધો",    href: "/schools"       },
  { label: "જિલ્લા",       href: "/districts"     },
  { label: "સરખામણી",      href: "/compare"       },
  { label: "અમારા વિશે",   href: "/about"         },
  { label: "dashboard",   href: "/auth/login"         },
];

/* ============================================================
   NAVBAR
   ============================================================ */
export default function Navbar() {
  const pathname   = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50",
        "h-[var(--navbar-height)]",
        "bg-[var(--color-bg-surface)]",
        "border-b border-[var(--color-border)]",
        "shadow-[var(--shadow-sm)]",
      )}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-10">

        {/* ── Logo ── */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          {/* Icon mark */}
          <span
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-xl",
              "bg-[var(--color-primary)] text-white",
              "text-lg font-bold leading-none select-none",
            )}
          >
            શ
          </span>

          <span className="flex flex-col leading-tight">
            <span
              className={cn(
                "text-base font-bold tracking-tight",
                "text-[var(--color-text-primary)]",
              )}
            >
              School Hub
            </span>
            <span className="text-[11px] font-medium text-[var(--color-text-accent)]">
              ગુજરાત શાળા માહિતી
            </span>
          </span>
        </Link>

        {/* ── Desktop nav ── */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all",
                  "duration-[var(--transition-fast)]",
                  active
                    ? "text-[var(--color-primary)] bg-[var(--color-primary-light)]"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-page)]",
                )}
              >
                {link.label}
                {active && (
                  <span
                    className={cn(
                      "absolute bottom-0 left-1/2 -translate-x-1/2",
                      "h-0.5 w-4 rounded-full bg-[var(--color-primary)]",
                    )}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* ── Desktop CTA ── */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/schools"
            className={cn(
              "inline-flex items-center gap-1.5 px-4 py-2 rounded-xl",
              "text-sm font-semibold",
              "bg-[var(--color-primary)] text-white",
              "hover:bg-[var(--color-primary-hover)]",
              "transition-colors duration-[var(--transition-fast)]",
              "active:scale-[0.98]",
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            શાળા શોધો
          </Link>
        </div>

        {/* ── Mobile hamburger ── */}
        <button
          aria-label="Menu toggle"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "md:hidden flex flex-col gap-[5px] p-2 rounded-lg",
            "text-[var(--color-text-secondary)]",
            "hover:bg-[var(--color-bg-page)] transition-colors",
          )}
        >
          <span
            className={cn(
              "block h-0.5 w-5 rounded-full bg-current transition-all duration-200",
              open && "translate-y-[7px] rotate-45",
            )}
          />
          <span
            className={cn(
              "block h-0.5 w-5 rounded-full bg-current transition-all duration-200",
              open && "opacity-0",
            )}
          />
          <span
            className={cn(
              "block h-0.5 w-5 rounded-full bg-current transition-all duration-200",
              open && "-translate-y-[7px] -rotate-45",
            )}
          />
        </button>
      </div>

      {/* ── Mobile drawer ── */}
      {open && (
        <div
          className={cn(
            "md:hidden",
            "absolute top-[var(--navbar-height)] left-0 right-0",
            "bg-[var(--color-bg-surface)]",
            "border-b border-[var(--color-border)]",
            "shadow-[var(--shadow-md)]",
            "px-4 py-4 flex flex-col gap-1",
          )}
        >
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "px-4 py-3 rounded-xl text-sm font-medium transition-all",
                  active
                    ? "bg-[var(--color-primary-light)] text-[var(--color-primary)]"
                    : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-page)]",
                )}
              >
                {link.label}
              </Link>
            );
          })}

          <div className="mt-2 pt-3 border-t border-[var(--color-border)]">
            <Link
              href="/schools"
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center justify-center gap-2 w-full py-3 rounded-xl",
                "text-sm font-semibold text-white",
                "bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)]",
                "transition-colors",
              )}
            >
              શાળા શોધો
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}