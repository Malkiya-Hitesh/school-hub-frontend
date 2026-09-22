import FormPage from "@/components/static-pages/FormPage";
import { makeMetadata } from "@/lib/staticPages";

const page = {
  href: "/report-school",
  seoTitle: "Report Incorrect School Information | SchoolHub",
  title: "Report School Information",
  eyebrow: "Corrections and safety reports",
  description:
    "Report incorrect school information, wrong contact details, duplicate listings, closed schools, incorrect locations, or inappropriate content.",
};

const fields = [
  { name: "name", label: "Name", placeholder: "Your name" },
  { name: "email", label: "Email", type: "email", required: true, placeholder: "you@example.com" },
  { name: "schoolName", label: "School name", required: true, placeholder: "School name" },
  { name: "schoolLocation", label: "School location", placeholder: "Village, taluka, or district" },
  { name: "issueType", label: "Issue type", kind: "select", required: true, options: ["Incorrect school information", "Wrong contact information", "Duplicate listing", "Closed school", "Incorrect location", "Inappropriate content", "Other issue"] },
  { name: "message", label: "Issue details", kind: "textarea", required: true, full: true, placeholder: "Explain what appears incorrect and, if possible, where the correct information can be verified." },
];

export const metadata = makeMetadata(page);

export default function ReportSchoolPage() {
  return (
    <FormPage
      page={page}
      fields={fields}
      submitLabel="Submit Report"
      intro={{
        title: "What you can report",
        text: "SchoolHub uses reports to improve profile quality. Important corrections may need review before public information changes.",
        items: [
          "Incorrect school name, classes, medium, or category.",
          "Wrong phone, email, website, or admission contact information.",
          "Duplicate listing, closed school, or incorrect map location.",
          "Inappropriate, misleading, or irrelevant content.",
        ],
      }}
      note="Please include enough detail for the SchoolHub team to review the report. This frontend form still needs backend submission integration."
    />
  );
}
