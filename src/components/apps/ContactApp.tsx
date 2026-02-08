/**
 * Contact application — displays contact form and social links.
 * Uses mailto: for form submission (no backend required).
 */

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useSettingsStore } from "@/store/useSettingsStore";
import { PROFILE } from "@/data/profile";
import { t } from "@/lib/i18n";

export function ContactApp() {
  const language = useSettingsStore((s) => s.language);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  /** Opens the user's email client with a pre-filled message */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(`From: ${name} (${email})\n\n${message}`);
    window.open(`mailto:${PROFILE.email}?subject=${subject}&body=${body}`);
  };

  return (
    <motion.div
      className="space-y-5 max-w-md mx-auto"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-lg font-bold text-os-text text-center">
        {t(language, "contact.title")}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="text-xs text-os-text-secondary block mb-1">
            {t(language, "contact.name")}
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 rounded-lg bg-os-bg border border-os-border text-os-text text-sm focus:outline-none focus:border-os-accent transition-colors"
          />
        </div>

        <div>
          <label className="text-xs text-os-text-secondary block mb-1">
            {t(language, "contact.email")}
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 rounded-lg bg-os-bg border border-os-border text-os-text text-sm focus:outline-none focus:border-os-accent transition-colors"
          />
        </div>

        <div>
          <label className="text-xs text-os-text-secondary block mb-1">
            {t(language, "contact.message")}
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={4}
            className="w-full px-3 py-2 rounded-lg bg-os-bg border border-os-border text-os-text text-sm focus:outline-none focus:border-os-accent transition-colors resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 rounded-lg bg-os-accent text-white text-sm font-medium hover:brightness-110 transition-all"
        >
          {t(language, "contact.send")}
        </button>
      </form>

      {/* Social links */}
      <div className="text-center">
        <p className="text-xs text-os-text-secondary mb-2">
          {t(language, "contact.or")}
        </p>
        <div className="flex justify-center gap-3">
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-os-accent hover:underline"
          >
            GitHub
          </a>
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-os-accent hover:underline"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${PROFILE.email}`}
            className="text-xs text-os-accent hover:underline"
          >
            Email
          </a>
        </div>
      </div>
    </motion.div>
  );
}
