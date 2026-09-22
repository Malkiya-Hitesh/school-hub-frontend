import StaticContentPage from "@/components/static-pages/StaticPage";
import { makeMetadata, staticPages } from "@/lib/staticPages";

const page = staticPages["for-students"];

export const metadata = makeMetadata(page);

export default function ForStudentsPage() {
  return <StaticContentPage page={page} />;
}
