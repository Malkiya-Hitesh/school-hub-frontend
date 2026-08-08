'use client'


import { useState } from "react";
import { DISTRICT_OPTIONS } from "@/lib/constants";
import { usePushQuery } from "@/hooks/usePushQuery";
import { useSearchParams } from "next/navigation";


const POPULAR_DISTRICTS = [
    { value: "ALL", label: "ALL" },
    ...DISTRICT_OPTIONS,
];


function SchoolScearch() {

const searchParams = useSearchParams()
     const q = searchParams.get('q') || ""
     const districtQ = searchParams.get('district') || ""
    const [query, setQuery] = useState(q || "");
    const [district, setDistrict] = useState(districtQ  || "");




        const pushQuery = usePushQuery()

    function navigate(overrideQuery = query, overrideDistrict = "") {
        pushQuery({'q': overrideQuery, 'district': overrideDistrict || district, 'page': 1})
    
    }


    // function handleFocus() {
    //     if (!query) {
    //       queryClient.prefetchQuery({
    //         queryKey: schoolKeys.list({ limit: 20, page: 1 }),
    //         queryFn: () =>
    //           import("@/lib/schoolApi").then((m) =>
    //             m.fetchSchools({ limit: 20, page: 1 })
    //           ),
    //         staleTime: 60_000,
    //       });
    //     }
    //   }
    
    
    return (
        <div className="flex items-center bg-white rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.2)] mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400 shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>

            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && navigate()}
            
                placeholder="શાળાનું નામ, જિલ્લો અથવા તાલુકો..."
                aria-label="Search schools"
                className="flex-1 py-4 px-3 text-sm sm:text-base text-slate-800 placeholder:text-slate-400 outline-none bg-transparent"
            />

            <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                aria-label="Select district"
                className="hidden sm:block border-l border-slate-200 py-4 px-3 text-sm text-slate-500 bg-transparent outline-none cursor-pointer"
            >
                {POPULAR_DISTRICTS.map(({ value, label }) => (
                    <option key={value} value={value}>{label}</option>
                ))}
            </select>

            <button
                onClick={() => navigate()}
                className="m-1.5 px-5 py-3 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-sm font-bold whitespace-nowrap transition-colors active:scale-[0.98]"
            >
                શોધો
            </button>
        </div>
    )
}

export default SchoolScearch
