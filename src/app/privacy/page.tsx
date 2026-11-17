import React from "react";
import Link from "next/link";
import { SparkleBadge } from "@/components/SparkleBadge";
import { ShieldCheck, Lock, ArrowLeft, Mail, Database, UserCheck, Trash2 } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Velvet",
  description: "Velvet privacy policy, data collection, retention policies, and user privacy rights.",
};

export default function PrivacyPage() {
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
        <SparkleBadge glow>Transparency & Governance</SparkleBadge>
        <span className="text-xs text-zinc-500">Effective: November 2026</span>
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display mb-4">
        Velvet Privacy Policy
      </h1>
      <p className="text-sm text-zinc-400 mb-10 leading-relaxed">
        Velvet (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting the privacy of developers, designers, and studios using our template library and licensing infrastructure. This policy outlines what data we collect, why we collect it, how it is stored, and how you retain complete control over your information.
      </p>

      <div className="space-y-8 text-sm text-zinc-300 leading-relaxed">
        {/* Section 1 */}
        <section className="p-6 rounded-2xl bg-surface-base border border-white/[0.08]">
          <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <Database className="w-5 h-5 text-purple-400" />
            1. Information We Collect
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-zinc-400">
            <li>
              <strong className="text-zinc-200">Account Credentials:</strong> Email address, studio/display name, and cryptographically hashed passwords managed exclusively through Supabase Auth.
            </li>
            <li>
              <strong className="text-zinc-200">Licensing Records:</strong> Registered client domain names, client names, project names, and generated end-product license keys (e.g. <code className="font-mono text-xs text-purple-300">VLV-XXXX-XXXX-EPL</code>) to enforce one-site commercial rights.
            </li>
            <li>
              <strong className="text-zinc-200">Transactional &amp; Audit Logs:</strong> Download ticket tokens, timestamp of archive issuance, and subscription status. We do not store raw credit card numbers or payment credentials on our servers.
            </li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="p-6 rounded-2xl bg-surface-base border border-white/[0.08]">
          <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <Lock className="w-5 h-5 text-purple-400" />
            2. Purpose of Data Processing
          </h2>
          <p className="text-zinc-400 mb-3">We collect data strictly to:</p>
          <ul className="list-disc pl-5 space-y-2 text-zinc-400">
            <li>Deliver template source code archives via signed, short-lived download tickets.</li>
            <li>Issue perpetual, immutable commercial client license certificates.</li>
            <li>Prevent abuse, credential stuffing, and unauthorized archive redistribution.</li>
            <li>Fulfill legal and taxation obligations.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="p-6 rounded-2xl bg-surface-base border border-white/[0.08]">
          <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-purple-400" />
            3. Third-Party Service Providers
          </h2>
          <p className="text-zinc-400 mb-3">
            We only share minimal necessary data with vetted infrastructure partners:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-zinc-400">
            <li><strong className="text-zinc-200">Supabase (PostgreSQL &amp; Auth):</strong> Database hosting, user authentication, and row-level security.</li>
            <li><strong className="text-zinc-200">Cloudflare:</strong> DNS, SSL termination, and DDoS/bot protection.</li>
            <li>We do not sell, rent, or monetize your personal data with third-party advertisers or data brokers.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="p-6 rounded-2xl bg-surface-base border border-white/[0.08]">
          <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <Trash2 className="w-5 h-5 text-purple-400" />
            4. User Data Erasure &amp; Account Deletion (GDPR / DPDP)
          </h2>
          <p className="text-zinc-400 mb-3">
            Under GDPR, CCPA, and India&apos;s Digital Personal Data Protection (DPDP) Act, you have the right to request the permanent deletion of your account and personal data at any time.
          </p>
          <p className="text-zinc-400">
            To delete your account and associated profile records, you can submit an automated deletion request via your account settings or contact our privacy desk directly at{" "}
            <a href="mailto:privacy@velvet.dev" className="text-purple-400 hover:underline">
              privacy@velvet.dev
            </a>. Upon verification, all personal identifiers and active session tokens are permanently expunged.
          </p>
        </section>

        {/* Section 5 */}
        <section className="p-6 rounded-2xl bg-surface-base border border-white/[0.08]">
          <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <Mail className="w-5 h-5 text-purple-400" />
            5. Contact Information
          </h2>
          <p className="text-zinc-400">
            If you have questions regarding this Privacy Policy or wish to report a security inquiry, reach our security and privacy officers at:{" "}
            <a href="mailto:security@velvet.dev" className="text-purple-400 hover:underline">
              security@velvet.dev
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
