import { LegalPage } from "@/components/static-pages/StaticPage";
import { legalPages, makeMetadata } from "@/lib/staticPages";

const page = legalPages.privacy;

export const metadata = makeMetadata(page);

export default function PrivacyPage() {
  return <LegalPage page={page} />;
}
