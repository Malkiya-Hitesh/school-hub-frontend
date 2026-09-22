import { LegalPage } from "@/components/static-pages/StaticPage";
import { legalPages, makeMetadata } from "@/lib/staticPages";

const page = legalPages.terms;

export const metadata = makeMetadata(page);

export default function TermsPage() {
  return <LegalPage page={page} />;
}
