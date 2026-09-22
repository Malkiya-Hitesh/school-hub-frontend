import { Suspense } from "react";
import SchoolsPage from "@/components/schools/SchoolsPage";
import { makeMetadata } from "@/lib/staticPages";

const page = {
  href: "/schools",
  seoTitle: "Find Schools in Gujarat | SchoolHub",
  title: "Find Schools",
  description:
    "Search and filter schools in Gujarat by location, medium, school type, category, facilities, classes, and keywords.",
};

export const metadata = makeMetadata(page);

export default function SchoolsRoutePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[var(--color-bg-page)] p-6">Loading schools...</div>}>
      <SchoolsPage />
    </Suspense>
  );
}
