"use client";
// app/dashboard/school/page.js
// Full school profile editor — ALL sections on ONE page
// Route: /dashboard/school

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  selectUser, selectIsLoggedIn, selectAuthLoading,
} from "../../../../store/slices/userSlice";

import { uploadToCloudinary } from "@/lib/cloudinary";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { BOARDS, DISTRICTS, LOCATION_TYPES, MANAGEMENTS, MEDIUMS, SCHOOL_TYPES, STREAMS } from "@/lib/constants";
import { dashboardApi } from "@/lib/dashboard";

// ─── Constants ────────────────────────────────────────────────






































const LOC_TYPES = LOCATION_TYPES
const DESIGNATIONS = ["Principal", "Vice Principal", "Admin", "Teacher", "Owner", "Other"];
const PLATFORMS =["Facebook", "Instagram", "YouTube", "Twitter", "LinkedIn", "WhatsApp", "Telegram", "Pinterest", "Snapchat", "Website"]
const STREAMS_OPT = STREAMS
const PLATFORM_ICONS = {
  Facebook: "🔵", Instagram: "📷", YouTube: "▶️", Twitter: "🐦",
  LinkedIn: "💼", WhatsApp: "💬", Telegram: "✈️", Pinterest: "📌",
  Snapchat: "👻", Website: "🌐",
};

// ─── Nav ──────────────────────────────────────────────────────

const NAV = [
  { id: "basics", icon: "📝", label: "Basics" },
  { id: "address", icon: "📍", label: "Address" },
  { id: "academics", icon: "📚", label: "Academics" },
  { id: "category", icon: "🏷️", label: "Category" },
  { id: "fees", icon: "💰", label: "Fees" },
  { id: "contact", icon: "👤", label: "Contact" },
  { id: "results", icon: "📊", label: "Results" },
  { id: "achievements", icon: "🏆", label: "Achievements" },
  { id: "facilities", icon: "🏗️", label: "Facilities" },
  { id: "udise", icon: "📋", label: "UDISE Data" },
  { id: "social", icon: "🔗", label: "Social" },
];

// ─── Completeness ─────────────────────────────────────────────

const CHECKS = (s) => [
  { label: "School name", done: !!s?.basics?.schoolName },
  { label: "Description", done: !!s?.basics?.description },
  { label: "Phone", done: !!s?.basics?.phone },
  { label: "Logo", done: !!s?.basics?.logoImg },
  { label: "Cover image", done: !!s?.basics?.coverImg },
  { label: "Village", done: !!s?.address?.village },
  { label: "District", done: !!s?.address?.district },
  { label: "Management", done: !!s?.category?.management },
  { label: "Grade range", done: s?.academics?.gradeFrom != null },
  { label: "Medium", done: (s?.academics?.medium?.length || 0) > 0 },
  { label: "Students count", done: (s?.academics?.totalStudents || 0) > 0 },
  { label: "Fees info", done: s?.fees?.minTuitionFees != null },
];
const pct = (s) => {
  const c = CHECKS(s);
  return Math.round((c.filter(x => x.done).length / c.length) * 100);
};

// ─── Shared styles ────────────────────────────────────────────

const inputStyle = {
  padding: "9px 12px", borderRadius: "8px", border: "1.5px solid #e2e8f0",
  fontSize: "13px", color: "#0f172a", background: "#fff", outline: "none",
  width: "100%", boxSizing: "border-box", fontFamily: "inherit",
};
const labelStyle = {
  fontSize: "11px", fontWeight: "600", color: "#475569",
  textTransform: "uppercase", letterSpacing: "0.05em",
  display: "block", marginBottom: "5px",
};

// ─── Atoms ────────────────────────────────────────────────────

function Label({ children }) {
  return <span style={labelStyle}>{children}</span>;
}

function Input({ label, value, onChange, type = "text", placeholder, hint }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      {label && <Label>{label}</Label>}
      <input
        type={type} value={value ?? ""} placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        style={inputStyle}
        onFocus={e => (e.target.style.borderColor = "#6366f1")}
        onBlur={e => (e.target.style.borderColor = "#e2e8f0")}
      />
      {hint && <span style={{ fontSize: "11px", color: "#94a3b8" }}>{hint}</span>}
    </div>
  );
}

function Textarea({ label, value, onChange, placeholder, rows = 3 }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      {label && <Label>{label}</Label>}
      <textarea
        rows={rows} value={value ?? ""} placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        style={{ ...inputStyle, resize: "vertical" }}
        onFocus={e => (e.target.style.borderColor = "#6366f1")}
        onBlur={e => (e.target.style.borderColor = "#e2e8f0")}
      />
    </div>
  );
}

function Select({ label, value, onChange, options, placeholder }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      {label && <Label>{label}</Label>}
      <select
        value={value ?? ""}
        onChange={e => onChange(e.target.value)}
        style={{ ...inputStyle, cursor: "pointer", color: value ? "#0f172a" : "#94a3b8" }}
        onFocus={e => (e.target.style.borderColor = "#6366f1")}
        onBlur={e => (e.target.style.borderColor = "#e2e8f0")}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function MultiChips({ label, value = [], onChange, options }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      {label && <Label>{label}</Label>}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
        {options.map(o => {
          const on = value.includes(o);
          return (
            <button key={o} type="button"
              onClick={() => onChange(on ? value.filter(v => v !== o) : [...value, o])}
              style={{
                padding: "5px 13px", borderRadius: "20px", fontSize: "12px",
                border: `1.5px solid ${on ? "#6366f1" : "#e2e8f0"}`,
                background: on ? "#ede9fe" : "#fff",
                color: on ? "#4f46e5" : "#64748b",
                fontWeight: on ? "600" : "400", cursor: "pointer",
              }}>
              {o}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Toggle({ label, value, onChange }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
      <span style={{ fontSize: "13px", color: "#0f172a" }}>{label}</span>
      <div onClick={() => onChange(!value)} style={{
        width: "40px", height: "22px", borderRadius: "11px", cursor: "pointer",
        background: value ? "#6366f1" : "#e2e8f0", position: "relative", transition: "background 0.2s", flexShrink: 0,
      }}>
        <div style={{
          width: "16px", height: "16px", borderRadius: "50%", background: "#fff",
          position: "absolute", top: "3px", transition: "left 0.2s",
          left: value ? "21px" : "3px", boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
        }} />
      </div>
    </div>
  );
}

function Grid({ cols = 2, children }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: "14px" }}>
      {children}
    </div>
  );
}

function Section({ id, icon, title, children }) {
  return (
    <div id={id} style={{
      background: "#fff", borderRadius: "14px",
      border: "1px solid #e2e8f0", overflow: "hidden", scrollMarginTop: "88px",
    }}>
      <div style={{ padding: "14px 22px", borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "center", gap: "9px" }}>
        <span style={{ fontSize: "17px" }}>{icon}</span>
        <h2 style={{ margin: 0, fontSize: "15px", fontWeight: "700", color: "#0f172a" }}>{title}</h2>
      </div>
      <div style={{ padding: "22px" }}>{children}</div>
    </div>
  );
}

function SpinIcon({ size = 14, color = "#6366f1" }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      border: `2px solid ${color}30`, borderTop: `2px solid ${color}`,
      animation: "spin 0.7s linear infinite", flexShrink: 0,
    }} />
  );
}

function SaveBtn({ loading, dirty, onClick }) {
  return (
    <button type="button" onClick={onClick} disabled={loading || !dirty}
      style={{
        padding: "9px 20px", borderRadius: "8px", fontSize: "13px", fontWeight: "600",
        background: dirty ? "#6366f1" : "#f1f5f9", color: dirty ? "#fff" : "#94a3b8",
        border: "none", cursor: loading || !dirty ? "not-allowed" : "pointer",
        display: "flex", alignItems: "center", gap: "7px", transition: "all 0.15s",
      }}>
      {loading ? <><SpinIcon size={12} color="rgba(255,255,255,0.7)" />Saving…</> : dirty ? "Save changes" : "Saved"}
    </button>
  );
}

function Hint({ children }) {
  return (
    <div style={{ padding: "10px 14px", background: "#f8fafc", borderRadius: "8px", fontSize: "12px", color: "#64748b", display: "flex", alignItems: "flex-start", gap: "6px" }}>
      <span>ℹ️</span><span>{children}</span>
    </div>
  );
}

function Toast({ msg, type }) {
  if (!msg) return null;
  return (
    <div style={{
      position: "fixed", bottom: "24px", left: "50%", transform: "translateX(-50%)",
      background: type === "error" ? "#fef2f2" : "#f0fdf4",
      border: `1px solid ${type === "error" ? "#fecaca" : "#bbf7d0"}`,
      color: type === "error" ? "#dc2626" : "#166534",
      padding: "12px 20px", borderRadius: "10px", fontSize: "13px", fontWeight: "500",
      zIndex: 9999, boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
      display: "flex", alignItems: "center", gap: "8px", whiteSpace: "nowrap",
    }}>
      {type === "error" ? "✗" : "✓"} {msg}
    </div>
  );
}

function AddBtn({ onClick, label }) {
  return (
    <button type="button" onClick={onClick} style={{
      padding: "9px", borderRadius: "8px", border: "1.5px dashed #c7d2fe",
      background: "#f5f3ff", color: "#6366f1", fontSize: "13px",
      fontWeight: "600", cursor: "pointer", width: "100%",
    }}>
      + {label}
    </button>
  );
}

function InlineForm({ title, onCancel, onSave, saving, saveLabel = "Save", children }) {
  return (
    <div style={{ padding: "16px", borderRadius: "10px", border: "1.5px solid #c7d2fe", background: "#f5f3ff" }}>
      <div style={{ fontWeight: "600", fontSize: "13px", color: "#0f172a", marginBottom: "14px" }}>{title}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {children}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
          <button type="button" onClick={onCancel}
            style={{ padding: "8px 16px", borderRadius: "7px", fontSize: "13px", border: "1px solid #e2e8f0", background: "#fff", cursor: "pointer" }}>
            Cancel
          </button>
          <button type="button" onClick={onSave} disabled={saving}
            style={{ padding: "8px 18px", borderRadius: "7px", fontSize: "13px", fontWeight: "600", background: "#6366f1", color: "#fff", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}>
            {saving ? <><SpinIcon size={12} color="rgba(255,255,255,0.7)" />Saving…</> : saveLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
async function resolvePendingImages(form, schoolId, imageFields) {
  const resolved = { ...form };
  for (const { key, type } of imageFields) {
    const val = form[key];
    if (val?._pendingFile) {
      const { url } = await uploadToCloudinary({ file: val._pendingFile, schoolId, type });
      if (val._preview) URL.revokeObjectURL(val._preview);
      resolved[key] = url;
    } else if (typeof val === "object" && val !== null) {
      resolved[key] = "";
    }
  }
  return resolved;
}
// ─── Image Upload ─────────────────────────────────────────────

function ImageUpload({ label, value, onChange, schoolId, type, aspectHint, square }) {
  const existingUrl    = typeof value === "string" ? value : "";
  const pendingPreview = value?._preview || "";
  const preview        = pendingPreview || existingUrl;
  const isPending      = !!value?._pendingFile;
  const ref            = useRef();

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onChange({ _pendingFile: file, _preview: URL.createObjectURL(file) });
    e.target.value = "";
  };

  const handleRemove = () => {
    if (pendingPreview) URL.revokeObjectURL(pendingPreview);
    onChange("");
  };

  const w = square ? 72 : 180, h = 72;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      {label && <Label>{label}</Label>}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
        <div onClick={() => ref.current?.click()} style={{
          width: w, height: h, borderRadius: square ? "12px" : "10px",
          border: `2px dashed ${isPending ? "#f59e0b" : "#c7d2fe"}`,
          background: isPending ? "#fffbeb" : "#f5f3ff",
          cursor: "pointer", overflow: "hidden", flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center", position: "relative",
        }}>
          {preview
            ? <img src={preview} alt={label || "image"} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            : <span style={{ fontSize: square ? "26px" : "20px" }}>📷</span>
          }
          {isPending && (
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              background: "rgba(245,158,11,0.85)", padding: "3px",
              fontSize: "9px", fontWeight: "700", color: "#fff", textAlign: "center",
            }}>
              SAVE TO UPLOAD
            </div>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <button type="button" onClick={() => ref.current?.click()}
            style={{ padding: "7px 14px", borderRadius: "7px", fontSize: "12px", fontWeight: "600", border: "1.5px solid #c7d2fe", background: "#fff", color: "#6366f1", cursor: "pointer" }}>
            {preview ? "Change" : "Choose image"}
          </button>
          {preview && (
            <button type="button" onClick={handleRemove}
              style={{ padding: "7px 10px", borderRadius: "7px", fontSize: "12px", border: "1.5px solid #fecaca", background: "#fff", color: "#dc2626", cursor: "pointer" }}>
              Remove
            </button>
          )}
          {aspectHint && <span style={{ fontSize: "11px", color: "#94a3b8" }}>{aspectHint}</span>}
          {isPending && <span style={{ fontSize: "11px", color: "#f59e0b", fontWeight: "600" }}>⚠ Save to apply</span>}
        </div>
      </div>
      <input ref={ref} type="file" accept="image/*" style={{ display: "none" }} onChange={handleFile} />
    </div>
  );
}

// ─── Profile Header (sticky) ──────────────────────────────────

function ProfileHeader({ school, percent }) {
  const r = 20, circ = 2 * Math.PI * r;
  const offset = circ - (percent / 100) * circ;
  const ringColor = percent === 100 ? "#22c55e" : percent >= 60 ? "#6366f1" : "#f59e0b";

  return (
    <div style={{
      position: "sticky", top: 0, zIndex: 40,
      background: "rgba(255,255,255,0.96)", backdropFilter: "blur(8px)",
      borderBottom: "1px solid #e2e8f0", padding: "10px 20px",
      display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap",
    }}>
      {/* Logo */}
      <div style={{
        width: "40px", height: "40px", borderRadius: "9px",
        border: "1px solid #e2e8f0", overflow: "hidden", flexShrink: 0,
        background: "#ede9fe", display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {school?.basics?.logoImg
          ? <img src={school.basics.logoImg} alt="logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          : <span style={{ fontSize: "18px" }}>🏫</span>}
      </div>

      {/* Name */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: "700", fontSize: "14px", color: "#0f172a", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {school?.basics?.schoolName || "Your School"}
        </div>
        <div style={{ fontSize: "11px", color: "#64748b" }}>
          {[school?.address?.taluka, school?.address?.district].filter(Boolean).join(", ") || "Location not set"}
        </div>
      </div>

      {/* Completeness ring */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
        <div style={{ position: "relative", width: "48px", height: "48px" }}>
          <svg width="48" height="48" style={{ transform: "rotate(-90deg)" }}>
            <circle cx="24" cy="24" r={r} fill="none" stroke="#f1f5f9" strokeWidth="3.5" />
            <circle cx="24" cy="24" r={r} fill="none" stroke={ringColor} strokeWidth="3.5"
              strokeDasharray={circ} strokeDashoffset={offset}
              style={{ transition: "stroke-dashoffset 0.6s ease" }} />
          </svg>
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: "10px", fontWeight: "700", color: ringColor }}>{percent}%</span>
          </div>
        </div>
        <span style={{ fontSize: "11px", color: "#64748b" }}>complete</span>
      </div>

      {/* Badges */}
      <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
        {school?.isVerified && (
          <span style={{ padding: "3px 8px", borderRadius: "20px", fontSize: "10px", fontWeight: "600", background: "#dbeafe", color: "#1e40af" }}>✓ Verified</span>
        )}
        {school?.status && (
          <span style={{
            padding: "3px 8px", borderRadius: "20px", fontSize: "10px", fontWeight: "600",
            background: school.status === "active" ? "#dcfce7" : "#fef3c7",
            color: school.status === "active" ? "#166534" : "#92400e",
          }}>
            {school.status === "active" ? "Active" : school.status === "unverified" ? "Pending Review" : school.status}
          </span>
        )}
      </div>
    </div>
  );
}

// ─── Section Nav ──────────────────────────────────────────────

function SectionNav({ active }) {
  return (
    <nav style={{
      display: "flex", gap: "4px", flexWrap: "wrap",
      background: "#fff", borderRadius: "12px", border: "1px solid #e2e8f0",
      padding: "7px", marginBottom: "20px",
    }}>
      {NAV.map(n => (
        <a key={n.id} href={`#${n.id}`} style={{
          padding: "6px 12px", borderRadius: "7px", fontSize: "12px", fontWeight: "600",
          textDecoration: "none",
          background: active === n.id ? "#ede9fe" : "transparent",
          color: active === n.id ? "#4f46e5" : "#64748b",
          display: "flex", alignItems: "center", gap: "4px",
        }}>
          <span>{n.icon}</span>{n.label}
        </a>
      ))}
    </nav>
  );
}

// ─── Loading page ─────────────────────────────────────────────

function LoadingPage() {
  return (
    <DashboardLayout>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", gap: "12px" }}>
        <SpinIcon size={32} color="#6366f1" />
        <span style={{ fontSize: "13px", color: "#64748b" }}>Loading school profile…</span>
      </div>
    </DashboardLayout>
  );
}

// ═════════════════════════════════════════════════════════════
// MAIN PAGE
// ═════════════════════════════════════════════════════════════

export default function DashboardSchoolPage() {
  const router = useRouter();
  const qc = useQueryClient();
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const authLoading = useSelector(selectAuthLoading);

  const [toast, setToast] = useState({ msg: "", type: "success" });
  const [active, setActive] = useState("basics");

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast({ msg: "", type: "success" }), 3000);
  };

  useEffect(() => {
    if (!authLoading && !isLoggedIn) router.replace("/auth/login");
  }, [authLoading, isLoggedIn, router]);

  const { data: schoolData, isLoading } = useQuery({
    queryKey: ["my-school"],
    queryFn: async () => { const { data } = await dashboardApi.getSchool(); return data; },
    enabled: isLoggedIn && !!user?.schoolId,
  });
  const school = schoolData?.data;

  // Highlight active nav section on scroll
  useEffect(() => {
    if (isLoading) return;
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-20% 0px -65% 0px" }
    );
    NAV.forEach(n => { const el = document.getElementById(n.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [isLoading]);

  // Generic mutation factory — patches cache on success
  const mut = (apiFn) =>
    useMutation({
      mutationFn: apiFn,
      onSuccess: (res) => {
        console.log(res);
        if (res.data?.data) {
          qc.setQueryData(["my-school"], (old) =>
            old ? { ...old, data: res.data.data } : old
          );
        }
        showToast("Saved successfully");
      },

      onError: (err) => {
        console.log(err);
        showToast(
          err?.response?.data?.message || "Save failed",
          "error"
        );
      },
    });

  // Section mutations
  const basicsMut = mut(d => dashboardApi.updateBasics(d));
  const addressMut = mut(d => dashboardApi.updateAddress(d));
  const academicsMut = mut(d => dashboardApi.updateAcademics(d));
  const categoryMut = mut(d => dashboardApi.updateCategory(d));
  const feesMut = mut(d => dashboardApi.updateFees(d));
  const contactMut = mut(d => dashboardApi.updateContact(d));
  const facilityMut = mut(d => dashboardApi.updateFacility(d));
  const socialMut = mut(d => dashboardApi.updateSocial(d));

  // Array mutations
  const addResultMut = mut(d => dashboardApi.addResult(d));
  const editResultMut = mut(({ id, ...d }) => dashboardApi.updateResult(id, d));
  const delResultMut = mut(id => dashboardApi.deleteResult(id));
  const addAchMut = mut(d =>{ console.log("Adding achievement", d); return dashboardApi.addAchievement(d)});
  const editAchMut = mut(({ id, ...d }) => dashboardApi.updateAchievement(id, d));
  const delAchMut = mut(id => dashboardApi.deleteAchievement(id));
  const addFacMut = mut(d => dashboardApi.addFacilityItem(d));
  const editFacMut = mut(({ id, ...d }) => dashboardApi.updateFacilityItem(id, d));
  const delFacMut = mut(id => dashboardApi.deleteFacilityItem(id));

  if (authLoading || isLoading) return <LoadingPage />;

  if (!user?.schoolId) return (
    <DashboardLayout>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <div style={{ textAlign: "center", padding: "70px 20px" }}>
        <div style={{ fontSize: "48px", marginBottom: "14px" }}>🏫</div>
        <h2 style={{ color: "#0f172a", marginBottom: "8px" }}>No school linked</h2>
        <p style={{ color: "#64748b", marginBottom: "22px" }}>Register your school to manage its profile.</p>
        <a href="/claim" style={{ padding: "11px 24px", background: "#6366f1", color: "#fff", borderRadius: "8px", fontWeight: "600", textDecoration: "none" }}>
          Claim Your School →
        </a>
      </div>
    </DashboardLayout>
  );

  return (

      <>
      <ProfileHeader school={school} percent={pct(school)} />

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "22px 14px" }}>
        <div style={{ marginBottom: "18px" }}>
          <h1 style={{ fontSize: "19px", fontWeight: "700", color: "#0f172a", margin: "0 0 3px" }}>
            School Profile
          </h1>
          <p style={{ color: "#64748b", fontSize: "13px", margin: 0 }}>
            Keep everything up to date so parents can find you.
          </p>
        </div>

        <SectionNav active={active} />

        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <BasicsSection school={school} mutation={basicsMut} />
          <AddressSection school={school} mutation={addressMut} />
          <AcademicsSection school={school} mutation={academicsMut} />
          <CategorySection school={school} mutation={categoryMut} />
          <FeesSection school={school} mutation={feesMut} />
          <ContactSection school={school} mutation={contactMut} />
          <ResultsSection school={school} addMut={addResultMut} editMut={editResultMut} delMut={delResultMut} />
          <AchievementsSection school={school} addMut={addAchMut} editMut={editAchMut} delMut={delAchMut} />
          <FacilitiesShowcase school={school} addMut={addFacMut} editMut={editFacMut} delMut={delFacMut} />
          <UDISEFacilitySection school={school} mutation={facilityMut} />
          <SocialSection school={school} mutation={socialMut} />
        </div>
      </div>

      <Toast msg={toast.msg} type={toast.type} />
    </>
  );
}

// ═════════════════════════════════════════════════════════════
// SECTION COMPONENTS
// ═════════════════════════════════════════════════════════════

// ── 1. Basics ─────────────────────────────────────────────────

function BasicsSection({ school, mutation }) {
  const [uploading, setUploading] = useState(false);
  const fromSchool = () => ({
    schoolName: school?.basics?.schoolName || "",
    phone: school?.basics?.phone || "",
    email: school?.basics?.email || "",
    website: school?.basics?.website || "",
    description: school?.basics?.description || "",
    trustName: school?.basics?.trustName || "",
    establishedYear: school?.basics?.establishedYear || "",
    logoImg: school?.basics?.logoImg || "",
    coverImg: school?.basics?.coverImg || "",
  });
  const [form, setForm] = useState(fromSchool);
  useEffect(() => setForm(fromSchool()), [school]);
  const dirty = Object.keys(fromSchool()).some(k => {
    const v = form[k];
    if (v?._pendingFile) return true;
    return String(v ?? "") !== String(fromSchool()[k] ?? "");
  });
  const f = k => v => setForm(p => ({ ...p, [k]: v }));

  return (
    <Section id="basics" icon="📝" title="Basic Information">
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {/* Images */}
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "18px", alignItems: "start" }}>
          <ImageUpload
            label="Logo" value={form.logoImg} onChange={f("logoImg")}
            schoolId={school?._id} type="logo" aspectHint="Square · min 200×200" square
          />
          <ImageUpload
            label="Cover Image" value={form.coverImg} onChange={f("coverImg")}
            schoolId={school?._id} type="cover" aspectHint="16:9 · min 800×450"
          />
        </div>
        <Input label="School Name *" value={form.schoolName} onChange={f("schoolName")} placeholder="Full official school name" />
        <Grid>
          <Input label="Phone" value={form.phone} onChange={f("phone")} placeholder="+91 98765 43210" />
          <Input label="Email" value={form.email} onChange={f("email")} type="email" placeholder="school@example.com" />
        </Grid>
        <Grid>
          <Input label="Website" value={form.website} onChange={f("website")} placeholder="https://school.edu.in" />
          <Input label="Established Year" value={form.establishedYear} onChange={f("establishedYear")} type="number" placeholder="1990" />
        </Grid>
        <Input label="Trust / Society Name" value={form.trustName} onChange={f("trustName")} placeholder="Managing trust or society name" />
        <Textarea label="Description" value={form.description} onChange={f("description")} placeholder="Brief about the school — vision, achievements, highlights…" rows={4} />
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
         <SaveBtn loading={uploading || mutation.isPending} dirty={dirty} onClick={async () => {
  setUploading(true);
  try {
    const resolved = await resolvePendingImages(form, school?._id, [
      { key: "logoImg", type: "logo" },
      { key: "coverImg", type: "cover" },
    ]);
    mutation.mutate(resolved);
  } catch (err) { alert(err.message); }
  finally { setUploading(false); }
}} />
        </div>
      </div>
    </Section>
  );
}

// ── 2. Address ────────────────────────────────────────────────

function AddressSection({ school, mutation }) {
  const fromSchool = () => ({
    district: school?.address?.district || "",
    taluka: school?.address?.taluka || "",
    village: school?.address?.village || "",
    pincode: school?.address?.pincode || "",
    full: school?.address?.full || "",
    googleMapsUrl: school?.address?.googleMapsUrl || "",
  });
  const [form, setForm] = useState(fromSchool);
  useEffect(() => setForm(fromSchool()), [school]);
// REPLACE your dirty line with:
const dirty = Object.keys(fromSchool()).some(k => {
  const v = form[k];
  if (v?._pendingFile) return true;
  return String(v ?? "") !== String(fromSchool()[k] ?? "");
});
  const f = k => v => setForm(p => ({ ...p, [k]: v }));

  return (
    <Section id="address" icon="📍" title="Address">
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        <Grid>
          <Select label="District *" value={form.district} onChange={f("district")} options={DISTRICTS} placeholder="Select district" />
          <Input label="Taluka" value={form.taluka} onChange={f("taluka")} placeholder="Taluka name" />
        </Grid>
        <Grid>
          <Input label="Village / City" value={form.village} onChange={f("village")} placeholder="Village or city" />
          <Input label="Pincode" value={form.pincode} onChange={f("pincode")} placeholder="380001" />
        </Grid>
        <Textarea label="Full Address" value={form.full} onChange={f("full")} placeholder="Complete address as on school letterhead" rows={2} />
        <Input
          label="Google Maps URL" value={form.googleMapsUrl} onChange={f("googleMapsUrl")}
          placeholder="https://maps.google.com/?q=…"
          hint="Paste the link from Google Maps Share button"
        />
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <SaveBtn loading={mutation.isPending} dirty={dirty} onClick={() => mutation.mutate(form)} />
        </div>
      </div>
    </Section>
  );
}

// ── 3. Academics ──────────────────────────────────────────────

function AcademicsSection({ school, mutation }) {
  const fromSchool = () => ({
    gradeFrom: school?.academics?.gradeFrom ?? "",
    gradeTo: school?.academics?.gradeTo ?? "",
    medium: school?.academics?.medium || [],
    board: school?.academics?.board || [],
    streams: school?.academics?.streams || [],
    totalStudents: school?.academics?.totalStudents ?? "",
    totalTeachers: school?.academics?.totalTeachers ?? "",
  });
  const [form, setForm] = useState(fromSchool);
  useEffect(() => setForm(fromSchool()), [school]);
  const dirty = Object.keys(fromSchool()).some(k => {
    const v = form[k];
    if (v?._pendingFile) return true;
    return String(v ?? "") !== String(fromSchool()[k] ?? "");
  });
  const f = k => v => setForm(p => ({ ...p, [k]: v }));

  return (
    <Section id="academics" icon="📚" title="Academics">
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        <Grid>
          <Input label="Grade From" value={form.gradeFrom} onChange={f("gradeFrom")} type="number" placeholder="1" hint="Starting grade (e.g. 1)" />
          <Input label="Grade To" value={form.gradeTo} onChange={f("gradeTo")} type="number" placeholder="10" hint="Ending grade (e.g. 12)" />
        </Grid>
        <MultiChips label="Medium of Instruction" value={form.medium} onChange={f("medium")} options={MEDIUMS} />
        <MultiChips label="Board" value={form.board} onChange={f("board")} options={BOARDS} />
        <MultiChips label="Streams (Std 11–12)" value={form.streams} onChange={f("streams")} options={STREAMS_OPT} />
        <Grid>
          <Input label="Total Students" value={form.totalStudents} onChange={f("totalStudents")} type="number" placeholder="320" />
          <Input label="Total Teachers" value={form.totalTeachers} onChange={f("totalTeachers")} type="number" placeholder="18" />
        </Grid>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <SaveBtn loading={mutation.isPending} dirty={dirty} onClick={() => mutation.mutate(form)} />
        </div>
      </div>
    </Section>
  );
}

// ── 4. Category ───────────────────────────────────────────────

function CategorySection({ school, mutation }) {
  const fromSchool = () => ({
    management: school?.category?.management || "",
    schoolType: school?.category?.schoolType || "",
    locationType: school?.category?.locationType || "",
  });
  const [form, setForm] = useState(fromSchool);
  useEffect(() => setForm(fromSchool()), [school]);
// REPLACE your dirty line with:
const dirty = Object.keys(fromSchool()).some(k => {
  const v = form[k];
  if (v?._pendingFile) return true;
  return String(v ?? "") !== String(fromSchool()[k] ?? "");
});
  const f = k => v => setForm(p => ({ ...p, [k]: v }));

  return (
    <Section id="category" icon="🏷️" title="Category">
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        <Select label="Management Type" value={form.management} onChange={f("management")} options={MANAGEMENTS} placeholder="Select management type" />
        <Grid>
          <Select label="School Type" value={form.schoolType} onChange={f("schoolType")} options={SCHOOL_TYPES} placeholder="Select type" />
          <Select label="Location Type" value={form.locationType} onChange={f("locationType")} options={LOC_TYPES} placeholder="Select location" />
        </Grid>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <SaveBtn loading={mutation.isPending} dirty={dirty} onClick={() => mutation.mutate(form)} />
        </div>
      </div>
    </Section>
  );
}

// ── 5. Fees ───────────────────────────────────────────────────

function FeesSection({ school, mutation }) {
  const fromSchool = () => ({
    minTuitionFees: school?.fees?.minTuitionFees ?? "",
    maxTuitionFees: school?.fees?.maxTuitionFees ?? "",
    transportFees: school?.fees?.transportFees ?? "",
    hostelFees: school?.fees?.hostelFees ?? "",
    otherFees: school?.fees?.otherFees ?? "",
  });
  const [form, setForm] = useState(fromSchool);
  useEffect(() => setForm(fromSchool()), [school]);
// REPLACE your dirty line with:
const dirty = Object.keys(fromSchool()).some(k => {
  const v = form[k];
  if (v?._pendingFile) return true;
  return String(v ?? "") !== String(fromSchool()[k] ?? "");
});
  const f = k => v => setForm(p => ({ ...p, [k]: v }));

  return (
    <Section id="fees" icon="💰" title="Fees (Annual, ₹)">
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        <Hint>Enter approximate annual fees in rupees. Leave blank if not applicable.</Hint>
        <Grid>
          <Input label="Min Tuition Fees" value={form.minTuitionFees} onChange={f("minTuitionFees")} type="number" placeholder="5000" />
          <Input label="Max Tuition Fees" value={form.maxTuitionFees} onChange={f("maxTuitionFees")} type="number" placeholder="15000" />
        </Grid>
        <Grid cols={3}>
          <Input label="Transport" value={form.transportFees} onChange={f("transportFees")} type="number" placeholder="3000" />
          <Input label="Hostel" value={form.hostelFees} onChange={f("hostelFees")} type="number" placeholder="20000" />
          <Input label="Other" value={form.otherFees} onChange={f("otherFees")} type="number" placeholder="500" />
        </Grid>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <SaveBtn loading={mutation.isPending} dirty={dirty} onClick={() => mutation.mutate(form)} />
        </div>
      </div>
    </Section>
  );
}

// ── 6. Contact ────────────────────────────────────────────────

function ContactSection({ school, mutation }) {
  const fromSchool = () => ({
    contactName: school?.adminInfo?.contactName || school?.adminInfo?.name || "",
    contactPhone: school?.adminInfo?.contactPhone || school?.adminInfo?.phone || "",
    contactEmail: school?.adminInfo?.contactEmail || school?.adminInfo?.email || "",
    designation: school?.adminInfo?.designation || "",
  });
  const [form, setForm] = useState(fromSchool);
  useEffect(() => setForm(fromSchool()), [school]);
// REPLACE your dirty line with:
const dirty = Object.keys(fromSchool()).some(k => {
  const v = form[k];
  if (v?._pendingFile) return true;
  return String(v ?? "") !== String(fromSchool()[k] ?? "");
});
  const f = k => v => setForm(p => ({ ...p, [k]: v }));

  return (
    <Section id="contact" icon="👤" title="Contact Person">
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        <Hint>The person parents should contact for admissions or queries.</Hint>
        <Grid>
          <Input label="Full Name" value={form.contactName} onChange={f("contactName")} placeholder="Contact person name" />
          <Select label="Designation" value={form.designation} onChange={f("designation")} options={DESIGNATIONS} placeholder="Select role" />
        </Grid>
        <Grid>
          <Input label="Phone" value={form.contactPhone} onChange={f("contactPhone")} placeholder="+91 98765 43210" />
          <Input label="Email" value={form.contactEmail} onChange={f("contactEmail")} type="email" placeholder="contact@school.com" />
        </Grid>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <SaveBtn loading={mutation.isPending} dirty={dirty} onClick={() => mutation.mutate(form)} />
        </div>
      </div>
    </Section>
  );
}

// ── 7. Results ────────────────────────────────────────────────

const BLANK_RESULT = { year: "", class: "", totalStudents: "", passStudents: "", passRatio: "", posterImg: "" };

function ResultsSection({ school, addMut, editMut, delMut }) {
  const [uploading, setUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(BLANK_RESULT);

  const results = school?.results || [];
  const f = k => v => setForm(p => ({ ...p, [k]: v }));
  const openAdd = () => { setEditing(null); setForm(BLANK_RESULT); setShowForm(true); };
  const openEdit = (r) => {
    setEditing(r._id);
    setForm({ year: r.year, class: String(r.class), totalStudents: r.totalStudents ?? "", passStudents: r.passStudents ?? "", passRatio: r.passRatio ?? "", posterImg: r.posterImg || "" });
    setShowForm(true);
  };
  const close = () => { setShowForm(false); setEditing(null); };
const save = async () => {
  setUploading(true);
  try {
    const resolved = await resolvePendingImages(form, school?._id, [
      { key: "posterImg", type: "result" }
    ]);
    const cb = { onSuccess: close };
    editing ? editMut.mutate({ id: editing, ...resolved }, cb) : addMut.mutate(resolved, cb);
  } catch (err) { alert(err.message); }
  finally { setUploading(false); }
};
const saving = uploading || addMut.isPending || editMut.isPending;

  return (
    <Section id="results" icon="📊" title="Board Exam Results">
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {results.length === 0 && !showForm && (
          <div style={{ textAlign: "center", padding: "28px", color: "#94a3b8", fontSize: "13px" }}>
            No results added yet. Add Std 10 or 12 board results.
          </div>
        )}

        {results.map(r => (
          <div key={r._id} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "13px 14px", borderRadius: "10px", border: "1px solid #e2e8f0", background: "#fafafa" }}>
            {r.posterImg && (
              <img src={r.posterImg} alt="poster" style={{ width: "44px", height: "44px", objectFit: "cover", borderRadius: "7px", flexShrink: 0 }} />
            )}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: "600", fontSize: "13px", color: "#0f172a" }}>Std {r.class} · {r.year}</div>
              <div style={{ fontSize: "12px", color: "#64748b", marginTop: "2px" }}>
                {r.totalStudents} students · {r.passStudents} passed
                {r.passRatio != null ? ` · ${r.passRatio}% pass rate` : ""}
              </div>
            </div>
            <button type="button" onClick={() => openEdit(r)}
              style={{ padding: "5px 12px", borderRadius: "6px", fontSize: "12px", border: "1px solid #e2e8f0", background: "#fff", cursor: "pointer", color: "#475569" }}>
              Edit
            </button>
            <button type="button" onClick={() => { if (window.confirm("Delete this result?")) delMut.mutate(r._id); }}
              style={{ padding: "5px 10px", borderRadius: "6px", fontSize: "12px", border: "1px solid #fecaca", background: "#fff", cursor: "pointer", color: "#dc2626" }}>
              ✕
            </button>
          </div>
        ))}

        {showForm && (
          <InlineForm
            title={editing ? "Edit Result" : "Add Result"}
            onCancel={close} onSave={save} saving={saving}
            saveLabel={editing ? "Update Result" : "Add Result"}
          >
            <Grid>
              <Input label="Year *" value={form.year} onChange={f("year")} placeholder="2024-25" />
              <Select label="Class *" value={form.class} onChange={f("class")} options={["10", "12"]} placeholder="Select class" />
            </Grid>
            <Grid cols={3}>
              <Input label="Total Students" value={form.totalStudents} onChange={f("totalStudents")} type="number" placeholder="120" />
              <Input label="Pass Students" value={form.passStudents} onChange={f("passStudents")} type="number" placeholder="118" />
              <Input label="Pass %" value={form.passRatio} onChange={f("passRatio")} type="number" placeholder="98.3" hint="Auto-calculated if blank" />
            </Grid>
            <ImageUpload
              label="Result Poster (optional)" value={form.posterImg} onChange={f("posterImg")}
              schoolId={school?._id} type="result" aspectHint="Result poster or photo"
            />
          </InlineForm>
        )}

        {!showForm && <AddBtn onClick={openAdd} label="Add Result" />}
      </div>
    </Section>
  );
}

// ── 8. Achievements ───────────────────────────────────────────

const BLANK_ACH = { title: "", description: "", imgUrl: "", year: "" };

function AchievementsSection({ school, addMut, editMut, delMut }) {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(BLANK_ACH);

  const list = school?.achievements || [];
  const f = k => v => setForm(p => ({ ...p, [k]: v }));
  const openAdd = () => { setEditing(null); setForm(BLANK_ACH); setShowForm(true); };
  const openEdit = (a) => { setEditing(a._id); setForm({ title: a.title || "", description: a.description || "", imgUrl: a.imgUrl || "", year: a.year || "" }); setShowForm(true); };
 const close = () => { setShowForm(false); setEditing(null); };
  const [uploading, setUploading] = useState(false);
  const save = async () => {
    setUploading(true);
    try {
      const resolved = await resolvePendingImages(form, school?._id, [
        { key: "imgUrl", type: "achievement" }
      ]);
      const cb = { onSuccess: close };
      editing ? editMut.mutate({ id: editing, ...resolved }, cb) : addMut.mutate(resolved, cb);
    } catch (err) { alert(err.message); }
    finally { setUploading(false); }
  };
  const saving = uploading || addMut.isPending || editMut.isPending;
  return (
    <Section id="achievements" icon="🏆" title="Achievements">
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {list.length === 0 && !showForm && (
          <div style={{ textAlign: "center", padding: "28px", color: "#94a3b8", fontSize: "13px" }}>
            No achievements added yet.
          </div>
        )}

        {list.map(a => (
          <div key={a._id} style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "13px 14px", borderRadius: "10px", border: "1px solid #e2e8f0", background: "#fafafa" }}>
            {a.imgUrl
              ? <img src={a.imgUrl} alt={a.title} style={{ width: "48px", height: "48px", objectFit: "cover", borderRadius: "7px", flexShrink: 0 }} />
              : <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#fef3c7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", flexShrink: 0 }}>🏆</div>
            }
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: "600", fontSize: "13px", color: "#0f172a" }}>
                {a.title}{a.year ? ` · ${a.year}` : ""}
              </div>
              {a.description && <div style={{ fontSize: "12px", color: "#64748b", marginTop: "2px" }}>{a.description}</div>}
            </div>
            <button type="button" onClick={() => openEdit(a)}
              style={{ padding: "5px 12px", borderRadius: "6px", fontSize: "12px", border: "1px solid #e2e8f0", background: "#fff", cursor: "pointer", color: "#475569", flexShrink: 0 }}>
              Edit
            </button>
            <button type="button" onClick={() => { if (window.confirm("Delete this achievement?")) delMut.mutate(a._id); }}
              style={{ padding: "5px 10px", borderRadius: "6px", fontSize: "12px", border: "1px solid #fecaca", background: "#fff", cursor: "pointer", color: "#dc2626", flexShrink: 0 }}>
              ✕
            </button>
          </div>
        ))}

        {showForm && (
          <InlineForm
            title={editing ? "Edit Achievement" : "Add Achievement"}
            onCancel={close} onSave={save} saving={saving}
            saveLabel={editing ? "Update Achievement" : "Add Achievement"}
          >
            <Grid>
              <Input label="Title *" value={form.title} onChange={f("title")} placeholder="National Science Olympiad Winner" />
              <Input label="Year" value={form.year} onChange={f("year")} type="number" placeholder="2024" />
            </Grid>
            <Textarea label="Description" value={form.description} onChange={f("description")} placeholder="Brief about the achievement…" rows={2} />
            <ImageUpload
              label="Image (optional)" value={form.imgUrl} onChange={f("imgUrl")}
              schoolId={school?._id} type="achievement" aspectHint="Award photo or certificate"
            />
          </InlineForm>
        )}

        {!showForm && <AddBtn onClick={openAdd} label="Add Achievement" />}
      </div>
    </Section>
  );
}

// ── 9. Facility Showcase (school-uploaded) ────────────────────

const BLANK_FAC = { title: "", description: "", imgUrl: "" };

function FacilitiesShowcase({ school, addMut, editMut, delMut }) {
  const [uploading, setUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(BLANK_FAC);

  const list = school?.facilities || [];
  const f = k => v => setForm(p => ({ ...p, [k]: v }));
  const openAdd = () => { setEditing(null); setForm(BLANK_FAC); setShowForm(true); };
  const openEdit = (item) => { setEditing(item._id); setForm({ title: item.title || "", description: item.description || "", imgUrl: item.imgUrl || "" }); setShowForm(true); };
  const close = () => { setShowForm(false); setEditing(null); };
 const save = async () => {
  setUploading(true);
  try {
    const resolved = await resolvePendingImages(form, school?._id, [
      { key: "imgUrl", type: "facility" }
    ]);
    const cb = { onSuccess: close };
    editing ? editMut.mutate({ id: editing, ...resolved }, cb) : addMut.mutate(resolved, cb);
  } catch (err) { alert(err.message); }
  finally { setUploading(false); }
};

// CHANGE saving line to:
const saving = uploading || addMut.isPending || editMut.isPending;


  return (
    <Section id="facilities" icon="🏗️" title="Facility Showcase">
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <Hint>Showcase your school's facilities with photos — library, lab, playground, computer room, etc.</Hint>

        {list.length === 0 && !showForm && (
          <div style={{ textAlign: "center", padding: "24px", color: "#94a3b8", fontSize: "13px" }}>
            No facilities added yet.
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "12px" }}>
          {list.map(item => (
            <div key={item._id} style={{ borderRadius: "10px", border: "1px solid #e2e8f0", overflow: "hidden", background: "#fafafa" }}>
              {item.imgUrl
                ? <img src={item.imgUrl} alt={item.title} style={{ width: "100%", height: "120px", objectFit: "cover", display: "block" }} />
                : <div style={{ height: "80px", background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px" }}>🏗️</div>
              }
              <div style={{ padding: "10px 12px" }}>
                <div style={{ fontWeight: "600", fontSize: "13px", color: "#0f172a" }}>{item.title}</div>
                {item.description && <div style={{ fontSize: "12px", color: "#64748b", marginTop: "2px" }}>{item.description}</div>}
                <div style={{ display: "flex", gap: "6px", marginTop: "8px" }}>
                  <button type="button" onClick={() => openEdit(item)}
                    style={{ flex: 1, padding: "5px", borderRadius: "6px", fontSize: "12px", border: "1px solid #e2e8f0", background: "#fff", cursor: "pointer" }}>
                    Edit
                  </button>
                  <button type="button" onClick={() => { if (window.confirm("Delete this facility?")) delMut.mutate(item._id); }}
                    style={{ padding: "5px 10px", borderRadius: "6px", fontSize: "12px", border: "1px solid #fecaca", background: "#fff", cursor: "pointer", color: "#dc2626" }}>
                    ✕
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {showForm && (
          <InlineForm
            title={editing ? "Edit Facility" : "Add Facility"}
            onCancel={close} onSave={save} saving={saving}
            saveLabel={editing ? "Update Facility" : "Add Facility"}
          >
            <Input label="Title *" value={form.title} onChange={f("title")} placeholder="e.g. Science Laboratory" />
            <Textarea label="Description" value={form.description} onChange={f("description")} placeholder="Brief description of the facility…" rows={2} />
            <ImageUpload
              label="Photo" value={form.imgUrl} onChange={f("imgUrl")}
              schoolId={school?._id} type="facility" aspectHint="Clear photo of the facility"
            />
          </InlineForm>
        )}

        {!showForm && <AddBtn onClick={openAdd} label="Add Facility" />}
      </div>
    </Section>
  );
}

// ── 10. UDISE / Infrastructure Data (editable) ────────────────

const BOOL_FIELDS = [
  { key: "drinkingWater", label: "Drinking Water", icon: "💧" },
  { key: "electricity", label: "Electricity", icon: "⚡" },
  { key: "library", label: "Library", icon: "📖" },
  { key: "playground", label: "Playground", icon: "⚽" },
  { key: "internet", label: "Internet", icon: "🌐" },
  { key: "solarPanel", label: "Solar Panel", icon: "☀️" },
  { key: "ramps", label: "Ramps (PWD)", icon: "♿" },
  { key: "integratedLab", label: "Science Lab", icon: "🔬" },
  { key: "medicalCheckup", label: "Medical Checkup", icon: "🏥" },
];

function UDISEFacilitySection({ school, mutation }) {
  const fac = school?.facility;
  const fromSchool = () => ({
    totalClassrooms: fac?.totalClassrooms ?? "",
    goodClassrooms: fac?.goodClassrooms ?? "",
    toiletBoys: fac?.toiletBoys ?? "",
    toiletGirls: fac?.toiletGirls ?? "",
    boundaryWall: fac?.boundaryWall || "",
    drinkingWater: !!fac?.drinkingWater,
    electricity: !!fac?.electricity,
    library: !!fac?.library,
    playground: !!fac?.playground,
    internet: !!fac?.internet,
    solarPanel: !!fac?.solarPanel,
    ramps: !!fac?.ramps,
    integratedLab: !!fac?.integratedLab,
    medicalCheckup: !!fac?.medicalCheckup,
    computers: {
      desktops: fac?.computers?.desktops ?? "",
      laptops: fac?.computers?.laptops ?? "",
      tablets: fac?.computers?.tablets ?? "",
      projector: fac?.computers?.projector ?? "",
      printer: fac?.computers?.printer ?? "",
    },
  });
  const [form, setForm] = useState(fromSchool);
  useEffect(() => setForm(fromSchool()), [school]);
// REPLACE your dirty line with:
const dirty = Object.keys(fromSchool()).some(k => {
  const v = form[k];
  if (v?._pendingFile) return true;
  return String(v ?? "") !== String(fromSchool()[k] ?? "");
});
  const f = k => v => setForm(p => ({ ...p, [k]: v }));
  const fc = k => v => setForm(p => ({ ...p, computers: { ...p.computers, [k]: v } }));

  return (
    <Section id="udise" icon="📋" title="UDISE / Infrastructure Data">
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <Grid>
          <Input label="Total Classrooms" value={form.totalClassrooms} onChange={f("totalClassrooms")} type="number" placeholder="10" />
          <Input label="Good Condition Classrooms" value={form.goodClassrooms} onChange={f("goodClassrooms")} type="number" placeholder="9" />
        </Grid>
        <Grid>
          <Input label="Boys Toilets" value={form.toiletBoys} onChange={f("toiletBoys")} type="number" placeholder="2" />
          <Input label="Girls Toilets" value={form.toiletGirls} onChange={f("toiletGirls")} type="number" placeholder="3" />
        </Grid>
        <Input label="Boundary Wall" value={form.boundaryWall} onChange={f("boundaryWall")} placeholder="e.g. Pucca / Kachha / None" />

        <div>
          <Label>Infrastructure Facilities</Label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "8px", marginTop: "8px" }}>
            {BOOL_FIELDS.map(item => (
              <div key={item.key} style={{ padding: "9px 12px", borderRadius: "8px", border: "1.5px solid #e2e8f0", background: "#fafafa" }}>
                <Toggle label={`${item.icon} ${item.label}`} value={form[item.key]} onChange={f(item.key)} />
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label>Computers &amp; Devices</Label>
          <Grid cols={3} style={{ marginTop: "8px" }}>
            <Input label="Desktops" value={form.computers.desktops} onChange={fc("desktops")} type="number" placeholder="0" />
            <Input label="Laptops" value={form.computers.laptops} onChange={fc("laptops")} type="number" placeholder="0" />
            <Input label="Tablets" value={form.computers.tablets} onChange={fc("tablets")} type="number" placeholder="0" />
          </Grid>
          <Grid cols={2} style={{ marginTop: "10px" }}>
            <Input label="Projectors" value={form.computers.projector} onChange={fc("projector")} type="number" placeholder="0" />
            <Input label="Printers" value={form.computers.printer} onChange={fc("printer")} type="number" placeholder="0" />
          </Grid>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <SaveBtn loading={mutation.isPending} dirty={dirty} onClick={() => mutation.mutate(form)} />
        </div>
      </div>
    </Section>
  );
}

// ── 11. Social Links ──────────────────────────────────────────

function SocialSection({ school, mutation }) {
  const fromSchool = () => {
    const map = {};
    (school?.socialLinks || []).forEach(l => { map[l.platform] = l.url; });
    return map;
  };
  const [links, setLinks] = useState(fromSchool);
  useEffect(() => setLinks(fromSchool()), [school]);

  const dirty = JSON.stringify(links) !== JSON.stringify(fromSchool());

  const handleSave = () => {
    const socialLinks = PLATFORMS
      .filter(p => links[p]?.trim())
      .map(p => ({ platform: p, url: links[p].trim() }));
    mutation.mutate({ socialLinks });
  };

  return (
    <Section id="social" icon="🔗" title="Social Media">
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Hint>Add links to your school's social pages. Leave blank to remove.</Hint>
        {PLATFORMS.map(platform => (
          <div key={platform} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "18px", width: "24px", textAlign: "center", flexShrink: 0 }}>
              {PLATFORM_ICONS[platform]}
            </span>
            <span style={{ fontSize: "12px", color: "#64748b", width: "80px", flexShrink: 0 }}>{platform}</span>
            <input
              type="url"
              value={links[platform] || ""}
              onChange={e => setLinks(p => ({ ...p, [platform]: e.target.value }))}
              placeholder={`${platform} page URL`}
              style={{ ...inputStyle, fontSize: "12px", padding: "8px 12px", flex: 1 }}
              onFocus={e => (e.target.style.borderColor = "#6366f1")}
              onBlur={e => (e.target.style.borderColor = "#e2e8f0")}
            />
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: "4px" }}>
          <SaveBtn loading={mutation.isPending} dirty={dirty} onClick={handleSave} />
        </div>
      </div>
    </Section>
  );
}