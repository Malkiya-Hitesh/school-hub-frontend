import HeroSection from "@/components/home/Hero";
import HomeAllschools from "@/components/home/HomeAllschools";
import { Suspense } from "react";

export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <main>
     <HeroSection />
     <HomeAllschools />
    </main>
    </Suspense>
  )
}