import { hasValueStrict } from "@/lib/schoolUtils";

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m22 6-10 7L2 6" />
    </svg>
  );
}
function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
      <circle cx="12" cy="12" r="10" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20Z" />
    </svg>
  );
}
function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 flex-shrink-0 mt-0.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ContactRow({ icon, children, href }) {
  const content = (
    <span className="flex items-start gap-2 text-sm text-gray-600">
      <span className="text-gray-400 mt-0.5">{icon}</span>
      <span className="break-words">{children}</span>
    </span>
  );
  return href ? (
    <a href={href} className="hover:text-indigo-600 transition-colors">
      {content}
    </a>
  ) : (
    content
  );
}

export default function SchoolAbout({ school = {} }) {
  const {
    tagline,
    description,
    mission,
    principalMessage,
    vision,
    establishedYear,
    address,
    phone,
    email,
    website,
  } = school;

  const currentYear = new Date().getFullYear();
  const yearsRunning =
    hasValueStrict(establishedYear) && establishedYear <= currentYear
      ? currentYear - establishedYear
      : null;

  const hasAboutContent = description || mission || vision || principalMessage;
  const hasContactInfo = address || phone || email || website;

  // Nothing at all to show — don't render an empty shell
  if (!tagline && !hasAboutContent && !hasContactInfo && !hasValueStrict(establishedYear)) {
    return null;
  }

  return (
    <section className="bg-white border border-gray-200 rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6">
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-base md:text-lg font-bold text-gray-900">About the School</h2>
        {hasValueStrict(establishedYear) && (
          <span className="text-xs text-gray-400 flex-shrink-0 mt-0.5">
            Est. {establishedYear}
            {yearsRunning !== null && ` · ${yearsRunning} yrs`}
          </span>
        )}
      </div>

      {tagline && <p className="text-sm text-indigo-600 font-medium mt-1">{tagline}</p>}

      {hasAboutContent ? (
        <div className="mt-3 mb-2 space-y-4">
          {description && <p className="text-sm md:text-[15px] text-gray-600 leading-relaxed">{description}</p>}
          {principalMessage && <p className="text-sm md:text-[15px] text-gray-600 leading-relaxed">{principalMessage}</p>}
          {mission && <p className="text-sm md:text-[15px] text-gray-600 leading-relaxed">{mission}</p>}
          {vision && <p className="text-sm md:text-[15px] text-gray-600 leading-relaxed">{vision}</p>}
        </div>
      ) : (
        <p className="text-sm text-gray-400 mt-3 mb-2">No description added yet.</p>
      )}

      {hasContactInfo && (
        <div className="mt-4 pt-4 border-t border-gray-100 space-y-2.5">
          {address && <ContactRow icon={<PinIcon />}>{address}</ContactRow>}
          {phone && (
            <ContactRow icon={<PhoneIcon />} href={`tel:${phone}`}>
              {phone}
            </ContactRow>
          )}
          {email && (
            <ContactRow icon={<MailIcon />} href={`mailto:${email}`}>
              {email}
            </ContactRow>
          )}
          {website && (
            <ContactRow icon={<GlobeIcon />} href={website}>
              {website.replace(/^https?:\/\//, "")}
            </ContactRow>
          )}
        </div>
      )}
    </section>
  );
}