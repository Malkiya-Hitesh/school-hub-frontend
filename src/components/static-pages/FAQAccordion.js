"use client";

import { useState } from "react";
import { H2, P } from "@/components/ui/Typography";

export default function FAQAccordion({ groups }) {
  const [openId, setOpenId] = useState("General-0");

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {groups.map((group) => (
        <section key={group.title}>
          <H2 size="lg">{group.title}</H2>
          <div className="mt-4 divide-y divide-[var(--color-border)] rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-surface)] shadow-[var(--shadow-sm)]">
            {group.items.map((item, index) => {
              const id = `${group.title}-${index}`;
              const isOpen = openId === id;

              return (
                <div key={item.question}>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left text-sm font-semibold text-[var(--color-text-primary)] transition-colors hover:bg-[var(--color-bg-page)] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[var(--color-primary-muted)] sm:px-5"
                    aria-expanded={isOpen}
                    aria-controls={`${id}-panel`}
                    onClick={() => setOpenId(isOpen ? "" : id)}
                  >
                    <span>{item.question}</span>
                    <span className="shrink-0 text-xl leading-none text-[var(--color-primary)]">
                      {isOpen ? "-" : "+"}
                    </span>
                  </button>
                  {isOpen && (
                    <div id={`${id}-panel`} className="px-4 pb-4 sm:px-5">
                      <P>{item.answer}</P>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
