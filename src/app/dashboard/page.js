"use client";

import { useEffect }           from "react";
import { useRouter }           from "next/navigation";
import Link                    from "next/link";
import { useSelector }         from "react-redux";
import { useQuery }            from "@tanstack/react-query";

import { dashboardApi }        from "@/lib/api";
import DashboardLayout         from "@/components/layout/DashboardLayout";
import { selectUser, selectIsLoggedIn, selectAuthLoading  } from "../../../store/slices/userSlice";
import { useLogout } from "@/hooks/useLogout";

// ── Icons (inline, no emoji) ────────────────────────────────
function SchoolIcon({ className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 3 2 8l10 5 8-4.2V16h1.5V8L12 3Z" fill="currentColor" />
      <path d="M6 12.2V17c0 1.7 2.7 3 6 3s6-1.3 6-3v-4.8l-6 3.15-6-3.15Z" fill="currentColor" opacity="0.55" />
    </svg>
  );
}

function ArrowIcon({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon({ className = "w-3 h-3" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Stat card ────────────────────────────────────────────────
function StatCard({ label, value }) {
  return (
    <div className="relative bg-white rounded-lg border border-stone-200 pl-5 pr-4 py-4 overflow-hidden">
      <span className="absolute left-0 top-0 h-full w-[3px] bg-amber-600" />
      <div className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">
        {label}
      </div>
      <div className="mt-1 text-2xl font-bold text-stone-900 tabular-nums">
        {value ?? "—"}
      </div>
    </div>
  );
}

// ── Status badge ─────────────────────────────────────────────
// Schema: status.type (UNVERIFIED default) — normalize case defensively.
function StatusBadge({ status }) {
  const map = {
    ACTIVE:     { className: "bg-emerald-50 text-emerald-700 ring-emerald-600/20", label: "Active" },
    UNVERIFIED: { className: "bg-amber-50 text-amber-700 ring-amber-600/20",       label: "Pending review" },
    INACTIVE:   { className: "bg-stone-100 text-stone-600 ring-stone-500/20",      label: "Inactive" },
    CLOSED:     { className: "bg-red-50 text-red-700 ring-red-600/20",            label: "Closed" },
  };
  const key = String(status || "UNVERIFIED").toUpperCase();
  const s = map[key] || map.UNVERIFIED;
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ring-1 ring-inset ${s.className}`}>
      {s.label}
    </span>
  );
}

// ── Profile completeness ────────────────────────────────────
function CompletenessCard({ school }) {
  if (!school) return null;

  const checks = [
    { label: "School name",    done: !!school.basics?.schoolName },
    { label: "Description",    done: !!school.about?.description },
    { label: "Phone",          done: (school.contact?.phone?.length || 0) > 0 },
    { label: "Logo",           done: !!school.basics?.logo },
    { label: "Address",        done: !!school.address?.village },
    { label: "District",       done: !!school.address?.district },
    { label: "Management",     done: !!school.category?.management },
    { label: "Grade range",    done: school.academics?.gradeFrom != null },
    { label: "Medium",         done: (school.academics?.medium?.length || 0) > 0 },
    { label: "Total students", done: (school.academics?.totalStudents || 0) > 0 },
  ];

  const done    = checks.filter(c => c.done).length;
  const percent = Math.round((done / checks.length) * 100);
  const gaugeColor = percent === 100 ? "#059669" : "#d97706";

  return (
    <div className="bg-white rounded-lg border border-stone-200 p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="text-sm font-semibold text-stone-900">Profile completeness</div>
          <div className="text-xs text-stone-500 mt-0.5">{done} of {checks.length} fields filled in</div>
        </div>

        {/* Radial gauge */}
        <div
          className="relative w-14 h-14 rounded-full flex items-center justify-center"
          style={{ background: `conic-gradient(${gaugeColor} ${percent * 3.6}deg, #e7e5e4 0deg)` }}
        >
          <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center">
            <span className="text-xs font-bold text-stone-900">{percent}%</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-y-2.5 gap-x-4">
        {checks.map(c => (
          <div key={c.label} className="flex items-center gap-2 text-[13px]">
            <span className={`flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center ${
              c.done ? "bg-emerald-100 text-emerald-700" : "bg-stone-100 text-stone-300"
            }`}>
              {c.done && <CheckIcon />}
            </span>
            <span className={c.done ? "text-stone-700" : "text-stone-400"}>{c.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────
export default function DashboardPage() {
  const router      = useRouter();
  const user        = useSelector(selectUser);
  const isLoggedIn  = useSelector(selectIsLoggedIn);
  const authLoading = useSelector(selectAuthLoading);
  const { logout, loading } = useLogout();

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !isLoggedIn) {
      router.replace("/auth/login");
    }
  }, [authLoading, isLoggedIn, router]);

  // Fetch dashboard stats
  const { data: statsData, isLoading: statsLoading } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn:  async () => {
      const { data, ok } = await dashboardApi.stats();
      if (!ok) throw new Error(data.message);
      return data;
    },
    enabled: isLoggedIn,
  });

  // Fetch school if user has one
  const { data: schoolData, isLoading: schoolLoading } = useQuery({
    queryKey: ["my-school"],
    queryFn:  async () => {
      const { data, ok } = await dashboardApi.getSchool();
      if (!ok) throw new Error(data.message);
      return data;
    },
    enabled: isLoggedIn && !!user?.schoolId,
  });

  if (authLoading || (isLoggedIn && user?.schoolId && schoolLoading)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="text-center">
          <div className="w-8 h-8 mx-auto mb-3 rounded-full border-2 border-stone-200 border-t-amber-600 animate-spin" />
          <div className="text-sm text-stone-500">Loading…</div>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) return null;

  const school = schoolData?.data;
  const stats  = statsData?.data; // controller returns { success, data: {...stats} }
  const phoneNumbers = (school?.contact?.phone || []).filter(Boolean).join(", ");

  return (
    <>

    <DashboardLayout>
      {/* Header */}
      <div className="flex mt-24 items-center justify-between flex-wrap gap-4 mb-7">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-lg">
            {user?.name ? user.name.split(" ")[0][0] : "U"}
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-stone-900">Welcome back, {user?.name?.split(" ")[0]}</h1>
            <p className="text-sm text-stone-500 mt-1">{new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-stone-600 hidden sm:inline">Signed in as <strong className="text-stone-900">{user?.email}</strong></span>
          <button
            onClick={logout}
            disabled={loading}
            className="inline-flex items-center gap-2 bg-stone-900 text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-stone-800 transition-colors disabled:opacity-50"
          >
            {loading ? "Logging out…" : "Logout"}
          </button>
        </div>
      </div>

      {!user?.schoolId && (
        <div className="bg-white rounded-lg border border-stone-200 p-10 text-center">
          <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
            <SchoolIcon className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-stone-900 mb-1.5">
            No school linked yet
          </h2>
          <p className="text-sm text-stone-500 max-w-sm mx-auto mb-6">
            Claim your school to manage its profile, showcase facilities, and reach more parents.
          </p>
          <Link
            href="/claim"
            className="inline-flex items-center gap-1.5 bg-stone-900 text-white text-sm font-semibold px-5 py-2.5 rounded-md hover:bg-stone-800 transition-colors"
          >
            Claim your school
            <ArrowIcon />
          </Link>
        </div>
      )}

      {user?.schoolId && (
        <>
          {/* School info card */}
          <div className="bg-white rounded-lg border border-stone-200 p-6 mb-5 flex items-center justify-between flex-wrap gap-4">
            <div>
              {schoolLoading ? (
                <div className="text-sm text-stone-400">Loading school…</div>
              ) : (
                <>
                  <div className="flex items-center flex-wrap gap-2 mb-1.5">
                    <h2 className="text-lg font-bold text-stone-900">
                      {school?.basics?.schoolName || "Your School"}
                    </h2>
                    {school?.status && <StatusBadge status={school.status.type} />}
                    {school?.verification?.isVerified && (
                      <span className="inline-flex items-center gap-1 bg-sky-50 text-sky-700 ring-1 ring-inset ring-sky-600/20 px-2.5 py-0.5 rounded-full text-xs font-semibold">
                        <CheckIcon className="w-3 h-3" /> Verified
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-stone-500">
                    {[school?.address?.village, school?.address?.taluka, school?.address?.district]
                      .filter(Boolean).join(", ")}
                  </div>
                  {phoneNumbers && (
                    <div className="text-sm text-stone-500 mt-0.5">{phoneNumbers}</div>
                  )}
                </>
              )}
            </div>
            <Link
              href="/dashboard/school"
              className="inline-flex items-center gap-1.5 bg-amber-600 text-white text-sm font-semibold px-4 py-2.5 rounded-md hover:bg-amber-700 transition-colors whitespace-nowrap"
            >
              Manage school
              <ArrowIcon />
            </Link>
          </div>

          {/* Stats row */}
          {stats && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-5">
              <StatCard label="Students" value={stats.totalStudents} />
              <StatCard label="Teachers" value={stats.totalTeachers} />
              <StatCard label="Student:Teacher" value={stats.studentTeacherRatio ?? "—"} />
              <StatCard label="Achievements" value={stats.totalAchievements} />
              <StatCard label="Results" value={stats.totalResults} />
              <StatCard label="Facilities" value={stats.totalFacilities} />
            </div>
          )}

          {/* Completeness */}
          {school && <CompletenessCard school={school} />}
        </>
      )}

    </DashboardLayout>
    </>
  );
}