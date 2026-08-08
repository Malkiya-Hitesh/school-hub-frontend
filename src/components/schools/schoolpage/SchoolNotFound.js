import Link from "next/link";

export default function SchoolNotFound() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16 mt-16 text-center">
      <h1 className="text-lg font-bold text-gray-900">School not found</h1>
      <p className="text-sm text-gray-500 mt-2">
        This school may have been removed or the link is incorrect.
      </p>
      <Link
        href="/schools"
        className="inline-block mt-5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition-colors"
      >
        Browse all schools
      </Link>
    </div>
  );
}