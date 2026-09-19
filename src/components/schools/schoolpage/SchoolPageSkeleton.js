export default function SchoolPageSkeleton() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-4 md:py-6 animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5">
        <div className="lg:col-span-2 space-y-4 md:space-y-5">
          <div className="h-56 sm:h-64 md:h-80 bg-gray-100 rounded-xl md:rounded-2xl" />
          <div className="h-40 bg-gray-100 rounded-xl md:rounded-2xl" />
          <div className="h-56 bg-gray-100 rounded-xl md:rounded-2xl" />
          <div className="h-72 bg-gray-100 rounded-xl md:rounded-2xl" />
        </div>
        <div className="lg:col-span-1">
          <div className="h-72 bg-gray-100 rounded-xl md:rounded-2xl" />
        </div>
      </div>
    </div>
  );
}