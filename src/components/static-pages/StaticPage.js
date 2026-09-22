import Link from "next/link";
import Section from "@/components/ui/Section";
import { H1, H2, H3, P } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";

function ActionLink({ action }) {
  const isPrimary = action.variant !== "secondary";

  return (
    <Link
      href={action.href}
      className={cn(
        "inline-flex min-h-11 items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-muted)]",
        isPrimary
          ? "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]"
          : "border border-[var(--color-border)] bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] hover:bg-[var(--color-bg-page)]"
      )}
    >
      {action.label}
    </Link>
  );
}

export function StaticPageHero({ eyebrow, title, description, actions = [] }) {
  return (
    <section className="bg-[var(--color-bg-surface)] border-b border-[var(--color-border)]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-10">
        <div className="max-w-3xl">
          {eyebrow && (
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--color-text-accent)]">
              {eyebrow}
            </p>
          )}
          <H1 className="max-w-3xl">{title}</H1>
          <P size="md" className="mt-4 max-w-2xl">
            {description}
          </P>
          {actions.length > 0 && (
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              {actions.map((action) => (
                <ActionLink key={`${action.label}-${action.href}`} action={action} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function InfoCards({ cards }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => (
        <article
          key={card.title}
          className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-5 shadow-[var(--shadow-sm)]"
        >
          <H3 size="md" className="text-lg sm:text-xl">
            {card.title}
          </H3>
          <P className="mt-3">{card.text}</P>
          {card.href && (
            <Link
              href={card.href}
              className="mt-4 inline-flex text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
            >
              Learn more
            </Link>
          )}
        </article>
      ))}
    </div>
  );
}

function OrderedCards({ cards }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card, index) => (
        <article
          key={card.title}
          className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-5 shadow-[var(--shadow-sm)]"
        >
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-primary-light)] text-sm font-bold text-[var(--color-primary)]">
            {String(index + 1).padStart(2, "0")}
          </div>
          <H3 size="md" className="text-lg sm:text-xl">
            {card.title}
          </H3>
          <P className="mt-3">{card.text}</P>
        </article>
      ))}
    </div>
  );
}

function ContentSection({ section }) {
  return (
    <section className="py-7 sm:py-9">
      <div className="max-w-3xl">
        <H2 size="lg">{section.title}</H2>
        {section.description && <P className="mt-3">{section.description}</P>}
        {section.body?.map((paragraph) => (
          <P key={paragraph} className="mt-4">
            {paragraph}
          </P>
        ))}
      </div>
      {section.cards && <div className="mt-6"><InfoCards cards={section.cards} /></div>}
      {section.orderedCards && <div className="mt-6"><OrderedCards cards={section.orderedCards} /></div>}
    </section>
  );
}

export function CTASection({ cta }) {
  if (!cta) return null;

  return (
    <section className="mt-8 rounded-lg border border-[var(--color-border)] bg-[var(--color-primary)] p-6 text-white sm:p-8">
      <h2 className="text-2xl font-bold leading-tight">{cta.title}</h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-indigo-100 sm:text-base">
        {cta.text}
      </p>
      {cta.actions?.length > 0 && (
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          {cta.actions.map((action) => (
            <Link
              key={`${action.label}-${action.href}`}
              href={action.href}
              className={cn(
                "inline-flex min-h-11 items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-white/60",
                action.variant === "secondary"
                  ? "bg-white/10 text-white ring-1 ring-white/30 hover:bg-white/15"
                  : "bg-white text-[var(--color-primary)] hover:bg-indigo-50"
              )}
            >
              {action.label}
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

export default function StaticContentPage({ page }) {
  return (
    <>
      <StaticPageHero
        eyebrow={page.eyebrow}
        title={page.title}
        description={page.description}
        actions={page.actions}
      />
      <Section className="bg-[var(--color-bg-page)]">
        <div className="mx-auto max-w-5xl">
          {page.sections.map((section) => (
            <ContentSection key={section.title} section={section} />
          ))}
          <CTASection cta={page.cta} />
        </div>
      </Section>
    </>
  );
}

export function LegalPage({ page }) {
  return (
    <>
      <StaticPageHero title={page.title} description={page.description} />
      <Section className="bg-[var(--color-bg-page)]">
        <article className="mx-auto max-w-4xl rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-5 shadow-[var(--shadow-sm)] sm:p-8">
          <p className="text-sm font-medium text-[var(--color-text-secondary)]">
            Last updated: {page.lastUpdated}
          </p>
          <nav aria-label={`${page.title} table of contents`} className="mt-6 rounded-lg bg-[var(--color-bg-page)] p-4">
            <h2 className="text-sm font-semibold text-[var(--color-text-primary)]">Contents</h2>
            <ol className="mt-3 grid gap-2 sm:grid-cols-2">
              {page.sections.map((section) => (
                <li key={section.title}>
                  <a
                    href={`#${section.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                    className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <div className="mt-8 space-y-8">
            {page.sections.map((section) => (
              <section key={section.title} id={section.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}>
                <H2 size="md">{section.title}</H2>
                {section.body.map((paragraph) => (
                  <P key={paragraph} className="mt-3">
                    {paragraph}
                  </P>
                ))}
              </section>
            ))}
          </div>
        </article>
      </Section>
    </>
  );
}
