// components/schools/SearchBar.js
"use client";
import { useState, useRef, useCallback, useEffect } from "react";

export default function SearchBar({ initialValue, onSearch }) {
  const [value, setValue] = useState(initialValue);
  const debounceRef = useRef(null);

  useEffect(() => {
    setValue(initialValue); // sync on back/forward nav
  }, [initialValue]);

  useEffect(() => {
    return () => clearTimeout(debounceRef.current); // cleanup on unmount
  }, []);

  const handleChange = useCallback((v) => {
    setValue(v);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => onSearch(v), 2000);
  }, [onSearch]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      clearTimeout(debounceRef.current);
      onSearch(value);
    }
  };

  return (
    <div className="flex-1 flex items-center bg-white rounded-xl overflow-hidden shadow-[var(--shadow-md)]">
      <svg /* search icon, same as before */ />
      <input
       type="search"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="શાળાનું નામ, જિલ્લો, તાલુકો..."
        className="flex-1 py-3 px-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none bg-transparent"
        aria-label="Search schools"
      />

    </div>
  );
}