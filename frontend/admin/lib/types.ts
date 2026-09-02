// Mirrors the shape server/models/Project.js returns. Kept local to admin/
// since it's a fully separate app from web/ (see web/types/index.ts for the
// canonical version the public site uses).
export interface ImageAsset {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface ProjectStat {
  label: string;
  value: string;
}

export interface Project {
  _id: string;
  slug: string;
  title: string;
  sector: string;
  summary: string;
  description: string;
  location: string;
  year: string;
  client: string;
  services: string[];
  coverImage: ImageAsset;
  gallery: ImageAsset[];
  stats: ProjectStat[];
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  pages: number;
  hasPrev: boolean;
  hasNext: boolean;
}
