/* Central SEO configuration — single source for metadata, structured
   data and keyword targeting. Imported by layout.jsx, robots.ts,
   sitemap.ts and opengraph-image.jsx. */

import { EMAIL } from "./tokens";

export const SITE_URL = "https://sahilsapariya.me";
export const SITE_NAME = "Sahil Sapariya — Engineer, Product Builder";
export const SITE_SHORT = "Sahil Sapariya";
export const SITE_LOCALE = "en_IN";

export const PERSON = {
  name: "Sahil Sapariya",
  given: "Sahil",
  family: "Sapariya",
  jobTitle: "Software Engineer",
  company: "Jeavio",
  university: "Dharmsinh Desai University",
  universityShort: "DDU",
  location: {
    city: "Vadodara",
    region: "Gujarat",
    country: "India",
    countryCode: "IN",
  },
  email: EMAIL,
  twitterHandle: "@sahil_sapariya",
};

export const DESCRIPTION_SHORT =
  "An engineer who ships systems end to end. Software Engineer at Jeavio, based in Vadodara, India.";

export const DESCRIPTION_LONG =
  "Sahil Sapariya is a full-stack software engineer at Jeavio based in Vadodara, Gujarat, India. He builds production SaaS systems end to end — frontend architecture, backend workflows, deployment. Alumnus of Dharmsinh Desai University (DDU). Selected work includes Nexchool (school management SaaS), Retail-OS (retail platform), and the award-winning College360.";

/* Keywords — targeted variants of the queries we want to rank for.
   Includes name variants, affiliations (DDU, Jeavio), locality
   (Vadodara / Gujarat / India), and role-based searches. */
export const KEYWORDS = [
  // Name variants
  "Sahil Sapariya",
  "Sahil",
  "Sahil Patel",
  "Sahil the coder",
  "Sahil Sapariya portfolio",
  "Sahil Sapariya engineer",
  "Sahil Sapariya developer",
  "Sahil Sapariya software engineer",
  // Affiliations
  "Sahil DDU",
  "Sahil Sapariya DDU",
  "Sahil Jeavio",
  "Sahil Sapariya Jeavio",
  "Dharmsinh Desai University engineer",
  "DDU alumnus",
  "Jeavio engineer",
  // Locality
  "software engineer Vadodara",
  "software engineer Gujarat",
  "software engineer India",
  "full-stack engineer Vadodara",
  "full-stack engineer Gujarat",
  "Next.js engineer India",
  "Python engineer India",
  // Role
  "full-stack developer",
  "product builder",
  "systems engineer",
  "backend engineer",
  "frontend engineer",
  "TypeScript developer",
  "React engineer",
  // Projects (people who know the products may search them)
  "Nexchool",
  "Retail-OS",
  "College360",
  "DUHACKS 2.0",
  "DUHACKS winner",
];

export const SOCIAL_LINKS = [
  "https://github.com/sahilsapariya",
  "https://linkedin.com/in/sahilsapariya",
  "https://twitter.com/sahil_sapariya",
  "https://instagram.com/_sahil_sapariya_03",
];

/* JSON-LD — Person schema. This is the structured data Google uses
   to construct the rich knowledge panel and answer queries like
   "who is sahil sapariya". */
export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PERSON.name,
    givenName: PERSON.given,
    familyName: PERSON.family,
    jobTitle: PERSON.jobTitle,
    url: SITE_URL,
    image: `${SITE_URL}/apple-icon.png`,
    email: `mailto:${PERSON.email}`,
    description: DESCRIPTION_LONG,
    sameAs: SOCIAL_LINKS,
    worksFor: {
      "@type": "Organization",
      name: PERSON.company,
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: PERSON.university,
      alternateName: PERSON.universityShort,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: PERSON.location.city,
      addressRegion: PERSON.location.region,
      addressCountry: PERSON.location.countryCode,
    },
    knowsAbout: [
      "Software Engineering",
      "Full-stack Development",
      "Systems Design",
      "Next.js",
      "React",
      "TypeScript",
      "Python",
      "Django",
      "FastAPI",
      "PostgreSQL",
      "REST APIs",
      "AI-assisted Engineering Workflows",
      "Product Building",
    ],
    nationality: {
      "@type": "Country",
      name: "India",
    },
  };
}

/* JSON-LD — WebSite schema. Tells search engines about the site itself
   and enables sitelinks search box rendering. */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: SITE_URL,
    name: SITE_NAME,
    alternateName: SITE_SHORT,
    description: DESCRIPTION_SHORT,
    inLanguage: "en",
    author: {
      "@type": "Person",
      name: PERSON.name,
      url: SITE_URL,
    },
  };
}
