"use client";

import { useEffect, useState } from "react"
import SchoolReviews from "./SchoolReviews"
import { reviews } from "@/lib/contactsAPI"

function SchoolRS({schoolId}) {
    
     const [reviewsdata, setReviewsdata] = useState([])
       const [summary, setSummry] = useState([])
     
       const getR = async ()=>{
      if (schoolId) {
     
           const { data } = await reviews.get(schoolId)
        
          
          
             const r = data?.data
          
  
     
             const total = r.length
      
             
             const avg = total > 0
               ? (r.reduce((s, r) => s + Number(r.rating), 0) / total).toFixed(1)
               : '0.0'
             const counts = [5, 4, 3, 2, 1].map((star) => ({
               star,
               count: r.filter((r) => Number(r.rating) === star).length,
             }))
             console.log(counts);
     
     
             const su = {
               averageRating: avg,
               totalReviews: total,
               distribution:counts,
             }
     console.log(su);
     
             setReviewsdata(r)
             setSummry(su)
            

        }
        
       }
        useEffect( () => {
        getR()
         
     
       }, [schoolId]);
    
    
  return (
     <SchoolReviews summary={summary} reviewsdata={reviewsdata} />
  )
}

export default SchoolRS
