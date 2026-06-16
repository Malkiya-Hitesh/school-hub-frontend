"use client";
// components/dashboard/EditPageWrapper.js
// Shared wrapper for all school edit pages
// Shows back button, title, and save status

import Link from "next/link";

export default function EditPageWrapper({ title, subtitle, children, backHref = "/dashboard" }) {
  return (
    <div style={{ maxWidth: "680px", margin: "0 auto" }}>
      {/* Back + title */}
      <div style={{ marginBottom: "24px" }}>
        <Link href={backHref} style={{
          display: "inline-flex", alignItems: "center", gap: "6px",
          color: "#64748b", textDecoration: "none", fontSize: "13px",
          marginBottom: "12px",
        }}>
          ← Back
        </Link>
        <h1 style={{ fontSize: "20px", fontWeight: "700", color: "#0f172a", margin: "0 0 4px" }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{ color: "#64748b", fontSize: "13px", margin: 0 }}>{subtitle}</p>
        )}
      </div>
      {children}
    </div>
  );
}