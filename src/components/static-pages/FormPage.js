import Section from "@/components/ui/Section";
import { H2, P } from "@/components/ui/Typography";
import { StaticPageHero } from "./StaticPage";
import StaticForm from "./StaticForm";

export default function FormPage({ page, intro, fields, submitLabel, note }) {
  return (
    <>
      <StaticPageHero title={page.title} eyebrow={page.eyebrow} description={page.description} />
      <Section className="bg-[var(--color-bg-page)]">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <H2 size="lg">{intro.title}</H2>
            <P className="mt-3">{intro.text}</P>
            <div className="mt-6 grid gap-3">
              {intro.items.map((item) => (
                <div key={item} className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-4 text-sm text-[var(--color-text-secondary)]">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <StaticForm fields={fields} submitLabel={submitLabel} note={note} />
        </div>
      </Section>
    </>
  );
}
