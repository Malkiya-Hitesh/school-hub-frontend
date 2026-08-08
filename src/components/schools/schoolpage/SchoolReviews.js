
import { getInitials, hasValue } from "@/lib/schoolUtils";

function StarRow({ rating = 0, size = "w-4 h-4" }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} viewBox="0 0 20 20" fill={i <= Math.round(rating) ? "#f59e0b" : "#e5e7eb"} className={size}>
          <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1 1 5.8L10 14.77l-5.21 2.75 1-5.8-4.21-4.1 5.82-.85L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

function RatingBar({ stars, percent }) {
  return (
    <div className="flex items-center gap-2 text-xs text-gray-500">
      <span className="w-8 flex-shrink-0">{stars} star</span>
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full bg-amber-400 rounded-full" style={{ width: `${percent}%` }} />
      </div>
      <span className="w-8 text-right flex-shrink-0">{percent}%</span>
    </div>
  );
}

function ReviewCard({ name, rating, date, comment }) {
  return (
    <div className="py-4 border-b border-gray-100 last:border-0 last:pb-0">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-600 text-xs font-semibold flex items-center justify-center flex-shrink-0">
          {getInitials(name)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-semibold text-gray-800 truncate">{name || "Anonymous"}</span>
            {date && <span className="text-xs text-gray-400 flex-shrink-0">{date}</span>}
          </div>
          <div className="mt-1">
            <StarRow rating={rating} size="w-3.5 h-3.5" />
          </div>
          {comment && <p className="text-sm text-gray-600 mt-2 leading-relaxed">{comment}</p>}
        </div>
      </div>
    </div>
  );
}

export default function SchoolReviews({ summary , reviewsdata }) {

  
  const { averageRating, totalReviews, distribution = [] } = summary;

  if (!averageRating  || !totalReviews || !distribution || reviewsdata.length == 0) {
    
    return (
      <>
        <section className="bg-white border border-gray-200 rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6">
          <h2 className="text-base md:text-lg font-bold text-gray-900 mb-4">Reviews & Ratings</h2>
          <p className="text-gray-600 text-sm sm:text-base">No reviews information available.</p>
        </section>
      </>
    )
  }
    





  return (
    <section className="bg-white border border-gray-200 rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6">
      <h2 className="text-base md:text-lg font-bold text-gray-900 mb-4">Reviews & Ratings</h2>

      <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 pb-5 mb-1 border-b border-gray-100">
        <div className="flex sm:flex-col items-center sm:items-start gap-3 sm:gap-1 flex-shrink-0">
          <span className="text-3xl md:text-4xl font-bold text-gray-900">
            {hasValue(averageRating) ? Number(averageRating).toFixed(1) : "--"}
          </span>
          <div>
            <StarRow rating={averageRating || 0} />
            <p className="text-xs text-gray-400 mt-1">{totalReviews || 0} reviews</p>
          </div>
        </div>

        <div className="flex-1 space-y-1.5 min-w-0">
          {distribution.map((stars) => (
             
            <RatingBar key={stars.star} stars={stars.star} percent={((stars.count *100) / totalReviews).toFixed(1) || 0} />
          ))}
        </div>
      </div>

      {reviewsdata.length > 0 ? (
        <div>
          {reviewsdata.map((r, i) => (
            <ReviewCard key={i} {...r} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-400 py-4">No written reviews yet.</p>
      )}

      {totalReviews > reviewsdata.length && (
        <button type="button" className="w-full mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-700 py-2">
          View all {totalReviews} reviews
        </button>
      )}
    </section>
  );
}