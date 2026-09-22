import Link from "next/link";
import Section from "@/components/ui/Section";
import { H1, H2, P } from "@/components/ui/Typography";
import { makeMetadata, sitemapGroups } from "@/lib/staticPages";

const page = {
  href: "/sitemap",
  seoTitle: "SchoolHub Sitemap",
  title: "Sitemap",
  description: "Browse all important SchoolHub pages for school discovery, support, legal information, and resources.",
};

export const metadata = makeMetadata(page);

export default function SitemapPage() {
  return (
    <Section className="bg-[var(--color-bg-page)]">
      <div className="mx-auto max-w-5xl">
        <H1>{page.title}</H1>
        <P size="md" className="mt-4 max-w-2xl">
          {page.description}
        </P>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sitemapGroups.map((group) => (
            <section key={group.heading} className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-5 shadow-[var(--shadow-sm)]">
              <H2 size="md">{group.heading}</H2>
              <ul className="mt-4 space-y-2">
                {group.links.map((link) => (
                  <li key={`${group.heading}-${link.href}-${link.label}`}>
                    <Link href={link.href} className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </Section>
  );
}
