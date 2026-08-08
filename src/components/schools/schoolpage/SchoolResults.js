"use client";

import { useState } from "react";
import Image from "next/image";
import { hasValue, hasValueStrict } from "@/lib/schoolUtils";

function InfoRow({ label, value }) {
  if (!hasValueStrict(value)) return null;
  return (
    <div className="flex items-center justify-between text-xs">
      <span className="text-white/60">{label}</span>
      <span className="text-white font-medium">{value}</span>
    </div>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}
function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
    </svg>
  );
}

// A result entry only counts as "real" if it has a class label AND
// actual numbers behind it. appeared=0 / passingRate=0 usually means
// the field was never filled in, so we treat those as no-data too.
function isValidResult(result) {
  if (!result) return false;
  const { classLabel, appeared, passingRate } = result;
  return Boolean(String(classLabel ?? "").trim()) && (hasValue(appeared) || hasValue(passingRate));
}

function ResultPoster({ result, onOpen }) {
  const { classLabel, year, stream, board, medium, passingRate, appeared, passed, posterImageUrl } = result;

  return (
    <button
      type="button"
      onClick={() => onOpen(result)}
      className="relative flex-shrink-0 w-56 sm:w-60 h-72 sm:h-80 rounded-2xl overflow-hidden snap-start text-left cursor-zoom-in"
    >
      {posterImageUrl ? (
        <Image src={posterImageUrl} alt={`Class ${classLabel} results`} fill className="object-cover" sizes="240px" />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-blue-500" />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/40" />

      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
        <span className="text-white text-xs font-semibold uppercase tracking-wide bg-white/15 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/20">
          Class {classLabel}
          {stream ? ` · ${stream}` : ""}
        </span>
        {year && <span className="text-white/80 text-xs font-medium">{year}</span>}
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4">
        {hasValue(passingRate) ? (
          <>
            <span className="text-4xl sm:text-5xl font-bold text-white leading-none drop-shadow-sm">
              {passingRate}%
            </span>
            <p className="text-white/70 text-[11px] mt-1 mb-3">Passing Rate</p>
          </>
        ) : (
          <div className="mb-3" />
        )}

        <div className="space-y-1.5 pt-3 border-t border-white/25">
          <InfoRow label="Board" value={board} />
          <InfoRow label="Medium" value={medium} />
          <InfoRow label="Appeared" value={hasValue(appeared) ? appeared : null} />
          <InfoRow label="Passed" value={hasValue(passed) ? passed : null} />
        </div>
      </div>
    </button>
  );
}

function FullscreenPosterViewer({ result, onClose }) {
  if (!result) return null;
  const { classLabel, stream, year, posterImageUrl } = result;
  const fileName = `class-${classLabel}${stream ? `-${stream}` : ""}-result-${year ?? ""}.jpg`;

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4" onClick={onClose}>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
      >
        <CloseIcon />
      </button>

      <div className="relative w-full h-[75vh] sm:w-[500px] sm:h-[80vh] max-w-full" onClick={(e) => e.stopPropagation()}>
        {posterImageUrl ? (
          <Image src={posterImageUrl} alt={`Class ${classLabel} results`} fill unoptimized className="object-contain rounded-lg" sizes="500px" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-blue-500 rounded-lg" />
        )}
      </div>

      {posterImageUrl && (
        <a
          href={posterImageUrl}
          download={fileName}
          onClick={(e) => e.stopPropagation()}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white text-gray-900 text-sm font-semibold px-5 py-2.5 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
        >
          <DownloadIcon />
          Download
        </a>
      )}
    </div>
  );
}

export default function SchoolResults({ results = [] }) {
  const [openResult, setOpenResult] = useState(null);
  const validResults = results.filter(isValidResult);

  if (validResults.length === 0) {return(
      <>
        <section className="bg-white border border-gray-200 rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6">
          <h2 className="text-base md:text-lg font-bold text-gray-900 mb-4">Results</h2>
          <p className="text-gray-600 text-sm sm:text-base">No results information available.</p>
        </section>
      </>
    )
}
  return (
    <section className="bg-white border border-gray-200 rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6">
      <h2 className="text-base md:text-lg font-bold text-gray-900 mb-4">Results</h2>
      <div
        className="flex gap-3 sm:gap-4 overflow-x-auto pb-2 snap-x snap-mandatory -mx-1 px-1"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {validResults.map((r, i) => (
          <ResultPoster key={i} result={r} onOpen={setOpenResult} />
        ))}
      </div>
      <FullscreenPosterViewer result={openResult} onClose={() => setOpenResult(null)} />
    </section>
  );
}