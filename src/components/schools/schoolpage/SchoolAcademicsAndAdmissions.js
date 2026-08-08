import { hasValue, safeArray, formatPercent, toDisplayString } from "@/lib/schoolUtils";

// ---------- icons ----------

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-emerald-500 flex-shrink-0">
      <path strokeLinecap="round" strokeLinejoin="round" d="m20 6-11 11L4 12" />
    </svg>
  );
}
function FileIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 2v6h6M9 15h6M9 11h1" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m22 6-10 7L2 6" />
    </svg>
  );
}

// StatBox: skips 0/empty values so we never show a misleading "0"
function StatBox({ label, value }) {
  if (!hasValue(value)){
    return (
  <div className="bg-gray-50 rounded-lg p-3 text-center">
    <div className="text-base md:text-lg font-bold text-gray-900">{'--'}</div>
    <div className="text-[11px] text-gray-500 mt-0.5">{label}</div>
    </div>
  );}
  return (
    <div className="bg-gray-50 rounded-lg p-3 text-center">
      <div className="text-base md:text-lg font-bold text-gray-900">{value}</div>
      <div className="text-[11px] text-gray-500 mt-0.5">{label}</div>
    </div>
  );
}

// InfoItem — now boxed/card style instead of plain label-over-value text
function InfoItem({ label, value }) {
  const displayValue = toDisplayString(value) ?? "--";
  const isEmpty = displayValue === "--";
  return (
    <div
      className={`rounded-lg border px-3 py-2.5 ${
        isEmpty ? "bg-gray-50/60 border-gray-100" : "bg-white border-gray-200"
      }`}
    >
      <div className="text-[10px] text-gray-400 uppercase tracking-wide">{label}</div>
      <div className={`text-sm font-semibold mt-0.5 truncate ${isEmpty ? "text-gray-300" : "text-gray-800"}`}>
        {displayValue}
      </div>
    </div>
  );
}

// ---------- Academics ----------

function SchoolAcademics({ academics = {} }) {
  const {
    board = [],
    medium = [],
    stream = [],
    totalStudents,
    totalTeachers,
    ratio,
    classToFrom,
    passingRate,
    subjects = [],
    timing,
    affiliationNumber,
    indexNumber,
    otherDetails = [],
  } = academics;

  const statBoxesVisible = [totalStudents, totalTeachers, ratio].some(hasValue);

  return (
    <section className="bg-white border border-gray-200 rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6">
      <h2 className="text-base md:text-lg font-bold text-gray-900 mb-4">Academics</h2>

      {statBoxesVisible && (
        <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-5">
          <StatBox label="Total Students" value={totalStudents} />
          <StatBox label="Total Teachers" value={totalTeachers} />
          <StatBox label="Teacher : Student" value={ratio} />
        </div>
      )}

      <div className={`grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 ${statBoxesVisible ? "pt-4 border-t border-gray-100" : ""}`}>
        <InfoItem label="Board" value={board} />
        <InfoItem label="Medium" value={medium} />
        <InfoItem label="Stream" value={stream} />
        <InfoItem label="Class" value={classToFrom} />
        <InfoItem label="Passing Rate" value={formatPercent(passingRate)} />
        <InfoItem label="Timing" value={timing} />
        <InfoItem label="Affiliation No." value={affiliationNumber} />
        <InfoItem label="Index No." value={indexNumber} />
        {safeArray(otherDetails).map(({ label, value }) => (
          <InfoItem key={label} label={label} value={value} />
        ))}
      </div>

      {subjects.length > 0 && (
        <div className="mt-5 pt-4 border-t border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Subjects Offered</h3>
          <div className="flex flex-wrap gap-1.5">
            {subjects.map((s) => (
              <span key={s} className="text-xs px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                {s}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

// ---------- Admissions (single column, with fallback content + school contact) ----------

const DEFAULT_PROCESS = [
  "Contact the school office or submit an inquiry",
  "Visit the school for document verification",
  "Meet with the admission team",
  "Confirm your seat with fee payment",
];

const DEFAULT_ELIGIBILITY =
  "Contact the school directly for the current eligibility criteria and age requirements.";

const DEFAULT_DOCUMENTS = [
  "Birth certificate",
  "Aadhar card",
  "Passport size photographs",
  "Previous school leaving certificate (if applicable)",
];

function SchoolAdmissions({ admissions, onEnquire, schoolPhone, schoolEmail }) {
  const isFallback = !admissions;

  const {
    admissionsOpen = null, // null = unknown/not stated, don't show a false "Closed"
    process,
    eligibility,
    documentsRequired,
    feeStructurePdfUrl,
    adminContact,
  } = admissions || {};

  const processSteps = process?.length ? process : DEFAULT_PROCESS;
  const eligibilityText = eligibility?.length ? eligibility.join(", ") : DEFAULT_ELIGIBILITY;
  const documents = documentsRequired?.length ? documentsRequired : DEFAULT_DOCUMENTS;

  // Prefer a named admission-office contact; fall back to the school's general phone/email
  const contactName = adminContact?.name;
  const contactPhone = adminContact?.phone || schoolPhone;
  const contactEmail = adminContact?.email || schoolEmail;

  return (
    <section className="bg-white border border-gray-200 rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6">
      <div className="flex items-center justify-between mb-1 gap-3">
        <div className="flex items-center gap-2">
          <h2 className="text-base md:text-lg font-bold text-gray-900">Admissions</h2>
          {admissionsOpen !== null && (
            <span
              className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
                admissionsOpen
                  ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                  : "bg-gray-100 text-gray-500 border border-gray-200"
              }`}
            >
              {admissionsOpen ? "Open" : "Closed"}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={onEnquire}
          disabled={admissionsOpen === false}
          className="text-xs md:text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors px-3.5 py-1.5 rounded-full flex-shrink-0"
        >
          Apply Now
        </button>
      </div>

      {isFallback && (
        <p className="text-xs text-gray-400 mb-4">
          General admission info shown below — contact the school for exact details.
        </p>
      )}
      {!isFallback && <div className="mb-4" />}

      <div className="mb-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Admission Process</h3>
        <ol className="space-y-3">
          {processSteps.map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-semibold flex items-center justify-center flex-shrink-0">
                {i + 1}
              </span>
              <span className="text-sm text-gray-600 pt-0.5">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="mb-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-1">Eligibility</h3>
        <p className="text-sm text-gray-600">{eligibilityText}</p>
      </div>

      <div className="mb-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Documents Required</h3>
        <ul className="space-y-1.5">
          {documents.map((doc) => (
            <li key={doc} className="flex items-start gap-2 text-sm text-gray-600">
              <CheckIcon />
              {doc}
            </li>
          ))}
        </ul>
      </div>

      {feeStructurePdfUrl && (
        <a
          href={feeStructurePdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors rounded-lg px-3.5 py-2.5 mb-5"
        >
          <span className="flex items-center gap-2 text-sm text-gray-700">
            <FileIcon />
            Fee Structure (PDF)
          </span>
          <span className="text-xs font-medium text-indigo-600">Download</span>
        </a>
      )}

      {(contactPhone || contactEmail) && (
        <div className="pt-4 border-t border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Contact School</h3>
          <div className="flex flex-wrap items-center gap-2.5">
            {contactName && <span className="text-sm text-gray-600 mr-1">{contactName}</span>}
            {contactPhone && (
              <a
                href={`tel:${contactPhone}`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 transition-colors px-3 py-1.5 rounded-full"
              >
                <PhoneIcon />
                {contactPhone}
              </a>
            )}
            {contactEmail && (
              <a
                href={`mailto:${contactEmail}`}
                className="inline-flex items-center gap-1.5 text-sm text-indigo-600 hover:underline"
              >
                <MailIcon />
                {contactEmail}
              </a>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

// ---------- combined export ----------

export default function SchoolAcademicsAndAdmissions({
  academics = {},
  admissions = null,
  onEnquire,
  schoolPhone,
  schoolEmail,
}) {
  return (
    <div className="space-y-4 md:space-y-5">
      <SchoolAcademics academics={academics} />
      <SchoolAdmissions
        admissions={admissions}
        onEnquire={onEnquire}
        schoolPhone={schoolPhone}
        schoolEmail={schoolEmail}
      />
    </div>
  );
}