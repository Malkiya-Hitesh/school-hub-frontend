'use client';

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";



import { studentApi } from "@/lib/studenApi";
import { selectIsLoggedIn, selectUser, setUser } from "../../../store/slices/studentSlice";
import FormInput from "../auth/FormInput";
import Link from "next/link";
import { checkAuth } from "@/lib/chekAuth";




function LoginFOrm() {
    const router = useRouter();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const user = useSelector(selectUser);
    const [type, setType] = useState('students'); // "students" or "parents"

    useEffect(() => {
        if (isLoggedIn) {
            router.replace(`/${user.role}/dashboard`);
        }
}, [isLoggedIn, user, router]);

    useEffect(() => {
      
        checkAuth();
        if(isLoggedIn) {
            router.replace(`/${user.role}/dashboard`);
        }
    }, [type, dispatch, router]);
    const [serverError, setServerError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

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
            const { data, ok } = await studentApi.login(`/auth/${type}/login`, formData);

            if (!ok || !data.success) {
                setServerError(data.message || "Login failed. Please try again.");
                return;
            }


            // Store user in Redux (cookie is set by backend automatically)
            dispatch(setUser(data.user));
            console.log(type);

            
            router.push(`/${type}/dashboard`);
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

            <div className="mb-4">
                <label htmlFor="userType" className="block text-sm font-medium text-slate-700 mb-2">
                    Account type
                </label>
                <select
                    id="userType"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    disabled={isSubmitting}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                >
                    <option value="students">Student</option>
                    <option value="parents">Parent</option>
                </select>
            </div>

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


            <div className="mt-6 text-center text-sm text-slate-500">
                 <p className="mt-6 text-center text-sm text-slate-500">
            Don&apos;t have an account?  create  new  account{" "}
            <Link
              href={`/register/${type}`}
              className="font-medium text-indigo-600 hover:text-indigo-700 hover:underline"
            >
              Create one free
            </Link>
          </p>
                </div>
        </>
    )
}

export default LoginFOrm
