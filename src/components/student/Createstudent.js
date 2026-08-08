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
import { checkAuth } from '@/lib/chekAuth';

function Createstudent() {
    const router = useRouter();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const user = useSelector(selectUser);


    useEffect(() => {
        if (isLoggedIn) {
            router.replace(`/${user.role}/dashboard`);
        }
    }, []);

    useEffect(() => {
      

        checkAuth();
        if(isLoggedIn) {
            router.replace(`/${user.role}/dashboard`);
        }
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
        role: "students",
            fullName: "",
            gender: "",
            dateOfBirth: "",
            currentStandard: "",
            schoolName: "",
            school: "",
            medium: "",
            academicYear: "",
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
    const onSubmit = async ( formData) => {
        setServerError("");
        setIsSubmitting(true);

        try {


            
            const { data, ok } = await studentApi.register('/auth/students',formData);
console.log(data );

            if (!ok || !data.success) {
                setServerError(data.message || "Registration failed. Please try again.");
                return;
            }

console.log(data.user);

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
                    Create Student Account
                </h1>
                <p className="text-sm text-slate-500 mt-1.5">
                    Fill in the details below to create your student account.
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

{/* gender */}
                <FormInput
                    label="Gender"  
                    type="select"
                    placeholder="Select your gender"
                    disabled={isSubmitting}
                    register={register("gender", {
                        required: "Gender is required.",
                    })}
                    error={errors.gender}
                    options={[{ value: "Male", label: "Male" }, { value: "Female", label: "Female" }, { value: "Other", label: "Other" }]}
                />


                {/* dateOfBirth */}



                <FormInput 
                    label="Date of Birth"
                    id="dateOfBirth"
                    type="date"
                    placeholder="Select your date of birth"
                    disabled={isSubmitting}
                    register={register("dateOfBirth", {
                        required: "Date of birth is required.",
                    })}
                    error={errors.dateOfBirth}
                />


                {/* currentStandard */}

                <FormInput
                    label="Current Standard"
                    id="currentStandard"
                    type="select"
                    placeholder="Select your current standard"
                    disabled={isSubmitting}
                    options={[
                        { value: "Nursery", label: "Nursery" },
                        { value: "LKG", label: "LKG" },
                        { value: "UKG", label: "UKG" },
                        { value: "1", label: "1" },
                        { value: "2", label: "2" },
                        { value: "3", label: "3" },
                        { value: "4", label: "4" },
                        { value: "5", label: "5" },
                        { value: "6", label: "6" },
                        { value: "7", label: "7" },
                        { value: "8", label: "8" },
                        { value: "9", label: "9" },
                        { value: "10", label: "10" },
                        { value: "11", label: "11" },
                        { value: "12", label: "12" },
                    ]}
                    register={register("currentStandard", { 
                        required: "Current standard is required.",
                    })}
                    error={errors.currentStandard}
                />

{/* schoolName */}

<FormInput 
                    label="School Name" 
                    id="schoolName"
                    type="text"
                    placeholder="Enter your school name"
                    disabled={isSubmitting}
                    register={register("schoolName", {
                        required: "School name is required.",
                    })}
                    error={errors.schoolName}
                />



{/* medium */}
 
<FormInput 
                    label="Medium"
                    id="medium"
                    type="select"
                    placeholder="Select your medium"
                    disabled={isSubmitting}
                    options={[

                        
                        { value: "Gujarati", label: "Gujarati" },
                        { value: "English", label: "English" },
                        { value: "Hindi", label: "Hindi" },
                    ]}
                    register={register("medium", {
                        required: "Medium is required.",
                    })}
                    error={errors.medium}
                />


{/* academicYear */}



                <FormInput
                    label="Academic Year"
                    id="academicYear"
                    type="text"
                    placeholder="Enter your academic year (e.g., 2023-2024)"
                    disabled={isSubmitting} 
                    register={register("academicYear", {
                        required: "Academic year is required.",
                    })}
                    error={errors.academicYear}
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
                    create  as parent{" "}
                    <Link
                        href={`/register/parent`}
                        className="font-medium text-indigo-600 hover:text-indigo-700 hover:underline"
                    >
                        Create one free
                    </Link>
                </p>
            </div>
        </>
    )
}

export default Createstudent
