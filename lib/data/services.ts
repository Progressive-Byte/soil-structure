import type { Service } from "@/types";
import { read } from "./_client";

const services: Service[] = [
  {
    _id: "65f1b0000000000000000201",
    slug: "structural-design",
    number: "01",
    title: "Structural Design",
    summary: "Reinforced concrete and steel structures for industry, transport and storage.",
    description:
      "Our structural practice covers new build and existing structures across the industrial sector, transport infrastructure and marine works. Design is carried out with both hand calculation and software analysis using StaadPro, Etabs, SAP2000, Safe and RAM Connection.",
    capabilities: [
      "RC Building Structure",
      "Steel Structures",
      "Garments, Bitumen and Cement Factories",
      "Road, Culvert, Bridges",
      "Jetties, Warehouses, Trestle Bridges",
      "RC and Steel Silos, Conveying Structures",
    ],
    image: {
      src: "/images/services/foundation-design.jpg",
      alt: "Civic building with a reinforced concrete and masonry structure",
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
    slug: "geotechnical-design",
    number: "02",
    title: "Geotechnical Design",
    summary: "Ground investigation, earth retention and ground improvement for difficult sites.",
    description:
      "Geotechnical work sits at the centre of our practice. We assess ground conditions, design earth retention and excavation protection, and specify ground improvement where the ground cannot carry the structure as found. Analysis is supported by Plaxis, GeoStru, Slide and Geotechnical Analysis software.",
    capabilities: [
      "Pavement and Embankment Design",
      "Slope Stability Analysis and Design",
      "MSE Wall and Other Retaining Structures",
      "Cofferdam and Cellular Cofferdam",
      "Earth Protection for Excavation Works",
      "Shore Protection System and Diaphragm Wall",
      "Ground Improvement — Stabilised Earth Solution",
      "Vibro-Flotation and Vibro Stone Column",
      "Sand Compaction Pile",
      "Prefabricated Vertical Drains",
      "Deep Soil Mixing",
    ],
    image: {
      src: "/images/services/structural-engineering.jpg",
      alt: "Engineers on site assessing ground conditions",
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
    slug: "water-resources-engineering",
    number: "03",
    title: "Water Resources Engineering",
    summary: "Hydrology, river engineering and water systems for a delta country.",
    description:
      "Bangladesh is shaped by its rivers, and so is much of the engineering it needs. Our water resources team designs river bank protection, hydraulic structures and sluice gates, and models surface and groundwater behaviour using HEC-RAS and related tools.",
    capabilities: [
      "Hydrology and Morphology Study",
      "River Bank Erosion Protection Design",
      "Irrigation Engineering",
      "Surface and Underground Water Modelling",
      "Planning and Design of Water Resources Systems",
      "Hydraulic Structures and Sluice Gates",
      "Water Supply and Distribution Systems",
    ],
    image: {
      src: "/images/services/geotechnical-investigation.jpg",
      alt: "Building entrance and public realm at dusk",
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
    slug: "environmental-engineering",
    number: "04",
    title: "Environmental Engineering",
    summary: "Assessment, treatment and disposal systems that protect the environment we build in.",
    description:
      "We consider the long-term implications for the environment of our project solutions and business practice. Our environmental work spans assessment through to the design of treatment and disposal infrastructure.",
    deliverHeading: "Environmental services",
    capabilities: [
      "Environmental Impact Assessment (EIA)",
      "Waste Water Treatment Plant",
      "Solid Waste Management System",
      "Surface Water Drainage System",
      "Waste Water Disposal System",
      "Water Supply and Sanitation System",
    ],
    image: {
      src: "/images/services/geotechnical-investigation.jpg",
      alt: "Institutional building lit at dusk",
      width: 1200,
      height: 800,
    },
    featured: true,
    order: 4,
    createdAt: "2023-01-01T09:00:00.000Z",
    updatedAt: "2023-01-01T09:00:00.000Z",
  },
  {
    _id: "65f1b0000000000000000205",
    slug: "mechanical-electrical-piping",
    number: "05",
    title: "Mechanical, Electrical & Piping",
    summary: "Building services and process systems, from HVAC to high-voltage distribution.",
    description:
      "Coordinated mechanical, piping and electrical engineering for buildings and industrial process systems.",
    capabilities: [
      "Design of HVAC System",
      "Plumbing Design",
      "Fire Fighting Design",
      "Pump Barge Design",
    ],
    sectionColumns: 2,
    sections: [
      {
        heading: "Mechanical and piping",
        description:
          "Our mechanical team covers building services and industrial process systems, supported by finite element and computational fluid dynamics analysis where the problem warrants it.",
        capabilities: [
          "Design of HVAC System",
          "Plumbing Design",
          "Fire Fighting Design",
          "Pump Barge Design",
          "Pipe Stress Analysis",
          "Finite Element Analysis (FEA)",
          "Process Plant Equipment Layouts",
          "Power and Process System Design",
          "Pipe and Pumping System Analysis",
          "Detail Mechanical and Piping Design",
          "Computational Fluid Dynamics (CFD)",
          "Thermal Power Generation System Design",
          "Water Hammer and Fluid Transient Analysis",
          "3D Modelling, Rendering and Virtual Walk-throughs",
          "ASME Pressure Parts",
          "Pressure Piping Design and Registration",
        ],
      },
      {
        heading: "Electrical engineering",
        description:
          "Electrical design covering layouts, area classification and complete power supply systems for industrial sites.",
        capabilities: [
          "Layouts",
          "Module Design",
          "Area Classification",
          "Power System Studies",
          "Electrical Buildings Design",
          "Low and Medium Voltage Power Distribution",
        ],
      },
    ],
    image: {
      src: "/images/services/structural-engineering.jpg",
      alt: "Industrial building services and plant",
      width: 1200,
      height: 800,
    },
    featured: true,
    order: 5,
    createdAt: "2023-01-01T09:00:00.000Z",
    updatedAt: "2023-01-01T09:00:00.000Z",
  },
  {
    _id: "65f1b0000000000000000206",
    slug: "project-construction-management",
    number: "06",
    title: "Project & Construction Management",
    summary: "From feasibility and procurement through to commissioning and start-up.",
    description:
      "Feasibility, procurement, project engineering and construction management, delivered end to end.",
    capabilities: [
      "Procurement",
      "Project Scheduling",
      "Project Management",
      "Project Cost Estimating",
      "Business Case Development",
      "Feasibility and Strategic Studies",
    ],
    sectionColumns: 2,
    sections: [
      {
        heading: "Project management",
        description:
          "We can join a project at any point in the engineering process — one of the things clients tell us they value most is our ability to adapt to their business needs and information flow.",
        capabilities: [
          "Procurement",
          "Project Scheduling",
          "Project Management",
          "Project Cost Estimating",
          "Business Case Development",
          "Feasibility and Strategic Studies",
        ],
      },
      {
        heading: "Project engineering",
        capabilities: [
          "Water Balances",
          "Opportunity Studies",
          "Process Calculations",
          "Emissions Calculations",
          "Energy Audits and Studies",
          "Steam and Power Balances",
          "Pump and Slurry System Calculations",
        ],
      },
      {
        heading: "Procurement and contracts",
        capabilities: [
          "Expediting",
          "Tender Evaluation",
          "Project Tendering Documentation",
          "Construction Contract Preparation",
          "Equipment Specification and Procurement",
        ],
      },
      {
        heading: "Quality assurance and control",
        capabilities: [
          "Quality Audits",
          "Quality Planning",
          "Inspection and Test Plans",
          "Inspection Program Coordination",
        ],
      },
      {
        heading: "Construction management",
        capabilities: [
          "Construction Management",
          "Construction Field Support",
          "Commissioning and Start-up Support",
          "Turnover",
        ],
      },
    ],
    image: {
      src: "/images/services/seismic-ground-improvement.jpg",
      alt: "Illuminated campus at dusk under active construction management",
      width: 1200,
      height: 800,
    },
    featured: true,
    order: 6,
    createdAt: "2023-01-01T09:00:00.000Z",
    updatedAt: "2023-01-01T09:00:00.000Z",
  },
  {
    _id: "65f1b0000000000000000207",
    slug: "architectural-design",
    number: "07",
    title: "Architectural Design",
    summary: "Buildings drawn around the engineering that holds them up.",
    description:
      "Because architecture and structure sit in the same office, the frame is considered while the plan is still being drawn.",
    capabilities: [
      "Architectural Concept and Schematic Design",
      "Space Planning and Functional Layouts",
      "Design Development and Detailed Drawings",
    ],
    sections: [
      {
        heading: "What we deliver",
        description:
          "Because architecture and structure sit in the same office, the frame is considered while the plan is still being drawn. That removes the round trip that usually costs a project weeks — and it means the building that gets approved is the building that can actually be built.\n\nWe work across industrial, commercial and institutional buildings, taking a scheme from first sketch through to the working drawings a contractor can price and build from.",
        capabilities: [
          "Architectural Concept and Schematic Design",
          "Space Planning and Functional Layouts",
          "Design Development and Detailed Drawings",
          "Site Planning and Master Planning",
          "Facade Design and Building Envelope Detailing",
          "Interior Layout and Finishes Specification",
        ],
      },
      {
        heading: "Documentation and compliance",
        capabilities: [
          "Working Drawings and Construction Documentation",
          "Building Code and Regulatory Compliance Review",
          "Coordination with Structural and MEP Disciplines",
          "Tender and Construction Issue Drawing Sets",
          "3D Modelling, Rendering and Virtual Walk-throughs",
          "As-Built Drawing Preparation",
        ],
      },
    ],
    image: {
      src: "/images/about-campus.jpg",
      alt: "Modern campus building lit at dusk",
      width: 1200,
      height: 800,
    },
    featured: true,
    order: 7,
    createdAt: "2023-01-01T09:00:00.000Z",
    updatedAt: "2023-01-01T09:00:00.000Z",
  },
  {
    _id: "65f1b0000000000000000208",
    slug: "quality-assurance-control",
    number: "08",
    title: "Quality Assurance & Control",
    summary: "Audits, inspection and test plans across every discipline.",
    description:
      "We assure quality across every discipline and stage of a project — planning audits, inspection and test regimes, and coordinating the inspection programme so quality is built in, not checked at the end.",
    capabilities: [
      "Quality Audits",
      "Quality Planning",
      "Inspection and Test Plans",
      "Inspection Programme Coordination",
    ],
    image: {
      src: "/images/services/seismic-ground-improvement.jpg",
      alt: "On-site quality inspection",
      width: 1200,
      height: 800,
    },
    featured: true,
    order: 8,
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

/* -------------------------------------------------------------------------- */
/*  Service areas — the full "twelve service areas" listing (Services page)     */
/* -------------------------------------------------------------------------- */

export interface ServiceArea {
  slug: string;
  title: string;
  capabilities: string[];
}

const serviceAreas: ServiceArea[] = [
  {
    slug: "project-management",
    title: "Project Management",
    capabilities: [
      "Procurement",
      "Project Scheduling",
      "Project Management",
      "Project Cost Estimating",
      "Business Case Development",
      "Feasibility and Strategic Studies",
    ],
  },
  {
    slug: "architectural-design",
    title: "Architectural Design",
    capabilities: [
      "Architectural Concept and Schematic Design",
      "Space Planning and Functional Layouts",
      "Design Development and Detailed Drawings",
      "Industrial and Factory Building Architecture",
      "Facade Design and Building Envelope Detailing",
      "Interior Layout and Finishes Specification",
      "Site Planning and Master Planning",
      "Building Code and Regulatory Compliance Review",
      "Working Drawings and Construction Documentation",
      "3D Modelling, Rendering and Virtual Walk-through",
    ],
  },
  {
    slug: "structural-design",
    title: "Structural Design",
    capabilities: [
      "RC Building Structure",
      "Steel Structures",
      "Garments, Bitumen and Cement Factories",
      "Road, Culvert, Bridges",
      "Trestle Bridges",
      "RC and Steel Silos, Conveying Structures",
    ],
  },
  {
    slug: "geotechnical-design",
    title: "Geotechnical Design",
    capabilities: [
      "Pavement and Embankment Design",
      "Slope Stability Analysis and Design",
      "MSE Wall and Other Retaining Structures",
      "Cofferdam, Cellular Cofferdam",
      "Earth Protection for Excavation Works",
      "Shore Protection System and Diaphragm Wall",
      "Ground Improvement — Stabilised Earth Solution, Vibro-Flotation, Vibro Stone Column, Sand Compaction Pile, Prefabricated Vertical Drains, Deep Soil Mixing",
    ],
  },
  {
    slug: "water-resources-engineering",
    title: "Water Resources Engineering",
    capabilities: [
      "Hydrology and Morphology Study",
      "River Bank Erosion Protection Design",
      "Irrigation Engineering",
      "Surface and Underground Water Modelling",
      "Planning and Design of Water Resources System",
    ],
  },
  {
    slug: "environmental-engineering",
    title: "Environmental Engineering",
    capabilities: [
      "Environmental Impact Assessment (EIA)",
      "Waste Water Treatment Plant",
      "Solid Waste Management System",
      "Surface Water Drainage System",
      "Waste Water Disposal System",
      "Water Supply and Sanitation System",
    ],
  },
  {
    slug: "mechanical-piping-engineering",
    title: "Mechanical / Piping Engineering",
    capabilities: [
      "Design of HVAC System",
      "Plumbing Design",
      "Fire Fighting Design",
      "Pump Barge Design",
      "Pipe Stress Analysis",
      "Finite Element Analysis (FEA)",
      "Process Plant Equipment Layouts",
      "Power and Process System Design",
      "Pipe and Pumping System Analysis",
      "Detail Mechanical and Piping Design",
      "Computational Fluid Dynamics (CFD)",
      "Thermal Power Generation System Design",
      "Water Hammer and Fluid Transient Analysis",
      "3D Modelling, Rendering and Virtual Walk-throughs",
      "ASME Pressure Parts",
      "Pressure Piping Design and Registration",
    ],
  },
  {
    slug: "electrical-engineering",
    title: "Electrical Engineering",
    capabilities: [
      "Layouts",
      "Module Design",
      "Area Classification",
      "Power System Studies",
      "Electrical Buildings Design",
      "Low and Medium Voltage Power Distribution",
    ],
  },
  {
    slug: "project-engineering",
    title: "Project Engineering",
    capabilities: [
      "Water Balances",
      "Opportunity Studies",
      "Process Calculations",
      "Emissions Calculations",
      "Energy Audits and Studies",
      "Steam and Power Balances",
      "Pump and Slurry System Calculations",
    ],
  },
  {
    slug: "procurement-contract-services",
    title: "Procurement and Contract Services",
    capabilities: [
      "Expediting",
      "Tender Evaluation",
      "Project Tendering Documentation",
      "Construction Contract Preparation",
      "Equipment Specification and Procurement",
    ],
  },
  {
    slug: "quality-assurance-control",
    title: "Quality Assurance / Quality Control",
    capabilities: [
      "Quality Audits",
      "Quality Planning",
      "Inspection and Test Plans",
      "Inspection Program Coordination",
    ],
  },
  {
    slug: "construction-management",
    title: "Construction Management",
    capabilities: [
      "Turnover",
      "Construction Management",
      "Construction Field Support",
      "Commissioning and Start-up Support",
    ],
  },
];

/** The full list of twelve service areas shown on the Services page. */
export async function getServiceAreas(): Promise<ServiceArea[]> {
  return read(serviceAreas);
}
