import React from "react";
import { Section } from "./shared";
import { useFilters } from "@/context/FiltersContext";
import { SORT_OPTIONS } from "@/lib/constants";

function SortSection() {
  const { values, pushQuery } = useFilters();

  return (
    <Section title="ક્રમ">
      <select
        value={values.sortBy}
        onChange={(e) => pushQuery({ sortBy: e.target.value, page: "1" })}
        className="w-full text-xs rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-page)] text-[var(--color-text-primary)] px-2.5 py-2 outline-none focus:border-[var(--color-primary)]"
      >
        {SORT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </Section>
  );
}

export default React.memo(SortSection);