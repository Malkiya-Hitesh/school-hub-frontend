"use client";

import FormInput from "@/components/auth/FormInput";
import { reviews } from "@/lib/contactsAPI";

import { CheckCircleIcon, StarIcon, SendIcon, LockIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { studentApi } from "@/lib/studenApi";
import { selectUser, setUser } from "../../../../store/slices/studentSlice";
import { checkAuth } from "@/lib/chekAuth";

const today = new Date().toISOString().split("T")[0];

export default function SchoolReviewsForm({ schoolId }) {
  const student = useSelector(selectUser);
  const dispatch = useDispatch();
  const router = useRouter();

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      rating: 0,
      date: today,
      comment: "",
    },
  });

  const currentRating = watch("rating");

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

      const { data, ok } = await reviews.post(formData);
      console.log(data);

      if (!ok || !data.success) {
        setServerError(data.message || "Could not submit your review. Please try again.");
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
        <h3 className="text-base font-bold text-gray-900">Review submitted!</h3>
        <p className="text-sm text-gray-500 mt-1.5">
          Thanks for sharing your experience — it helps other parents decide.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6 relative">
      <h3 className="text-base font-bold text-gray-900">Write a review</h3>
      <p className="text-sm text-gray-500 mt-1 mb-4">
        Share your honest experience with this school.
      </p>

      {!checkingAuth && !student && (
        <div className="mb-5 rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800 flex items-start gap-2">
          <LockIcon className="w-4 h-4 mt-0.5 shrink-0" />
          <span>You need to log in before submitting a review.</span>
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
          })}
          error={errors.name}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Your Rating
          </label>
          <Controller
            name="rating"
            control={control}
            rules={{
              validate: (value) => Number(value) > 0 || "Please select a rating.",
            }}
            render={({ field }) => (
              <div className="flex items-center gap-1" role="radiogroup" aria-label="Rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    disabled={isSubmitting}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => field.onChange(star)}
                    aria-label={`${star} star${star > 1 ? "s" : ""}`}
                    className="p-0.5 disabled:opacity-60"
                  >
                    <StarIcon
                      className={`w-7 h-7 transition-colors ${star <= (hoverRating || field.value)
                        ? "fill-amber-400 text-amber-400"
                        : "fill-transparent text-gray-300"
                        }`}
                    />
                  </button>
                ))}
                {currentRating > 0 && (
                  <span className="ml-2 text-sm text-gray-600">{currentRating} / 5</span>
                )}
              </div>
            )}
          />
          {errors.rating && (
            <p className="text-xs text-red-600 mt-1">{errors.rating.message}</p>
          )}
        </div>

        <FormInput
          label="Date of Visit / Admission"
          id="date"
          type="date"
          max={today}
          disabled={isSubmitting}
          register={register("date", {
            required: "Please select a date.",
            validate: (value) => value <= today || "Date cannot be in the future.",
          })}
          error={errors.date}
        />

        <FormInput
          label="Your Review"
          id="comment"
          type="textarea"
          placeholder="Tell other parents about your experience — academics, facilities, staff, etc."
          disabled={isSubmitting}
          register={register("comment", {
            required: "Please write a few words about your experience.",
            minLength: { value: 15, message: "Review must be at least 15 characters." },
            maxLength: { value: 1000, message: "Review is too long (max 1000 characters)." },
          })}
          error={errors.comment}
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
              Submitting Review…
            </>
          ) : (
            <>
              <SendIcon className="w-4 h-4" />
              Submit Review
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
              Please log in to submit a review.
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