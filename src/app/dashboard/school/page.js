"use client";


import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  selectUser, selectIsLoggedIn, selectAuthLoading,
} from "../../../../store/slices/userSlice";

import { uploadToCloudinary } from "@/lib/cloudinary";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  BOARD_OPTIONS,
  DISTRICT_OPTIONS,
  LOCATION_TYPE_OPTIONS,
  MANAGEMENT_OPTIONS,
  MEDIUM_OPTIONS,
  SCHOOL_TYPE_OPTIONS,
  STREAM_OPTIONS,
} from "@/lib/constants";
import { dashboardApi } from "@/lib/dashboard";

// ─── Constants ────────────────────────────────────────────────

const LOC_TYPES = LOCATION_TYPE_OPTIONS;
const STREAMS_OPT = STREAM_OPTIONS;
const SHIFT_OPTIONS = ["Morning", "Afternoon", "Evening"];

const SOCIAL_PLATFORMS = [
  { key: "facebook",        label: "Facebook" },
  { key: "instagram",       label: "Instagram" },
  { key: "youtube",         label: "YouTube" },
  { key: "linkedin",        label: "LinkedIn" },
  { key: "twitter",         label: "Twitter / X" },
  { key: "telegram",        label: "Telegram" },
  { key: "whatsappChannel", label: "WhatsApp Channel" },
];

const NAV = [
  { id: "basics", label: "Basics" },
  { id: "about", label: "About" },
  { id: "address", label: "Address" },
  { id: "contact", label: "Contact" },
  { id: "academics", label: "Academics" },
  { id: "category", label: "Category" },
  { id: "admission", label: "Admission" },
  { id: "fees", label: "Fees" },
  { id: "results", label: "Results" },
  { id: "achievements", label: "Achievements" },
  { id: "facilities", label: "Facilities" },
  { id: "social", label: "Social" },
];

// ─── Completeness ─────────────────────────────────────────────

const CHECKS = (s) => [
  { label: "School name", done: !!s?.basics?.schoolName },
  { label: "Description", done: !!s?.about?.description },
  { label: "Phone", done: (s?.contact?.phone?.length || 0) > 0 },
  { label: "Logo", done: !!s?.basics?.logo },
  { label: "Cover image", done: !!s?.basics?.coverImage },
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

// ─── Shared classes ───────────────────────────────────────────

const fieldClass =
  "w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-[13px] text-stone-900 outline-none transition-colors focus:border-amber-600 focus:ring-1 focus:ring-amber-600 placeholder:text-stone-400";
const labelClass = "block text-[11px] font-semibold uppercase tracking-wider text-stone-500 mb-1.5";

// ─── Icons ────────────────────────────────────────────────────

function Icon({ path, className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d={path} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
const ICONS = {
  check: "M5 13l4 4L19 7",
  x: "M6 6l12 12M18 6L6 18",
  camera: "M4 8h3l2-2h6l2 2h3v11H4V8ZM12 17a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z",
  school: "M3 10 12 5l9 5-9 5-9-5Zm3 2v5c0 1.5 2.7 2.7 6 2.7s6-1.2 6-2.7v-5",
  info: "M12 8h.01M11 12h1v4h1",
};

function SpinIcon({ className = "w-4 h-4 text-current" }) {
  return <span className={`inline-block rounded-full border-2 border-current border-t-transparent animate-spin ${className}`} />;
}

// ─── Atoms ────────────────────────────────────────────────────

function Label({ children }) {
  return <span className={labelClass}>{children}</span>;
}

function Input({ label, value, onChange, type = "text", placeholder, hint, error }) {
  return (
    <div className="flex flex-col gap-1">
      {label && <Label>{label}</Label>}
      <input
        type={type} value={value ?? ""} placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        className={`${fieldClass} ${error ? "border-red-400 focus:border-red-500 focus:ring-red-500" : ""}`}
      />
      {error ? (
        <span className="text-[11px] text-red-600">{error}</span>
      ) : hint ? (
        <span className="text-[11px] text-stone-400">{hint}</span>
      ) : null}
    </div>
  );
}

function Textarea({ label, value, onChange, placeholder, rows = 3 }) {
  return (
    <div className="flex flex-col gap-1">
      {label && <Label>{label}</Label>}
      <textarea
        rows={rows} value={value ?? ""} placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        className={`${fieldClass} resize-y`}
      />
    </div>
  );
}

function Select({ label, value, onChange, options, placeholder }) {
  return (
    <div className="flex flex-col gap-1">
      {label && <Label>{label}</Label>}
      <select
        value={value ?? ""}
        onChange={e => onChange(e.target.value)}
        className={`${fieldClass} cursor-pointer ${value ? "text-stone-900" : "text-stone-400"}`}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map(o => {
          const optionValue = typeof o === "object" ? o.value : o;
          const optionLabel = typeof o === "object" ? o.label : o;
          return <option key={optionValue} value={optionValue}>{optionLabel}</option>;
        })}
      </select>
    </div>
  );
}

function MultiChips({ label, value = [], onChange, options }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <Label>{label}</Label>}
      <div className="flex flex-wrap gap-2">
        {options.map(o => {
          const optionValue = typeof o === "object" ? o.value : o;
          const optionLabel = typeof o === "object" ? o.label : o;
          const on = value.includes(optionValue);
          return (
            <button key={optionValue} type="button"
              onClick={() => onChange(on ? value.filter(v => v !== optionValue) : [...value, optionValue])}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                on ? "border-amber-600 bg-amber-50 text-amber-700 font-semibold" : "border-stone-300 bg-white text-stone-600 hover:border-stone-400"
              }`}>
              {optionLabel}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Toggle({ label, value, onChange }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-[13px] text-stone-900">{label}</span>
      <button type="button" onClick={() => onChange(!value)}
        className={`relative w-10 h-5.5 h-[22px] w-[40px] rounded-full flex-shrink-0 transition-colors ${value ? "bg-amber-600" : "bg-stone-300"}`}>
        <span className={`absolute top-[3px] w-4 h-4 rounded-full bg-white shadow transition-all ${value ? "left-[21px]" : "left-[3px]"}`} />
      </button>
    </div>
  );
}

function Grid({ cols = 2, children }) {
  const colClass = cols === 3 ? "sm:grid-cols-3" : cols === 2 ? "sm:grid-cols-2" : "";
  return <div className={`grid grid-cols-1 ${colClass} gap-3.5`}>{children}</div>;
}

function Section({ id, title, children }) {
  return (
    <div id={id} className="bg-white rounded-lg border border-stone-200 overflow-hidden scroll-mt-24">
      <div className="px-5 py-3.5 border-b border-stone-100">
        <h2 className="text-[15px] font-bold text-stone-900">{title}</h2>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function SaveBtn({ loading, dirty, onClick, disabled }) {
  const blocked = loading || !dirty || disabled;
  return (
    <button type="button" onClick={onClick} disabled={blocked}
      className={`inline-flex items-center gap-2 px-5 py-2 rounded-md text-[13px] font-semibold transition-colors ${
        blocked ? "bg-stone-100 text-stone-400 cursor-not-allowed" : "bg-amber-600 text-white hover:bg-amber-700"
      }`}>
      {loading && <SpinIcon className="w-3.5 h-3.5" />}
      {loading ? "Saving…" : dirty ? "Save changes" : "Saved"}
    </button>
  );
}

function Hint({ children }) {
  return (
    <div className="flex items-start gap-2 rounded-md bg-stone-50 px-3.5 py-2.5 text-xs text-stone-500">
      <Icon path={ICONS.info} className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-stone-400" />
      <span>{children}</span>
    </div>
  );
}

function Toast({ msg, type }) {
  if (!msg) return null;
  const ok = type !== "error";
  return (
    <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-2 rounded-lg border px-5 py-3 text-[13px] font-medium shadow-lg whitespace-nowrap ${
      ok ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "bg-red-50 border-red-200 text-red-700"
    }`}>
      <Icon path={ok ? ICONS.check : ICONS.x} className="w-3.5 h-3.5" />
      {msg}
    </div>
  );
}

function AddBtn({ onClick, label }) {
  return (
    <button type="button" onClick={onClick}
      className="w-full py-2.5 rounded-md border border-dashed border-amber-300 bg-amber-50/60 text-amber-700 text-[13px] font-semibold hover:bg-amber-50 transition-colors">
      + {label}
    </button>
  );
}

function InlineForm({ title, onCancel, onSave, saving, saveLabel = "Save", saveDisabled, children }) {
  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50/50 p-4">
      <div className="font-semibold text-[13px] text-stone-900 mb-3.5">{title}</div>
      <div className="flex flex-col gap-3">
        {children}
        <div className="flex justify-end gap-2 pt-1">
          <button type="button" onClick={onCancel}
            className="px-4 py-2 rounded-md text-[13px] border border-stone-300 bg-white hover:bg-stone-50">
            Cancel
          </button>
          <button type="button" onClick={onSave} disabled={saving || saveDisabled}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-md text-[13px] font-semibold ${
              saving || saveDisabled ? "bg-stone-200 text-stone-400 cursor-not-allowed" : "bg-amber-600 text-white hover:bg-amber-700"
            }`}>
            {saving && <SpinIcon className="w-3.5 h-3.5" />}
            {saving ? "Saving…" : saveLabel}
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

  return (
    <div className="flex flex-col gap-1.5">
      {label && <Label>{label}</Label>}
      <div className="flex items-center gap-3 flex-wrap">
        <div onClick={() => ref.current?.click()}
          className={`relative flex-shrink-0 flex items-center justify-center overflow-hidden cursor-pointer border-2 border-dashed ${
            square ? "w-[72px] h-[72px] rounded-xl" : "w-[180px] h-[72px] rounded-lg"
          } ${isPending ? "border-amber-400 bg-amber-50" : "border-stone-300 bg-stone-50"}`}>
          {preview
            ? <img src={preview} alt={label || "image"} className="w-full h-full object-cover" />
            : <Icon path={ICONS.camera} className="w-5 h-5 text-stone-400" />
          }
          {isPending && (
            <div className="absolute bottom-0 left-0 right-0 bg-amber-600/90 py-0.5 text-[9px] font-bold text-white text-center">
              SAVE TO UPLOAD
            </div>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <button type="button" onClick={() => ref.current?.click()}
            className="px-3.5 py-1.5 rounded-md text-xs font-semibold border border-stone-300 bg-white text-stone-700 hover:bg-stone-50">
            {preview ? "Change" : "Choose image"}
          </button>
          {preview && (
            <button type="button" onClick={handleRemove}
              className="px-2.5 py-1.5 rounded-md text-xs border border-red-200 bg-white text-red-600 hover:bg-red-50">
              Remove
            </button>
          )}
          {aspectHint && <span className="text-[11px] text-stone-400">{aspectHint}</span>}
          {isPending && <span className="text-[11px] text-amber-600 font-semibold">Save to apply</span>}
        </div>
      </div>
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={handleFile} />
    </div>
  );
}

// ─── Profile Header (sticky) ──────────────────────────────────

function ProfileHeader({ school, percent }) {
  const r = 20, circ = 2 * Math.PI * r;
  const offset = circ - (percent / 100) * circ;
  const ringColor = percent === 100 ? "#059669" : percent >= 60 ? "#d97706" : "#dc2626";
  const statusType = school?.status?.type;

  return (
    <div className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-stone-200 px-5 py-2.5 flex items-center gap-3.5 flex-wrap">
      <div className="w-10 h-10 rounded-lg border border-stone-200 overflow-hidden flex-shrink-0 bg-amber-50 flex items-center justify-center text-amber-700">
        {school?.basics?.logo
          ? <img src={school.basics.logo} alt="logo" className="w-full h-full object-cover" />
          : <Icon path={ICONS.school} className="w-5 h-5" />}
      </div>

      <div className="flex-1 min-w-0">
        <div className="font-bold text-sm text-stone-900 truncate">
          {school?.basics?.schoolName || "Your School"}
        </div>
        <div className="text-[11px] text-stone-500">
          {[school?.address?.taluka, school?.address?.district].filter(Boolean).join(", ") || "Location not set"}
        </div>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <div className="relative w-12 h-12">
          <svg width="48" height="48" className="-rotate-90">
            <circle cx="24" cy="24" r={r} fill="none" stroke="#f1f5f9" strokeWidth="3.5" />
            <circle cx="24" cy="24" r={r} fill="none" stroke={ringColor} strokeWidth="3.5"
              strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
              style={{ transition: "stroke-dashoffset 0.6s ease" }} />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[10px] font-bold" style={{ color: ringColor }}>{percent}%</span>
          </div>
        </div>
        <span className="text-[11px] text-stone-500">complete</span>
      </div>

      <div className="flex gap-1.5 flex-wrap">
        {school?.verification?.isVerified && (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-sky-50 text-sky-700 ring-1 ring-inset ring-sky-600/20">Verified</span>
        )}
        {statusType && (
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ring-1 ring-inset ${
            statusType === "ACTIVE" ? "bg-emerald-50 text-emerald-700 ring-emerald-600/20" : "bg-amber-50 text-amber-700 ring-amber-600/20"
          }`}>
            {statusType === "ACTIVE" ? "Active" : statusType === "UNVERIFIED" ? "Pending review" : statusType}
          </span>
        )}
      </div>
    </div>
  );
}

// ─── Section Nav ──────────────────────────────────────────────

function SectionNav({ active }) {
  return (
    <nav className="flex gap-1 flex-wrap bg-white rounded-lg border border-stone-200 p-1.5 mb-5">
      {NAV.map(n => (
        <a key={n.id} href={`#${n.id}`}
          className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
            active === n.id ? "bg-amber-50 text-amber-700" : "text-stone-500 hover:bg-stone-50"
          }`}>
          {n.label}
        </a>
      ))}
    </nav>
  );
}

// ─── Loading page ─────────────────────────────────────────────

function LoadingPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <SpinIcon className="w-8 h-8 text-amber-600" />
        <span className="text-[13px] text-stone-500">Loading school profile…</span>
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

  useEffect(() => {
    if (isLoading) return;
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-20% 0px -65% 0px" }
    );
    NAV.forEach(n => { const el = document.getElementById(n.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [isLoading]);

  const mut = (apiFn) =>
    useMutation({
      mutationFn: apiFn,
      onSuccess: (res) => {
        if (res.data?.data) {
          qc.setQueryData(["my-school"], (old) =>
            old ? { ...old, data: { ...old.data, ...pathToPatch(res) } } : old
          );
        }
        showToast("Saved successfully");
      },
      onError: (err) => {
        showToast(
          err?.response?.data?.message || "Save failed",
          "error"
        );
      },
    });

  const sectionMut = (apiFn, key) =>
    useMutation({
      mutationFn: apiFn,
      onSuccess: (res) => {
        if (res.data?.data !== undefined) {
          qc.setQueryData(["my-school"], (old) =>
            old ? { ...old, data: { ...old.data, [key]: res.data.data } } : old
          );
        }
        showToast("Saved successfully");
      },
      onError: (err) => {
        showToast(err?.response?.data?.message || "Save failed", "error");
      },
    });

  function pathToPatch(res) { return {}; }

  const basicsMut = sectionMut(d => dashboardApi.updateBasics(d), "basics");
  const aboutMut = sectionMut(d => dashboardApi.updateAbout(d), "about");
  const addressMut = sectionMut(d => dashboardApi.updateAddress(d), "address");
  const academicsMut = sectionMut(d => dashboardApi.updateAcademics(d), "academics");
  const categoryMut = sectionMut(d => dashboardApi.updateCategory(d), "category");
  const admissionMut = sectionMut(d => dashboardApi.updateAdmission(d), "admission");
  const feesMut = sectionMut(d => dashboardApi.updateFees(d), "fees");
  const contactMut = sectionMut(d => dashboardApi.updateContact(d), "contact");
  const socialMut = sectionMut(d => dashboardApi.updateSocial(d), "social");

  const addResultMut = sectionMut(d => dashboardApi.addResult(d), "results");
  const editResultMut = mut(({ id, ...d }) => dashboardApi.updateResult(id, d));
  const delResultMut = mut(id => dashboardApi.deleteResult(id));
  const addAchMut = sectionMut(d => dashboardApi.addAchievement(d), "achievements");
  const editAchMut = mut(({ id, ...d }) => dashboardApi.updateAchievement(id, d));
  const delAchMut = mut(id => dashboardApi.deleteAchievement(id));
  const addFacMut = sectionMut(d => dashboardApi.addFacilityItem(d), "facilities");
  const editFacMut = mut(({ id, ...d }) => dashboardApi.updateFacilityItem(id, d));
  const delFacMut = mut(id => dashboardApi.deleteFacilityItem(id));

  useEffect(() => {
    [editResultMut, delResultMut, editAchMut, delAchMut, editFacMut, delFacMut].forEach(m => {
      if (m.isSuccess) qc.invalidateQueries({ queryKey: ["my-school"] });
    });
  }, [editResultMut.isSuccess, delResultMut.isSuccess, editAchMut.isSuccess, delAchMut.isSuccess, editFacMut.isSuccess, delFacMut.isSuccess]);

  if (authLoading || isLoading) return <LoadingPage />;

  if (!user?.schoolId) return (
    <DashboardLayout>
      <div className="text-center py-20 px-5">
        <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
          <Icon path={ICONS.school} className="w-6 h-6" />
        </div>
        <h2 className="text-lg font-bold text-stone-900 mb-1.5">No school linked</h2>
        <p className="text-sm text-stone-500 mb-6">Register your school to manage its profile.</p>
        <a href="/claim" className="inline-block px-6 py-2.5 bg-stone-900 text-white rounded-md font-semibold text-sm hover:bg-stone-800">
          Claim your school
        </a>
      </div>
    </DashboardLayout>
  );

  return (
    <>
      <ProfileHeader school={school} percent={pct(school)} />

      <div className="max-w-[800px] mx-auto px-3.5 py-5">
        <div className="mb-4">
          <h1 className="text-[19px] font-bold text-stone-900 mb-0.5">School Profile</h1>
          <p className="text-stone-500 text-[13px]">Keep everything up to date so parents can find you.</p>
        </div>

        <SectionNav active={active} />

        <div className="flex flex-col gap-4">
          <BasicsSection school={school} mutation={basicsMut} />
          <AboutSection school={school} mutation={aboutMut} />
          <AddressSection school={school} mutation={addressMut} />
          <ContactSection school={school} mutation={contactMut} />
          <AcademicsSection school={school} mutation={academicsMut} />
          <CategorySection school={school} mutation={categoryMut} />
          <AdmissionSection school={school} mutation={admissionMut} />
          <FeesSection school={school} mutation={feesMut} />
          <ResultsSection school={school} addMut={addResultMut} editMut={editResultMut} delMut={delResultMut} />
          <AchievementsSection school={school} addMut={addAchMut} editMut={editAchMut} delMut={delAchMut} />
          <FacilitiesShowcase school={school} addMut={addFacMut} editMut={editFacMut} delMut={delFacMut} />
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
    establishedYear: school?.basics?.establishedYear ?? "",
    trustName: school?.basics?.trustName || "",
    principalName: school?.basics?.principalName || "",
    logo: school?.basics?.logo || "",
    coverImage: school?.basics?.coverImage || "",
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
    <Section id="basics" title="Basic information">
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-4 items-start">
          <ImageUpload label="Logo" value={form.logo} onChange={f("logo")} schoolId={school?._id} type="logo" aspectHint="Square · min 200×200" square />
          <ImageUpload label="Cover image" value={form.coverImage} onChange={f("coverImage")} schoolId={school?._id} type="cover" aspectHint="16:9 · min 800×450" />
        </div>
        <Input label="School name *" value={form.schoolName} onChange={f("schoolName")} placeholder="Full official school name" />
        <Grid>
          <Input label="Trust / society name" value={form.trustName} onChange={f("trustName")} placeholder="Managing trust or society name" />
          <Input label="Principal name" value={form.principalName} onChange={f("principalName")} placeholder="Current principal's name" />
        </Grid>
        <Input label="Established year" value={form.establishedYear} onChange={f("establishedYear")} type="number" placeholder="1990" />
        <div className="flex justify-end">
          <SaveBtn loading={uploading || mutation.isPending} dirty={dirty} onClick={async () => {
            setUploading(true);
            try {
              const resolved = await resolvePendingImages(form, school?._id, [
                { key: "logo", type: "logo" },
                { key: "coverImage", type: "cover" },
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

// ── 2. About ──────────────────────────────────────────────────

function AboutSection({ school, mutation }) {
  const fromSchool = () => ({
    tagline: school?.about?.tagline || "",
    description: school?.about?.description || "",
    vision: school?.about?.vision || "",
    mission: school?.about?.mission || "",
    principalMessage: school?.about?.principalMessage || "",
  });
  const [form, setForm] = useState(fromSchool);
  useEffect(() => setForm(fromSchool()), [school]);
  const dirty = Object.keys(fromSchool()).some(k => String(form[k] ?? "") !== String(fromSchool()[k] ?? ""));
  const f = k => v => setForm(p => ({ ...p, [k]: v }));

  return (
    <Section id="about" title="About the school">
      <div className="flex flex-col gap-3.5">
        <Input label="Tagline" value={form.tagline} onChange={f("tagline")} placeholder="A short catchy line about your school" />
        <Textarea label="Description" value={form.description} onChange={f("description")} placeholder="Detailed overview — history, achievements, highlights…" rows={4} />
        <Grid>
          <Textarea label="Vision" value={form.vision} onChange={f("vision")} placeholder="School's vision statement" rows={3} />
          <Textarea label="Mission" value={form.mission} onChange={f("mission")} placeholder="School's mission statement" rows={3} />
        </Grid>
        <Textarea label="Principal's message" value={form.principalMessage} onChange={f("principalMessage")} placeholder="A message from the principal to parents" rows={3} />
        <div className="flex justify-end">
          <SaveBtn loading={mutation.isPending} dirty={dirty} onClick={() => mutation.mutate(form)} />
        </div>
      </div>
    </Section>
  );
}

// ── 3. Address ────────────────────────────────────────────────

function AddressSection({ school, mutation }) {
  const fromSchool = () => ({
    district: school?.address?.district || "",
    taluka: school?.address?.taluka || "",
    village: school?.address?.village || "",
    pincode: school?.address?.pincode || "",
    full: school?.address?.full || "",
    googleMapsUrl: school?.address?.geo?.googleMapsUrl || "",
  });
  const [form, setForm] = useState(fromSchool);
  useEffect(() => setForm(fromSchool()), [school]);
  const dirty = Object.keys(fromSchool()).some(k => String(form[k] ?? "") !== String(fromSchool()[k] ?? ""));
  const f = k => v => setForm(p => ({ ...p, [k]: v }));

  const save = () => {
    const { googleMapsUrl, ...rest } = form;
    mutation.mutate({ ...rest, geo: { googleMapsUrl } });
  };

  return (
    <Section id="address" title="Address">
      <div className="flex flex-col gap-3.5">
        <Grid>
          <Select label="District *" value={form.district} onChange={f("district")} options={DISTRICT_OPTIONS} placeholder="Select district" />
          <Input label="Taluka" value={form.taluka} onChange={f("taluka")} placeholder="Taluka name" />
        </Grid>
        <Grid>
          <Input label="Village / city" value={form.village} onChange={f("village")} placeholder="Village or city" />
          <Input label="Pincode" value={form.pincode} onChange={f("pincode")} placeholder="380001" />
        </Grid>
        <Textarea label="Full address" value={form.full} onChange={f("full")} placeholder="Complete address as on school letterhead" rows={2} />
        <Input label="Google Maps URL" value={form.googleMapsUrl} onChange={f("googleMapsUrl")} placeholder="https://maps.google.com/?q=…" hint="Paste the link from Google Maps Share button" />
        <div className="flex justify-end">
          <SaveBtn loading={mutation.isPending} dirty={dirty} onClick={save} />
        </div>
      </div>
    </Section>
  );
}

// ── 4. Contact ────────────────────────────────────────────────
// schema: contact {phone: [String], whatsapp, email, website}
// Phone is edited as a comma-separated string and split into an array
// right before the request goes out — this was already correct; kept as-is.

function ContactSection({ school, mutation }) {
  const fromSchool = () => ({
    phone: (school?.contact?.phone || []).join(", "),
    whatsapp: school?.contact?.whatsapp || "",
    email: school?.contact?.email || "",
    website: school?.contact?.website || "",
  });
  const [form, setForm] = useState(fromSchool);
  useEffect(() => setForm(fromSchool()), [school]);
  const dirty = Object.keys(fromSchool()).some(k => String(form[k] ?? "") !== String(fromSchool()[k] ?? ""));
  const f = k => v => setForm(p => ({ ...p, [k]: v }));

  const save = () => {
    const phone = form.phone.split(",").map(s => s.trim()).filter(Boolean);
    mutation.mutate({ ...form, phone });
  };

  return (
    <Section id="contact" title="Contact info">
      <div className="flex flex-col gap-3.5">
        <Input label="Phone number(s)" value={form.phone} onChange={f("phone")} placeholder="+91 98765 43210, +91 98765 00000" hint="Separate multiple numbers with commas" />
        <Grid>
          <Input label="WhatsApp" value={form.whatsapp} onChange={f("whatsapp")} placeholder="+91 98765 43210" />
          <Input label="Email" value={form.email} onChange={f("email")} type="email" placeholder="school@example.com" />
        </Grid>
        <Input label="Website" value={form.website} onChange={f("website")} placeholder="https://school.edu.in" />
        <div className="flex justify-end">
          <SaveBtn loading={mutation.isPending} dirty={dirty} onClick={save} />
        </div>
      </div>
    </Section>
  );
}

// ── 5. Academics ──────────────────────────────────────────────

function AcademicsSection({ school, mutation }) {
  const fromSchool = () => ({
    gradeFrom: school?.academics?.gradeFrom ?? "",
    gradeTo: school?.academics?.gradeTo ?? "",
    medium: school?.academics?.medium || [],
    board: school?.academics?.board || [],
    streams: school?.academics?.streams || [],
    shifts: school?.academics?.shifts || [],
    morning: school?.academics?.timing?.morning || "",
    evening: school?.academics?.timing?.evening || "",
    totalStudents: school?.academics?.totalStudents ?? "",
    totalTeachers: school?.academics?.totalTeachers ?? "",
    affiliationNumber: school?.academics?.affiliationNumber || "",
    indexNumber: school?.academics?.indexNumber || "",
    subjects: (school?.academics?.subjects || []).join(", "),
  });
  const [form, setForm] = useState(fromSchool);
  useEffect(() => setForm(fromSchool()), [school]);
  const dirty = Object.keys(fromSchool()).some(k => {
    const v = form[k];
    if (Array.isArray(v)) return JSON.stringify(v) !== JSON.stringify(fromSchool()[k]);
    return String(v ?? "") !== String(fromSchool()[k] ?? "");
  });
  const f = k => v => setForm(p => ({ ...p, [k]: v }));

  const save = () => {
    const { morning, evening, subjects, ...rest } = form;
    mutation.mutate({
      ...rest,
      timing: { morning, evening },
      subjects: subjects.split(",").map(s => s.trim()).filter(Boolean),
    });
  };

  return (
    <Section id="academics" title="Academics">
      <div className="flex flex-col gap-3.5">
        <Grid>
          <Input label="Grade from" value={form.gradeFrom} onChange={f("gradeFrom")} type="number" placeholder="1" hint="Starting grade (e.g. 1)" />
          <Input label="Grade to" value={form.gradeTo} onChange={f("gradeTo")} type="number" placeholder="10" hint="Ending grade (e.g. 12)" />
        </Grid>
        <MultiChips label="Medium of instruction" value={form.medium} onChange={f("medium")} options={MEDIUM_OPTIONS} />
        <MultiChips label="Board" value={form.board} onChange={f("board")} options={BOARD_OPTIONS} />
        <MultiChips label="Streams (Std 11–12)" value={form.streams} onChange={f("streams")} options={STREAMS_OPT} />
        <MultiChips label="Shifts" value={form.shifts} onChange={f("shifts")} options={SHIFT_OPTIONS} />
        <Grid>
          <Input label="Morning timing" value={form.morning} onChange={f("morning")} placeholder="e.g. 7:00 AM – 12:00 PM" />
          <Input label="Evening timing" value={form.evening} onChange={f("evening")} placeholder="e.g. 12:30 PM – 5:30 PM" />
        </Grid>
        <Grid>
          <Input label="Total students" value={form.totalStudents} onChange={f("totalStudents")} type="number" placeholder="320" />
          <Input label="Total teachers" value={form.totalTeachers} onChange={f("totalTeachers")} type="number" placeholder="18" />
        </Grid>
        <Grid>
          <Input label="Affiliation number" value={form.affiliationNumber} onChange={f("affiliationNumber")} placeholder="Board affiliation number" />
          <Input label="Index number" value={form.indexNumber} onChange={f("indexNumber")} placeholder="Government index number" />
        </Grid>
        <Input label="Subjects offered" value={form.subjects} onChange={f("subjects")} placeholder="Maths, Science, English…" hint="Comma-separated" />
        <div className="flex justify-end">
          <SaveBtn loading={mutation.isPending} dirty={dirty} onClick={save} />
        </div>
      </div>
    </Section>
  );
}

// ── 6. Category ───────────────────────────────────────────────

function CategorySection({ school, mutation }) {
  const fromSchool = () => ({
    management: school?.category?.management || "",
    schoolType: school?.category?.schoolType || "",
    locationType: school?.category?.locationType || "",
  });
  const [form, setForm] = useState(fromSchool);
  useEffect(() => setForm(fromSchool()), [school]);
  const dirty = Object.keys(fromSchool()).some(k => String(form[k] ?? "") !== String(fromSchool()[k] ?? ""));
  const f = k => v => setForm(p => ({ ...p, [k]: v }));

  return (
    <Section id="category" title="Category">
      <div className="flex flex-col gap-3.5">
        <Select label="Management type" value={form.management} onChange={f("management")} options={MANAGEMENT_OPTIONS} placeholder="Select management type" />
        <Grid>
          <Select label="School type" value={form.schoolType} onChange={f("schoolType")} options={SCHOOL_TYPE_OPTIONS} placeholder="Select type" />
          <Select label="Location type" value={form.locationType} onChange={f("locationType")} options={LOC_TYPES} placeholder="Select location" />
        </Grid>
        <div className="flex justify-end">
          <SaveBtn loading={mutation.isPending} dirty={dirty} onClick={() => mutation.mutate(form)} />
        </div>
      </div>
    </Section>
  );
}

// ── 7. Admission ──────────────────────────────────────────────

function AdmissionSection({ school, mutation }) {
  const toDateInput = (d) => (d ? new Date(d).toISOString().slice(0, 10) : "");
  const fromSchool = () => ({
    isOpen: !!school?.admission?.isOpen,
    startDate: toDateInput(school?.admission?.startDate),
    endDate: toDateInput(school?.admission?.endDate),
    onlineAvailable: !!school?.admission?.onlineAvailable,
    admissionUrl: school?.admission?.admissionUrl || "",
    eligibility: (school?.admission?.eligibility || []).join(", "),
    process: (school?.admission?.process || []).join(", "),
    documentsRequired: (school?.admission?.documentsRequired || []).join(", "),
    feeStructurePdfUrl: school?.admission?.feeStructurePdfUrl || "",
    contactName: school?.admission?.adminContact?.name || "",
    contactPhone: school?.admission?.adminContact?.phone || "",
    contactEmail: school?.admission?.adminContact?.email || "",
  });
  const [form, setForm] = useState(fromSchool);
  useEffect(() => setForm(fromSchool()), [school]);
  const dirty = Object.keys(fromSchool()).some(k => String(form[k] ?? "") !== String(fromSchool()[k] ?? ""));
  const f = k => v => setForm(p => ({ ...p, [k]: v }));

  const save = () => {
    const { documentsRequired,eligibility, process, contactName, contactPhone, contactEmail, ...rest } = form;
    mutation.mutate({
      ...rest,

      eligibility: eligibility.split(",").map(s => s.trim()).filter(Boolean),
      process: process.split(",").map(s => s.trim()).filter(Boolean),
      documentsRequired: documentsRequired.split(",").map(s => s.trim()).filter(Boolean),
      adminContact: { name: contactName, phone: contactPhone, email: contactEmail },
    });
  };

  return (
    <Section id="admission" title="Admission">
      <div className="flex flex-col gap-3.5">
        <div className="rounded-md border border-stone-200 bg-stone-50 px-3.5 py-2.5">
          <Toggle label="Admissions currently open" value={form.isOpen} onChange={f("isOpen")} />
        </div>
        <Grid>
          <Input label="Start date" value={form.startDate} onChange={f("startDate")} type="date" />
          <Input label="End date" value={form.endDate} onChange={f("endDate")} type="date" />
        </Grid>
        <div className="rounded-md border border-stone-200 bg-stone-50 px-3.5 py-2.5">
          <Toggle label="Online application available" value={form.onlineAvailable} onChange={f("onlineAvailable")} />
        </div>
        <Input label="Admission URL" value={form.admissionUrl} onChange={f("admissionUrl")} placeholder="https://school.edu.in/admissions" />
        <Textarea label="Eligibility" value={form.eligibility} onChange={f("eligibility")} placeholder="Age criteria, prior qualification, etc." rows={2} />
        <Textarea label="Process" value={form.process} onChange={f("process")} placeholder="Step-by-step admission process" rows={2} />
        <Input label="Documents required" value={form.documentsRequired} onChange={f("documentsRequired")} placeholder="Birth certificate, Aadhar, transfer certificate…" hint="Comma-separated" />
        <Input label="Fee structure PDF URL" value={form.feeStructurePdfUrl} onChange={f("feeStructurePdfUrl")} placeholder="Link to uploaded fee structure PDF" />
        <div>
          <Label>Admission contact person</Label>
          <div className="mt-2">
            <Grid cols={3}>
              <Input label="Name" value={form.contactName} onChange={f("contactName")} placeholder="Contact person name" />
              <Input label="Phone" value={form.contactPhone} onChange={f("contactPhone")} placeholder="+91 98765 43210" />
              <Input label="Email" value={form.contactEmail} onChange={f("contactEmail")} type="email" placeholder="admissions@school.com" />
            </Grid>
          </div>
        </div>
        <div className="flex justify-end">
          <SaveBtn loading={mutation.isPending} dirty={dirty} onClick={save} />
        </div>
      </div>
    </Section>
  );
}

// ── 8. Fees ───────────────────────────────────────────────────

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
  const dirty = Object.keys(fromSchool()).some(k => String(form[k] ?? "") !== String(fromSchool()[k] ?? ""));
  const f = k => v => setForm(p => ({ ...p, [k]: v }));

  return (
    <Section id="fees" title="Fees (annual, ₹)">
      <div className="flex flex-col gap-3.5">
        <Hint>Enter approximate annual fees in rupees. Leave blank if not applicable.</Hint>
        <Grid>
          <Input label="Min tuition fees" value={form.minTuitionFees} onChange={f("minTuitionFees")} type="number" placeholder="5000" />
          <Input label="Max tuition fees" value={form.maxTuitionFees} onChange={f("maxTuitionFees")} type="number" placeholder="15000" />
        </Grid>
        <Grid cols={3}>
          <Input label="Transport" value={form.transportFees} onChange={f("transportFees")} type="number" placeholder="3000" />
          <Input label="Hostel" value={form.hostelFees} onChange={f("hostelFees")} type="number" placeholder="20000" />
          <Input label="Other" value={form.otherFees} onChange={f("otherFees")} type="number" placeholder="500" />
        </Grid>
        <div className="flex justify-end">
          <SaveBtn loading={mutation.isPending} dirty={dirty} onClick={() => mutation.mutate(form)} />
        </div>
      </div>
    </Section>
  );
}

// ── 9. Results ────────────────────────────────────────────────
// schema: results[] {classLabel, year, stream, board, medium, appeared, passed, passingRate, posterImageUrl}
//
// FIX: classLabel + year are required by the backend, but nothing stopped
// an incomplete entry from being submitted — which then fails with
// "year is required", and (because Mongoose validates the whole results[]
// array on save) can keep blocking saves on OTHER sections too until the
// bad entry is fixed. Save is now disabled until both are filled, and
// numeric fields are coerced with Number() before the request goes out.

const BLANK_RESULT = { classLabel: "", year: "", stream: "", board: "", medium: "", appeared: "", passed: "", passingRate: "", posterImageUrl: "" };

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
    setForm({
      classLabel: r.classLabel || "", year: r.year ?? "", stream: r.stream || "",
      board: r.board || "", medium: r.medium || "",
      appeared: r.appeared ?? "", passed: r.passed ?? "", passingRate: r.passingRate ?? "",
      posterImageUrl: r.posterImageUrl || "",
    });
    setShowForm(true);
  };
  const close = () => { setShowForm(false); setEditing(null); };
  const missingRequired = !form.classLabel.trim() || !String(form.year).trim();

  const save = async () => {
    if (missingRequired) return;
    setUploading(true);
    try {
      const resolved = await resolvePendingImages(form, school?._id, [
        { key: "posterImageUrl", type: "result" }
      ]);
      if (!resolved.passingRate && resolved.appeared && resolved.passed) {
        resolved.passingRate = Math.round((Number(resolved.passed) / Number(resolved.appeared)) * 1000) / 10;
      }
      resolved.year = Number(resolved.year);
      if (resolved.appeared !== "") resolved.appeared = Number(resolved.appeared);
      if (resolved.passed !== "") resolved.passed = Number(resolved.passed);
      if (resolved.passingRate !== "") resolved.passingRate = Number(resolved.passingRate);
      const cb = { onSuccess: close };
      editing ? editMut.mutate({ id: editing, ...resolved }, cb) : addMut.mutate(resolved, cb);
    } catch (err) { alert(err.message); }
    finally { setUploading(false); }
  };
  const saving = uploading || addMut.isPending || editMut.isPending;

  return (
    <Section id="results" title="Board exam results">
      <div className="flex flex-col gap-3">
        {results.length === 0 && !showForm && (
          <div className="text-center py-7 text-stone-400 text-[13px]">
            No results added yet. Add Std 10 or 12 board results.
          </div>
        )}

        {results.map(r => (
          <div key={r._id} className="flex items-center gap-3 px-3.5 py-3 rounded-md border border-stone-200 bg-stone-50">
            {r.posterImageUrl && (
              <img src={r.posterImageUrl} alt="poster" className="w-11 h-11 object-cover rounded-md flex-shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-[13px] text-stone-900">{r.classLabel} · {r.year}</div>
              <div className="text-xs text-stone-500 mt-0.5">
                {r.appeared} appeared · {r.passed} passed
                {r.passingRate != null ? ` · ${r.passingRate}% pass rate` : ""}
              </div>
            </div>
            <button type="button" onClick={() => openEdit(r)}
              className="px-3 py-1 rounded-md text-xs border border-stone-300 bg-white text-stone-600 hover:bg-stone-100">
              Edit
            </button>
            <button type="button" onClick={() => { if (window.confirm("Delete this result?")) delMut.mutate(r._id); }}
              className="px-2.5 py-1 rounded-md text-xs border border-red-200 bg-white text-red-600 hover:bg-red-50">
              <Icon path={ICONS.x} className="w-3 h-3" />
            </button>
          </div>
        ))}

        {showForm && (
          <InlineForm
            title={editing ? "Edit result" : "Add result"}
            onCancel={close} onSave={save} saving={saving} saveDisabled={missingRequired}
            saveLabel={editing ? "Update result" : "Add result"}
          >
            <Grid>
              <Input label="Class *" value={form.classLabel} onChange={f("classLabel")} placeholder="e.g. Std 10" error={!form.classLabel.trim() ? "Required" : null} />
              <Input label="Year *" value={form.year} onChange={f("year")} type="number" placeholder="2024" error={!String(form.year).trim() ? "Required" : null} />
            </Grid>
            <Grid cols={3}>
              <Select label="Board" value={form.board} onChange={f("board")} options={BOARD_OPTIONS} placeholder="Select board" />
              <Select label="Medium" value={form.medium} onChange={f("medium")} options={MEDIUM_OPTIONS} placeholder="Select medium" />
              <Select label="Stream" value={form.stream} onChange={f("stream")} options={STREAMS_OPT} placeholder="If Std 12" />
            </Grid>
            <Grid cols={3}>
              <Input label="Appeared" value={form.appeared} onChange={f("appeared")} type="number" placeholder="120" />
              <Input label="Passed" value={form.passed} onChange={f("passed")} type="number" placeholder="118" />
              <Input label="Pass %" value={form.passingRate} onChange={f("passingRate")} type="number" placeholder="98.3" hint="Auto-calculated if blank" />
            </Grid>
            <ImageUpload label="Result poster (optional)" value={form.posterImageUrl} onChange={f("posterImageUrl")} schoolId={school?._id} type="result" aspectHint="Result poster or photo" />
          </InlineForm>
        )}

        {!showForm && <AddBtn onClick={openAdd} label="Add result" />}
      </div>
    </Section>
  );
}

// ── 10. Achievements ───────────────────────────────────────────
// FIX: title is required — same guard pattern as Results, plus Number()
// coercion on year so it's never sent as an empty/typed string.

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
  const missingRequired = !form.title.trim();

  const save = async () => {
    if (missingRequired) return;
    setUploading(true);
    try {
      const resolved = await resolvePendingImages(form, school?._id, [
        { key: "imgUrl", type: "achievement" }
      ]);
      if (resolved.year !== "") resolved.year = Number(resolved.year);
      const cb = { onSuccess: close };
      editing ? editMut.mutate({ id: editing, ...resolved }, cb) : addMut.mutate(resolved, cb);
    } catch (err) { alert(err.message); }
    finally { setUploading(false); }
  };
  const saving = uploading || addMut.isPending || editMut.isPending;
  return (
    <Section id="achievements" title="Achievements">
      <div className="flex flex-col gap-3">
        {list.length === 0 && !showForm && (
          <div className="text-center py-7 text-stone-400 text-[13px]">No achievements added yet.</div>
        )}

        {list.map(a => (
          <div key={a._id} className="flex items-start gap-3 px-3.5 py-3 rounded-md border border-stone-200 bg-stone-50">
            {a.imgUrl
              ? <img src={a.imgUrl} alt={a.title} className="w-12 h-12 object-cover rounded-md flex-shrink-0" />
              : <div className="w-9 h-9 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center flex-shrink-0 text-sm font-bold">{(a.title || "?")[0]}</div>
            }
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-[13px] text-stone-900">
                {a.title}{a.year ? ` · ${a.year}` : ""}
              </div>
              {a.description && <div className="text-xs text-stone-500 mt-0.5">{a.description}</div>}
            </div>
            <button type="button" onClick={() => openEdit(a)}
              className="px-3 py-1 rounded-md text-xs border border-stone-300 bg-white text-stone-600 hover:bg-stone-100 flex-shrink-0">
              Edit
            </button>
            <button type="button" onClick={() => { if (window.confirm("Delete this achievement?")) delMut.mutate(a._id); }}
              className="px-2.5 py-1 rounded-md text-xs border border-red-200 bg-white text-red-600 hover:bg-red-50 flex-shrink-0">
              <Icon path={ICONS.x} className="w-3 h-3" />
            </button>
          </div>
        ))}

        {showForm && (
          <InlineForm
            title={editing ? "Edit achievement" : "Add achievement"}
            onCancel={close} onSave={save} saving={saving} saveDisabled={missingRequired}
            saveLabel={editing ? "Update achievement" : "Add achievement"}
          >
            <Grid>
              <Input label="Title *" value={form.title} onChange={f("title")} placeholder="National Science Olympiad winner" error={!form.title.trim() ? "Required" : null} />
              <Input label="Year" value={form.year} onChange={f("year")} type="number" placeholder="2024" />
            </Grid>
            <Textarea label="Description" value={form.description} onChange={f("description")} placeholder="Brief about the achievement…" rows={2} />
            <ImageUpload label="Image (optional)" value={form.imgUrl} onChange={f("imgUrl")} schoolId={school?._id} type="achievement" aspectHint="Award photo or certificate" />
          </InlineForm>
        )}

        {!showForm && <AddBtn onClick={openAdd} label="Add achievement" />}
      </div>
    </Section>
  );
}

// ── 11. Facility Showcase ──────────────────────────────────────
// FIX: same required-field guard, applied to `label`.

const BLANK_FAC = { label: "", description: "", imageUrl: "" };

function FacilitiesShowcase({ school, addMut, editMut, delMut }) {
  const [uploading, setUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(BLANK_FAC);

  const list = school?.facilities || [];
  const f = k => v => setForm(p => ({ ...p, [k]: v }));
  const openAdd = () => { setEditing(null); setForm(BLANK_FAC); setShowForm(true); };
  const openEdit = (item) => { setEditing(item._id); setForm({ label: item.label || "", description: item.description || "", imageUrl: item.imageUrl || "" }); setShowForm(true); };
  const close = () => { setShowForm(false); setEditing(null); };
  const missingRequired = !form.label.trim();

  const save = async () => {
    if (missingRequired) return;
    setUploading(true);
    try {
      const resolved = await resolvePendingImages(form, school?._id, [
        { key: "imageUrl", type: "facility" }
      ]);
      const cb = { onSuccess: close };
      editing ? editMut.mutate({ id: editing, ...resolved }, cb) : addMut.mutate(resolved, cb);
    } catch (err) { alert(err.message); }
    finally { setUploading(false); }
  };
  const saving = uploading || addMut.isPending || editMut.isPending;

  return (
    <Section id="facilities" title="Facility showcase">
      <div className="flex flex-col gap-3">
        <Hint>Showcase your school's facilities with photos — library, lab, playground, computer room, etc.</Hint>

        {list.length === 0 && !showForm && (
          <div className="text-center py-6 text-stone-400 text-[13px]">No facilities added yet.</div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {list.map(item => (
            <div key={item._id} className="rounded-md border border-stone-200 overflow-hidden bg-stone-50">
              {item.imageUrl
                ? <img src={item.imageUrl} alt={item.label} className="w-full h-[120px] object-cover block" />
                : <div className="h-20 bg-stone-100 flex items-center justify-center text-stone-300"><Icon path={ICONS.school} className="w-6 h-6" /></div>
              }
              <div className="px-3 py-2.5">
                <div className="font-semibold text-[13px] text-stone-900">{item.label}</div>
                {item.description && <div className="text-xs text-stone-500 mt-0.5">{item.description}</div>}
                <div className="flex gap-1.5 mt-2">
                  <button type="button" onClick={() => openEdit(item)}
                    className="flex-1 py-1 rounded-md text-xs border border-stone-300 bg-white hover:bg-stone-100">
                    Edit
                  </button>
                  <button type="button" onClick={() => { if (window.confirm("Delete this facility?")) delMut.mutate(item._id); }}
                    className="px-2.5 py-1 rounded-md text-xs border border-red-200 bg-white text-red-600 hover:bg-red-50">
                    <Icon path={ICONS.x} className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {showForm && (
          <InlineForm
            title={editing ? "Edit facility" : "Add facility"}
            onCancel={close} onSave={save} saving={saving} saveDisabled={missingRequired}
            saveLabel={editing ? "Update facility" : "Add facility"}
          >
            <Input label="Label *" value={form.label} onChange={f("label")} placeholder="e.g. Science laboratory" error={!form.label.trim() ? "Required" : null} />
            <Textarea label="Description" value={form.description} onChange={f("description")} placeholder="Brief description of the facility…" rows={2} />
            <ImageUpload label="Photo" value={form.imageUrl} onChange={f("imageUrl")} schoolId={school?._id} type="facility" aspectHint="Clear photo of the facility" />
          </InlineForm>
        )}

        {!showForm && <AddBtn onClick={openAdd} label="Add facility" />}
      </div>
    </Section>
  );
}

// ── 12. Social Links ──────────────────────────────────────────

function SocialSection({ school, mutation }) {
  const fromSchool = () => {
    const s = school?.social || {};
    const out = {};
    SOCIAL_PLATFORMS.forEach(p => { out[p.key] = s[p.key] || ""; });
    return out;
  };
  const [form, setForm] = useState(fromSchool);
  useEffect(() => setForm(fromSchool()), [school]);
  const dirty = JSON.stringify(form) !== JSON.stringify(fromSchool());

  return (
    <Section id="social" title="Social media">
      <div className="flex flex-col gap-2.5">
        <Hint>Add links to your school's social pages. Leave blank to remove.</Hint>
        {SOCIAL_PLATFORMS.map(p => (
          <div key={p.key} className="flex items-center gap-3">
            <span className="text-xs text-stone-500 w-28 flex-shrink-0">{p.label}</span>
            <input
              type="url"
              value={form[p.key] || ""}
              onChange={e => setForm(prev => ({ ...prev, [p.key]: e.target.value }))}
              placeholder={`${p.label} page URL`}
              className={`${fieldClass} text-xs py-2 flex-1`}
            />
          </div>
        ))}
        <div className="flex justify-end pt-1">
          <SaveBtn loading={mutation.isPending} dirty={dirty} onClick={() => mutation.mutate(form)} />
        </div>
      </div>
    </Section>
  );
}