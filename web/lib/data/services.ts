import type { Service } from "@/types";
import { read } from "./_client";

const services: Service[] = [
  {
    _id: "65f1b0000000000000000201",
    slug: "geotechnical-investigation",
    number: "01",
    title: "Geotechnical Investigation",
    summary: "Site characterisation, boreholes and laboratory testing.",
    description:
      "Placeholder copy. Our geotechnical investigation service builds a reliable ground model from desk study through intrusive site work to laboratory testing. We plan boreholes and in-situ testing around the structure you intend to build, so the data we gather answers the questions the design actually needs. Replace this text with the client's own description.",
    capabilities: [
      "Desk study and site walkover",
      "Cable percussion and rotary boreholes",
      "In-situ testing (SPT, CPT, permeability)",
      "Laboratory soil and rock testing",
      "Ground model and factual/interpretive reporting",
    ],
    image: {
      src: "/images/services/geotechnical-investigation.jpg",
      alt: "Building entrance canopy at dusk representing site investigation work",
      width: 1200,
      height: 800,
    },
    featured: true,
    order: 1,
    createdAt: "2023-01-01T09:00:00.000Z",
    updatedAt: "2023-01-01T09:00:00.000Z",
  },
  {
    _id: "65f1b0000000000000000202",
    slug: "foundation-design",
    number: "02",
    title: "Foundation Design",
    summary: "Shallow and deep systems for difficult ground.",
    description:
      "Placeholder copy. We design foundation systems matched to both the ground and the structure above, from pad and raft footings to piled and hybrid solutions. Because our structural and geotechnical engineers work from a shared model, foundation choices are tested against the frame they carry from the outset. Replace this text with the client's own description.",
    capabilities: [
      "Shallow foundations (pads, strips, rafts)",
      "Deep foundations (bored, CFA and driven piles)",
      "Settlement and bearing-capacity analysis",
      "Underpinning and remediation",
      "Retaining structures and basements",
    ],
    image: {
      src: "/images/services/foundation-design.jpg",
      alt: "Heritage building on a masonry base representing foundation design",
      width: 1200,
      height: 800,
    },
    featured: true,
    order: 2,
    createdAt: "2023-01-01T09:00:00.000Z",
    updatedAt: "2023-01-01T09:00:00.000Z",
  },
  {
    _id: "65f1b0000000000000000203",
    slug: "structural-engineering",
    number: "03",
    title: "Structural Engineering",
    summary: "Framing, analysis and detailing from concept to completion.",
    description:
      "Placeholder copy. Our structural engineering service covers concept framing, analysis and detailed design across concrete, steel, timber and masonry. We stay engaged from first sketch to site, keeping the structure buildable, efficient and coordinated with the foundation solution beneath it. Replace this text with the client's own description.",
    capabilities: [
      "Concept framing and scheme design",
      "Concrete, steel, timber and masonry design",
      "Finite-element and dynamic analysis",
      "Connection and construction detailing",
      "Site support and construction review",
    ],
    image: {
      src: "/images/services/structural-engineering.jpg",
      alt: "Two engineers in hard hats reviewing drawings inside a steel-framed hall",
      width: 1200,
      height: 800,
    },
    featured: true,
    order: 3,
    createdAt: "2023-01-01T09:00:00.000Z",
    updatedAt: "2023-01-01T09:00:00.000Z",
  },
  {
    _id: "65f1b0000000000000000204",
    slug: "seismic-ground-improvement",
    number: "04",
    title: "Seismic & Ground Improvement",
    summary: "Risk assessment, mitigation and ground treatment.",
    description:
      "Placeholder copy. We assess seismic and ground-related risk and design the treatment that manages it, from liquefaction mitigation to settlement control. Ground improvement is developed alongside the structural scheme so the two work together rather than compensating for one another. Replace this text with the client's own description.",
    capabilities: [
      "Seismic hazard and site-response assessment",
      "Liquefaction assessment and mitigation",
      "Vibro stone columns and dynamic compaction",
      "Grouting and soil mixing",
      "Settlement monitoring and instrumentation",
    ],
    image: {
      src: "/images/services/seismic-ground-improvement.jpg",
      alt: "Illuminated campus courtyard at dusk representing ground improvement work",
      width: 1200,
      height: 800,
    },
    featured: true,
    order: 4,
    createdAt: "2023-01-01T09:00:00.000Z",
    updatedAt: "2023-01-01T09:00:00.000Z",
  },
];

/** All services, ordered by their `order` field. */
export async function getServices(): Promise<Service[]> {
  const all = await read(services);
  return all.sort((a, b) => a.order - b.order);
}

/** Featured services for the home grid. */
export async function getFeaturedServices(): Promise<Service[]> {
  const all = await getServices();
  return all.filter((s) => s.featured);
}

/** A single service by slug, or null if not found. */
export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const all = await getServices();
  return all.find((s) => s.slug === slug) ?? null;
}
