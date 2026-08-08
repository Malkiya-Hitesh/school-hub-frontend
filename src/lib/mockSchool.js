// Full mock of the RAW API response shape (what `s` looks like before mapSchoolToPageProps runs).
// Deliberately includes edge cases: some fields missing, some 0, timing as object — so you
// can visually verify every "no data" / fallback path at once.

export const mockSchoolResponse = {
  basics: {
    schoolName: "Shri Shivam Vidyalay",
    logo: "https://placehold.co/200x200/6366f1/white?text=SV",
    coverImage: "https://placehold.co/1200x500/4f46e5/white?text=Campus",
    establishedYear: 1998,
  },

  academics: {
    board: ["gseb"],           // ids — must match your BOARDS constant
    medium: ["gujarati", "english"],
    streams: ["science", "commerce"],
    totalStudents: 850,
    totalTeachers: 42,
    studentTeacherRatio: "1:20",
    gradeTo: 12,
    gradeFrom: 1,
    timing: {
      morning: "9:30 AM - 12:30 PM",
      evening: "2:00 PM - 5:00 PM",
    },
    passingRate: 96,
    subjects: ["Mathematics", "Science", "English", "Gujarati", "Social Studies", "Computer"],
    affiliationNumber: "GJ-2021-4487",
    indexNumber: "24.14.008",
  },

  address: {
    full: "Nr. Ring Road, Kothariya Main Road",
    pincode: "360002",
    district: "rajkot",     // id — must match your DISTRICTS constant
    taluka: "rajkot-city",  // id — must match your DISTRICT_TALUKA constant
    state: "Gujarat",
    geo: {
      coordinates: [70.7833, 22.3039], // [longitude, latitude]
    },
  },

  verification: {
    isVerified: true,
  },

  about: {
    tagline: "Nurturing minds, building futures since 1998",
    description:
      "Shri Shivam Vidyalay is a co-educational institution offering GSEB curriculum in Gujarati and English medium, known for strong academics and holistic student development.",
    mission:
      "To provide quality, values-based education that empowers every student to achieve their full potential.",
    principalMessage:
      "We believe every child is unique and deserves an environment where curiosity is encouraged and confidence is built.",
    vision:
      "To be a leading institution recognized for academic excellence and character building in the region.",
  },

  contact: {
    phone: "9876543210",
    email: "info@shivamvidyalay.edu.in",
    website: "https://shivamvidyalay.edu.in",
  },

  admission: {
    isOpen: true,
    process: [
      "Fill the online inquiry form",
      "Visit school for document verification",
      "Entrance interaction (for Class 1 and above)",
      "Fee payment and seat confirmation",
    ],
    eligibility: "Children aged 3 to 18 years, depending on the class applied for.",
    documentsRequired: [
      "Birth certificate",
      "Aadhar card",
      "Passport size photos (4)",
      "Previous school leaving certificate (if applicable)",
    ],
    feeStructurePdfUrl: "",
    adminContact: {
      name: "Mrs. Kavita Joshi",
      phone: "9876500000",
      email: "admissions@shivamvidyalay.edu.in",
    },
  },

  facilities: [
    {
      label: "Science Laboratory",
      description: "Fully equipped physics, chemistry and biology labs",
      imageUrl: "https://placehold.co/400x500/0ea5e9/white?text=Lab",
    },
    {
      label: "Library",
      description: "10,000+ books across all subjects and grade levels",
      imageUrl: "https://placehold.co/400x500/10b981/white?text=Library",
    },
    {
      label: "Sports Ground",
      description: "",
      imageUrl: "https://placehold.co/400x500/f59e0b/white?text=Sports",
    },
    {
    
      label: "Computer Lab",
      description: "30 systems with high-speed internet",
      imageUrl: "",
    },
  ],

  results: [
    {
      classLabel: "10",
      year: "2025",
      stream: null,
      board: "GSEB",
      medium: "Gujarati",
      passingRate: 98,
      appeared: 180,
      passed: 176,
      posterImageUrl: "https://placehold.co/400x500/6366f1/white?text=Class+10+2025",
    },
    {
      classLabel: "12",
      year: "2025",
      stream: "Science",
      board: "GSEB",
      medium: "English",
      passingRate: 91,
      appeared: 95,
      passed: 86,
      posterImageUrl: "https://placehold.co/400x500/8b5cf6/white?text=Class+12+2025",
    },
    {
      // edge case: appeared/passed = 0, no passingRate → should NOT render as a card
      classLabel: "9",
      year: "2024",
      board: "GSEB",
      medium: "Gujarati",
      passingRate: 0,
      appeared: 0,
      passed: 0,
      posterImageUrl: "",
    },
    {
      // edge case: totally empty object → should be filtered out entirely
    },
  ],

  reviews: {
    summary: {
      averageRating: 4.3,
      totalReviews: 128,
      distribution: { 5: 62, 4: 25, 3: 8, 2: 3, 1: 2 },
    },
    items: [
      {
        name: "Ramesh Patel",
        rating: 5,
        date: "2 weeks ago",
        comment: "Great teachers and very disciplined environment. My son loves going to school.",
      },
      {
        name: "Priya Shah",
        rating: 4,
        date: "1 month ago",
        comment: "Good facilities but the school bus timing could be more punctual.",
      },
      {
        // edge case: no comment
        name: "Anonymous",
        rating: 3,
        date: "2 months ago",
        comment: "",
      },
    ],
  },
};