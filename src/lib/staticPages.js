export const SITE_NAME = "SchoolHub";
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
export const LEGAL_LAST_UPDATED = process.env.NEXT_PUBLIC_LEGAL_LAST_UPDATED || "September 19, 2026";

export function makeMetadata(page) {
  const canonical = `${SITE_URL}${page.href}`;

  return {
    title: page.seoTitle,
    description: page.description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: page.seoTitle,
      description: page.description,
      url: canonical,
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: page.seoTitle,
      description: page.description,
    },
  };
}

export const footerGroups = [
  {
    heading: "Platform",
    links: [
      { label: "About", href: "/about" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "For Parents", href: "/for-parents" },
      { label: "For Students", href: "/for-students" },
      { label: "For Schools", href: "/for-schools" },
      { label: "Claim School", href: "/claim-school" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Help", href: "/help" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
      { label: "Feedback", href: "/feedback" },
      { label: "Report School", href: "/report-school" },
      { label: "Safety", href: "/safety" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookie-policy" },
      { label: "Disclaimer", href: "/disclaimer" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "School Guides", href: "/school-guides" },
      { label: "Education Resources", href: "/education-resources" },
      { label: "Sitemap", href: "/sitemap" },
    ],
  },
];

export const sitemapGroups = [
  {
    heading: "Main",
    links: [
      { label: "Home", href: "/" },
      { label: "Find Schools", href: "/schools" },
      ...footerGroups[0].links,
    ],
  },
  ...footerGroups.slice(1),
  {
    heading: "Accounts",
    links: [
      { label: "Student / Parent Login", href: "/login" },
      { label: "School Login", href: "/auth/login" },
      { label: "Student Registration", href: "/register/students" },
      { label: "Parent Registration", href: "/register/parents" },
    ],
  },
];

const ctaExplore = [
  { label: "Explore Schools", href: "/schools", variant: "primary" },
  { label: "List / Claim Your School", href: "/claim-school", variant: "secondary" },
];

export const staticPages = {
  about: {
    href: "/about",
    seoTitle: "SchoolHub | About Us",
    title: "About SchoolHub",
    eyebrow: "School discovery for Gujarat",
    description:
      "Learn how SchoolHub helps families find useful school information and helps schools keep their profiles accurate.",
    actions: ctaExplore,
    sections: [
      {
        title: "What SchoolHub Is",
        body: [
          "SchoolHub is a school discovery and information platform focused on Gujarat. It helps parents, students, and school teams explore school profiles, compare available information, and make more informed conversations before contacting a school.",
          "The platform is built around practical school information: location, classes, medium, management type, facilities, contact details, admission-related details where available, reviews, and profile updates from school representatives.",
        ],
      },
      {
        title: "The Problem We Solve",
        body: [
          "School information is often scattered across official records, school websites, social pages, word of mouth, and old listings. Families may need to check multiple places just to understand whether a school is nearby, what classes it offers, or how to contact it.",
          "SchoolHub brings this information into one searchable experience so families can start with a clearer shortlist and then verify important details directly with the school.",
        ],
      },
      {
        title: "How SchoolHub Helps",
        cards: [
          {
            title: "Search and filter schools",
            text: "Browse schools by location, medium, type, category, classes, and other useful filters.",
          },
          {
            title: "Review school profiles",
            text: "Understand available academic, facility, contact, location, and admission information in one place.",
          },
          {
            title: "Support school updates",
            text: "School administrators can claim profiles and help maintain more accurate information for families.",
          },
        ],
      },
    ],
    cta: {
      title: "Start with a clearer school shortlist",
      text: "Explore schools across Gujarat or begin the claim process for your school profile.",
      actions: ctaExplore,
    },
  },

  "how-it-works": {
    href: "/how-it-works",
    seoTitle: "SchoolHub | How It Works",
    title: "How SchoolHub Works",
    eyebrow: "A simple school discovery journey",
    description:
      "Search, filter, compare, and contact schools with a practical workflow designed for parents and students.",
    actions: [{ label: "Find Schools", href: "/schools", variant: "primary" }],
    sections: [
      {
        title: "From search to enquiry",
        orderedCards: [
          { title: "Search for a school", text: "Start with a school name, area, district, or keyword." },
          { title: "Filter your options", text: "Narrow results by location, medium, type, category, classes, and facilities." },
          { title: "Open a school profile", text: "Read available details about academics, facilities, contact information, and location." },
          { title: "Compare schools", text: "Use profile information to build a practical shortlist for your family." },
          { title: "Read available reviews", text: "Review user-submitted feedback carefully and verify important points directly." },
          { title: "Contact or enquire", text: "Use listed contact information or enquiry options where available." },
          { title: "Report incorrect details", text: "Tell SchoolHub when information appears outdated, duplicated, or inaccurate." },
        ],
      },
    ],
  },

  "for-schools": {
    href: "/for-schools",
    seoTitle: "SchoolHub for Schools",
    title: "SchoolHub for Schools",
    eyebrow: "Keep your school information useful",
    description:
      "Claim and manage your school profile so parents and students can find clearer, more current information.",
    actions: [{ label: "Claim Your School", href: "/claim-school", variant: "primary" }],
    sections: [
      {
        title: "What schools can do",
        cards: [
          { title: "Manage core information", text: "Keep school name, address, contact details, classes, medium, and category information easier to review." },
          { title: "Improve discoverability", text: "Help families find your school when they search by district, location, facilities, or school type." },
          { title: "Add helpful profile details", text: "Share available facilities, academic information, media, and admission contact details where applicable." },
          { title: "Receive enquiries", text: "Make it easier for interested families to contact the right school team." },
          { title: "Review profile activity", text: "Use available dashboard information to understand and maintain your profile over time." },
        ],
      },
    ],
    cta: {
      title: "Ready to manage your school profile?",
      text: "Start the claim process and submit the required information for review.",
      actions: [{ label: "Claim Your School", href: "/claim-school", variant: "primary" }],
    },
  },

  "for-parents": {
    href: "/for-parents",
    seoTitle: "SchoolHub for Parents",
    title: "SchoolHub for Parents",
    eyebrow: "Find school information with less guesswork",
    description:
      "Use SchoolHub to discover schools, compare options, and prepare better questions before contacting a school.",
    actions: [{ label: "Find Schools", href: "/schools", variant: "primary" }],
    sections: [
      {
        title: "How parents can use SchoolHub",
        cards: [
          { title: "Discover nearby schools", text: "Search by district, village, area, or school name to begin your shortlist." },
          { title: "Filter by what matters", text: "Use filters for medium, classes, school type, management, facilities, and more." },
          { title: "Compare practical details", text: "Review location, contact information, academics, facilities, and admission details where available." },
          { title: "Contact schools directly", text: "Verify important information and admission timelines directly with the school." },
          { title: "Report incorrect information", text: "Help improve SchoolHub by flagging outdated or inaccurate listings." },
        ],
      },
    ],
  },

  "for-students": {
    href: "/for-students",
    seoTitle: "SchoolHub for Students",
    title: "SchoolHub for Students",
    eyebrow: "Explore schools and learning options",
    description:
      "Students can use SchoolHub to understand available school information, facilities, streams where provided, and contact details.",
    actions: [{ label: "Explore Schools", href: "/schools", variant: "primary" }],
    sections: [
      {
        title: "What students can explore",
        cards: [
          { title: "School profiles", text: "Review basic school details, location, contact information, and classes." },
          { title: "Facilities and academics", text: "Check available facilities, academic information, and streams where schools provide them." },
          { title: "Compare options", text: "Understand differences between schools before discussing choices with parents or guardians." },
          { title: "Find contact details", text: "Use available phone, email, or website details to contact the school directly." },
        ],
      },
    ],
  },

  "claim-school": {
    href: "/claim-school",
    seoTitle: "Claim Your School Profile | SchoolHub",
    title: "Claim Your School Profile",
    eyebrow: "For school owners and administrators",
    description:
      "Learn how the SchoolHub claim process works before submitting your school profile claim for review.",
    actions: [{ label: "Start Claim Process", href: "/claim", variant: "primary" }],
    sections: [
      {
        title: "Claim process",
        orderedCards: [
          { title: "Find your school", text: "Search for your school using the available claim search flow." },
          { title: "Start the claim", text: "Select the correct school profile and provide your contact details." },
          { title: "Submit required information", text: "Share the information requested in the claim form so the request can be reviewed." },
          { title: "Verification and review", text: "SchoolHub reviews the request before enabling profile management access." },
          { title: "Manage approved information", text: "After approval, update school details through the available dashboard tools." },
        ],
      },
    ],
    cta: {
      title: "Use the existing claim workflow",
      text: "The claim form is already available in SchoolHub. Make sure you are using details connected to the school.",
      actions: [{ label: "Start Claim Process", href: "/claim", variant: "primary" }],
    },
  },

  help: {
    href: "/help",
    seoTitle: "SchoolHub Help Center",
    title: "Help Center",
    eyebrow: "Support for families and schools",
    description:
      "Find help topics for accounts, school search, school profiles, reviews, claims, reports, and technical problems.",
    sections: [
      {
        title: "Popular help topics",
        cards: [
          { title: "Account help", text: "Get help with login, registration, and account access.", href: "/login" },
          { title: "School search", text: "Learn how to search and filter schools across Gujarat.", href: "/how-it-works" },
          { title: "School profiles", text: "Understand profile details and how to verify important information.", href: "/school-guides" },
          { title: "Reviews", text: "Learn how reviews are handled and how to report concerns.", href: "/faq" },
          { title: "School claims", text: "Start or understand the school profile claim process.", href: "/claim-school" },
          { title: "Report incorrect information", text: "Flag wrong contact details, duplicate listings, or outdated information.", href: "/report-school" },
          { title: "Technical problems", text: "Contact SchoolHub if something on the website is not working as expected.", href: "/contact" },
        ],
      },
    ],
  },

  safety: {
    href: "/safety",
    seoTitle: "SchoolHub Safety and Trust",
    title: "Safety and Trust",
    eyebrow: "Responsible use of SchoolHub",
    description:
      "Learn how to report concerns, protect account information, and use SchoolHub responsibly.",
    sections: [
      {
        title: "Trust and safety principles",
        cards: [
          { title: "Report inappropriate content", text: "Use reporting options when content appears abusive, misleading, irrelevant, or unsafe." },
          { title: "Report incorrect information", text: "Flag school details that may be outdated, duplicated, or inaccurate." },
          { title: "Review moderation", text: "Reviews and reports may be assessed for relevance, abuse, spam, and platform misuse." },
          { title: "Protect your account", text: "Use a secure email and password, and avoid sharing access with unauthorized people." },
          { title: "Responsible use", text: "Use SchoolHub to support informed research, then verify important decisions directly with schools." },
        ],
      },
    ],
    cta: {
      title: "Need to report a safety concern?",
      text: "Use the reporting form or contact SchoolHub with details about the issue.",
      actions: [
        { label: "Report School", href: "/report-school", variant: "primary" },
        { label: "Contact Support", href: "/contact", variant: "secondary" },
      ],
    },
  },

  "education-resources": {
    href: "/education-resources",
    seoTitle: "Education Resources | SchoolHub",
    title: "Education Resources",
    eyebrow: "Guides and learning resources",
    description:
      "Explore practical resources for parents, students, and schools. This hub is structured to connect with future SchoolHub articles.",
    sections: [
      {
        title: "Resource collections",
        cards: [
          { title: "School selection guides", text: "Step-by-step guidance for building and evaluating a school shortlist.", href: "/school-guides" },
          { title: "Parent guides", text: "Practical questions parents can ask before admission or school visits.", href: "/school-guides" },
          { title: "Student resources", text: "Information to help students understand school options and available facilities." },
          { title: "School technology guides", text: "Ideas for schools that want to maintain stronger digital profiles and communication." },
          { title: "Education articles", text: "A future home for SchoolHub articles and updates when the blog system is added." },
        ],
      },
    ],
  },

  "school-guides": {
    href: "/school-guides",
    seoTitle: "School Discovery Guides | SchoolHub",
    title: "School Discovery Guides",
    eyebrow: "Helpful school research checklists",
    description:
      "Use these informational guides to compare schools, ask better questions, and verify important details before admission decisions.",
    sections: [
      {
        title: "Guides for school research",
        cards: [
          { title: "How to choose a school", text: "Start with distance, classes, medium, fees, learning needs, safety, and daily travel practicality." },
          { title: "Questions parents should ask", text: "Ask about admission timelines, class strength, transport, facilities, communication, and fee structure." },
          { title: "How to compare schools", text: "Compare facts consistently instead of relying only on popularity or one review." },
          { title: "Understanding school boards", text: "Check which board or curriculum applies and confirm details directly with the school." },
          { title: "Understanding facilities", text: "Look for relevant facilities and whether they are actively available to students." },
          { title: "Before admission", text: "Verify documents, fees, timings, transport, contact persons, and important dates." },
          { title: "Verify school information", text: "Use SchoolHub as a starting point and confirm critical information with official school sources." },
        ],
      },
    ],
  },
};

export const legalPages = {
  terms: {
    href: "/terms",
    seoTitle: "SchoolHub Terms of Service",
    title: "Terms of Service",
    description:
      "Read the terms that explain how users, schools, and visitors may use SchoolHub.",
    lastUpdated: LEGAL_LAST_UPDATED,
    sections: [
      { title: "Introduction", body: ["These Terms of Service describe the general rules for using SchoolHub. By using the platform, you agree to use it responsibly and in accordance with these terms. These terms should be reviewed by a legal professional before being treated as final legal advice."] },
      { title: "Eligibility", body: ["SchoolHub may be used by parents, students, school representatives, and general visitors. If you use SchoolHub on behalf of a school or organization, you should have appropriate authority to submit or update information."] },
      { title: "Using SchoolHub", body: ["You may use SchoolHub to search for schools, review school information, submit enquiries where available, share feedback, report corrections, and access account features. You are responsible for the accuracy of information you submit."] },
      { title: "School Listings", body: ["School listings may include information provided by schools, information collected from public or official sources, and updates submitted through SchoolHub tools. Listings are informational and should be verified directly with the school for important decisions."] },
      { title: "User Accounts", body: ["Some features may require an account. You are responsible for keeping account credentials secure and for activity that occurs through your account. SchoolHub may restrict access where misuse, inaccurate submissions, or security concerns are identified."] },
      { title: "Reviews and User Content", body: ["Users may submit reviews, reports, feedback, or other content where features are available. User-generated content should be honest, relevant, lawful, and respectful. SchoolHub may review, remove, or restrict content that appears abusive, misleading, spammy, or unrelated."] },
      { title: "School Claims and Verification", body: ["A school claim request does not automatically grant profile access. SchoolHub may request information to review whether the requester appears connected to the school. Approval, rejection, or additional review may depend on the information available."] },
      { title: "Accuracy of Information", body: ["SchoolHub works to present useful information, but school details can change and may come from multiple sources. SchoolHub does not guarantee that every listing, review, contact detail, admission detail, or facility description is complete or current."] },
      { title: "Third-Party Links", body: ["School profiles may include links to school websites, maps, social pages, or other third-party services. SchoolHub is not responsible for content, policies, or availability of third-party websites or services."] },
      { title: "Intellectual Property", body: ["SchoolHub branding, page design, software, and original platform content are protected by applicable intellectual property rights. School names, logos, and materials submitted by schools remain associated with their respective owners."] },
      { title: "Prohibited Activities", body: ["Do not misuse SchoolHub, attempt unauthorized access, submit false information, scrape data in a way that harms the service, upload harmful content, impersonate a school or person, or use the platform for unlawful activity."] },
      { title: "Platform Availability", body: ["SchoolHub may change, pause, or discontinue features as the platform evolves. Availability may be affected by maintenance, technical issues, third-party services, or other operational reasons."] },
      { title: "Limitation of Liability", body: ["SchoolHub provides information services and does not guarantee admission, school quality, recognition status, academic results, safety, reviews, or the accuracy of every user submission. Users should verify important information directly with schools and relevant authorities where needed."] },
      { title: "Changes to Terms", body: ["SchoolHub may update these terms from time to time. The latest version will be posted on this page with the applicable last updated date."] },
      { title: "Contact Information", body: ["Questions about these terms can be sent through the SchoolHub contact page."] },
    ],
  },
  privacy: {
    href: "/privacy",
    seoTitle: "SchoolHub Privacy Policy",
    title: "Privacy Policy",
    description:
      "Learn what information SchoolHub may collect and how it may be used to operate school discovery, profiles, accounts, and support features.",
    lastUpdated: LEGAL_LAST_UPDATED,
    sections: [
      { title: "Information Collected", body: ["SchoolHub may collect information you provide directly, information connected to school profiles, and basic technical information needed to operate and improve the platform."] },
      { title: "Account Information", body: ["When accounts are available, SchoolHub may collect name, email, phone number, role, authentication details, and related profile information."] },
      { title: "School and Administrator Information", body: ["Schools or representatives may submit school details, contact information, documents or identifiers for claim review, profile updates, media links, and admission-related information."] },
      { title: "Contact Forms and Support", body: ["If you contact SchoolHub, submit feedback, or report an issue, the platform may collect your name, email, phone number, subject, category, message, and related details needed to respond."] },
      { title: "Reviews and User-Generated Content", body: ["Reviews, reports, and other user-generated content may be stored and displayed or reviewed depending on the feature. Avoid sharing sensitive personal information in public content."] },
      { title: "Device and Browser Information", body: ["SchoolHub may collect basic technical information such as browser type, device information, IP address, pages visited, timestamps, and error information for security, analytics, and performance."] },
      { title: "Analytics and Cookies", body: ["SchoolHub may use analytics and cookies to understand usage, remember preferences, support sessions, and improve the website. More details are available in the Cookie Policy."] },
      { title: "How Information Is Used", body: ["Information may be used to operate accounts, show school profiles, process claims, respond to enquiries, improve search and filters, detect misuse, fix bugs, and communicate about support or platform features."] },
      { title: "Data Sharing", body: ["SchoolHub may share information with service providers that help operate hosting, analytics, cloud storage, email, maps, authentication, or security. SchoolHub does not need to sell personal information to provide the core school discovery experience."] },
      { title: "Third-Party Services", body: ["The platform may rely on third-party services such as hosting, analytics, maps, media storage, and authentication. Those services may process information under their own policies."] },
      { title: "Data Security", body: ["SchoolHub should use reasonable technical and organizational safeguards, but no online system can be guaranteed fully secure. Users should protect their own account credentials and report suspicious activity."] },
      { title: "Data Retention", body: ["Information may be retained for as long as needed to operate the service, maintain school records, resolve disputes, improve data quality, comply with legal obligations, or support legitimate platform needs."] },
      { title: "User Rights", body: ["Depending on applicable law and account features, users may request access, correction, or deletion of certain personal information by contacting SchoolHub. Requests may need verification."] },
      { title: "Children's Privacy", body: ["SchoolHub is intended to help families research schools. Children and students should use the platform with parent or guardian guidance when sharing personal information."] },
      { title: "Changes to This Policy", body: ["This Privacy Policy may be updated as SchoolHub features evolve. Material updates should be reflected on this page with a new last updated date."] },
      { title: "Contact Information", body: ["Privacy questions can be sent through the SchoolHub contact page."] },
    ],
  },
  "cookie-policy": {
    href: "/cookie-policy",
    seoTitle: "SchoolHub Cookie Policy",
    title: "Cookie Policy",
    description:
      "Understand how SchoolHub may use cookies for sessions, preferences, analytics, and third-party services.",
    lastUpdated: LEGAL_LAST_UPDATED,
    sections: [
      { title: "What Cookies Are", body: ["Cookies are small files stored by your browser. Similar technologies may also be used to remember settings, support login sessions, understand site usage, and improve performance."] },
      { title: "Necessary Cookies", body: ["Necessary cookies help the website load, keep forms secure, support navigation, and provide features that users request. Some parts of SchoolHub may not work properly without them."] },
      { title: "Authentication and Session Cookies", body: ["When accounts are used, cookies or similar storage may help keep users signed in and protect session activity."] },
      { title: "Analytics Cookies", body: ["Analytics cookies may help SchoolHub understand which pages are visited, how users move through the site, and where technical improvements are needed."] },
      { title: "Preferences", body: ["Preference cookies may remember settings such as display choices or other user preferences where those features exist."] },
      { title: "Third-Party Cookies", body: ["Third-party services, such as maps, analytics, media, or authentication providers, may set cookies under their own policies when their services are used."] },
      { title: "Controlling Cookies", body: ["You can control cookies through your browser settings. Blocking some cookies may affect login, saved preferences, analytics accuracy, or other website features."] },
    ],
  },
  disclaimer: {
    href: "/disclaimer",
    seoTitle: "SchoolHub Disclaimer",
    title: "Disclaimer",
    description:
      "Read important disclaimers about school information, reviews, admission decisions, and third-party links on SchoolHub.",
    lastUpdated: LEGAL_LAST_UPDATED,
    sections: [
      { title: "Information Sources", body: ["School information on SchoolHub may come from schools, users, public sources, official sources, and platform updates. These sources can vary by listing."] },
      { title: "Information Can Change", body: ["School details, facilities, contact information, admission timelines, fees, staff details, and policies can change. Users should verify important information directly with the school."] },
      { title: "No Admission Guarantee", body: ["SchoolHub does not guarantee admission to any school. Admission decisions, eligibility, fees, documents, and timelines are controlled by the relevant school or authority."] },
      { title: "No Quality Guarantee", body: ["SchoolHub does not guarantee school quality, academic results, safety, recognition status, or suitability for a particular student. Families should conduct their own research."] },
      { title: "Reviews and User Content", body: ["Reviews and user-generated content reflect individual submissions and may not represent the full experience of every student or parent. SchoolHub does not guarantee the accuracy of every review."] },
      { title: "Third-Party Links and Services", body: ["Links to school websites, maps, social pages, payment services, or other external resources are outside SchoolHub's control. Users should review third-party terms and policies."] },
    ],
  },
};

export const faqGroups = [
  {
    title: "General",
    items: [
      { question: "What is SchoolHub?", answer: "SchoolHub is a Gujarat-focused school discovery platform that helps families search, filter, and review available school information in one place." },
      { question: "Who can use SchoolHub?", answer: "Parents, students, school administrators, and anyone researching schools in Gujarat can use SchoolHub." },
      { question: "How can I search for a school?", answer: "You can search by school name, location, district, village, medium, school type, classes, facilities, and other available filters." },
      { question: "Is SchoolHub free?", answer: "Core school discovery pages are intended to be accessible to users. Some account or school management features may evolve over time." },
    ],
  },
  {
    title: "Parents and Students",
    items: [
      { question: "How can I compare schools?", answer: "Use school profiles to compare location, classes, medium, facilities, contact details, and other available information. Always verify important details directly with schools." },
      { question: "How can I contact a school?", answer: "Use the phone, email, website, or enquiry information shown on the school profile where available." },
      { question: "How can I report incorrect information?", answer: "Use the Report School page to flag wrong contact details, duplicate listings, incorrect location, closed schools, or other issues." },
    ],
  },
  {
    title: "Schools",
    items: [
      { question: "How can a school claim its profile?", answer: "Visit the Claim School page and follow the claim workflow to find your school and submit the required information for review." },
      { question: "Can a school update its information?", answer: "Approved school administrators can use available dashboard tools to update profile information." },
      { question: "What happens after submitting a claim?", answer: "The request is reviewed. SchoolHub may approve, reject, or request more information based on the submitted details." },
    ],
  },
  {
    title: "Reviews",
    items: [
      { question: "How do reviews work?", answer: "Reviews are user-submitted content intended to share relevant experiences. They should be honest, respectful, and useful." },
      { question: "Can I report a review?", answer: "Yes. Reviews that appear abusive, spammy, misleading, or unrelated can be reported for review." },
      { question: "Can school information be corrected?", answer: "Yes. Schools and users can report incorrect information, and approved school representatives may update profile details." },
    ],
  },
  {
    title: "Data",
    items: [
      { question: "Where does SchoolHub get school information?", answer: "School information may come from schools, public or official sources, users, and platform updates. Source availability can differ by listing." },
      { question: "How can incorrect information be corrected?", answer: "Use the report form or claim process. Important changes may require review before they are reflected publicly." },
    ],
  },
];
