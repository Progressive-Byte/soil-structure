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

/** Sectors are admin-defined free text now (managed via the Projects admin
 * panel), not a fixed set — see server/models/Project.js. */
export type ProjectSector = string;

/** Fixed two-value lifecycle — mirrors the enum in server/models/Project.js. */
export type ProjectStatus = "ongoing" | "completed";

export interface ProjectStat {
  label: string;
  value: string;
}

export interface Project extends BaseDocument {
  slug: string;
  title: string;
  sector: ProjectSector;
  status: ProjectStatus;
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

/** A grouped block of capabilities on a service detail page. */
export interface ServiceSection {
  heading: string;
  description?: string;
  capabilities: string[];
}

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
  /** Heading for the single "what we deliver" block (defaults to "What we deliver"). */
  deliverHeading?: string;
  /** Multiple grouped capability sections (used by consolidated services). */
  sections?: ServiceSection[];
  /** Force capability columns for this service's sections (e.g. 2 for MEP/PCM). */
  sectionColumns?: number;
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
  education: string;
  professionalMembership: string;
  /** e.g. "Geotechnical", "Structural", "Leadership". */
  discipline: string;
  bio: string;
  /** Longer biography paragraphs for the Team page. */
  bioParagraphs?: string[];
  /** Software / skill tags shown on the Team page. */
  skills?: string[];
  photo?: ImageAsset;
  order: number;
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
  /** Optional submenu rendered as a dropdown in the header. */
  children?: NavLink[];
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
  phone?: string;
  projectType?: string;
  message: string;
}

export interface FormResult {
  ok: boolean;
  message: string;
  /** Field-level validation errors, keyed by field name. */
  errors?: Partial<Record<keyof ContactFormData, string>>;
}

/* -------------------------------------------------------------------------- */
/*  Pagination                                                                  */
/* -------------------------------------------------------------------------- */

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  pages: number;
  hasPrev: boolean;
  hasNext: boolean;
}
