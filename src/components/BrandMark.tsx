import Link from "next/link";
import Image from "next/image";

interface BrandMarkProps {
  variant?: "full" | "submark";
  className?: string;
  height?: number;
}

export function BrandMark({ variant = "full", className = "", height = 34 }: BrandMarkProps) {
  if (variant === "submark") {
    return (
      <Link
        href="/"
        className={`group inline-flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-lg p-0.5 ${className}`}
        aria-label="Velvet Home"
      >
        <div className="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
          <Image
            src="/logo/submark-logo.svg"
            alt="Velvet Mark"
            width={height}
            height={height}
            priority
            className="filter drop-shadow-velvet-mark transition-[filter] duration-300"
          />
        </div>
      </Link>
    );
  }

  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-lg p-0.5 ${className}`}
      aria-label="Velvet Home"
    >
      <div className="relative flex items-center transition-transform duration-300 group-hover:scale-[1.02]">
        <Image
          src="/logo/primary-logo.svg"
          alt="Velvet Logo"
          width={Math.round(height * 4.25)}
          height={height}
          priority
          className="h-auto w-auto max-h-[38px] filter drop-shadow-velvet-mark-sm transition-[filter] duration-300 dark:brightness-0 dark:invert"
        />
      </div>
    </Link>
  );
}
