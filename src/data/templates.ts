export interface Template {
  id: string;
  slug: string;
  title: string;
  category: "Architecture" | "Interior Design" | "Studio" | "Agency" | "Portfolio";
  tagline: string;
  description: string;
  framework: string;
  priceUsd: number;
  priceInr: number;
  badge?: string;
  isPopular?: boolean;
  version: string;
  releaseDate: string;
  bundleSizeKb: number;
  lighthouse: {
    performance: number;
    accessibility: number;
    bestPractices: number;
    seo: number;
  };
  features: string[];
  techStack: string[];
  thumbnail: string;
  gallery: string[];
  fileTree: {
    name: string;
    type: "folder" | "file";
    children?: { name: string; type: "folder" | "file" }[];
  }[];
  aiPrompt: string;
  licenceSummary: string;
  demoUrl: string;
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
    canvas: string;
  };
}

export const TEMPLATES: Template[] = [
  {
    id: "tmpl_01",
    slug: "studio-arch",
    title: "Studio",
    category: "Architecture",
    tagline: "Monolithic concrete & glass architectural portfolio",
    description: "Built for contemporary architectural practices. Features full-bleed spatial imagery, dynamic project case studies, client presentation decks, material spec sheets, and smooth camera pan transitions.",
    framework: "Next.js 14 · Tailwind · Motion",
    priceUsd: 49,
    priceInr: 3999,
    badge: "✦ Velvet Pass",
    isPopular: true,
    version: "v2.1.0",
    releaseDate: "2026-10-18",
    bundleSizeKb: 78,
    lighthouse: {
      performance: 99,
      accessibility: 100,
      bestPractices: 100,
      seo: 100,
    },
    features: [
      "Full-screen project viewer with aspect-ratio locks",
      "Interactive material palette & blueprint spec modal",
      "Zero-runtime layout shift (CLS: 0.00)",
      "Ready-to-deploy Vercel & Cloudflare Workers configs",
      "AI-agent customization instructions (`PROJECT.md`)",
      "Keyboard navigable (`Alt+J/K` project navigation)",
    ],
    techStack: ["Next.js 14 (App Router)", "TypeScript", "Tailwind CSS", "Framer Motion", "Lucide React"],
    thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
    ],
    fileTree: [
      {
        name: "src",
        type: "folder",
        children: [
          { name: "app", type: "folder" },
          { name: "components", type: "folder" },
          { name: "tokens", type: "folder" },
          { name: "lib", type: "folder" },
        ],
      },
      { name: "PROJECT.md", type: "file" },
      { name: "velvet.config.ts", type: "file" },
      { name: "tailwind.config.js", type: "file" },
      { name: "README.md", type: "file" },
    ],
    aiPrompt: `You are customizing the "Studio" architecture template for a boutique studio named "Foster & Grey Architects".
1. Update brand tokens in \`src/tokens/brand.ts\` to use Stone #1C1917 and Travertine #E7E5E4.
2. Replace project data in \`src/data/projects.json\` with 4 minimalist commercial projects.
3. Preserve the 0ms CLS layout structure and WCAG 2.2 AA contrast standards.`,
    licenceSummary: "One end-product commercial or client website. Full source modification allowed. Redistribution prohibited.",
    demoUrl: "/demo/studio-arch",
    colorScheme: {
      primary: "#18181B",
      secondary: "#71717A",
      accent: "#A855F7",
      canvas: "#09090B",
    },
  },
  {
    id: "tmpl_02",
    slug: "nexora-spatial",
    title: "Nexora",
    category: "Interior Design",
    tagline: "Warm brutalism & tactile interior design showcase",
    description: "Designed for interior architects and furniture designers. Features curated mood boards, fabric swatch toggles, high-resolution room walkthroughs, and bespoke editorial typography.",
    framework: "Next.js 14 · Tailwind · Motion",
    priceUsd: 49,
    priceInr: 3999,
    badge: "✦ Featured",
    isPopular: true,
    version: "v1.8.4",
    releaseDate: "2026-10-24",
    bundleSizeKb: 82,
    lighthouse: {
      performance: 98,
      accessibility: 100,
      bestPractices: 100,
      seo: 98,
    },
    features: [
      "Tactile swatch and texture comparison slider",
      "Dynamic project gallery with masonry & editorial view",
      "Built-in inquiry form with schema validation",
      "Tailwind typography with optical kerning",
      "SEO Open Graph image auto-generation",
    ],
    techStack: ["Next.js 14", "TypeScript", "Tailwind CSS", "Motion", "Radix UI"],
    thumbnail: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop",
    ],
    fileTree: [
      {
        name: "src",
        type: "folder",
        children: [
          { name: "app", type: "folder" },
          { name: "components", type: "folder" },
          { name: "data", type: "folder" },
        ],
      },
      { name: "PROJECT.md", type: "file" },
      { name: "package.json", type: "file" },
    ],
    aiPrompt: `You are customizing the "Nexora" interior template for "Kanso Living".
Add 3 interior collections: Scandinavian Oak, Japandi Studio, and Obsidian Kitchen. Integrate inquiry submission with email webhook.`,
    licenceSummary: "One end-product commercial or client website. Full source modification allowed. Redistribution prohibited.",
    demoUrl: "/demo/nexora-spatial",
    colorScheme: {
      primary: "#27272A",
      secondary: "#A1A1AA",
      accent: "#8B5CF6",
      canvas: "#0A0A0F",
    },
  },
  {
    id: "tmpl_03",
    slug: "monolith-concrete",
    title: "Monolith",
    category: "Architecture",
    tagline: "Sculptural forms & monumental concrete structure portfolio",
    description: "Tailored for progressive engineering and architectural firms celebrating raw concrete, steel, and structural poetry. Includes drawing overlays, CAD export previews, and interactive project timelines.",
    framework: "Next.js 14 · WebGL Light · Tailwind",
    priceUsd: 59,
    priceInr: 4499,
    badge: "✦ 3D Progressive",
    isPopular: false,
    version: "v2.0.1",
    releaseDate: "2026-11-01",
    bundleSizeKb: 92,
    lighthouse: {
      performance: 97,
      accessibility: 98,
      bestPractices: 100,
      seo: 100,
    },
    features: [
      "Progressive 3D massing model with zero-lag fallback",
      "Blueprint wireframe hover inspector",
      "Dark obsidian theme with subtle specular highlights",
      "Client presentation locked share link generator",
    ],
    techStack: ["Next.js 14", "Three.js (Lazy-loaded)", "Tailwind CSS", "TypeScript"],
    thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1462826303086-329426d1aef5?q=80&w=1200&auto=format&fit=crop",
    ],
    fileTree: [
      {
        name: "src",
        type: "folder",
        children: [
          { name: "app", type: "folder" },
          { name: "3d", type: "folder" },
          { name: "components", type: "folder" },
        ],
      },
      { name: "PROJECT.md", type: "file" },
      { name: "README.md", type: "file" },
    ],
    aiPrompt: `You are adapting "Monolith" for an urban structural engineering firm. Add interactive CAD dimension labels to project cards and customize metadata.`,
    licenceSummary: "One end-product commercial or client website. Full source modification allowed. Redistribution prohibited.",
    demoUrl: "/demo/monolith-concrete",
    colorScheme: {
      primary: "#1E1B2E",
      secondary: "#9CA3AF",
      accent: "#C084FC",
      canvas: "#030306",
    },
  },
  {
    id: "tmpl_04",
    slug: "forma-spatial",
    title: "Forma",
    category: "Studio",
    tagline: "Multidisciplinary creative spatial practice system",
    description: "An elegant, typography-driven website for creative directors, exhibition designers, and spatial consultants. Combines dense index views with atmospheric fullscreen imagery.",
    framework: "Next.js 14 · Tailwind · Motion",
    priceUsd: 49,
    priceInr: 3999,
    badge: "✦ Velvet Pass",
    isPopular: false,
    version: "v1.5.0",
    releaseDate: "2026-10-10",
    bundleSizeKb: 72,
    lighthouse: {
      performance: 100,
      accessibility: 100,
      bestPractices: 100,
      seo: 100,
    },
    features: [
      "Dual index / visual grid display toggle",
      "Instant filter by discipline: Spatial, Exhibition, Brand",
      "Editorial essay & research journal layout",
      "Micro-interaction sound effects toggle (accessible)",
    ],
    techStack: ["Next.js 14", "TypeScript", "Tailwind CSS", "Lucide React"],
    thumbnail: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
    ],
    fileTree: [
      { name: "src", type: "folder" },
      { name: "PROJECT.md", type: "file" },
    ],
    aiPrompt: `Update Forma for a spatial consultancy studio. Set up 6 featured installations and integrate Markdown-based journal posts.`,
    licenceSummary: "One end-product commercial or client website. Full source modification allowed. Redistribution prohibited.",
    demoUrl: "/demo/forma-spatial",
    colorScheme: {
      primary: "#18181B",
      secondary: "#A1A1AA",
      accent: "#8B5CF6",
      canvas: "#050508",
    },
  },
  {
    id: "tmpl_05",
    slug: "lumina-atelier",
    title: "Lumina",
    category: "Interior Design",
    tagline: "Atmospheric architectural lighting & luxury interiors",
    description: "Focused on natural light studies, luminaire specifications, and nocturnal interior aesthetics. Includes daytime to nighttime ambient lighting toggle.",
    framework: "Next.js 14 · CSS Custom Props",
    priceUsd: 39,
    priceInr: 2999,
    badge: "✦ Ambient Light",
    isPopular: false,
    version: "v1.2.0",
    releaseDate: "2026-09-30",
    bundleSizeKb: 68,
    lighthouse: {
      performance: 100,
      accessibility: 100,
      bestPractices: 100,
      seo: 98,
    },
    features: [
      "Interactive Day/Night lighting state toggle",
      "Lux & Kelvin specification calculator component",
      "Ultra-compact JavaScript footprint (<70KB)",
      "High-fidelity image zoom with focal point control",
    ],
    techStack: ["Next.js 14", "Tailwind CSS", "TypeScript"],
    thumbnail: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=1200&auto=format&fit=crop",
    ],
    fileTree: [
      { name: "src", type: "folder" },
      { name: "PROJECT.md", type: "file" },
    ],
    aiPrompt: `Customize Lumina for an architectural lighting design studio. Add project case studies highlighting lux levels and custom luminaires.`,
    licenceSummary: "One end-product commercial or client website. Full source modification allowed. Redistribution prohibited.",
    demoUrl: "/demo/lumina-atelier",
    colorScheme: {
      primary: "#27272A",
      secondary: "#D4D4D8",
      accent: "#E9D5FF",
      canvas: "#0A0A0F",
    },
  },
  {
    id: "tmpl_06",
    slug: "kroma-portfolio",
    title: "Kroma",
    category: "Portfolio",
    tagline: "Senior spatial designer & 3D architect personal index",
    description: "A precision instrument for individual architects and 3D visualizers. Fast, bold typography, keyboard shortcut project browsing, and downloadable client CV.",
    framework: "Next.js 14 · Framer Motion",
    priceUsd: 29,
    priceInr: 2499,
    badge: "✦ Free on Pass",
    isPopular: false,
    version: "v1.3.1",
    releaseDate: "2026-09-15",
    bundleSizeKb: 64,
    lighthouse: {
      performance: 100,
      accessibility: 100,
      bestPractices: 100,
      seo: 100,
    },
    features: [
      "Interactive ⌘K Command palette navigation",
      "Interactive case study timeline",
      "Resume and portfolio PDF export automation",
      "Minimalist monochrome aesthetic with violet highlight",
    ],
    techStack: ["Next.js 14", "TypeScript", "Tailwind CSS", "Motion"],
    thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop",
    ],
    fileTree: [
      { name: "src", type: "folder" },
      { name: "PROJECT.md", type: "file" },
    ],
    aiPrompt: `Update Kroma for a principal architect. Add awards section, publications list, and selected masterplan projects.`,
    licenceSummary: "One end-product commercial or client website. Full source modification allowed. Redistribution prohibited.",
    demoUrl: "/demo/kroma-portfolio",
    colorScheme: {
      primary: "#18181B",
      secondary: "#71717A",
      accent: "#A855F7",
      canvas: "#050508",
    },
  },
];
