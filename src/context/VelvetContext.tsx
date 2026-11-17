"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { User, Session } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { Database } from "@/types/supabase";
import { Template } from "@/data/templates";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CommandPalette } from "@/components/CommandPalette";
import { QuickPreviewModal } from "@/components/QuickPreviewModal";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";
import { BackToTop } from "@/components/BackToTop";
import { CookieBanner } from "@/components/CookieBanner";
import { FloatingContact } from "@/components/FloatingContact";
import { UtmTracker } from "@/components/UtmTracker";
import { Preloader } from "@/components/Preloader";

export type DbProfile = Database["public"]["Tables"]["profiles"]["Row"];

interface VelvetContextType {
  currency: "USD";
  openSearch: () => void;
  closeSearch: () => void;
  previewTemplate: (t: Template) => void;
  closePreview: () => void;
  // Supabase Auth & Profile state
  user: User | null;
  profile: DbProfile | null;
  session: Session | null;
  authLoading: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  // Entitlement & Payment state
  isSubscribed: boolean;
  userPlan: "none" | "individual" | "pro" | "studio";
  purchasedTemplates: string[];
  hasAccessToTemplate: (slug: string) => boolean;
  purchaseTemplate: (slug: string) => void;
  subscribePlan: (plan: "individual" | "pro" | "studio") => void;
  cancelSubscription: () => void;
  // Preloader state (Storyboards 1 & 2)
  isPreloaded: boolean;
}

const VelvetContext = createContext<VelvetContextType | undefined>(undefined);

export function VelvetProvider({ children }: { children: React.ReactNode }) {
  const currency: "USD" = "USD";
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [previewingTemplate, setPreviewingTemplate] = useState<Template | null>(null);
  const [isPreloaded, setIsPreloaded] = useState(false);

  // Supabase Auth State
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<DbProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Entitlement state
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [userPlan, setUserPlan] = useState<"none" | "individual" | "pro" | "studio">("none");
  const [purchasedTemplates, setPurchasedTemplates] = useState<string[]>([]);

  const supabase = createClient();

  const fetchProfileAndLicenses = useCallback(async (userId: string) => {
    try {
      // 1. Fetch Profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (profileData) {
        setProfile(profileData);
        if (
          profileData.selected_plan_tier &&
          profileData.selected_plan_tier !== "free" &&
          profileData.selected_plan_tier !== "none"
        ) {
          setIsSubscribed(true);
          setUserPlan(profileData.selected_plan_tier as any);
        } else {
          setIsSubscribed(false);
          setUserPlan("none");
        }
      }

      // 2. Fetch User's Registered Licenses & Purchased Templates
      const { data: licenses } = await supabase
        .from("project_licenses")
        .select("template_slug")
        .eq("user_id", userId)
        .eq("status", "active");

      if (licenses && licenses.length > 0) {
        const slugs = licenses.map((l) => l.template_slug);
        setPurchasedTemplates((prev) => Array.from(new Set([...prev, ...slugs])));
      }
    } catch (err) {
      console.warn("Failed to fetch user profile/licenses:", err);
    }
  }, [supabase]);

  // Initial session check & auth listener
  useEffect(() => {
    let mounted = true;

    async function initAuth() {
      try {
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        if (mounted) {
          setSession(initialSession);
          setUser(initialSession?.user || null);
          if (initialSession?.user) {
            await fetchProfileAndLicenses(initialSession.user.id);
          }
          setAuthLoading(false);
        }
      } catch (err) {
        console.warn("Auth init error:", err);
        if (mounted) setAuthLoading(false);
      }
    }

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        setSession(newSession);
        setUser(newSession?.user || null);

        if (newSession?.user) {
          await fetchProfileAndLicenses(newSession.user.id);
        } else {
          setProfile(null);
          setIsSubscribed(false);
          setUserPlan("none");
          setPurchasedTemplates([]);
        }
        setAuthLoading(false);
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [supabase, fetchProfileAndLicenses]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setProfile(null);
      setSession(null);
      setIsSubscribed(false);
      setUserPlan("none");
      setPurchasedTemplates([]);
      window.location.href = "/";
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfileAndLicenses(user.id);
    }
  };

  const hasAccessToTemplate = (slug: string) => {
    if (isSubscribed) return true;
    return purchasedTemplates.includes(slug);
  };

  const purchaseTemplate = (slug: string) => {
    setPurchasedTemplates((prev) => {
      if (prev.includes(slug)) return prev;
      return [...prev, slug];
    });
  };

  const subscribePlan = (plan: "individual" | "pro" | "studio") => {
    setIsSubscribed(true);
    setUserPlan(plan);
  };

  const cancelSubscription = () => {
    setIsSubscribed(false);
    setUserPlan("none");
  };

  return (
    <VelvetContext.Provider
      value={{
        currency: "USD",
        openSearch: () => setIsSearchOpen(true),
        closeSearch: () => setIsSearchOpen(false),
        previewTemplate: (t: Template) => setPreviewingTemplate(t),
        closePreview: () => setPreviewingTemplate(null),
        user,
        profile,
        session,
        authLoading,
        signOut: handleSignOut,
        refreshProfile,
        isSubscribed,
        userPlan,
        purchasedTemplates,
        hasAccessToTemplate,
        purchaseTemplate,
        subscribePlan,
        cancelSubscription,
        isPreloaded,
      }}
    >
      <div className="min-h-screen flex flex-col bg-surface-canvas relative selection:bg-purple-500/30 selection:text-white">
        {/* Preloader Animation calibrated to actual loading (Storyboards 1 & 2) */}
        <Preloader onComplete={() => setIsPreloaded(true)} />

        {/* Skip to Content Accessibility Link (Item 12) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-purple-600 focus:text-white focus:rounded-full focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-white text-xs font-semibold"
        >
          Skip to main content
        </a>

        {/* Global Scroll Progress Bar (Item 8) */}
        <ScrollProgressBar />

        {/* UTM Attribution Tracker (Item 14) */}
        <UtmTracker />

        <Navbar onOpenSearch={() => setIsSearchOpen(true)} />
        <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <Footer />

        {/* Command Palette Search (Item 3) */}
        <CommandPalette
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
        />

        <QuickPreviewModal
          template={previewingTemplate}
          onClose={() => setPreviewingTemplate(null)}
        />

        {/* Back to Top Smooth Scroll (Item 4) */}
        <BackToTop />

        {/* Floating Support & Contact Inquiries (Item 20) */}
        <FloatingContact />

        {/* Privacy & Cookie Consent Banner (Item 2) */}
        <CookieBanner />
      </div>
    </VelvetContext.Provider>
  );
}

export function useVelvet() {
  const context = useContext(VelvetContext);
  if (!context) {
    throw new Error("useVelvet must be used within a VelvetProvider");
  }
  return context;
}
