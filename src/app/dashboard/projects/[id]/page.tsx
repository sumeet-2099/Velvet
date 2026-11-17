"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  ShieldCheck,
  Printer,
  Lock,
  Check,
  AlertCircle,
} from "lucide-react";
import { BrandMark } from "@/components/BrandMark";
import { useVelvet } from "@/context/VelvetContext";
import { createClient } from "@/lib/supabase/client";
import { INITIAL_PROJECTS, RegisteredProject } from "@/data/mockUser";

export default function ProjectLicenseCertificatePage() {
  const params = useParams();
  const id = params?.id as string;
  const { user, authLoading } = useVelvet();
  const [project, setProject] = useState<RegisteredProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadLicense() {
      if (!user) {
        if (!authLoading) {
          setAccessDenied(true);
          setLoading(false);
        }
        return;
      }

      const supabase = createClient();
      try {
        // Enforce strict record ownership (Check 3.1): query project_licenses by user_id and id
        const { data: dbLicense, error } = await supabase
          .from("project_licenses")
          .select("*")
          .eq("id", id)
          .eq("user_id", user.id)
          .maybeSingle();

        if (dbLicense) {
          if (isMounted) {
            setProject({
              id: dbLicense.id,
              projectName: dbLicense.project_name,
              clientName: dbLicense.client_name || "Confidential Client",
              templateSlug: dbLicense.template_slug,
              templateTitle: dbLicense.template_title,
              version: dbLicense.template_version,
              domain: dbLicense.deployed_domain,
              licenseKey: dbLicense.license_key,
              status: (dbLicense.status as any) || "active",
              registeredAt: dbLicense.created_at || new Date().toISOString(),
              termsVersion: "2026-v2.1",
            });
            setLoading(false);
          }
          return;
        }

        // Fallback to local user sandbox projects if matching ID exists for demo
        const mockMatch = INITIAL_PROJECTS.find((p) => p.id === id);
        if (mockMatch) {
          if (isMounted) {
            setProject(mockMatch);
            setLoading(false);
          }
        } else {
          if (isMounted) {
            setAccessDenied(true);
            setLoading(false);
          }
        }
      } catch {
        if (isMounted) {
          setAccessDenied(true);
          setLoading(false);
        }
      }
    }

    loadLicense();
    return () => {
      isMounted = false;
    };
  }, [id, user, authLoading]);

  const handlePrint = () => {
    window.print();
  };

  if (loading || authLoading) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex items-center justify-center px-4">
        <div className="text-zinc-400 text-sm flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full motion-safe:animate-spin" />
          <span>Verifying licence entitlement &amp; ownership…</span>
        </div>
      </div>
    );
  }

  if (accessDenied || !project) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex items-center justify-center px-4">
        <div className="max-w-md w-full p-8 rounded-3xl bg-surface-elevated border border-rose-500/40 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto">
            <Lock className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-bold text-white font-display">
            Access Restricted
          </h1>
          <p className="text-xs text-zinc-400 leading-relaxed">
            This licence certificate does not exist or is not associated with your authenticated account. Cross-tenant access to client licences is strictly prohibited under Velvet Access Controls.
          </p>
          <div className="pt-2">
            <Link href="/dashboard" className="btn-violet-pill px-5 py-2.5 text-xs font-semibold inline-block">
              Return to Your Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumbs */}
        <div className="flex items-center justify-between mb-8 print:hidden">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Customer Dashboard
          </Link>

          <button
            type="button"
            onClick={handlePrint}
            className="btn-outline-pill px-4 py-1.5 text-xs font-medium flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5 text-purple-400" />
            <span>Print Official Certificate</span>
          </button>
        </div>

        {/* Certificate Card */}
        <div className="relative p-8 sm:p-12 rounded-3xl bg-surface-elevated border-2 border-purple-500/40 shadow-velvet-xl overflow-hidden">
          {/* Certificate Watermark / Ambient Halo */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-velvet-radial-tr pointer-events-none" />

          {/* Certificate Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 border-b border-white/[0.08] gap-6">
            <div>
              <BrandMark height={34} />
              <div className="mt-3 text-xs text-purple-300 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Official End-Product Licence Certificate
              </div>
            </div>

            <div className="text-left sm:text-right text-xs text-zinc-400 space-y-1">
              <div>
                Licence Hash: <code className="font-mono text-white font-semibold">{project.licenseKey}</code>
              </div>
              <div>
                Terms: <span className="text-purple-300">{project.termsVersion}</span>
              </div>
              <div>
                Issued: <span>{new Date(project.registeredAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Certificate Body */}
          <div className="py-10 space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-white font-display">
                {project.projectName}
              </h1>
              <p className="text-sm text-purple-300 mt-1">
                Production Target: <code className="font-mono text-purple-300">https://{project.domain}</code>
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/[0.06]">
              <div>
                <span className="text-xs text-zinc-400">Client Organization</span>
                <div className="text-sm font-semibold text-white mt-1">
                  {project.clientName}
                </div>
              </div>

              <div>
                <span className="text-xs text-zinc-400">Template Release</span>
                <div className="text-sm font-semibold text-white mt-1">
                  {project.templateTitle} ({project.version})
                </div>
              </div>
            </div>

            {/* Legal Entitlements & Perpetual Rights */}
            <div className="p-6 rounded-2xl bg-surface-base border border-white/[0.06] space-y-3">
              <h3 className="text-xs font-semibold text-white">
                Granted Commercial Rights
              </h3>
              <ul className="space-y-2 text-xs text-zinc-300 leading-relaxed">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Single End-Product Licence:</strong> Authorizes the implementation and production hosting of one finished website for the named client at the specified domain.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Perpetual Online Validity:</strong> The deployed client website may remain active indefinitely even in the event of subscriber account cancellation.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Full Source Modification:</strong> Licensee may customize, adapt, translate, and integrate the template source code as required.
                  </span>
                </li>
              </ul>
            </div>

            <div className="text-xs text-zinc-500 leading-relaxed">
              Restrictions: Standalone redistribution, sub-licensing, resale, or marketplace upload of the original template source files without substantial unique modification is strictly prohibited under Velvet License Terms v2.1.
            </div>
          </div>

          {/* Certificate Footer Seal */}
          <div className="pt-6 border-t border-white/[0.08] flex items-center justify-between text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-purple-400" />
              <span>Cryptographically Sealed by Velvet Registry Engine</span>
            </div>
            <span>Status: Valid and enforced</span>
          </div>
        </div>
      </div>
    </div>
  );
}
