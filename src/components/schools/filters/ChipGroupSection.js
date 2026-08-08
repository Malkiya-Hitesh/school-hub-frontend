import React from "react";
import { Section, Chip } from "./shared";
import { useFilters } from "@/context/FiltersContext";

function ChipGroupSection({ title, filterKey, options }) {
  const { values, pushQuery } = useFilters();
  const value = values[filterKey];

  return (
    <Section title={title}>
      <div className="flex flex-wrap">
        {options.map((option) => {
          const optionValue = typeof option === "object" ? option.value : option;
          const optionLabel = typeof option === "object" ? option.label : option;

          return (
            <Chip
              key={optionValue}
              label={optionLabel}
              active={value === optionValue}
              onClick={() => pushQuery({ [filterKey]: optionValue })}
              onRemove={() => pushQuery({ [filterKey]: optionValue })}
            />
          );
        })}
      </div>
    </Section>
  );
}

export default React.memo(ChipGroupSection);
