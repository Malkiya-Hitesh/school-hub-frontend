"use client";

import { useParams } from "next/navigation";
import { useSchoolBySlug } from "@/hooks/useSchools";
import { mapSchoolToPageProps } from "@/lib/mapSchoolData";

import Hero from "@/components/schools/schoolpage/Hero";
import SchoolAbout from "@/components/schools/schoolpage/SchoolAbout";
import SchoolAcademicsAndAdmissions from "@/components/schools/schoolpage/SchoolAcademicsAndAdmissions";
import SchoolFacilities from "@/components/schools/schoolpage/SchoolFacilities";
import SchoolResults from "@/components/schools/schoolpage/SchoolResults";
import SchoolLocation from "@/components/schools/schoolpage/SchoolLocation";
import SchoolReviews from "@/components/schools/schoolpage/SchoolReviews";
import SchoolInquiryForm from "@/components/schools/schoolpage/SchoolInquiryForm";
import SchoolPageSkeleton from "@/components/schools/schoolpage/SchoolPageSkeleton";
import SchoolNotFound from "@/components/schools/schoolpage/SchoolNotFound";
import SchoolReviewsForm from "@/components/schools/schoolpage/SchoolReviewsForm";

import SchoolRS from "@/components/schools/schoolpage/SchoolRS";
// import { mockSchoolResponse } from "@/lib/mockSchool";

export default function Page() {

  const { slug } = useParams();
  const { data: res, isLoading, isError } = useSchoolBySlug(slug);
  const s = res?.data ?? res;
  //   const s = mockSchoolResponse
  //   const isLoading = false
  //  const   isError = false




  if (isLoading) return <SchoolPageSkeleton />;

  const school = mapSchoolToPageProps(s);
  if (isError || !school) return <SchoolNotFound />;

  const { hero, about, academicsAdmissions, admissions, map, facilities, results, } = school;

console.log("school", school);

  const schoolId = s?._id


  return (
    <div className="max-w-5xl mx-auto px-4 py-4 md:py-6 overflow-x-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5">
        <div className="lg:col-span-2 space-y-4 md:space-y-5 min-w-0">
          <Hero school={hero} />
          <SchoolAbout school={about} />
          <SchoolAcademicsAndAdmissions academics={academicsAdmissions} admissions={admissions} />
          <SchoolFacilities facilities={facilities} />
          <SchoolResults results={results} />
        <SchoolRS schoolId={schoolId} />
          <SchoolLocation school={map} />
        </div>

        <div className="lg:col-span-1 min-w-0">
          <div className="lg:sticky lg:top-4">
            <SchoolInquiryForm schoolName={hero.name} schoolId={schoolId} />
            <SchoolReviewsForm schoolId={schoolId} />
          </div>
        </div>
      </div>
    </div>
  );
}