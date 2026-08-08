import React from "react";
import { Section, CheckRow } from "./shared";
import { useFilters } from "@/context/FiltersContext";

function CheckRowSection({ title, filterKey, options }) {
  const { values, pushQuery } = useFilters();
  const value = values[filterKey];

  return (
    <Section title={title}>
      <div className="flex flex-col">
        {options.map((option) => {
          const optionValue = typeof option === "object" ? option.value : option;
          const optionLabel = typeof option === "object" ? option.label : option;

          return (
            <CheckRow
              key={optionValue}
              label={optionLabel}
              checked={value === optionValue}
              onChange={() => pushQuery({ [filterKey]: optionValue })}
            />
          );
        })}
      </div>
    </Section>
  );
}

export default React.memo(CheckRowSection);
