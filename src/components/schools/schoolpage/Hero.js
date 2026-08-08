import Image from "next/image";
import { getInitials, getAvatarColor, safeArray } from "@/lib/schoolUtils";

function SchoolLogo({ name, logoUrl }) {
  if (logoUrl) {
    return (
      <Image
        src={logoUrl}
        alt={`${name} logo`}
        width={96}
        height={96}
        className="object-cover w-full h-full"
      />
    );
  }
  return (
    <div
      className={`w-full h-full flex items-center justify-center text-white font-bold text-lg md:text-xl ${getAvatarColor(name)}`}
    >
      {getInitials(name)}
    </div>
  );
}

function VerifiedBadge() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 md:w-5 md:h-5 text-sky-400 flex-shrink-0">
      <path d="M9.05 2.51a3 3 0 0 1 5.9 0l.3 1.24a1 1 0 0 0 .9.75l1.27.06a3 3 0 0 1 2.87 4.18l-.5 1.18a1 1 0 0 0 .2 1.15l.9.9a3 3 0 0 1 0 4.24l-.9.9a1 1 0 0 0-.2 1.15l.5 1.18a3 3 0 0 1-2.87 4.18l-1.27.06a1 1 0 0 0-.9.75l-.3 1.24a3 3 0 0 1-5.9 0l-.3-1.24a1 1 0 0 0-.9-.75l-1.27-.06a3 3 0 0 1-2.87-4.18l.5-1.18a1 1 0 0 0-.2-1.15l-.9-.9a3 3 0 0 1 0-4.24l.9-.9a1 1 0 0 0 .2-1.15l-.5-1.18A3 3 0 0 1 6.58 4.56l1.27-.06a1 1 0 0 0 .9-.75l.3-1.24Z" />
      <path d="m9 12 2 2 4-4" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function HeartIcon({ filled }) {
  return (
    <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" className="w-4 h-4 md:w-5 md:h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-7.5-4.6-10-9.1C.5 8.6 2.3 5 6 5c2 0 3.3 1 4 2 .7-1 2-2 4-2 3.7 0 5.5 3.6 4 6.9-2.5 4.5-10 9.1-10 9.1Z" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 md:w-5 md:h-5">
      <circle cx="18" cy="5" r="2.5" />
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="19" r="2.5" />
      <path strokeLinecap="round" d="M8.2 10.7 15.8 6.3M8.2 13.3l7.6 4.4" />
    </svg>
  );
}

export default function Hero({ school = {}, onSave, onShare, saved = false }) {
  const {
    name = "School",
    logoUrl,
    coverImageUrl,
    board,
    medium,
    district,
    taluka,
    verified,
  } = school;

  const tags = [board, medium, district, taluka].flat().filter(Boolean);

  return (
    <div className="relative w-full h-56 sm:h-64 md:h-80 rounded-xl md:rounded-2xl overflow-hidden shadow-sm border border-gray-200">
      {coverImageUrl ? (
        <>
          <Image src={coverImageUrl} alt={name} fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20" />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-blue-500 to-sky-400" />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 30%, white 2px, transparent 2px), radial-gradient(circle at 70% 60%, white 2px, transparent 2px), radial-gradient(circle at 40% 80%, white 2px, transparent 2px)",
              backgroundSize: "80px 80px",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/10" />
        </>
      )}

      <div className="absolute top-3 right-3 md:top-4 md:right-4 flex gap-2">
        {onSave && (
          <button
            type="button"
            onClick={onSave}
            aria-label="Save school"
            className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-black/30 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/45 transition-colors"
          >
            <HeartIcon filled={saved} />
          </button>
        )}
        {onShare && (
          <button
            type="button"
            onClick={onShare}
            aria-label="Share school"
            className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-black/30 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/45 transition-colors"
          >
            <ShareIcon />
          </button>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6 flex items-end gap-3 md:gap-4">
        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-white ring-4 ring-white/90 shadow-md overflow-hidden flex-shrink-0">
          <SchoolLogo name={name} logoUrl={logoUrl} />
        </div>

        <div className="min-w-0 pb-0.5">
          <div className="flex items-center gap-1.5">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white leading-tight truncate drop-shadow-sm">
              {name}
            </h1>
            {verified && <VerifiedBadge />}
          </div>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              {tags.map((tag, i) => (
                <span
                  key={`${tag}-${i}`}
                  className="text-[11px] md:text-xs px-2 py-0.5 rounded-full bg-white/15 backdrop-blur-sm text-white/90 border border-white/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}