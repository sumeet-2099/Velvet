"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  Command,
  ArrowRight,
  Menu,
  X,
  User as UserIcon,
  LogOut,
  LayoutDashboard,
  ShieldCheck,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { BrandMark } from "./BrandMark";
import { useVelvet } from "@/context/VelvetContext";

interface NavbarProps {
  onOpenSearch: () => void;
}

export function Navbar({ onOpenSearch }: NavbarProps) {
  const pathname = usePathname();
  const { user, profile, userPlan, signOut, isPreloaded } = useVelvet();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { label: "Templates", href: "/templates" },
    { label: "Pricing", href: "/pricing" },
    { label: "Dashboard", href: "/dashboard" },
  ];

  const displayName = profile?.display_name || user?.user_metadata?.display_name || user?.email?.split("@")[0] || "Studio Member";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-out ${
        isPreloaded
          ? "translate-y-0 opacity-100"
          : "-translate-y-6 opacity-0 pointer-events-none"
      } ${
        scrolled
          ? "bg-surface-canvas/85 backdrop-blur-md border-b border-white/[0.08] shadow-overlay-heavy"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-8">
          <BrandMark height={34} />
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-surface-elevated/70 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/[0.08]">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-1.5 rounded-full text-xs font-medium transition-colors duration-200 ${
                  isActive
                    ? "text-white bg-white/[0.12] shadow-sm font-semibold"
                    : "text-zinc-400 hover:text-white hover:bg-white/[0.05]"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-purple-500 rounded-full shadow-velvet-sm" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right: Actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Quick Search Shortcut Trigger (Item 3) */}
          <button
            type="button"
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.10] border border-white/10 text-xs text-zinc-400 hover:text-zinc-200 transition-colors duration-200"
            aria-label="Quick search templates"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden lg:inline text-[11px]">Search</span>
            <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-mono bg-white/[0.08] text-zinc-300">
              <Command className="w-2.5 h-2.5" /> K
            </kbd>
          </button>

          {/* User Auth Controls */}
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-elevated hover:bg-surface-overlay border border-purple-500/40 text-xs font-medium text-white transition-colors duration-200 shadow-velvet"
              >
                <div className="w-5 h-5 rounded-full bg-velvet-600 flex items-center justify-center text-[10px] font-bold text-white">
                  {displayName.charAt(0)}
                </div>
                <span className="max-w-[120px] truncate text-purple-200">{displayName}</span>
                <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
              </button>

              {/* User Dropdown Menu */}
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-60 rounded-2xl bg-surface-elevated border border-white/10 shadow-2xl p-2 text-xs space-y-1 animate-in fade-in duration-150 z-50">
                  <div className="p-3 border-b border-white/[0.08]">
                    <div className="font-semibold text-white truncate">{displayName}</div>
                    <div className="text-[11px] text-zinc-400 truncate">{user.email}</div>
                    <div className="mt-2 flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/20">
                        {userPlan !== "none" ? `${userPlan} Pass` : "Free Tier"}
                      </span>
                      {profile?.role === "admin" && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          Admin
                        </span>
                      )}
                    </div>
                  </div>

                  <Link
                    href="/dashboard"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-zinc-300 hover:text-white hover:bg-white/[0.06] transition-colors"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5 text-purple-400" />
                    <span>Customer Dashboard</span>
                  </Link>

                  <div className="pt-1 border-t border-white/[0.08]">
                    <button
                      type="button"
                      onClick={() => {
                        setUserDropdownOpen(false);
                        signOut();
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-rose-300 hover:text-rose-200 hover:bg-rose-950/30 transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/sign-in"
                className="px-3.5 py-1.5 rounded-full text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/[0.06] transition-colors duration-200"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="btn-white-pill px-4 py-1.5 text-xs font-semibold flex items-center gap-1.5 shadow-sm"
              >
                <span>Create Account</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-zinc-400 hover:text-white bg-surface-elevated border border-white/10"
            aria-label="Open mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface-base/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 space-y-4 animate-in slide-in-from-top-4 duration-200">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSearch();
              }}
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-surface-elevated border border-white/10 text-xs text-zinc-300"
            >
              <span className="flex items-center gap-2">
                <Search className="w-4 h-4 text-purple-400" />
                <span>Search templates…</span>
              </span>
              <kbd className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/10">⌘K</kbd>
            </button>
          </div>

          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "text-white bg-purple-600/20 text-purple-300 font-semibold"
                    : "text-zinc-300 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-white/[0.08] space-y-2">
            {user ? (
              <>
                <div className="px-3 py-2 rounded-xl bg-surface-elevated text-xs">
                  <div className="text-white font-semibold">{displayName}</div>
                  <div className="text-[11px] text-zinc-400 font-mono truncate">{user.email}</div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    signOut();
                  }}
                  className="w-full py-2.5 rounded-full text-xs font-semibold text-rose-300 bg-rose-950/40 border border-rose-500/30 flex items-center justify-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/sign-in"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-outline-pill py-2.5 text-xs font-semibold justify-center text-center"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-violet-pill py-2.5 text-xs font-semibold justify-center text-center"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
