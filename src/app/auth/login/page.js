"use client";
// app/auth/login/page.js
import LoginBakLink from "@/components/auth/LoginBakLink";
import LoginFOrm from "@/components/auth/LoginFOrm";

export default function LoginPage() {

  return (
   

      <div className="flex items-center justify-center p-6 sm:p-10 bg-slate-50">
        <div className="w-full max-w-md">

      <LoginFOrm />
     
<LoginBakLink />      
        </div>
      </div>
    
  );
}