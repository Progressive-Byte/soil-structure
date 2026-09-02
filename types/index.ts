/**
 * Shared domain types for Soil & Structure.
 *
 * Every interface is shaped like a realistic MongoDB document (string `_id`,
 * ISO `createdAt` / `updatedAt`) so that when the Node.js + MongoDB API layer
 * is added, the data-access functions in /lib/data can return these same shapes
 * with zero changes to the components that consume them.
 */

/** Fields shared by every persisted document. */
export interface BaseDocument {
  /** MongoDB ObjectId serialised to a string. */
  _id: string;
  /** ISO 8601 timestamp. */
  createdAt: string;
  /** ISO 8601 timestamp. */
  updatedAt: string;
}

/** A responsive image reference. */
export interface ImageAsset {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

/* -------------------------------------------------------------------------- */
/*  Projects                                                                    */
/* -------------------------------------------------------------------------- */

export type ProjectSector =
  | "Higher Education"
  | "Infrastructure"
  | "Healthcare"
  | "Civic"
  | "Commercial"
  | "Residential";

export interface ProjectStat {
  label: string;
  value: string;
}

export interface Project extends BaseDocument {
  slug: string;
  title: string;
  sector: ProjectSector;
  /** Short one-line summary used on cards. */
  summary: string;
  /** Longer body copy for the detail page. */
  description: string;
  location: string;
  /** Year the project completed (or "Ongoing"). */
  year: string;
  client: string;
  /** Services delivered on this project (matches Service.slug where relevant). */
  services: string[];
  coverImage: ImageAsset;
  gallery: ImageAsset[];
  stats: ProjectStat[];
  /** Surface on the home "Selected work" grid. */
  featured: boolean;
  /** Manual ordering for featured lists (lower = earlier). */
  order: number;
}

/* -------------------------------------------------------------------------- */
/*  Services                                                                    */
/* -------------------------------------------------------------------------- */

export interface Service extends BaseDocument {
  slug: string;
  /** Zero-padded index shown in the design ("01", "02"…). */
  number: string;
  title: string;
  /** One-line summary used on the home services grid. */
  summary: string;
  /** Full description for the service detail page. */
  description: string;
  /** Bullet list of what the service includes. */
  capabilities: string[];
  image: ImageAsset;
  featured: boolean;
  order: number;
}

/* -------------------------------------------------------------------------- */
/*  Testimonials                                                                */
/* -------------------------------------------------------------------------- */

export interface Testimonial extends BaseDocument {
  quote: string;
  authorName: string;
  authorRole: string;
  company: string;
  featured: boolean;
  order: number;
}

/* -------------------------------------------------------------------------- */
/*  Team / Leadership                                                           */
/* -------------------------------------------------------------------------- */

export interface TeamMember extends BaseDocument {
  slug: string;
  name: string;
  role: string;
  /** e.g. "Geotechnical", "Structural", "Leadership". */
  discipline: string;
  bio: string;
  photo?: ImageAsset;
  order: number;
}

/* -------------------------------------------------------------------------- */
/*  Insights (blog / articles)                                                  */
/* -------------------------------------------------------------------------- */

export interface Insight extends BaseDocument {
  slug: string;
  title: string;
  excerpt: string;
  /** Body as plain paragraphs for the static phase. */
  body: string[];
  category: string;
  author: string;
  /** ISO date the article was published. */
  publishedAt: string;
  readingMinutes: number;
  coverImage?: ImageAsset;
}

/* -------------------------------------------------------------------------- */
/*  Careers                                                                     */
/* -------------------------------------------------------------------------- */

export type JobType = "Full-time" | "Part-time" | "Contract" | "Internship";

export interface Job extends BaseDocument {
  slug: string;
  title: string;
  department: string;
  location: string;
  type: JobType;
  summary: string;
  responsibilities: string[];
  requirements: string[];
}

/* -------------------------------------------------------------------------- */
/*  Company stats                                                               */
/* -------------------------------------------------------------------------- */

export interface CompanyStat {
  value: string;
  label: string;
}

/* -------------------------------------------------------------------------- */
/*  Value / process approach                                                    */
/* -------------------------------------------------------------------------- */

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

/* -------------------------------------------------------------------------- */
/*  Site configuration (nav, footer, contact details)                          */
/* -------------------------------------------------------------------------- */

export interface NavLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  heading: string;
  links: NavLink[];
}

export interface SocialLink {
  platform: "linkedin" | "twitter" | "facebook" | "instagram";
  href: string;
  label: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  nav: NavLink[];
  footerColumns: FooterColumn[];
  social: SocialLink[];
  contact: {
    addressLines: string[];
    phone: string;
    email: string;
  };
}

/* -------------------------------------------------------------------------- */
/*  Forms                                                                       */
/* -------------------------------------------------------------------------- */

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  projectType?: string;
  message: string;
}

export interface FormResult {
  ok: boolean;
  message: string;
  /** Field-level validation errors, keyed by field name. */
  errors?: Partial<Record<keyof ContactFormData, string>>;
}
