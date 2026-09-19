import React from "react";

import SortSection from "./filters/SortSection";
import DistrictSection from "./filters/DistrictSection";
import GradeSection from "./filters/GradeSection";
import ChipGroupSection from "./filters/ChipGroupSection";
import CheckRowSection from "./filters/CheckRowSection";
import {
  BOARD_OPTIONS,
  LOCATION_TYPE_OPTIONS,
  MANAGEMENT_OPTIONS,
  MEDIUM_OPTIONS,
  SCHOOL_TYPE_OPTIONS,
  STREAM_OPTIONS,
} from "@/lib/constants";
import NearMeSection from "./filters/NearMeSection";

function FilterSidebar({ onClose }) {
  return (
    <aside className="w-60 shrink-0 sticky top-[calc(var(--navbar-height,64px)+16px)] self-start min-h-[calc(100vh-96px)] max-h-[100%] overflow-y-auto pr-1 scrollbar-thin">
      <SortSection />
       <NearMeSection />
      <DistrictSection />
      {/* <GradeSection /> */}
      <ChipGroupSection title="માધ્યમ" filterKey="medium" options={MEDIUM_OPTIONS} />
      <ChipGroupSection title="બોર્ડ" filterKey="board" options={BOARD_OPTIONS} />
      <ChipGroupSection title="સ્ટ્રીમ" filterKey="streams" options={STREAM_OPTIONS} />
      <CheckRowSection title="વ્યવસ્થાપન" filterKey="management" options={MANAGEMENT_OPTIONS} />
      <ChipGroupSection title="શાળા પ્રકાર" filterKey="schoolType" options={SCHOOL_TYPE_OPTIONS} />
      <ChipGroupSection title="વિસ્તાર" filterKey="locationType" options={LOCATION_TYPE_OPTIONS} />
    </aside>
  );
}

export default React.memo(FilterSidebar);
