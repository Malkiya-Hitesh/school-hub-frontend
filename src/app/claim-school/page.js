import StaticContentPage from "@/components/static-pages/StaticPage";
import { makeMetadata, staticPages } from "@/lib/staticPages";

const page = staticPages["claim-school"];

export const metadata = makeMetadata(page);

export default function ClaimSchoolPage() {
  return <StaticContentPage page={page} />;
}
