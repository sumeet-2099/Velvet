"use client";

import React, { useState } from "react";
import { MessageSquare, X, Send, Mail, CheckCircle2, Sparkles, Clock } from "lucide-react";

export function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    scope: "Architecture Template Customization",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: "",
      email: "",
      scope: "Architecture Template Customization",
      message: "",
    });
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open contact and custom inquiry form"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#001e1d] hover:bg-[#052e2c] text-[#fffffe] font-medium text-xs shadow-[0_4px_25px_rgba(0,30,29,0.5)] hover:shadow-[0_6px_35px_rgba(139,92,246,0.35)] border border-purple-500/40 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
        </span>
        <MessageSquare className="w-4 h-4 group-hover:scale-110 transition-transform" />
        <span className="hidden sm:inline">Support &amp; Inquiries</span>
      </button>

      {/* Floating Contact Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-full max-w-lg rounded-3xl bg-surface-elevated border border-purple-500/30 shadow-2xl p-6 sm:p-8 overflow-hidden animate-in slide-in-from-bottom-6 sm:zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-400 flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-display">
                    Velvet Studio Support
                  </h3>
                  <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
                    <Clock className="w-3 h-3 text-purple-400" />
                    <span>Average reply within 2 hours</span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full text-zinc-400 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {submitted ? (
              <div className="py-10 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white">Inquiry Received</h4>
                <p className="text-xs text-zinc-400 max-w-xs mx-auto leading-relaxed">
                  Thank you! Our studio team has received your message and will get back to you at{" "}
                  <span className="text-purple-300 font-mono">{formData.email}</span> shortly.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="btn-outline-pill px-5 py-2 text-xs font-semibold mt-4"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full px-3.5 py-2 rounded-xl bg-surface-base border border-white/10 text-white text-xs placeholder-zinc-500 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@studio.com"
                      className="w-full px-3.5 py-2 rounded-xl bg-surface-base border border-white/10 text-white text-xs placeholder-zinc-500 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1">
                    Inquiry Topic
                  </label>
                  <select
                    value={formData.scope}
                    onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-surface-base border border-white/10 text-white text-xs focus:outline-none focus:border-purple-500"
                  >
                    <option value="Architecture Template Customization">
                      Architecture Template Customization
                    </option>
                    <option value="Commercial Licensing Question">Commercial Licensing Question</option>
                    <option value="Studio Pass Enterprise Tier">Studio Pass Enterprise Tier</option>
                    <option value="Technical Issue or Bug">Technical Issue or Bug</option>
                    <option value="General Question">General Question</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1">
                    Message
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your project requirements or questions..."
                    className="w-full px-3.5 py-2 rounded-xl bg-surface-base border border-white/10 text-white text-xs placeholder-zinc-500 focus:outline-none focus:border-purple-500 resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between gap-3">
                  <span className="text-[11px] text-zinc-400 font-mono">
                    Direct: <a href="mailto:hello@velvet.design" className="text-purple-400 hover:underline">hello@velvet.design</a>
                  </span>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-violet-pill px-5 py-2.5 text-xs font-semibold flex items-center gap-1.5 disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{loading ? "Sending..." : "Submit Inquiry"}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
