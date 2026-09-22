import StaticContentPage from "@/components/static-pages/StaticPage";
import { makeMetadata, staticPages } from "@/lib/staticPages";

const page = staticPages.about;

export const metadata = makeMetadata(page);

export default function AboutPage() {
  return <StaticContentPage page={page} />;
}
