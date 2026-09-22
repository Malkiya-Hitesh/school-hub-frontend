import StaticContentPage from "@/components/static-pages/StaticPage";
import { makeMetadata, staticPages } from "@/lib/staticPages";

const page = staticPages["how-it-works"];

export const metadata = makeMetadata(page);

export default function HowItWorksPage() {
  return <StaticContentPage page={page} />;
}
