"use client";

import { safeJoin } from "@/lib/schoolUtils";

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 flex-shrink-0 mt-0.5 text-indigo-600">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function DirectionsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="m3 11 18-8-8 18-2-8-8-2Z" />
    </svg>
  );
}
function CopyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

export default function SchoolLocation({ school = {} }) {
  const { address, city, pincode, latitude, longitude } = school;

  const fullAddress = safeJoin([address, city, pincode]);
  const hasCoords = typeof latitude === "number" && typeof longitude === "number";

  if (!fullAddress && !hasCoords) return null;

  const directionsUrl = hasCoords
    ? `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`
    : fullAddress
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`
      : null;

  const mapEmbedUrl = hasCoords
    ? `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`
    : fullAddress
      ? `https://maps.google.com/maps?q=${encodeURIComponent(fullAddress)}&z=15&output=embed`
      : null;

  function copyAddress() {
    if (navigator?.clipboard && fullAddress) {
      navigator.clipboard.writeText(fullAddress).catch(() => { });
    }
  }

  return (
    <>
      <section className="bg-white border border-gray-200 rounded-xl md:rounded-2xl overflow-hidden">

        <div className="p-4 sm:p-5 md:p-6 pb-0">
          <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3">Location</h2>

          {fullAddress && (
            <div className="flex items-start gap-2 mb-4">
              <PinIcon />
              <p className="text-sm text-gray-600 leading-relaxed">{fullAddress}</p>
            </div>
          )}

          <div className="flex gap-2 mb-4">
            {directionsUrl && (
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors py-2 rounded-lg"
              >
                <DirectionsIcon />
                Get Directions
              </a>
            )}
            {fullAddress && (
              <button
                type="button"
                onClick={copyAddress}
                aria-label="Copy address"
                className="flex items-center justify-center gap-1.5 text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors px-4 py-2 rounded-lg"
              >
                <CopyIcon />
              </button>
            )}
          </div>
        </div>

        <div className="w-full h-52 sm:h-64 md:h-72 bg-gray-100">
          {mapEmbedUrl ? (
            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="School location map"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-sm text-gray-400">
              Map not available
            </div>
          )}
        </div>
      </section>
    </>
  )
}
