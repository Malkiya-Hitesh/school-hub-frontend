import StaticContentPage from "@/components/static-pages/StaticPage";
import { makeMetadata, staticPages } from "@/lib/staticPages";

const page = staticPages["education-resources"];

export const metadata = makeMetadata(page);

export default function EducationResourcesPage() {
  return <StaticContentPage page={page} />;
}
