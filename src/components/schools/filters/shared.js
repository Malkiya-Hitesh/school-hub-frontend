// src/components/schools/filters/shared.js
import React from "react";
import { cn } from "@/lib/utils";

export function Section({ title, children }) {
  return (
    <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl p-4 mb-3">
      <h4 className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest mb-3">
        {title}
      </h4>
      {children}
    </div>
  );
}

export const Chip = React.memo(function Chip({ label, active, onClick, onRemove }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold",
        "border transition-colors mr-1.5 mb-1.5",
        active
          ? "bg-[var(--color-primary-light)] text-[var(--color-primary)] border-[var(--color-primary-muted)]"
          : "bg-[var(--color-bg-page)] text-[var(--color-text-secondary)] border-[var(--color-border)] hover:border-[var(--color-border-strong)]",
      )}
    >
      {label}
      {active && onRemove && (
        <span
          role="button"
          aria-label="Remove filter"
          onClick={(e) => { e.stopPropagation(); onRemove(); }}
          className="ml-0.5 text-[var(--color-primary)] opacity-70 hover:opacity-100 leading-none"
        >
          ×
        </span>
      )}
    </button>
  );
});

export const CheckRow = React.memo(function CheckRow({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-2 py-1.5 cursor-pointer select-none">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="accent-[var(--color-primary)] w-3.5 h-3.5 shrink-0"
      />
      <span className={cn(
        "text-xs flex-1 leading-tight",
        checked ? "text-[var(--color-text-primary)] font-semibold" : "text-[var(--color-text-secondary)]",
      )}>
        {label}
      </span>
    </label>
  );
});