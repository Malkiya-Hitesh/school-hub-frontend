"use client";
// app/auth/register/page.js


import RegisterForm from "@/components/auth/RegisterForm";
import RegisterBaklink from "@/components/auth/RegisterBaklink";

export default function RegisterPage() {


  return (
    

   <>
      <div className="flex items-center justify-center p-6 sm:p-10 bg-slate-50">



        <div className="w-full max-w-md">


          
        

          <RegisterForm  />

       
         <RegisterBaklink />
        </div>
      </div>
    </>
  );
}