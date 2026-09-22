import { LegalPage } from "@/components/static-pages/StaticPage";
import { legalPages, makeMetadata } from "@/lib/staticPages";

const page = legalPages.disclaimer;

export const metadata = makeMetadata(page);

export default function DisclaimerPage() {
  return <LegalPage page={page} />;
}
