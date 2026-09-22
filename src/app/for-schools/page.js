import StaticContentPage from "@/components/static-pages/StaticPage";
import { makeMetadata, staticPages } from "@/lib/staticPages";

const page = staticPages["for-schools"];

export const metadata = makeMetadata(page);

export default function ForSchoolsPage() {
  return <StaticContentPage page={page} />;
}
