import FormPage from "@/components/static-pages/FormPage";
import { makeMetadata } from "@/lib/staticPages";

const page = {
  href: "/feedback",
  seoTitle: "Share Feedback | SchoolHub",
  title: "Share Feedback",
  eyebrow: "Help improve SchoolHub",
  description:
    "Send feedback about the website, school information, search, reviews, school profiles, feature requests, or bugs.",
};

const fields = [
  { name: "name", label: "Name", placeholder: "Your name" },
  { name: "email", label: "Email", type: "email", placeholder: "you@example.com" },
  { name: "category", label: "Feedback category", kind: "select", required: true, options: ["Website", "School information", "Search", "Reviews", "School profile", "Feature request", "Bug", "Other"] },
  { name: "message", label: "Message", kind: "textarea", required: true, full: true, placeholder: "Tell us what worked well or what should be improved." },
];

export const metadata = makeMetadata(page);

export default function FeedbackPage() {
  return (
    <FormPage
      page={page}
      fields={fields}
      submitLabel="Share Feedback"
      intro={{
        title: "Feedback topics",
        text: "Your feedback can help make SchoolHub more useful for families and schools across Gujarat.",
        items: [
          "Website usability and mobile experience.",
          "Search filters, school data, and profile quality.",
          "Feature ideas for parents, students, or schools.",
          "Bug reports and technical problems.",
        ],
      }}
      note="This form currently validates input on the frontend and is ready for a real feedback endpoint."
    />
  );
}
