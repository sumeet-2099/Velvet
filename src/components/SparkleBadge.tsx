import React from "react";

interface SparkleBadgeProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export function SparkleBadge({ children, className = "", glow = false }: SparkleBadgeProps) {
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3.5 py-1 text-xs font-medium rounded-full bg-surface-elevated border border-border-subtle text-current backdrop-blur-md transition-colors duration-200 ${
        glow ? "shadow-velvet border-purple-500/30" : ""
      } ${className}`}
    >
      <span className="text-purple-400 font-semibold select-none">✦</span>
      <span>{children}</span>
    </div>
  );
}
