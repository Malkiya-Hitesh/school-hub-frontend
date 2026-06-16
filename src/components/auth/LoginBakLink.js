
import Link from 'next/link'

function LoginBakLink() {
  return (
   <>
          <p className="mt-6 text-center text-sm text-slate-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/register"
              className="font-medium text-indigo-600 hover:text-indigo-700 hover:underline"
            >
              Create one free
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

export default LoginBakLink
