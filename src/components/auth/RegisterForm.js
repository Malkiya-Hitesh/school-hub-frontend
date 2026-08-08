'use client';

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

import FormInput from "./FormInput";
import { selectIsLoggedIn } from "../../../store/slices/userSlice";
import { authApi } from "@/lib/api";

function RegisterForm() {
  const router = useRouter();
  const dispatch = useDispatch(); // ← missing tha, isi se crash hota tha
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/dashboard");
    }
  }, [isLoggedIn, router]);

  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const passwordValue = watch("password");

  const onSubmit = async (formData) => {
    setServerError("");
    setSuccessMessage("");
    setIsSubmitting(true);

    const { confirmPassword, ...payload } = formData;

    try {
      const { data, ok } = await authApi.register(payload);

      if (!ok || !data.success) {
        setServerError(data.message || "Registration failed. Please try again.");
        return;
      }

      // Register ke baad login page pe bhej rahe ho, isliye yaha
      // setUser ki zaroorat nahi — user login form se hi authenticate hoga
      setSuccessMessage("Account created! Redirecting to login…");

      setTimeout(() => {
        router.push("/auth/login");
      }, 1500);
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
          Create your account
        </h1>
        <p className="text-sm text-slate-500 mt-1.5">
          Register your school on Gujarat&apos;s largest school directory
        </p>
      </div>

      {serverError && (
        <div className="mb-5 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700 flex items-start gap-2">
          <span className="mt-0.5">⚠</span>
          <span>{serverError}</span>
        </div>
      )}

      {successMessage && (
        <div className="mb-5 rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700 flex items-start gap-2">
          <span className="mt-0.5">✓</span>
          <span>{successMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <FormInput
          label="Full name"
          id="name"
          type="text"
          placeholder="Ramesh Patel"
          autoComplete="name"
          disabled={isSubmitting}
          register={register("name", {
            required: "Full name is required.",
            minLength: { value: 2, message: "Name must be at least 2 characters." },
            maxLength: { value: 60, message: "Name too long." },
          })}
          error={errors.name}
        />

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
          label="Phone number (optional)"
          id="phone"
          type="tel"
          placeholder="9876543210"
          autoComplete="tel"
          disabled={isSubmitting}
          register={register("phone", {
            pattern: {
              value: /^[6-9]\d{9}$/,
              message: "Enter a valid 10-digit Indian mobile number.",
            },
          })}
          error={errors.phone}
        />

        <FormInput
          label="Password"
          id="password"
          type="password"
          placeholder="Min. 6 characters"
          autoComplete="new-password"
          disabled={isSubmitting}
          register={register("password", {
            required: "Password is required.",
            minLength: { value: 6, message: "Password must be at least 6 characters." },
          })}
          error={errors.password}
        />

        <FormInput
          label="Confirm password"
          id="confirmPassword"
          type="password"
          placeholder="Re-enter your password"
          autoComplete="new-password"
          disabled={isSubmitting}
          register={register("confirmPassword", {
            required: "Please confirm your password.",
            validate: (val) =>
              val === passwordValue || "Passwords do not match.",
          })}
          error={errors.confirmPassword}
        />

        <p className="text-xs text-slate-400 leading-relaxed">
          By creating an account you agree to our{" "}
          <Link href="/terms" className="underline hover:text-slate-600">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline hover:text-slate-600">
            Privacy Policy
          </Link>.
        </p>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800
                     text-white font-semibold text-sm py-2.5 px-4
                     transition-all duration-150 shadow-sm
                     disabled:opacity-60 disabled:cursor-not-allowed
                     flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Creating account…
            </>
          ) : (
            "Create account"
          )}
        </button>
      </form>
    </>
  );
}

export default RegisterForm;