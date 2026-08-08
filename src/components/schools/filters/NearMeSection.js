"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Section } from "./shared";
import { useFilters } from "@/context/FiltersContext";
import { useGeolocation } from "@/hooks/useGeolocation";
import { FILTER_KEYS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const MIN_RADIUS = 1;
const MAX_RADIUS = 50;
const DEBOUNCE_MS = 500;
const FILTER_KEY_VALUES = Object.keys(FILTER_KEYS);

function NearMeSection() {
  const { values, pushQuery } = useFilters();
  const { getPosition, loading, error, clearError } = useGeolocation();
  const isActive = Boolean(values.lat && values.lng);

  /* ── Local slider state (avoids pushQuery on every drag pixel) ── */
  const [sliderValue, setSliderValue] = useState(
    Number(values.nearRadius) || 10
  );
  const debounceRef = useRef(null);

  // Keep slider synced when URL changes externally (back/forward, chip removal)
  useEffect(() => {
    setSliderValue(Number(values.nearRadius) || 10);
  }, [values.nearRadius]);

  useEffect(() => {
    return () => clearTimeout(debounceRef.current);
  }, []);

  const handleSliderChange = useCallback((e) => {
    const v = Number(e.target.value);
    setSliderValue(v);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      pushQuery({ nearRadius: String(v), page: "1" });
    }, DEBOUNCE_MS);
  }, [pushQuery]);

  const handleToggle = async () => {
    if (isActive) {
      clearTimeout(debounceRef.current);
      pushQuery({ lat: "", lng: "", nearRadius: "" });
      return;
    }

    clearError();
    try {
      const { lat, lng } = await getPosition();

      const cleared = {};
      FILTER_KEY_VALUES.forEach((k) => {
        if (k !== "nearRadius") cleared[k] = "";
      });

      pushQuery({
        ...cleared,
        lat: lat.toFixed(6),
        lng: lng.toFixed(6),
        nearRadius: String(sliderValue),
        page: "1",
      });
    } catch {
      // error already captured in hook state
    }
  };

  return (
    <Section title="સ્થાન">
      <button
        onClick={handleToggle}
        disabled={loading}
        className={cn(
          "w-full flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-bold border transition-colors",
          isActive
            ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]"
            : "bg-[var(--color-bg-page)] text-[var(--color-text-secondary)] border-[var(--color-border)] hover:border-[var(--color-primary-muted)]",
          loading && "opacity-60 cursor-wait"
        )}
      >
        {loading ? "શોધાય છે…" : isActive ? "✕ નજીકની શાળાઓ બંધ કરો" : "📍 મારી નજીકની શાળાઓ"}
      </button>

      {isActive && (
        <div className="mt-3">
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="radius-slider" className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest">
              અંતર
            </label>
            <span className="text-xs font-bold text-[var(--color-primary)]">
              {sliderValue} કિમી
            </span>
          </div>
          <input
            id="radius-slider"
            type="range"
            min={MIN_RADIUS}
            max={MAX_RADIUS}
            step={1}
            value={sliderValue}
            onChange={handleSliderChange}
            className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-[var(--color-primary)] bg-[var(--color-border)]"
            aria-label="Search radius in kilometers"
            aria-valuemin={MIN_RADIUS}
            aria-valuemax={MAX_RADIUS}
            aria-valuenow={sliderValue}
          />
          <div className="flex justify-between text-[10px] text-[var(--color-text-muted)] mt-1">
            <span>{MIN_RADIUS} કિમી</span>
            <span>{MAX_RADIUS} કિમી</span>
          </div>
        </div>
      )}

      {error && (
        <p className="text-[10px] text-[var(--color-error-text)] mt-2 leading-snug">{error}</p>
      )}
    </Section>
  );
}

export default React.memo(NearMeSection);
