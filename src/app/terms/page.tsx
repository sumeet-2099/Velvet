import React from "react";
import Link from "next/link";
import { SparkleBadge } from "@/components/SparkleBadge";
import { Shield, ArrowLeft, FileText, CheckCircle2, AlertTriangle, Scale } from "lucide-react";

export const metadata = {
  title: "Terms of Service | Velvet",
  description: "Velvet terms of service, commercial licensing rights, and subscription conditions.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors mb-8"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to Velvet
      </Link>

      <div className="flex items-center gap-2 mb-3">
        <SparkleBadge glow>Commercial Agreement</SparkleBadge>
        <span className="text-xs text-zinc-500">Terms Version: 2026-v2.1</span>
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display mb-4">
        Velvet Terms of Service
      </h1>
      <p className="text-sm text-zinc-400 mb-10 leading-relaxed">
        These Terms of Service govern your access to the Velvet template catalogue, source-code releases, and licensing services. By registering an account or downloading a source release, you agree to these terms.
      </p>

      <div className="space-y-8 text-sm text-zinc-300 leading-relaxed">
        {/* Section 1 */}
        <section className="p-6 rounded-2xl bg-surface-base border border-white/[0.08]">
          <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <Scale className="w-5 h-5 text-purple-400" />
            1. Commercial End-Product Licence (1 Site per Licence)
          </h2>
          <p className="text-zinc-400 mb-3">
            Each licensed template source code package grants you a non-exclusive, worldwide licence to build and deploy <strong>one single commercial end-product website</strong> for yourself or a paying client.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-zinc-400">
            <li><strong className="text-zinc-200">Permitted:</strong> Customising source code, bundling components, connecting custom CMS/databases, and deploying to a production domain.</li>
            <li><strong className="text-zinc-200">Permitted:</strong> Transferring the completed deployment and administrative rights to your client.</li>
            <li><strong className="text-zinc-200">Prohibited:</strong> Reselling, sublicensing, or redistributing the template source code as a standalone asset, theme, or builder component library.</li>
            <li><strong className="text-zinc-200">Prohibited:</strong> Using a single template purchase or licence key across multiple unrelated client deployments without registering additional licences.</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="p-6 rounded-2xl bg-surface-base border border-white/[0.08]">
          <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-purple-400" />
            2. Perpetual Rights for Completed Work
          </h2>
          <p className="text-zinc-400">
            If you cancel your Velvet Pass subscription, any commercial website that was completed, registered, and deployed during your active subscription period retains full, perpetual commercial rights. Cancellation terminates your ability to download new template archives and updates.
          </p>
        </section>

        {/* Section 3 */}
        <section className="p-6 rounded-2xl bg-surface-base border border-white/[0.08]">
          <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-purple-400" />
            3. Account Responsibility &amp; Credential Security
          </h2>
          <p className="text-zinc-400">
            You are responsible for maintaining the confidentiality of your authentication credentials. Velvet reserves the right to suspend accounts or revoke signed download tickets in cases of automated scraping, rate abuse, or unauthorized credential sharing.
          </p>
        </section>

        {/* Section 4 */}
        <section className="p-6 rounded-2xl bg-surface-base border border-white/[0.08]">
          <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-400" />
            4. Refund &amp; Cancellation Policy
          </h2>
          <p className="text-zinc-400 mb-2">
            Because Velvet releases include full, unpackaged TypeScript and Next.js source code, downloads are non-returnable digital assets.
          </p>
          <p className="text-zinc-400">
            Subscriptions may be cancelled at any time through your dashboard with no cancellation fees, effective at the end of the current billing cycle. For billing disputes or technical delivery failures, please contact{" "}
            <a href="mailto:billing@velvet.dev" className="text-purple-400 hover:underline">
              billing@velvet.dev
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
