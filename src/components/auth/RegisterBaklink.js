import Link from 'next/link'
import React from 'react'

function RegisterBaklink() {
  return (
    <>
     <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="font-medium text-indigo-600 hover:text-indigo-700 hover:underline"
            >
              Sign in
            </Link>
          </p>

          <p className="mt-3 text-center text-xs text-slate-400">
            <Link href="/" className="hover:text-slate-600 transition-colors">
              ← Back to School Hub
            </Link>
          </p>
          </>
  )
}

export default RegisterBaklink
