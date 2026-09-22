"use client";
// app/claim/page.js
// Multi-step school claim flow:
// Step 1 → Search by UDISE last 5 digits
// Step 2 → Fill contact details + upload docs
// Step 3 → OTP verification
// Step 4 → Final submit confirmation

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";

// import { selectUser }          from "@/store/slices/userSlice";


import { claimApi } from "@/lib/api";
import { useSelector } from "react-redux";
import { selectAuthLoading, selectIsLoggedIn, selectUser } from "../../../store/slices/userSlice";


// ── Step indicator ────────────────────────────────────────────
function StepBar({ current }) {
  const steps = [
    { n: 1, label: "Search" },
    { n: 2, label: "Details" },
    { n: 3, label: "Verify OTP" },
    { n: 4, label: "Done" },
  ];

  return (
    <div style={{
      display: "flex", alignItems: "center",
      justifyContent: "center", gap: "0",
      marginBottom: "36px",
    }}>
      {steps.map((s, i) => (
        <div key={s.n} style={{ display: "flex", alignItems: "center" }}>
          {/* Circle */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
            <div style={{
              width: "36px", height: "36px", borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "13px", fontWeight: "700",
              background: current > s.n ? "#6366f1" : current === s.n ? "#6366f1" : "#e2e8f0",
              color: current >= s.n ? "#fff" : "#94a3b8",
              border: current === s.n ? "3px solid #c7d2fe" : "3px solid transparent",
              transition: "all 0.3s",
            }}>
              {current > s.n ? "✓" : s.n}
            </div>
            <span style={{
              fontSize: "11px", fontWeight: current === s.n ? "600" : "400",
              color: current === s.n ? "#6366f1" : "#94a3b8",
              whiteSpace: "nowrap",
            }}>
              {s.label}
            </span>
          </div>

          {/* Connector line */}
          {i < steps.length - 1 && (
            <div style={{
              width: "60px", height: "2px",
              background: current > s.n ? "#6366f1" : "#e2e8f0",
              marginBottom: "18px", transition: "background 0.3s",
            }} />
          )}
        </div>
      ))}
    </div>
  );
}

// ── Card wrapper ──────────────────────────────────────────────
function Card({ children }) {
  return (
    <div style={{
      background: "#fff", borderRadius: "16px",
      border: "1px solid #e2e8f0",
      padding: "32px", maxWidth: "560px",
      margin: "0 auto", width: "100%",
    }}>
      {children}
    </div>
  );
}

// ── Input ─────────────────────────────────────────────────────
function Input({ label, error, disabled, ...props }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      {label && (
        <label style={{ fontSize: "13px", fontWeight: "500", color: "#374151" }}>
          {label}
        </label>
      )}
      <input
        disabled={disabled}
        style={{
          border: `1.5px solid ${error ? "#f87171" : "#d1d5db"}`,
          borderRadius: "8px", padding: "10px 14px",
          fontSize: "14px", color: "#111827",
          background: disabled ? "#f9fafb" : "#fff",
          outline: "none", width: "100%", boxSizing: "border-box",
        }}
        {...props}
      />
      {error && <p style={{ fontSize: "12px", color: "#ef4444", margin: 0 }}>⚠ {error}</p>}
    </div>
  );
}

// ── Primary button ────────────────────────────────────────────
function Btn({ children, loading, onClick, type = "button", disabled, secondary }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      style={{
        padding: "11px 24px", borderRadius: "8px",
        fontWeight: "600", fontSize: "14px", cursor: "pointer",
        border: secondary ? "1.5px solid #d1d5db" : "none",
        background: secondary ? "#fff" : (loading || disabled ? "#a5b4fc" : "#6366f1"),
        color: secondary ? "#374151" : "#fff",
        transition: "all 0.15s",
        display: "flex", alignItems: "center", gap: "8px",
      }}
    >
      {loading && (
        <span style={{
          width: "14px", height: "14px",
          border: "2px solid rgba(255,255,255,0.3)",
          borderTop: "2px solid #fff",
          borderRadius: "50%",
          display: "inline-block",
          animation: "spin 0.7s linear infinite",
        }} />
      )}
      {children}
    </button>
  );
}

// ── STEP 1: Search ────────────────────────────────────────────
function Step1({ onFound }) {
  const [last5, setLast5] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
   const user = useSelector(selectUser);
let email = user?.email || "";
  const handleSearch = async () => {
    if (last5.length !== 5 || !/^\d{5}$/.test(last5)) {
      setError("Please enter exactly 5 digits.");
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);
    try {
      const { data, ok } = await claimApi.search(last5, email);
      
      if ( data.success && data.data) {
        setResult(data.data);
      } else {
        setError(data.message || "School not found. Check the UDISE code.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#0f172a", margin: "0 0 6px" }}>
        Find Your School
      </h2>
      <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "24px" }}>
        Enter the last 5 digits of your school's UDISE code to search.
      </p>

      <div style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
        <input
          type="text"
          placeholder="e.g. 12345"
          maxLength={5}
          value={last5}
          onChange={e => { setLast5(e.target.value.replace(/\D/g, "")); setError(""); setResult(null); }}
          onKeyDown={e => e.key === "Enter" && handleSearch()}
          style={{
            flex: 1, border: `1.5px solid ${error ? "#f87171" : "#d1d5db"}`,
            borderRadius: "8px", padding: "10px 14px",
            fontSize: "15px", letterSpacing: "0.1em",
            fontWeight: "600", outline: "none",
          }}
        />
        <Btn onClick={handleSearch} loading={loading}>Search</Btn>
      </div>

      {error && (
        <div style={{
          background: "#fef2f2", border: "1px solid #fecaca",
          borderRadius: "8px", padding: "10px 14px",
          color: "#dc2626", fontSize: "13px", marginBottom: "16px",
        }}>
          {error}
        </div>
      )}

      {/* Search result */}
      {result && (
        result.map((school, index) => (
        <div key={school._id || school.schoolId || index} style={{
          background: "#f0fdf4", border: "1px solid #bbf7d0",
          borderRadius: "12px", padding: "20px",
        }}>
          <div style={{
            fontSize: "11px", color: "#16a34a", fontWeight: "600",
            textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "8px"
          }}>
            School Found
          </div>
          <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#0f172a", margin: "0 0 6px" }}>
            {school.basics?.schoolName}
          </h3>
          <p style={{ fontSize: "13px", color: "#475569", margin: "0 0 4px" }}>
            📍 {[school.address?.village, school.address?.taluka, school.address?.district].filter(Boolean).join(", ")}
          </p>
          {school.basics?.email && (
            <p style={{ fontSize: "13px", color: "#475569", margin: "0 0 16px" }}>
              ✉ {school.basics.email}
            </p>
          )}
          <Btn onClick={() => onFound(school)} style={{ width: "100%" }}>
            Claim This School →
          </Btn>
        </div>
        ))
      )}

      <div style={{
        marginTop: "20px", padding: "14px 16px",
        background: "#f8fafc", borderRadius: "8px",
        fontSize: "12px", color: "#64748b",
      }}>
        💡 UDISE code typically looks like: <strong>24XXXXXXXX</strong>. The last 5 digits are what you need.
      </div>
    </Card>
  );
}

// ── STEP 2: Fill Details ──────────────────────────────────────
function Step2({ school, onNext, onBack }) {
  const user = useSelector(selectUser);


  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const onSubmit = async (formData) => {
    setServerError("");
    setLoading(true);
    try {
    
      
      const payload = {
        schoolId: school._id,
        contactName: formData.name,
        contactEmail: formData.email,
        contactPhone: formData.phone,
        userId: user?._id, // Include user ID if available
      };

      const { data, ok } = await claimApi.initiate(payload);
      
      if (ok && data.success) {
        onNext({ ...formData, claimId: data?.data?.claimId });
      } else {
        setServerError(data.message || "Something went wrong.");
      }
    } catch {
      setServerError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#0f172a", margin: "0 0 4px" }}>
        Your Details
      </h2>
      <p style={{ color: "#64748b", fontSize: "13px", marginBottom: "6px" }}>
        Claiming: <strong>{school.basics?.schoolName}</strong>
      </p>
      <p style={{ color: "#64748b", fontSize: "13px", marginBottom: "20px" }}>
        We'll send an OTP to verify your identity.
      </p>

      {serverError && (
        <div style={{
          background: "#fef2f2", border: "1px solid #fecaca",
          borderRadius: "8px", padding: "10px 14px",
          color: "#dc2626", fontSize: "13px", marginBottom: "16px",
        }}>
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <Input
          label="Your full name"
          placeholder="Ramesh Patel"
          error={errors.name?.message}
          {...register("name", { required: "Name is required." })}
        />
        <Input
          label="Email address"
          type="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register("email", {
            required: "Email is required.",
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email." },
          })}
        />
        <Input
          label="Phone number"
          type="tel"
          placeholder="9876543210"
          error={errors.phone?.message}
          {...register("phone", {
            required: "Phone is required.",
            pattern: { value: /^[6-9]\d{9}$/, message: "Enter valid 10-digit number." },
          })}
        />



        <div style={{ display: "flex", gap: "12px", justifyContent: "space-between", marginTop: "8px" }}>
          <Btn secondary onClick={onBack}>← Back</Btn>
          <Btn type="submit" loading={loading}>Send OTP →</Btn>
        </div>
      </form>
    </Card>
  );
}

// ── STEP 3: OTP ───────────────────────────────────────────────
function Step3({ details, onNext, onBack }) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleVerify = async () => {
    if (otp.length < 4) { setError("Enter the OTP sent to your email/phone."); return; }
    setError("");
    setLoading(true);
    try {
      const { data, ok } = await claimApi.verifyOtp({ otp, claimId: details.claimId });
      if (ok && data.success) {
        onNext();
      } else {
        setError(data.message || "Invalid OTP.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <div style={{ textAlign: "center", marginBottom: "24px" }}>
        <div style={{ fontSize: "48px", marginBottom: "12px" }}>📱</div>
        <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#0f172a", margin: "0 0 8px" }}>
          Enter OTP
        </h2>
        <p style={{ color: "#64748b", fontSize: "14px" }}>
          We sent a code to <strong>{details?.email}</strong>
        </p>
      </div>

      {error && (
        <div style={{
          background: "#fef2f2", border: "1px solid #fecaca",
          borderRadius: "8px", padding: "10px 14px",
          color: "#dc2626", fontSize: "13px", marginBottom: "16px",
        }}>
          {error}
        </div>
      )}

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          inputMode="numeric"
          maxLength={6}
          placeholder="• • • • • •"
          value={otp}
          onChange={e => { setOtp(e.target.value.replace(/\D/g, "")); setError(""); }}
          onKeyDown={e => e.key === "Enter" && handleVerify()}
          style={{
            width: "100%", textAlign: "center",
            fontSize: "28px", letterSpacing: "0.3em", fontWeight: "700",
            border: `2px solid ${error ? "#f87171" : "#d1d5db"}`,
            borderRadius: "10px", padding: "14px",
            color: "#0f172a", outline: "none", boxSizing: "border-box",
          }}
        />
      </div>

      <div style={{ display: "flex", gap: "12px", justifyContent: "space-between" }}>
        <Btn secondary onClick={onBack}>← Back</Btn>
        <Btn onClick={handleVerify} loading={loading}>Verify →</Btn>
      </div>

      <p style={{ textAlign: "center", color: "#94a3b8", fontSize: "13px", marginTop: "20px" }}>
        Didn't receive the code?{" "}
        <button style={{
          background: "none", border: "none", color: "#6366f1",
          fontWeight: "600", cursor: "pointer", fontSize: "13px"
        }}>
          Resend OTP
        </button>
      </p>
    </Card>
  );
}

// ── STEP 4: Final Submit ──────────────────────────────────────
function Step4({ school, details, onDone }) {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    setServerError("");
    setLoading(true);
    try {
      const { data, ok } = await claimApi.submit({
        claimId: details.claimId || "",
        documents: [],
      });
      if (ok && data.success) {
        setSubmitted(true);
        setTimeout(() => onDone(), 2000);
      } else {
        setServerError(data.message || "Submission failed.");
      }
    } catch {
      setServerError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <Card>
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <div style={{ fontSize: "56px", marginBottom: "16px" }}>🎉</div>
          <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#0f172a", margin: "0 0 8px" }}>
            Claim Submitted!
          </h2>
          <p style={{ color: "#64748b", fontSize: "14px" }}>
            Our team will review and activate your school within 24–48 hours.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#0f172a", margin: "0 0 20px" }}>
        Confirm & Submit
      </h2>

      {/* Summary */}
      <div style={{
        background: "#f8fafc", borderRadius: "10px",
        border: "1px solid #e2e8f0", padding: "20px",
        marginBottom: "20px",
      }}>
        <div style={{
          fontSize: "11px", color: "#64748b", fontWeight: "600",
          textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "12px"
        }}>
          Claim Summary
        </div>
        {[
          { label: "School", value: school?.basics?.schoolName },
          { label: "Name", value: details?.name },
          { label: "Email", value: details?.email },
          { label: "Phone", value: details?.phone },
          { label: "Docs", value: details?.files?.length > 0 ? `${details.files.length} file(s)` : "None" },
        ].map(row => (
          <div key={row.label} style={{
            display: "flex", justifyContent: "space-between",
            padding: "6px 0", borderBottom: "1px solid #e2e8f0",
            fontSize: "13px",
          }}>
            <span style={{ color: "#64748b" }}>{row.label}</span>
            <span style={{ color: "#0f172a", fontWeight: "500" }}>{row.value || "—"}</span>
          </div>
        ))}
      </div>

      {serverError && (
        <div style={{
          background: "#fef2f2", border: "1px solid #fecaca",
          borderRadius: "8px", padding: "10px 14px",
          color: "#dc2626", fontSize: "13px", marginBottom: "16px",
        }}>
          {serverError}
        </div>
      )}

      <div style={{
        background: "#fffbeb", border: "1px solid #fde68a",
        borderRadius: "8px", padding: "12px 16px",
        fontSize: "13px", color: "#92400e", marginBottom: "20px",
      }}>
        ⚠ After submission, our team will verify your claim. School will be activated within 24–48 hours.
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Btn onClick={handleSubmit} loading={loading}>
          Submit Claim Request ✓
        </Btn>
      </div>
    </Card>
  );
}

// ── Main Claim Page ───────────────────────────────────────────
export default function ClaimPage() {
  const router = useRouter();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const authLoading = useSelector(selectAuthLoading);
  const [step, setStep] = useState(1);
  const [school, setSchool] = useState(null);
  const [details, setDetails] = useState({});

  useEffect(() => {
    if (!authLoading && !isLoggedIn) {
      router.replace("/auth/login");
    }
  }, [authLoading, isLoggedIn, router]);
  

  const handleFound = (foundSchool) => {
    setSchool(foundSchool);
    setStep(2);
  };

  const handleDetailsNext = (formDetails) => {
    setDetails(formDetails);
    setStep(3);
  };

  const handleOtpNext = () => setStep(4);

  const handleDone = () => router.push("/dashboard");

  if (authLoading) {
    return (
      <div style={{
        minHeight: "55vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}>
        <div style={{ textAlign: "center", color: "#64748b", fontSize: "14px" }}>
          Checking school login...
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div style={{
        minHeight: "55vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}>
        <div style={{
          maxWidth: "420px",
          width: "100%",
          background: "#fff",
          border: "1px solid #e2e8f0",
          borderRadius: "16px",
          padding: "28px",
          textAlign: "center",
        }}>
          <h1 style={{ fontSize: "20px", fontWeight: "700", color: "#0f172a", margin: "0 0 8px" }}>
            School login required
          </h1>
          <p style={{ color: "#64748b", fontSize: "14px", margin: "0 0 20px" }}>
            Please sign in with a school account before claiming a school profile.
          </p>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/auth/login" style={{
              padding: "10px 16px",
              borderRadius: "10px",
              background: "#4f46e5",
              color: "#fff",
              fontSize: "14px",
              fontWeight: "600",
            }}>
              School login
            </Link>
            <Link href="/auth/register" style={{
              padding: "10px 16px",
              borderRadius: "10px",
              border: "1px solid #d1d5db",
              color: "#374151",
              fontSize: "14px",
              fontWeight: "600",
            }}>
              Register school
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (

    <div style={{ maxWidth: "640px", margin: "0 auto" }}>
      {/* Page title */}
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "22px", fontWeight: "700", color: "#0f172a", margin: "0 0 4px" }}>
          Claim Your School
        </h1>
        <p style={{ color: "#64748b", fontSize: "14px" }}>
          Verify ownership and manage your school profile on School Hub.
        </p>
      </div>

      {/* Step bar */}
      <StepBar current={step} />


      {step === 1 && <Step1 onFound={handleFound} />}
      {step === 2 && <Step2 school={school} onNext={handleDetailsNext} onBack={() => setStep(1)} />}
      {step === 3 && <Step3 details={details} onNext={handleOtpNext} onBack={() => setStep(2)} />}
      {step === 4 && <Step4 school={school} details={details} onDone={handleDone} />}
    </div>


  );
}
