import React from "react";
import { Section, CheckRow } from "./shared";
import { useFilters } from "@/context/FiltersContext";
import { DISTRICT_OPTIONS, DISTRICT_TALUKA_OPTIONS } from "@/lib/constants";

function DistrictSection() {
  const { values, pushQuery } = useFilters();
  const district = values.district;
  const taluka = values.taluka;
  const talukas = district ? (DISTRICT_TALUKA_OPTIONS[district] ?? []) : [];

  function handleDistrictToggle(d) {
    const same = district === d;
    pushQuery({ district: same ? "" : d, taluka: "", page: "1" });
  }

  return (
    <>
      <Section title="જિલ્લો">
        <div className="max-h-48 overflow-y-auto flex flex-col pr-1 scrollbar-thin">
          {DISTRICT_OPTIONS.map(({ value, label }) => (
            <CheckRow
              key={value}
              label={label}
              checked={district === value}
              onChange={() => handleDistrictToggle(value)}
            />
          ))}
        </div>
      </Section>

      {talukas.length > 0 && (
        <Section title={`તાલુકો — ${district}`}>
          <div className="max-h-48 overflow-y-auto flex flex-col pr-1 scrollbar-thin">
            {talukas.map(({ value, label }) => (
              <CheckRow
                key={value}
                label={label}
                checked={taluka === value}
                onChange={() => pushQuery({ taluka: value })}
              />
            ))}
          </div>
        </Section>
      )}
    </>
  );
}

export default React.memo(DistrictSection);
