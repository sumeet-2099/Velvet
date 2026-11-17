import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { VelvetProvider } from "@/context/VelvetContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://velvet.dev"),
  title: "VELVET",
  description:
    "Developer-focused website template subscription library for architecture and interior design studios. Maintainable Next.js 14 source code, isolated live demos, performance evidence, and AI-agent context.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/logo/submark-logo.svg",
  },
  openGraph: {
    title: "VELVET",
    description:
      "Start client work from a trustworthy foundation: tested Next.js 14 source code, documented customization, Core Web Vitals performance, and AI-agent instructions.",
    url: "https://velvet.dev",
    siteName: "VELVET",
    images: [
      {
        url: "/designs/Home Page.png",
        width: 1200,
        height: 630,
        alt: "Velvet Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VELVET",
    description: "Curated architectural and creative studio templates with complete source code.",
    images: ["/designs/Home Page.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${inter.variable} ${jakarta.variable} ${jetbrainsMono.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                localStorage.setItem("velvet_theme", "dark");
                document.documentElement.setAttribute("data-theme", "dark");
                document.documentElement.classList.add("dark");
                document.documentElement.classList.remove("light");
              } catch (e) {}

              // Prevent text copy outside inputs & textareas
              document.addEventListener("copy", function (e) {
                const active = document.activeElement;
                const tag = active ? active.tagName.toLowerCase() : "";
                if (tag !== "input" && tag !== "textarea" && !active?.getAttribute("contenteditable")) {
                  e.preventDefault();
                }
              });
            `,
          }}
        />
      </head>
      <body className="font-sans bg-surface-canvas antialiased select-none">
        <VelvetProvider>{children}</VelvetProvider>
      </body>
    </html>
  );
}
