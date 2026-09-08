// Seeds sample projects through the admin API (see CONTINUE_HERE.md §4).
// Requires the API running and a reachable database:  node scripts/seed.js
const BASE = process.env.SEED_API_URL || "http://localhost:4000/api";

const projects = [
  {
    slug: "matarbari-road-project",
    title: "Ground Improvement at Matarbari Road Project",
    sector: "Infrastructure",
    summary: "Ground improvement works for the Matarbari road scheme.",
    description:
      "Ground improvement works carried out on the Matarbari road scheme, applying stabilised earth solutions and vertical drainage across soft coastal deposits.",
    client: "Roads and Highways Department (RHD)",
    coverImage: {
      src: "/images/projects/matarbari-road-project.jpg",
      alt: "Engineers on the Matarbari road project",
    },
    featured: true,
    order: 1,
  },
  {
    slug: "northgate-transit-interchange",
    title: "Northgate Transit Interchange",
    sector: "Transport",
    summary: "Deep foundation design for a multi-modal transit interchange.",
    description:
      "Piled foundation design and settlement analysis for a multi-modal interchange built over variable made ground, coordinated with the structural and rail teams.",
    client: "Northgate Transport Authority",
    coverImage: {
      src: "/images/projects/northgate-transit-interchange.jpg",
      alt: "Concourse of the Northgate transit interchange",
    },
    featured: true,
    order: 2,
  },
  {
    slug: "meadowview-regional-hospital",
    title: "Meadowview Regional Hospital",
    sector: "Healthcare",
    summary: "Site investigation and raft design for a new acute care wing.",
    description:
      "Full ground investigation, foundation options appraisal and raft design for a new acute care wing, including vibration limits for sensitive imaging equipment.",
    client: "Meadowview Health Trust",
    coverImage: {
      src: "/images/projects/meadowview-regional-hospital.jpg",
      alt: "Exterior of Meadowview Regional Hospital",
    },
    featured: false,
    order: 3,
  },
  {
    slug: "riverbend-campus-science-block",
    title: "Riverbend Campus Science Block",
    sector: "Education",
    summary: "Structural design of a four-storey teaching and laboratory block.",
    description:
      "Structural design of a four-storey teaching and laboratory block on a constrained riverside campus, with basement retaining walls designed against flood loading.",
    client: "Riverbend University",
    coverImage: {
      src: "/images/projects/riverbend-campus-science-block.jpg",
      alt: "Riverbend campus science block",
    },
    featured: false,
    order: 4,
  },
  {
    slug: "harbour-point-civic-library",
    title: "Harbour Point Civic Library",
    sector: "Public Buildings",
    summary: "Slope stability and structural works for a waterfront library.",
    description:
      "Slope stability assessment and structural frame design for a waterfront civic library, including retaining structures along the reclaimed harbour edge.",
    client: "Harbour Point City Council",
    coverImage: {
      src: "/images/projects/harbour-point-civic-library.jpg",
      alt: "Harbour Point civic library at dusk",
    },
    featured: false,
    order: 5,
  },
];

(async () => {
  const login = await fetch(BASE + "/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: process.env.ADMIN_EMAIL || "admin@example.com",
      password: process.env.ADMIN_PASSWORD || "change-me",
    }),
  });
  if (!login.ok) throw new Error("Login failed: " + login.status);
  const { token } = await login.json();

  for (const p of projects) {
    const r = await fetch(BASE + "/admin/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(p),
    });
    console.log(r.status, p.title);
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
