import { forwardRef } from "react";
import { cn } from "@/lib/utils";

/* =========================================================
   SIZE SYSTEM
========================================================= */

const size = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-5 text-base",
  lg: "h-14 px-6 text-lg",
};

/* =========================================================
   VARIANTS SYSTEM
========================================================= */

const variant = {
  primary: `
    bg-[var(--color-primary)]
    text-white
    hover:bg-[var(--color-primary-hover)]
  `,

  secondary: `
    bg-[var(--color-bg-surface)]
    text-[var(--color-text-primary)]
    border border-[var(--color-border)]
    hover:bg-[var(--color-bg-elevated)]
  `,

  outline: `
    bg-transparent
    border border-[var(--color-border)]
    text-[var(--color-text-primary)]
    hover:bg-[var(--color-bg-elevated)]
  `,

  ghost: `
    bg-transparent
    text-[var(--color-text-primary)]
    hover:bg-[var(--color-bg-elevated)]
  `,

  danger: `
    bg-[var(--color-error)]
    text-white
    hover:opacity-90
  `,

  success: `
    bg-[var(--color-success)]
    text-white
    hover:opacity-90
  `,
};

/* =========================================================
   BUTTON COMPONENT
========================================================= */

export const Button = forwardRef(function Button(
  {
    children,
    size: s = "md",
    variant: v = "primary",
    fullWidth = false,
    disabled = false,
    className,
    ...props
  },
  ref
) {
  return (
    <button
      ref={ref}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center gap-2",
        "rounded-xl",
        "font-medium",
        "transition-all duration-200",
        "active:scale-[0.98]",
        "disabled:opacity-50 disabled:pointer-events-none",

        size[s],
        variant[v],

        fullWidth && "w-full",

        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});
