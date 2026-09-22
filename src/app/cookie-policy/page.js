import { LegalPage } from "@/components/static-pages/StaticPage";
import { legalPages, makeMetadata } from "@/lib/staticPages";

const page = legalPages["cookie-policy"];

export const metadata = makeMetadata(page);

export default function CookiePolicyPage() {
  return <LegalPage page={page} />;
}
