'use client';

import { useState, useEffect }  from "react";
import { useForm }              from "react-hook-form";
import { useRouter }            from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import { selectIsLoggedIn } from "../../../store/slices/userSlice";
import { hydrateUser }      from "@/lib/hydrateUser";
import FormInput from "./FormInput";
import { authApi } from "@/lib/api";

function LoginFOrm() {
  const router      = useRouter();
  const dispatch    = useDispatch();
  const isLoggedIn  = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/dashboard");
    }
  }, [isLoggedIn, router]);

  const [serverError,   setServerError]   = useState("");
  const [isSubmitting,  setIsSubmitting]  = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (formData) => {
    setServerError("");
    setIsSubmitting(true);

    try {
      const { data, ok } = await authApi.login(formData);

      if (!ok || !data.success) {
        setServerError(data.message || "Login failed. Please try again.");
        return;
      }

      // Login response ke bharose direct setUser mat karo —
      // /api/auth/me se full, consistent user object hydrate karo
      // (isi me schoolId, full school linkage etc sab aata hai)
      // hydrate user with retries — helps with transient backend/DB cold starts
      let hydrated = false;
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          hydrated = await hydrateUser(dispatch);
          if (hydrated) break;
          // wait before next retry
          await new Promise((r) => setTimeout(r, 1000 * attempt));
        } catch (e) {
          // ignore and retry
        }
      }

      if (!hydrated) {
        // fallback: still navigate to dashboard — hydrate may complete on client after navigation
        console.warn("Auth hydrate failed after retries, navigating anyway");
      }

      router.push("/dashboard");
    } catch {
      setServerError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex items-center gap-2 mb-8 lg:hidden">
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
          S
        </div>
        <span className="font-semibold text-slate-800">School Hub</span>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Welcome back
        </h1>
        <p className="text-sm text-slate-500 mt-1.5">
          Sign in to manage your school profile
        </p>
      </div>

      {serverError && (
        <div className="mb-5 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700 flex items-start gap-2">
          <span className="mt-0.5">⚠</span>
          <span>{serverError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <FormInput
          label="Email address"
          id="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          disabled={isSubmitting}
          register={register("email", {
            required: "Email is required.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email address.",
            },
          })}
          error={errors.email}
        />

        <FormInput
          label="Password"
          id="password"
          type="password"
          placeholder="••••••••"
          autoComplete="current-password"
          disabled={isSubmitting}
          register={register("password", {
            required: "Password is required.",
            minLength: { value: 6, message: "Password must be at least 6 characters." },
          })}
          error={errors.password}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800
                     text-white font-semibold text-sm py-2.5 px-4
                     transition-all duration-150 shadow-sm
                     disabled:opacity-60 disabled:cursor-not-allowed
                     flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Signing in…
            </>
          ) : (
            "Sign in"
          )}
        </button>
      </form>
    </>
  );
}

export default LoginFOrm;