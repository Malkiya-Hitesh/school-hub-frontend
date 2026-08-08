import { BOARDS, DISTRICT_TALUKA, DISTRICTS, MEDIUMS, STREAMS, getLabel } from "@/lib/constants";
import { safeArray, safeJoin } from "@/lib/schoolUtils";



export function mapSchoolToPageProps(s) {
  if (!s) return null;

  const boardLabels = safeArray(s?.academics?.board).map((m) => getLabel(BOARDS, m));
  const mediumLabels = safeArray(s?.academics?.medium).map((m) => getLabel(MEDIUMS, m));
  const streamLabels = safeArray(s?.academics?.streams).map((m) => getLabel(STREAMS, m));

  const district = s?.address?.district ? DISTRICTS?.[s.address.district] : null;
  const taluka =
    s?.address?.district && s?.address?.taluka
      ? DISTRICT_TALUKA?.[s.address.district]?.[s.address.taluka]
      : null;

  const hero = {
    name: s?.basics?.schoolName || "Unnamed School",
    logoUrl: s?.basics?.logo ?? null,
    coverImageUrl: s?.basics?.coverImage ?? s?.basics?.logo ?? null,
    board: boardLabels,
    medium: mediumLabels,
    district,
    taluka,
    verified: Boolean(s?.verification?.isVerified),
  };

  const about = {
    tagline: s?.about?.tagline,
    description: s?.about?.description,
    mission: s?.about?.mission,
    principalMessage: s?.about?.principalMessage,
    vision: s?.about?.vision,
    establishedYear: s?.basics?.establishedYear,
    address: safeJoin([s?.address?.full, s?.address?.pincode]),
    phone: s?.contact?.phone,
    email: s?.contact?.email,
    website: s?.contact?.website,
  };

  const academicsAdmissions = {
    board: boardLabels,
    medium: mediumLabels,
    stream: streamLabels,
    classToFrom :`${ s?.academics?.gradeFrom} to ${s?.academics?.gradeTo}`,
    totalStudents: s?.academics?.totalStudents,
    totalTeachers: s?.academics?.totalTeachers,
    ratio: s?.academics?.studentTeacherRatio,
    timing: s?.academics?.timing,
    passingRate: s?.academics?.passingRate,
    subjects: safeArray(s?.academics?.subjects),
    affiliationNumber: s?.academics?.affiliationNumber,
    indexNumber: s?.academics?.indexNumber,
  };

  const admissions = s?.admission
    ? {
        admissionsOpen: Boolean(s.admission.isOpen),
        process: safeArray(s.admission.process),
        eligibility:safeArray(s.admission.eligibility),
        documentsRequired: safeArray(s.admission.documentsRequired),
        feeStructurePdfUrl: s.admission.feeStructurePdfUrl,
        adminContact: s.admission.adminContact ||s?.contact || [],
      }
    : null;

  const map = {
    address: s?.address?.full,
    city: safeJoin([district, s?.address?.state]),
    pincode: s?.address?.pincode,
    latitude: s?.address?.geo?.coordinates?.[1] ?? null,
    longitude: s?.address?.geo?.coordinates?.[0] ?? null,
  };

 
  const facilities = safeArray(s?.facilities);
  const results = safeArray(s?.results);

  const reviews = s?.reviews
    ? {
        summary: s.reviews.summary ?? {},
        items: safeArray(s.reviews.items),
      }
    : null;

  return { hero, about, academicsAdmissions, admissions, map, facilities, results, reviews };
}