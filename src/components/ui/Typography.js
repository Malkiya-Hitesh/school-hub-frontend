import { forwardRef } from "react";
import { cn } from "@/lib/utils";

/* =========================================================
   BASE STYLE (CONTEXT BASED — NOT GLOBAL)
========================================================= */

const base = {
  h1: "tracking-tight leading-tight",
  h2: "tracking-tight leading-tight",
  h3: "tracking-tight leading-snug",
  h4: "tracking-normal leading-snug",
  h5: "tracking-normal leading-snug",
  p: "tracking-normal leading-relaxed",
  span: "tracking-normal leading-normal",
};

/* =========================================================
   SIZE SYSTEM
========================================================= */

export const size = {
  xs: "text-xs sm:text-sm md:text-sm lg:text-sm xl:text-base",

  sm: "text-sm sm:text-base md:text-base lg:text-lg xl:text-lg",

  md: "text-base sm:text-lg md:text-xl lg:text-2xl xl:text-2xl",

  lg: "text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl",

  xl: "text-xl sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl",

  x2: "text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl",

  x3: "text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl",
};

/* =========================================================
   WEIGHT SYSTEM
========================================================= */

export const weight = {
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
  extrabold: "font-extrabold",
};

/* =========================================================
   COLOR SYSTEM
========================================================= */

export const color = {
  primary: "text-[var(--color-text-primary)]",
  secondary: "text-[var(--color-text-secondary)]",
  muted: "text-[var(--color-text-muted)]",
  brand: "text-[var(--color-text-brand)]",
  accent: "text-[var(--color-text-accent)]",
  inverse: "text-white",
};

/* =========================================================
   H1
========================================================= */

export const H1 = forwardRef(function H1(
  {
    children,
    size: s = "x2",
    weight: w = "bold",
    color: c = "primary",
    className,
    ...props
  },
  ref
) {
  return (
    <h1
      ref={ref}
      className={cn(
        base.h1,
        size[s],
        weight[w],
        color[c],
        className
      )}
      {...props}
    >
      {children}
    </h1>
  );
});

/* =========================================================
   H2
========================================================= */

export const H2 = forwardRef(function H2(
  {
    children,
    size: s = "xl",
    weight: w = "bold",
    color: c = "primary",
    className,
    ...props
  },
  ref
) {
  return (
    <h2
      ref={ref}
      className={cn(
        base.h2,
        size[s],
        weight[w],
        color[c],
        className
      )}
      {...props}
    >
      {children}
    </h2>
  );
});

/* =========================================================
   H3
========================================================= */

export const H3 = forwardRef(function H3(
  {
    children,
    size: s = "lg",
    weight: w = "semibold",
    color: c = "primary",
    className,
    ...props
  },
  ref
) {
  return (
    <h3
      ref={ref}
      className={cn(
        base.h3,
        size[s],
        weight[w],
        color[c],
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
});

/* =========================================================
   H4
========================================================= */

export const H4 = forwardRef(function H4(
  {
    children,
    size: s = "md",
    weight: w = "semibold",
    color: c = "primary",
    className,
    ...props
  },
  ref
) {
  return (
    <h4
      ref={ref}
      className={cn(
        base.h4,
        size[s],
        weight[w],
        color[c],
        className
      )}
      {...props}
    >
      {children}
    </h4>
  );
});

/* =========================================================
   H5
========================================================= */

export const H5 = forwardRef(function H5(
  {
    children,
    size: s = "sm",
    weight: w = "medium",
    color: c = "secondary",
    className,
    ...props
  },
  ref
) {
  return (
    <h5
      ref={ref}
      className={cn(
        base.h5,
        size[s],
        weight[w],
        color[c],
        className
      )}
      {...props}
    >
      {children}
    </h5>
  );
});

/* =========================================================
   PARAGRAPH
========================================================= */

export const P = forwardRef(function P(
  {
    children,
    size: s = "sm",
    weight: w = "normal",
    color: c = "secondary",
    className,
    ...props
  },
  ref
) {
  return (
    <p
      ref={ref}
      className={cn(
        base.p,
        size[s],
        weight[w],
        color[c],
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
});

/* =========================================================
   SPAN
========================================================= */

export const Span = forwardRef(function Span(
  {
    children,
    size: s = "sm",
    weight: w = "normal",
    color: c = "primary",
    className,
    ...props
  },
  ref
) {
  return (
    <span
      ref={ref}
      className={cn(
        base.span,
        size[s],
        weight[w],
        color[c],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
});