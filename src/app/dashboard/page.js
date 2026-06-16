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

// ── Stat card ────────────────────────────────────────────────
function StatCard({ label, value, sub, color = "#6366f1" }) {
  return (
    <div style={{
      background:   "#fff",
      borderRadius: "12px",
      border:       "1px solid #e2e8f0",
      padding:      "20px 24px",
      display:      "flex",
      flexDirection:"column",
      gap:          "6px",
    }}>
      <div style={{ fontSize: "12px", color: "#64748b", fontWeight: "500", textTransform: "uppercase", letterSpacing: "0.05em" }}>
        {label}
      </div>
      <div style={{ fontSize: "28px", fontWeight: "700", color: "#0f172a" }}>
        {value ?? "—"}
      </div>
      {sub && <div style={{ fontSize: "12px", color: "#94a3b8" }}>{sub}</div>}
    </div>
  );
}

// ── Status badge ─────────────────────────────────────────────
function StatusBadge({ status }) {
  const map = {
    active:     { bg: "#dcfce7", color: "#166534", label: "Active" },
    unverified: { bg: "#fef3c7", color: "#92400e", label: "Pending Review" },
    inactive:   { bg: "#f1f5f9", color: "#475569", label: "Inactive" },
    closed:     { bg: "#fee2e2", color: "#991b1b", label: "Closed" },
  };
  const s = map[status] || map.unverified;
  return (
    <span style={{
      background: s.bg, color: s.color,
      padding: "3px 10px", borderRadius: "20px",
      fontSize: "12px", fontWeight: "600",
    }}>
      {s.label}
    </span>
  );
}

// ── Profile completeness bar ──────────────────────────────────
function CompletenessBar({ school }) {
  if (!school) return null;

  const checks = [
    { label: "School name",   done: !!school.basics?.schoolName },
    { label: "Description",   done: !!school.basics?.description },
    { label: "Phone",         done: !!school.basics?.phone },
    { label: "Logo",          done: !!school.basics?.logoImg },
    { label: "Address",       done: !!school.address?.village },
    { label: "District",      done: !!school.address?.district },
    { label: "Management",    done: !!school.category?.management },
    { label: "Grade range",   done: school.academics?.gradeFrom != null },
    { label: "Medium",        done: (school.academics?.medium?.length || 0) > 0 },
    { label: "Total students",done: (school.academics?.totalStudents || 0) > 0 },
  ];

  const done    = checks.filter(c => c.done).length;
  const percent = Math.round((done / checks.length) * 100);

  return (
    <div style={{
      background: "#fff", borderRadius: "12px",
      border: "1px solid #e2e8f0", padding: "24px",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        <div style={{ fontWeight: "600", color: "#0f172a", fontSize: "15px" }}>
          Profile Completeness
        </div>
        <div style={{ fontWeight: "700", color: "#6366f1", fontSize: "18px" }}>
          {percent}%
        </div>
      </div>

      {/* Progress bar */}
      <div style={{
        height: "8px", borderRadius: "4px",
        background: "#e2e8f0", overflow: "hidden", marginBottom: "16px",
      }}>
        <div style={{
          height: "100%", borderRadius: "4px",
          width: `${percent}%`,
          background: percent === 100 ? "#22c55e" : "#6366f1",
          transition: "width 0.5s ease",
        }} />
      </div>

      {/* Checklist */}
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: "8px",
      }}>
        {checks.map(c => (
          <div key={c.label} style={{
            display: "flex", alignItems: "center", gap: "8px",
            fontSize: "13px", color: c.done ? "#166534" : "#94a3b8",
          }}>
            <span style={{
              width: "16px", height: "16px", borderRadius: "50%",
              background: c.done ? "#dcfce7" : "#f1f5f9",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "10px", flexShrink: 0,
              color: c.done ? "#166534" : "#cbd5e1",
            }}>
              {c.done ? "✓" : "○"}
            </span>
            {c.label}
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

  if (authLoading) {
    return (
      <div style={{
        minHeight: "100vh", display: "flex",
        alignItems: "center", justifyContent: "center",
        background: "#f8fafc",
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: "36px", height: "36px",
            border: "3px solid #e2e8f0",
            borderTop: "3px solid #6366f1",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
            margin: "0 auto 12px",
          }} />
          <div style={{ color: "#64748b", fontSize: "14px" }}>Loading…</div>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!isLoggedIn) return null;

  const school = schoolData?.data;
  const stats  = statsData?.stats;

  return (
    <>
      {/* Welcome header */}
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{
          fontSize: "22px", fontWeight: "700",
          color: "#0f172a", margin: 0,
        }}>
          Welcome back, {user?.name?.split(" ")[0]} 👋
        </h1>
        <p style={{ color: "#64748b", fontSize: "14px", marginTop: "4px" }}>
          {new Date().toLocaleDateString("en-IN", {
            weekday: "long", year: "numeric",
            month: "long", day: "numeric",
          })}
        </p>
        <button onClick={logout} style={{
          marginTop: "12px",
          background: "transparent",
          color: "#ef4444",
          border: "1px solid #ef4444",
          padding: "6px 16px",
          borderRadius: "6px",
          fontSize: "13px",
          fontWeight: "500",
          cursor: "pointer",
        }}      >
          Logout
        </button>
      </div>

      {!user?.schoolId && (
        <div style={{
          background:   "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
          borderRadius: "16px",
          padding:      "40px 32px",
          color:        "#fff",
          textAlign:    "center",
          marginBottom: "28px",
        }}>
          <div style={{ fontSize: "48px", marginBottom: "12px" }}>🏫</div>
          <h2 style={{ fontSize: "20px", fontWeight: "700", margin: "0 0 8px" }}>
            No School Linked Yet
          </h2>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "14px", marginBottom: "24px" }}>
            Claim your school to manage its profile, showcase facilities, and reach more parents.
          </p>
          <Link
            href="/claim"
            style={{
              display:        "inline-block",
              background:     "#fff",
              color:          "#6366f1",
              padding:        "12px 28px",
              borderRadius:   "8px",
              fontWeight:     "600",
              fontSize:       "14px",
              textDecoration: "none",
              boxShadow:      "0 4px 12px rgba(0,0,0,0.15)",
            }}
          >
            Claim Your School →
          </Link>
        </div>
      )}

     
      {user?.schoolId && (
        <>
          {/* School info card */}
          <div style={{
            background: "#fff", borderRadius: "12px",
            border: "1px solid #e2e8f0", padding: "24px",
            marginBottom: "20px",
            display: "flex", alignItems: "center",
            justifyContent: "space-between", flexWrap: "wrap", gap: "16px",
          }}>
            <div>
              {schoolLoading ? (
                <div style={{ color: "#94a3b8", fontSize: "14px" }}>Loading school…</div>
              ) : (
                <>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                    <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#0f172a", margin: 0 }}>
                      {school?.basics?.schoolName || "Your School"}
                    </h2>
                    {school?.status && <StatusBadge status={school.status} />}
                    {school?.isVerified && (
                      <span style={{
                        background: "#dbeafe", color: "#1e40af",
                        padding: "3px 8px", borderRadius: "20px",
                        fontSize: "11px", fontWeight: "600",
                      }}>✓ Verified</span>
                    )}
                  </div>
                  <div style={{ color: "#64748b", fontSize: "13px" }}>
                    {[school?.address?.village, school?.address?.taluka, school?.address?.district]
                      .filter(Boolean).join(", ")}
                  </div>
                </>
              )}
            </div>
            <Link
              href="/dashboard/school"
              style={{
                background: "#6366f1", color: "#fff",
                padding: "10px 20px", borderRadius: "8px",
                fontWeight: "600", fontSize: "13px",
                textDecoration: "none",
              }}
            >
              Manage School →
            </Link>
          </div>

          {/* Stats row */}
         

          {/* Completeness bar */}
         
        </>
      )}

</>
  );
}