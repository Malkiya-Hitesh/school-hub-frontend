'use client';

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import FormInput from '../auth/FormInput';
import { useForm, useWatch } from 'react-hook-form';
import { studentApi } from '@/lib/studenApi';
import { useRouter } from 'next/navigation';
import { selectIsLoggedIn, selectUser, setUser } from '../../../store/slices/studentSlice';
import Link from 'next/link';
import { DISTRICT_OPTIONS, DISTRICT_TALUKA_OPTIONS } from '@/lib/constants';

function Creatparent() {
    const router = useRouter();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const user = useSelector(selectUser);


    useEffect(() => {
        if (isLoggedIn) {
            router.replace(`/${user.role}/dashboard`);
        }
    }, [isLoggedIn, user, router]);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { data, ok } = await studentApi.me(`/auth/parents/me`);

                if (!ok || !data.success) return;

                dispatch(setUser(data.user));

                router.push(`/${data.user.role}/dashboard`);
            } catch (err) {
                console.log(err);
            }
        };

        checkAuth();
    }, [dispatch, router]);
    const [serverError, setServerError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        role: "parents",
            fullName: "",
            mobileNumber: "",
            occupation: "",
            relation: "",
          
            address: {
                 district: "",
                 taluka: "",
                 villageOrCity: "",
            },
        }
    });
const selectedDistrict = useWatch({
  control,
  name: "address.district"
});
    const onSubmit = async (formData) => {
        setServerError("");
        setIsSubmitting(true);

        try {


            console.log(formData);
            
            const { data, ok } = await studentApi.register("/auth/parents", formData);
console.log(data );

            if (!ok || !data.success) {
                setServerError(data.message || "Registration failed. Please try again.");
                return;
            }


            // Store user in Redux (cookie is set by backend automatically)
            dispatch(setUser(data.user));


            // Redirect to dashboard
            router.push(`/students/dashboard`);
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
                    Create your parent account
                </h1>
                <p className="text-sm text-slate-500 mt-1.5">
                    Fill in the details below to create your parent account.
                </p>
            </div>          
               

            {serverError && (
                <div className="mb-5 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700 flex items-start gap-2">
                    <span className="mt-0.5">⚠</span>
                    <span>{serverError}</span>
                </div>
            )}



            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                {/* email  */}
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
                {/* password     */}


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



{/* fullName */}

                <FormInput
                    label="Full Name"
                    id="fullName"
                    type="text"
                    placeholder="John Doe"
                    autoComplete="name"
                    disabled={isSubmitting}
                    register={register("fullName", {
                        required: "Full name is required.",
                    })}
                    error={errors.fullName}
                />

                {/* mobileNumber */}
                <FormInput
                    label="Mobile Number"
                    id="mobileNumber"
                    type="text"
                    placeholder="123-456-7890"
                    disabled={isSubmitting}
                    register={register("mobileNumber", {
                        required: "Mobile number is required.",
                    })}
                    error={errors.mobileNumber}
                />

{/* gender */}
                <FormInput
                    label="relation"  
                    type="select"
                    placeholder="Select your relation"
                    disabled={isSubmitting}
                    register={register("relation", {
                        required: "Relation is required.",
                    })}
                    error={errors.relation}
                    options={[{ value: "FATHER", label: "FATHER" }, { value: "MOTHER", label: "MOTHER" }, { value: "GUARDIAN", label: "GUARDIAN" }]}
                />


    

{/* ocupastions */}
<FormInput
                    label="Occupation"
                    id="occupation"
                    type="text"
                    placeholder="Enter your occupation"
                    disabled={isSubmitting}
                    register={register("occupation", {
                        required: "Occupation is required.",
                    })}
                    error={errors.occupation}
                />
               



               

                {/* address  , district  , taluka , villageOrCity */}

<FormInput  
label="District"
id="address.district"
type="select"
options={DISTRICT_OPTIONS}
placeholder="Select your district"
disabled={isSubmitting}
register={register("address.district", {
    required: "District is required.",
})}
error={errors.address?.district}
/>


<FormInput
label="Taluka"
id="address.taluka"
type="select"
options={
  DISTRICT_TALUKA_OPTIONS[selectedDistrict] || []
}
placeholder="Select your taluka"
disabled={isSubmitting}
register={register("address.taluka", {
    required: "Taluka is required.",
})}
error={errors.address?.taluka}
/>  




<FormInput
label="Village/City"
id="address.villageOrCity"
type="text"
placeholder="Enter your village or city"
disabled={isSubmitting}
register={register("address.villageOrCity", {
    required: "Village/City is required.",
})}
error={errors.address?.villageOrCity}
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
                            Creating account…
                        </>
                    ) : (
                        "Create Account"
                    )}
                </button>
            </form>


            <div className="mt-6 text-center text-sm text-slate-500">
                <p className="mt-6 text-center text-sm text-slate-500">
                    create  as students{" "}
                    <Link
                        href={`/register/students`}
                        className="font-medium text-indigo-600 hover:text-indigo-700 hover:underline"
                    >
                        Create one free
                    </Link>
                </p>
            </div>
        </>
    )
}


export default Creatparent
