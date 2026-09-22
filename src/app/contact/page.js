import FormPage from "@/components/static-pages/FormPage";
import { makeMetadata } from "@/lib/staticPages";

const page = {
  href: "/contact",
  seoTitle: "SchoolHub | Contact Us",
  title: "Contact SchoolHub",
  eyebrow: "Support and enquiries",
  description:
    "Contact SchoolHub for general enquiries, school listing or claim requests, partnerships, feedback, and technical support.",
};

const fields = [
  { name: "name", label: "Name", required: true, placeholder: "Your full name" },
  { name: "email", label: "Email", type: "email", required: true, placeholder: "you@example.com" },
  { name: "phone", label: "Phone", placeholder: "+91 98765 43210" },
  { name: "userType", label: "User type", kind: "select", required: true, options: ["Parent", "Student", "School owner/admin", "Teacher", "Partner", "Other"] },
  { name: "subject", label: "Subject", required: true, full: true, placeholder: "How can we help?" },
  { name: "message", label: "Message", kind: "textarea", required: true, full: true, placeholder: "Share the details of your enquiry." },
];

export const metadata = makeMetadata(page);

export default function ContactPage() {
  return (
    <FormPage
      page={page}
      fields={fields}
      submitLabel="Send Message"
      intro={{
        title: "How we can help",
        text: "Use this form structure for SchoolHub enquiries. It is ready for backend integration when a contact endpoint is available.",
        items: [
          "General enquiries about SchoolHub and school discovery.",
          "School owner or administrator questions.",
          "Listing and claim requests for school profiles.",
          "Partnership enquiries and platform feedback.",
          "Technical support for website issues.",
        ],
      }}
      note="Do not include passwords, government IDs, or sensitive student information in this form."
    />
  );
}
