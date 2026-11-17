export interface PricingPlan {
  id: "individual" | "pro" | "studio";
  name: string;
  tagline: string;
  badge?: string;
  isPopular?: boolean;
  price: {
    usd: {
      monthly: number;
      yearly: number;
    };
    inr: {
      monthly: number;
      yearly: number;
    };
  };
  seats: number;
  clientProjectsLimit: string;
  features: { text: string; highlight?: boolean }[];
  ctaText: string;
  ctaStyle: "white" | "violet" | "outline";
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "individual",
    name: "Individual",
    tagline: "For independent architects, solo developers, and portfolio builders.",
    price: {
      usd: { monthly: 19, yearly: 190 },
      inr: { monthly: 1499, yearly: 14990 },
    },
    seats: 1,
    clientProjectsLimit: "1 client project at a time",
    features: [
      { text: "Access to standard published library" },
      { text: "Complete Next.js & Tailwind source code" },
      { text: "Full documentation & setup guides" },
      { text: "1 registered end-product website licence" },
      { text: "Standard email support" },
      { text: "Community Discord access" },
    ],
    ctaText: "Get Started ->",
    ctaStyle: "outline",
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "For professional freelancers and design agency leads building client sites.",
    badge: "✦ Most Popular",
    isPopular: true,
    price: {
      usd: { monthly: 49, yearly: 490 },
      inr: { monthly: 3999, yearly: 39990 },
    },
    seats: 1,
    clientProjectsLimit: "Up to 5 commercial client deployments / year",
    features: [
      { text: "Full template library & monthly releases", highlight: true },
      { text: "Up to 5 client website deployments / year", highlight: true },
      { text: "Perpetual use rights on completed client sites", highlight: true },
      { text: "AI-Agent customization instructions (PROJECT.md)", highlight: true },
      { text: "Private Figma & design token source files" },
      { text: "Priority GitHub issue support & Discord role" },
    ],
    ctaText: "Upgrade to Pro ->",
    ctaStyle: "violet",
  },
  {
    id: "studio",
    name: "Studio",
    tagline: "For multidisciplinary architecture studios and web agencies.",
    badge: "✦ Agency Scale",
    price: {
      usd: { monthly: 129, yearly: 1290 },
      inr: { monthly: 9999, yearly: 99990 },
    },
    seats: 3,
    clientProjectsLimit: "Unlimited commercial client deployments",
    features: [
      { text: "3 team member seats included", highlight: true },
      { text: "Unlimited commercial client deployments", highlight: true },
      { text: "Centralized licence registry & team dashboard", highlight: true },
      { text: "Perpetual use rights for all registered projects" },
      { text: "Custom AI prompt fine-tuning for your agency stack" },
      { text: "Dedicated Slack/Discord private channel & SLA support" },
    ],
    ctaText: "Start Studio ->",
    ctaStyle: "outline",
  },
];

export const FAQS = [
  {
    question: "What exactly do I receive when I access a Velvet template?",
    answer: "You receive the complete, production-ready source code repository (Next.js 14 App Router, TypeScript, Tailwind CSS, Framer Motion), along with documented design tokens, setup guides, isolated live preview access, and AI-agent instructions (`PROJECT.md`) to allow Claude Code, Antigravity, or Cursor to adapt the template instantly.",
  },
  {
    question: "How does the End-Product License work for client work?",
    answer: "Under Velvet's licensing policy, 1 license covers 1 finished client or internal website. You are fully permitted to modify source code, customize layouts, integrate backends, and deliver the completed production site to your client. You may not resell the raw template as a standalone theme or list it on another marketplace.",
  },
  {
    question: "What happens to my client websites if I cancel my subscription?",
    answer: "Completed and registered client websites retain perpetual use rights online forever. Cancellation simply pauses your access to future template releases, updates, and new project license issuances after your billing period concludes.",
  },
  {
    question: "Are 3D and WebGL elements required to run the templates?",
    answer: "No. In accordance with Velvet's architectural standards, every 3D experience is built as a progressive enhancement with zero layout shift (CLS = 0) and graceful static fallbacks for low-power or reduced-motion devices. Essential content is always accessible.",
  },
  {
    question: "Can I use AI coding tools like Claude Code or Cursor with these templates?",
    answer: "Yes, every template ships with a meticulously structured `PROJECT.md` file designed specifically for autonomous AI coding agents. It specifies component boundaries, design tokens, color variables, and file trees so your agent makes accurate modifications without breaking styles.",
  },
];
