import React from "react";
import { Section } from "./shared";
import { useFilters } from "@/context/FiltersContext";
import { GRADE_FROM_OPTIONS, GRADE_TO_OPTIONS } from "@/lib/constants";

function GradeSection() {
  const { values, pushQuery } = useFilters();

  return (
    <>
      <Section title="ગ્રેડ થી">
        <select
          value={values.gradeFrom}
          onChange={(e) => pushQuery({ gradeFrom: e.target.value, page: "1" })}
          className="w-full text-xs rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-page)] text-[var(--color-text-primary)] px-2.5 py-2 outline-none focus:border-[var(--color-primary)]"
        >
          {GRADE_FROM_OPTIONS.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
        </select>
      </Section>
      <Section title="ગ્રેડ સુધી">
        <select
          value={values.gradeTo}
          onChange={(e) => pushQuery({ gradeTo: e.target.value, page: "1" })}
          className="w-full text-xs rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-page)] text-[var(--color-text-primary)] px-2.5 py-2 outline-none focus:border-[var(--color-primary)]"
        >
          {GRADE_TO_OPTIONS.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
        </select>
      </Section>
    </>
  );
}

export default React.memo(GradeSection);
