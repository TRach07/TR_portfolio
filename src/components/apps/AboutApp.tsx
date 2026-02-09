/**
 * About Me application — personal profile card with bio, quick info,
 * spoken languages, and social links. Designed as a modern profile view.
 */

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useSettingsStore } from "@/store/useSettingsStore";
import { PROFILE } from "@/data/profile";
import { t } from "@/lib/i18n";

/** GitHub SVG icon */
function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

/** LinkedIn SVG icon */
function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

/** Mail SVG icon */
function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
    </svg>
  );
}

export function AboutApp() {
  const language = useSettingsStore((s) => s.language);

  return (
    <div className="space-y-5">
      {/* ─── Header: Avatar + Name + Role ─── */}
      <motion.div
        className="flex items-center gap-5"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Avatar with accent ring */}
        <div className="relative shrink-0">
          <div className="w-20 h-20 rounded-2xl border-2 border-os-accent/50 overflow-hidden shadow-lg">
            <Image
              src={PROFILE.avatar}
              alt={PROFILE.fullName}
              width={80}
              height={80}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        <div className="min-w-0">
          <h1 className="text-xl font-bold text-os-text">
            {PROFILE.fullName}
          </h1>
          <p className="text-sm text-os-accent font-medium mt-0.5">
            {PROFILE.role[language]}
          </p>
        </div>
      </motion.div>

      {/* ─── Bio ─── */}
      <motion.p
        className="text-sm text-os-text-secondary leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
      >
        {t(language, "about.bio")}
      </motion.p>

      {/* ─── Quick Info Cards ─── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-sm font-semibold text-os-accent mb-2 flex items-center gap-2">
          <span className="w-1 h-4 rounded-full bg-os-accent" />
          {t(language, "about.quickInfo")}
        </h3>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-os-accent/5 border border-os-border">
            <span className="text-lg">📍</span>
            <div className="min-w-0">
              <p className="text-[10px] text-os-text-secondary uppercase tracking-wider">{t(language, "about.location")}</p>
              <p className="text-xs font-medium text-os-text truncate">{PROFILE.location[language]}</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-os-accent/5 border border-os-border">
            <span className="text-lg">📧</span>
            <div className="min-w-0">
              <p className="text-[10px] text-os-text-secondary uppercase tracking-wider">Email</p>
              <p className="text-xs font-medium text-os-text truncate">{PROFILE.email}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ─── Languages ─── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-sm font-semibold text-os-accent mb-2 flex items-center gap-2">
          <span className="w-1 h-4 rounded-full bg-os-accent" />
          {t(language, "about.languages")}
        </h3>
        <div className="flex gap-2">
          {PROFILE.languages.map((lang, i) => (
            <motion.div
              key={i}
              className="flex-1 flex items-center gap-2.5 p-2.5 rounded-lg border border-os-border bg-os-bg/30 hover:border-os-accent/30 transition-colors"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35 + i * 0.05 }}
            >
              <span className="text-2xl">{lang.flag}</span>
              <div>
                <p className="text-xs font-semibold text-os-text">{lang.name[language]}</p>
                <p className="text-[10px] text-os-text-secondary">{lang.level[language]}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ─── Social Links ─── */}
      <motion.div
        className="flex gap-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <a
          href={PROFILE.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-os-text/5 hover:bg-os-text/10 text-os-text text-sm font-medium transition-colors border border-os-border hover:border-os-text/20"
        >
          <GitHubIcon />
          GitHub
        </a>
        <a
          href={PROFILE.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#0077B5]/10 hover:bg-[#0077B5]/20 text-[#0077B5] text-sm font-medium transition-colors border border-[#0077B5]/20 hover:border-[#0077B5]/30"
        >
          <LinkedInIcon />
          LinkedIn
        </a>
        <a
          href={`mailto:${PROFILE.email}`}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-os-accent/10 hover:bg-os-accent/20 text-os-accent text-sm font-medium transition-colors border border-os-accent/20 hover:border-os-accent/30"
        >
          <MailIcon />
          Email
        </a>
      </motion.div>
    </div>
  );
}
