import StaticContentPage from "@/components/static-pages/StaticPage";
import { makeMetadata, staticPages } from "@/lib/staticPages";

const page = staticPages.safety;

export const metadata = makeMetadata(page);

export default function SafetyPage() {
  return <StaticContentPage page={page} />;
}
