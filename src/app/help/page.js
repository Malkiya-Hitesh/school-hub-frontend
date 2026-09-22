import StaticContentPage from "@/components/static-pages/StaticPage";
import { makeMetadata, staticPages } from "@/lib/staticPages";

const page = staticPages.help;

export const metadata = makeMetadata(page);

export default function HelpPage() {
  return <StaticContentPage page={page} />;
}
