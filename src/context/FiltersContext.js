"use client";
import { createContext, useContext } from "react";

const FiltersContext = createContext(null);

export function FiltersProvider({ value, children }) {
  return (
    <FiltersContext.Provider value={value}>
      {children}
    </FiltersContext.Provider>
  );
}

export function useFilters() {
  const ctx = useContext(FiltersContext);
  if (!ctx) {
    throw new Error("useFilters must be used inside FiltersProvider");
  }
  return ctx;
}