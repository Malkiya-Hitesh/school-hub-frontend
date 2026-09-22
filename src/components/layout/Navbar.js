"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Find Schools", href: "/schools" },
  { label: "About", href: "/about" },
  { label: "contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50",
        "h-[var(--navbar-height)]",
        "border-b border-[var(--color-border)]",
        "bg-[var(--color-bg-surface)]",
        "shadow-[var(--shadow-sm)]"
      )}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-10">
        <Link href="/" className="flex shrink-0 items-center gap-2.5" onClick={() => setOpen(false)}>
          <span
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-xl",
              "bg-[var(--color-primary)] text-lg font-bold leading-none text-white"
            )}
          >
            S
          </span>

          <span className="flex flex-col leading-tight">
            <span className="text-base font-bold tracking-tight text-[var(--color-text-primary)]">
              School Hub
            </span>
            <span className="text-[11px] font-medium text-[var(--color-text-accent)]">
              Gujarat school information
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative rounded-lg px-3.5 py-2 text-sm font-medium transition-all",
                  "duration-[var(--transition-fast)]",
                  active
                    ? "bg-[var(--color-primary-light)] text-[var(--color-primary)]"
                    : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-page)] hover:text-[var(--color-text-primary)]"
                )}
              >
                {link.label}
                {active && (
                  <span className="absolute bottom-0 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-[var(--color-primary)]" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="rounded-xl px-3 py-2 text-sm font-semibold text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-bg-page)] hover:text-[var(--color-text-primary)]"
          >
            Login
          </Link>
          <Link
            href="/claim-school"
            className={cn(
              "inline-flex items-center gap-1.5 rounded-xl px-4 py-2",
              "bg-[var(--color-primary)] text-sm font-semibold text-white",
              "transition-colors duration-[var(--transition-fast)] hover:bg-[var(--color-primary-hover)]",
              "active:scale-[0.98]"
            )}
          >
            Claim school
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className={cn(
            "flex flex-col gap-[5px] rounded-lg p-2 md:hidden",
            "text-[var(--color-text-secondary)]",
            "transition-colors hover:bg-[var(--color-bg-page)]"
          )}
        >
          <span className={cn("block h-0.5 w-5 rounded-full bg-current transition-all duration-200", open && "translate-y-[7px] rotate-45")} />
          <span className={cn("block h-0.5 w-5 rounded-full bg-current transition-all duration-200", open && "opacity-0")} />
          <span className={cn("block h-0.5 w-5 rounded-full bg-current transition-all duration-200", open && "-translate-y-[7px] -rotate-45")} />
        </button>
      </div>

      {open && (
        <div
          className={cn(
            "absolute left-0 right-0 top-[var(--navbar-height)] md:hidden",
            "border-b border-[var(--color-border)]",
            "bg-[var(--color-bg-surface)] px-4 py-4 shadow-[var(--shadow-md)]"
          )}
        >
          <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-xl px-4 py-3 text-sm font-medium transition-all",
                    active
                      ? "bg-[var(--color-primary-light)] text-[var(--color-primary)]"
                      : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-page)]"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="mt-2 grid gap-2 border-t border-[var(--color-border)] pt-3">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-center text-sm font-semibold text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-page)]"
              >
                Login
              </Link>
              <Link
                href="/claim-school"
                onClick={() => setOpen(false)}
                className="rounded-xl bg-[var(--color-primary)] px-4 py-3 text-center text-sm font-semibold text-white hover:bg-[var(--color-primary-hover)]"
              >
                Claim school
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
