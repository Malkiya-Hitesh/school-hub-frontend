'use client'
import { usePushQuery } from "@/hooks/usePushQuery";
import { GUJARAT_DISTRICTS } from "@/lib/constants";





function District() {

  const pushQuery = usePushQuery();
    const POPULAR_DISTRICTS = GUJARAT_DISTRICTS

  
   

//   const [, startTransition] = useTransition();
   



    


    return (
        <div className="flex flex-wrap gap-2">
            {POPULAR_DISTRICTS.map((d) => (
                <button
                    key={d}
                    onClick={() => pushQuery({'district': d === "ALL" ? "" : d, 'page': 1})}
              
                    className="flex items-center gap-1.5 bg-white/12 border border-white/20 rounded-lg px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/22 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M9 21V9l6-6 6 6v12M9 21h6" />
                    </svg>
                    {d}
                </button>
            ))}
           
        </div>
    )
}

export default District
