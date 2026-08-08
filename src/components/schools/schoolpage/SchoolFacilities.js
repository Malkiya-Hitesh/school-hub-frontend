import Image from "next/image";
import { safeString } from "@/lib/schoolUtils";

function FacilityCard({ label, description, imageUrl }) {
  return (
    <div className="relative flex-shrink-0 w-60 sm:w-64 md:w-72 h-72 sm:h-80 rounded-2xl overflow-hidden snap-start">
      {imageUrl ? (
        <Image src={imageUrl} alt={label || "Facility"} fill className="object-cover" sizes="288px" />
      ) : (
        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-300 text-xs">
          No photo
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        {label && <h3 className="text-white text-base sm:text-lg font-bold">{label}</h3>}
        {description && (
          <p className="text-white/80 text-xs sm:text-sm mt-1 line-clamp-2">{description}</p>
        )}
      </div>
    </div>
  );
}

export default function SchoolFacilities({ facilities = [] }) {
  const validFacilities = facilities.filter(
    (f) =>
      f &&
      (safeString(f.label).trim() || safeString(f.description).trim() || safeString(f.imageUrl).trim())
  );

  if (validFacilities.length === 0) {
    return(
      <>
        <section className="bg-white border border-gray-200 rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6">
          <h2 className="text-base md:text-lg font-bold text-gray-900 mb-4">Facilities</h2>
          <p className="text-gray-600 text-sm sm:text-base">No facilities information available.</p>
        </section>
      </>
    )
}
  return (
    <section className="bg-white border border-gray-200 rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6">
      <h2 className="text-base md:text-lg font-bold text-gray-900 mb-4">Facilities</h2>
      <style>{`.facilities-scroll::-webkit-scrollbar { display: none; }`}</style>
      <div
        className="facilities-scroll flex gap-3 sm:gap-4 overflow-x-auto pb-2 snap-x snap-mandatory -mx-1 px-1"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {validFacilities.map((facility, index) => (
          <FacilityCard key={facility.label || facility.imageUrl || index} {...facility} />
        ))}
      </div>
    </section>
  );
}