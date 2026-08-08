// components/schools/ActiveChips.js
import React from "react";

function ActiveChips({ chips, onRemove, onResetAll }) {
  if (chips.length === 0) return null;
  return (
    <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1.5">
      {chips.map(({ key, label }) => (
        <span key={key} className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[var(--color-primary-light)] text-[var(--color-primary)] border border-[var(--color-primary-muted)]">
          {label}
          <button onClick={() => onRemove(key)} aria-label={`Remove ${label}`} className="opacity-70 hover:opacity-100 leading-none text-sm">
            ×
          </button>
        </span>
      ))}
      <button onClick={onResetAll} className="text-[10px] text-[var(--color-error-text)] underline underline-offset-2 hover:opacity-80">
        બધા હટાવો
      </button>
    </div>
  );
}

export default React.memo(ActiveChips);