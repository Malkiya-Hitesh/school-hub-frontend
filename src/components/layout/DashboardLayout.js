"use client";
// components/layout/DashboardLayout.js
// Shared layout: sidebar + top navbar for all dashboard pages

import { useState }        from "react";
import Link                from "next/link";
import { usePathname }     from "next/navigation";
import { useSelector }     from "react-redux";
// import { selectUser }      from "@/store/slices/userSlice";
import { useLogout } from "@/hooks/useLogout";
import { selectUser } from "../../../store/slices/userSlice";
// import { useLogout }       from "@/lib/hooks/useLogout";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Overview",     icon: "⊞" },
  { href: "/claim",     label: "Claim School", icon: "🏫" },
];

function NavItem({ href, label, icon, onClick }) {
  const pathname = usePathname();
  const active   = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      style={{
        display:        "flex",
        alignItems:     "center",
        gap:            "10px",
        padding:        "10px 16px",
        borderRadius:   "8px",
        textDecoration: "none",
        fontSize:       "14px",
        fontWeight:     active ? "600" : "400",
        color:          active ? "#fff" : "#94a3b8",
        background:     active ? "rgba(99,102,241,0.2)" : "transparent",
        borderLeft:     active ? "3px solid #6366f1" : "3px solid transparent",
        transition:     "all 0.15s",
      }}
    >
      <span style={{ fontSize: "16px" }}>{icon}</span>
      {label}
    </Link>
  );
}

export default function DashboardLayout({ children }) {
  const user            = useSelector(selectUser);
  const { logout, loading } = useLogout();
  const [mobileOpen, setMobileOpen] = useState(false);

  const initials = user?.name
    ? user.name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8fafc" }}>

      {/* ── Sidebar ── */}
      <aside style={{
        width:      "240px",
        flexShrink: 0,
        background: "#0f172a",
        display:    "flex",
        flexDirection: "column",
        padding:    "0",
        position:   "fixed",
        top:        0,
        left:       mobileOpen ? 0 : "-240px",
        height:     "100vh",
        zIndex:     50,
        transition: "left 0.25s ease",
        // always show on desktop
      }}
      className="lg-sidebar"
      >
        {/* Logo */}
        <div style={{
          padding:      "20px 20px 16px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "32px", height: "32px", borderRadius: "8px",
              background: "#6366f1", display: "flex", alignItems: "center",
              justifyContent: "center", color: "#fff", fontWeight: "700", fontSize: "16px",
            }}>S</div>
            <div>
              <div style={{ color: "#fff", fontWeight: "600", fontSize: "14px" }}>School Hub</div>
              <div style={{ color: "#475569", fontSize: "11px" }}>Gujarat Directory</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ padding: "16px 12px", flex: 1 }}>
          <div style={{ color: "#475569", fontSize: "10px", fontWeight: "600",
            letterSpacing: "0.08em", padding: "0 4px 8px", textTransform: "uppercase" }}>
            Menu
          </div>
          {NAV_ITEMS.map(item => (
            <NavItem key={item.href} {...item} onClick={() => setMobileOpen(false)} />
          ))}
        </nav>

        {/* User + Logout */}
        <div style={{
          padding:    "16px",
          borderTop:  "1px solid rgba(255,255,255,0.06)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
            <div style={{
              width: "32px", height: "32px", borderRadius: "50%",
              background: "#6366f1", display: "flex", alignItems: "center",
              justifyContent: "center", color: "#fff", fontSize: "12px", fontWeight: "600",
              flexShrink: 0,
            }}>{initials}</div>
            <div style={{ overflow: "hidden" }}>
              <div style={{ color: "#e2e8f0", fontSize: "13px", fontWeight: "500",
                whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {user?.name || "User"}
              </div>
              <div style={{ color: "#475569", fontSize: "11px",
                whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {user?.email}
              </div>
            </div>
          </div>
          <button
            onClick={logout}
            disabled={loading}
            style={{
              width: "100%", padding: "8px", borderRadius: "7px",
              background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)",
              color: "#f87171", fontSize: "13px", cursor: "pointer",
              fontWeight: "500", transition: "all 0.15s",
            }}
          >
            {loading ? "Signing out…" : "Sign out"}
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
            zIndex: 40,
          }}
        />
      )}

      {/* ── Main content ── */}
      <div style={{
        flex:       1,
        marginLeft: "240px",
        display:    "flex",
        flexDirection: "column",
        minHeight:  "100vh",
      }}
      className="main-content"
      >
        {/* Top navbar */}
        <header style={{
          background:   "#fff",
          borderBottom: "1px solid #e2e8f0",
          padding:      "0 24px",
          height:       "60px",
          display:      "flex",
          alignItems:   "center",
          justifyContent: "space-between",
          position:     "sticky",
          top:          0,
          zIndex:       30,
        }}>
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="mobile-menu-btn"
            style={{
              display:    "none",
              background: "none",
              border:     "none",
              fontSize:   "20px",
              cursor:     "pointer",
              color:      "#475569",
            }}
          >
            ☰
          </button>

          <div style={{ color: "#0f172a", fontWeight: "600", fontSize: "15px" }}>
            Dashboard
          </div>

          {/* Role badge */}
          <div style={{
            background:   user?.role === "superAdmin" ? "#fef3c7" : "#ede9fe",
            color:        user?.role === "superAdmin" ? "#92400e" : "#6d28d9",
            padding:      "4px 10px",
            borderRadius: "20px",
            fontSize:     "12px",
            fontWeight:   "600",
          }}>
            {user?.role === "superAdmin" ? "Super Admin" : "School Admin"}
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, padding: "28px 24px" }}>
          {children}
        </main>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 1024px) {
          .lg-sidebar { left: -240px !important; }
          .lg-sidebar.open { left: 0 !important; }
          .main-content { margin-left: 0 !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </div>
  );
}