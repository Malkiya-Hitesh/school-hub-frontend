import Section from "@/components/ui/Section";
import { StaticPageHero } from "@/components/static-pages/StaticPage";
import FAQAccordion from "@/components/static-pages/FAQAccordion";
import { faqGroups, makeMetadata } from "@/lib/staticPages";

const page = {
  href: "/faq",
  seoTitle: "SchoolHub Frequently Asked Questions",
  title: "Frequently Asked Questions",
  eyebrow: "SchoolHub FAQ",
  description:
    "Answers to common questions about SchoolHub, school search, parents and students, school claims, reviews, and data corrections.",
};

export const metadata = makeMetadata(page);

export default function FAQPage() {
  return (
    <>
      <StaticPageHero title={page.title} eyebrow={page.eyebrow} description={page.description} />
      <Section className="bg-[var(--color-bg-page)]">
        <FAQAccordion groups={faqGroups} />
      </Section>
    </>
  );
}
