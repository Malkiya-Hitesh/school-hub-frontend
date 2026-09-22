import StaticContentPage from "@/components/static-pages/StaticPage";
import { makeMetadata, staticPages } from "@/lib/staticPages";

const page = staticPages["for-parents"];

export const metadata = makeMetadata(page);

export default function ForParentsPage() {
  return <StaticContentPage page={page} />;
}
