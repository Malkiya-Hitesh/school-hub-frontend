import { forwardRef } from "react";
import { cn } from "@/lib/utils";

/* =========================================================
   SIZE SYSTEM
========================================================= */

const size = {
  sm: "h-10 text-sm px-3",
  md: "h-12 text-base px-4",
  lg: "h-14 text-lg px-5",
};

/* =========================================================
   INPUT
========================================================= */

export const Input = forwardRef(function Input(
  {
    size: s = "md",
    className,
    ...props
  },
  ref
) {
  return (
    <input
      ref={ref}
      className={cn(
        "w-full",
        "rounded-xl",
        "border border-[var(--color-border)]",
        "bg-[var(--color-bg-surface)]",
        "text-[var(--color-text-primary)]",
        "outline-none",
        "transition-all duration-200",

        "focus:border-[var(--color-primary)]",
        "focus:ring-2 focus:ring-[var(--color-primary-muted)]",

        size[s],
        className
      )}
      {...props}
    />
  );
});

/* =========================================================
   TEXTAREA
========================================================= */

export const Textarea = forwardRef(function Textarea(
  {
    className,
    rows = 4,
    ...props
  },
  ref
) {
  return (
    <textarea
      ref={ref}
      rows={rows}
      className={cn(
        "w-full",
        "rounded-xl",
        "border border-[var(--color-border)]",
        "bg-[var(--color-bg-surface)]",
        "text-[var(--color-text-primary)]",
        "p-4",
        "outline-none",
        "transition-all duration-200",

        "focus:border-[var(--color-primary)]",
        "focus:ring-2 focus:ring-[var(--color-primary-muted)]",

        className
      )}
      {...props}
    />
  );
});