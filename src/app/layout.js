import { Geist } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Providers from "@/components/Providers";
import AuthInitializer from "@/components/auth/AuthInitializer";


const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

export const metadata = {
  title:       "School Hub Gujarat — ૫૩,૦૦૦+ શાળાઓ",
  description: "ગુજરાતની તમામ સરકારી અને ખાનગી શાળાઓની સંપૂર્ણ માહિતી",
};

export default function RootLayout({ children }) {
  return (
    <html lang="gu" suppressHydrationWarning>
      <body className={geist.variable}>
<Providers >
          <Navbar />
          {children}
          <Footer />
          <AuthInitializer/>
     </Providers>
      </body>
    </html>
  );
}