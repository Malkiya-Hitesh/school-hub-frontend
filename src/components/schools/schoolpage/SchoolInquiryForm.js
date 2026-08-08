"use client";

import FormInput from "@/components/auth/FormInput";
import { DISTRICT_OPTIONS, DISTRICT_TALUKA_OPTIONS } from "@/lib/constants";



import { CheckCircleIcon, SendIcon, LockIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { inqury } from "@/lib/contactsAPI";
import { studentApi } from "@/lib/studenApi";
import { selectUser, setUser } from "../../../../store/slices/studentSlice";
import { checkAuth } from "@/lib/chekAuth";

export default function SchoolInquiryForm({ schoolName, schoolId }) {
  const student = useSelector(selectUser);
  
  const router = useRouter();

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      mobileNumber: "",
      apllyClass: "",
      curentSchool: "",
      gender: "",
      address: {
        district: "",
        taluka: "",
        villageOrCity: "",
      },
    },
  });

  const selectedDistrict = useWatch({ control, name: "address.district" });

  useEffect(() => {
 

    if (!student) {
      checkAuth();
      setCheckingAuth(false);
    } else {
      setCheckingAuth(false);
    }
  }, []);

  const onSubmit = async (formData) => {
    if (!student) {
      setShowLoginModal(true);
      return;
    }

    setServerError("");
    setIsSubmitting(true);

    try {
      formData.schoolId = schoolId;
      formData.userId = student._id;
      formData.userModel = student.role || "students";

      const { data, ok } = await inqury.post(formData);

      if (!ok || !data.success) {
        setServerError(data.message || "Could not send your inquiry. Please try again.");
        return;
      }

      setStatus(true);
    } catch {
      setServerError("Something went wrong. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === true) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl md:rounded-2xl p-6 text-center">
        <div className="flex justify-center mb-3">
          <CheckCircleIcon className="w-10 h-10 text-green-600" />
        </div>
        <h3 className="text-base font-bold text-gray-900">Inquiry sent!</h3>
        <p className="text-sm text-gray-500 mt-1.5">
          {schoolName || "The school"} will get in touch with you shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6 relative">
      <h3 className="text-base font-bold text-gray-900">Interested in this school?</h3>
      <p className="text-sm text-gray-500 mt-1 mb-4">
        Share your details and the admission team will contact you.
      </p>

      {!checkingAuth && !student && (
        <div className="mb-5 rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800 flex items-start gap-2">
          <LockIcon className="w-4 h-4 mt-0.5 shrink-0" />
          <span>You need to log in before submitting an inquiry.</span>
        </div>
      )}

      {serverError && (
        <div className="mb-5 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700 flex items-start gap-2">
          <span className="mt-0.5">⚠</span>
          <span>{serverError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <FormInput
          label="Full Name"
          id="name"
          type="text"
          placeholder="John Doe"
          autoComplete="name"
          disabled={isSubmitting}
          register={register("name", {
            required: "Full name is required.",
            minLength: { value: 3, message: "Name must be at least 3 characters." },
            maxLength: { value: 60, message: "Name is too long." },
            pattern: {
              value: /^[a-zA-Z\s.'-]+$/,
              message: "Name can only contain letters and spaces.",
            },
          })}
          error={errors.name}
        />

        <FormInput
          label="Email Address"
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
          label="Gender"
          id="gender"
          type="select"
          placeholder="Select your gender"
          disabled={isSubmitting}
          register={register("gender", {
            required: "Gender is required.",
          })}
          error={errors.gender}
          options={[
            { value: "Male", label: "Male" },
            { value: "Female", label: "Female" },
            { value: "Other", label: "Other" },
          ]}
        />

        <FormInput
          label="Mobile Number"
          id="mobileNumber"
          type="tel"
          placeholder="98765 43210"
          autoComplete="tel"
          disabled={isSubmitting}
          register={register("mobileNumber", {
            required: "Mobile number is required.",
            pattern: {
              value: /^[6-9]\d{9}$/,
              message: "Enter a valid 10-digit mobile number.",
            },
          })}
          error={errors.mobileNumber}
        />

        <FormInput
          label="Applying for Class"
          id="apllyClass"
          type="select"
          placeholder="Select the class"
          disabled={isSubmitting}
          options={[
            { value: "Nursery", label: "Nursery" },
            { value: "LKG", label: "LKG" },
            { value: "UKG", label: "UKG" },
            ...Array.from({ length: 12 }, (_, i) => ({
              value: String(i + 1),
              label: `Class ${i + 1}`,
            })),
          ]}
          register={register("apllyClass", {
            required: "Please select the class you're applying for.",
          })}
          error={errors.apllyClass}
        />

        <FormInput
          label="Current School"
          id="curentSchool"
          type="text"
          placeholder="Enter your current school name"
          disabled={isSubmitting}
          register={register("curentSchool", {
            required: "Current school name is required.",
            minLength: { value: 2, message: "Please enter a valid school name." },
          })}
          error={errors.curentSchool}
        />

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
          options={DISTRICT_TALUKA_OPTIONS[selectedDistrict] || []}
          placeholder="Select your taluka"
          disabled={isSubmitting || !selectedDistrict}
          register={register("address.taluka", {
            required: "Taluka is required.",
          })}
          error={errors.address?.taluka}
        />

        <FormInput
          label="Village / City"
          id="address.villageOrCity"
          type="text"
          placeholder="Enter your village or city"
          disabled={isSubmitting}
          register={register("address.villageOrCity", {
            required: "Village/City is required.",
            minLength: { value: 2, message: "Please enter a valid village or city." },
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
              Sending Inquiry…
            </>
          ) : (
            <>
              <SendIcon className="w-4 h-4" />
              Submit Inquiry
            </>
          )}
        </button>
      </form>

      {showLoginModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full relative">
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              aria-label="Close"
            >
              <XIcon className="w-5 h-5" />
            </button>
            <div className="flex justify-center mb-3">
              <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center">
                <LockIcon className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
            <h3 className="text-base font-bold text-gray-900 text-center">
              Login required
            </h3>
            <p className="text-sm text-gray-500 mt-1.5 text-center">
              Please log in to send an inquiry to {schoolName || "this school"}.
            </p>
            <div className="mt-5 flex gap-2">
              <button
                onClick={() => setShowLoginModal(false)}
                className="flex-1 rounded-lg border border-gray-200 text-gray-700 font-semibold text-sm py-2.5 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => router.push(`/login?redirect=${encodeURIComponent(window.location.pathname)}`)}
                className="flex-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm py-2.5"
              >
                Log in
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}