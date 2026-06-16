"use client";
// components/dashboard/FormFields.js
// Reusable form fields for all school edit pages

// ── Text Input ────────────────────────────────────────────────
export function Field({ label, hint, error, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      {label && (
        <label style={{ fontSize: "13px", fontWeight: "500", color: "#374151" }}>
          {label}
          {hint && <span style={{ color: "#9ca3af", fontWeight: "400", marginLeft: "6px" }}>{hint}</span>}
        </label>
      )}
      {children}
      {error && (
        <p style={{ fontSize: "12px", color: "#ef4444", margin: 0 }}>⚠ {error}</p>
      )}
    </div>
  );
}

export function Input({ error, ...props }) {
  return (
    <input
      style={{
        border: `1.5px solid ${error ? "#f87171" : "#d1d5db"}`,
        borderRadius: "8px", padding: "9px 13px",
        fontSize: "14px", color: "#111827",
        background: props.disabled ? "#f9fafb" : "#fff",
        outline: "none", width: "100%", boxSizing: "border-box",
      }}
      onFocus={e => { e.target.style.borderColor = "#6366f1"; e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.12)"; }}
      onBlur={e  => { e.target.style.borderColor = error ? "#f87171" : "#d1d5db"; e.target.style.boxShadow = "none"; }}
      {...props}
    />
  );
}

export function Textarea({ error, rows = 4, ...props }) {
  return (
    <textarea
      rows={rows}
      style={{
        border: `1.5px solid ${error ? "#f87171" : "#d1d5db"}`,
        borderRadius: "8px", padding: "9px 13px",
        fontSize: "14px", color: "#111827",
        background: "#fff", outline: "none",
        width: "100%", boxSizing: "border-box", resize: "vertical",
      }}
      onFocus={e => { e.target.style.borderColor = "#6366f1"; e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.12)"; }}
      onBlur={e  => { e.target.style.borderColor = error ? "#f87171" : "#d1d5db"; e.target.style.boxShadow = "none"; }}
      {...props}
    />
  );
}

export function Select({ error, children, ...props }) {
  return (
    <select
      style={{
        border: `1.5px solid ${error ? "#f87171" : "#d1d5db"}`,
        borderRadius: "8px", padding: "9px 13px",
        fontSize: "14px", color: "#111827",
        background: "#fff", outline: "none",
        width: "100%", boxSizing: "border-box", cursor: "pointer",
      }}
      onFocus={e => { e.target.style.borderColor = "#6366f1"; }}
      onBlur={e  => { e.target.style.borderColor = error ? "#f87171" : "#d1d5db"; }}
      {...props}
    >
      {children}
    </select>
  );
}

// ── Card section wrapper ──────────────────────────────────────
export function Section({ title, children }) {
  return (
    <div style={{
      background: "#fff", borderRadius: "12px",
      border: "1px solid #e2e8f0", padding: "24px",
      marginBottom: "16px",
    }}>
      {title && (
        <h3 style={{
          fontSize: "14px", fontWeight: "600", color: "#0f172a",
          margin: "0 0 16px", paddingBottom: "12px",
          borderBottom: "1px solid #f1f5f9",
        }}>
          {title}
        </h3>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {children}
      </div>
    </div>
  );
}

// ── 2-col grid ────────────────────────────────────────────────
export function Grid2({ children }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "16px",
    }}>
      {children}
    </div>
  );
}

// ── Save button ───────────────────────────────────────────────
export function SaveBtn({ loading, saved }) {
  return (
    <button
      type="submit"
      disabled={loading}
      style={{
        background: saved ? "#16a34a" : "#6366f1",
        color: "#fff", border: "none",
        padding: "10px 28px", borderRadius: "8px",
        fontSize: "14px", fontWeight: "600", cursor: "pointer",
        transition: "all 0.2s", opacity: loading ? 0.7 : 1,
        display: "flex", alignItems: "center", gap: "8px",
      }}
    >
      {loading && (
        <span style={{
          width: "14px", height: "14px",
          border: "2px solid rgba(255,255,255,0.4)",
          borderTop: "2px solid #fff",
          borderRadius: "50%",
          display: "inline-block",
          animation: "spin 0.7s linear infinite",
        }} />
      )}
      {saved ? "✓ Saved!" : loading ? "Saving…" : "Save Changes"}
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </button>
  );
}

// ── Alert ─────────────────────────────────────────────────────
export function Alert({ type = "error", message }) {
  if (!message) return null;
  const styles = {
    error:   { bg: "#fef2f2", border: "#fecaca", color: "#dc2626", icon: "⚠" },
    success: { bg: "#f0fdf4", border: "#bbf7d0", color: "#166534", icon: "✓" },
  };
  const s = styles[type];
  return (
    <div style={{
      background: s.bg, border: `1px solid ${s.border}`,
      borderRadius: "8px", padding: "10px 14px",
      color: s.color, fontSize: "13px",
      display: "flex", gap: "8px", alignItems: "flex-start",
    }}>
      <span>{s.icon}</span> {message}
    </div>
  );
}

// ── Checkbox row ─────────────────────────────────────────────
export function CheckboxGroup({ label, options, value = [], onChange }) {
  const toggle = (opt) => {
    if (value.includes(opt)) onChange(value.filter(v => v !== opt));
    else onChange([...value, opt]);
  };
  return (
    <div>
      {label && <div style={{ fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "8px" }}>{label}</div>}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {options.map(opt => (
          <label key={opt} style={{
            display: "flex", alignItems: "center", gap: "6px",
            padding: "6px 12px", borderRadius: "6px", cursor: "pointer",
            border: `1.5px solid ${value.includes(opt) ? "#6366f1" : "#d1d5db"}`,
            background: value.includes(opt) ? "#ede9fe" : "#fff",
            fontSize: "13px", color: value.includes(opt) ? "#6d28d9" : "#374151",
            fontWeight: value.includes(opt) ? "500" : "400",
            transition: "all 0.15s",
          }}>
            <input
              type="checkbox"
              checked={value.includes(opt)}
              onChange={() => toggle(opt)}
              style={{ display: "none" }}
            />
            {value.includes(opt) ? "✓ " : ""}{opt}
          </label>
        ))}
      </div>
    </div>
  );
}