import HeroSection from "@/components/home/Hero";
import HomeAllschools from "@/components/home/HomeAllschools";

import { Suspense } from "react";

export default function HomePage() {
  return (
    <Suspense fallback={<div className="text-white min-h-screen flex items-center justify-center">Loading...</div>}>
    <main className="  "   >
     <HeroSection />
     <HomeAllschools />
    </main>
    </Suspense>
  )
}