// app/auth/layout.js
import "../globals.css"
import Providers        from "@/components/Providers";
import AuthInitializer  from "@/components/auth/AuthInitializer";

export const metadata = {
  title:       "School Hub — Gujarat School Directory",
  description: "Find and compare schools in Gujarat. Parents, students, and schools — all in one place.",
};

export default function RootLayout({ children }) {
  return (
   
        <Providers>
          {/* Checks /me on every app load and hydrates Redux */}
          <AuthInitializer />
          {children}
        </Providers>
      
  );
}