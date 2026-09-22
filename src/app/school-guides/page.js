import StaticContentPage from "@/components/static-pages/StaticPage";
import { makeMetadata, staticPages } from "@/lib/staticPages";

const page = staticPages["school-guides"];

export const metadata = makeMetadata(page);

export default function SchoolGuidesPage() {
  return <StaticContentPage page={page} />;
}
