/**
 * About Me application — displays personal information, bio, and social links.
 * Shown inside a draggable window on the desktop.
 */

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useSettingsStore } from "@/store/useSettingsStore";
import { PROFILE } from "@/data/profile";
import { t } from "@/lib/i18n";

export function AboutApp() {
  const language = useSettingsStore((s) => s.language);

  return (
    <div className="flex flex-col gap-6 max-w-lg mx-auto">
      {/* Header with avatar and intro */}
      <motion.div
        className="flex flex-col items-center text-center gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Avatar */}
        <div className="w-24 h-24 rounded-full border-2 border-os-accent overflow-hidden relative">
          <Image
            src={PROFILE.avatar}
            alt={PROFILE.fullName}
            fill
            className="object-cover"
          />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-os-text">
            {t(language, "about.greeting")}
          </h1>
          <p className="text-os-accent font-medium mt-1">
            {PROFILE.role[language]}
          </p>
        </div>
      </motion.div>

      {/* Bio */}
      <motion.p
        className="text-os-text-secondary text-sm leading-relaxed text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {t(language, "about.bio")}
      </motion.p>

      {/* Info cards */}
      <motion.div
        className="grid grid-cols-2 gap-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="p-3 rounded-lg bg-os-accent/5 border border-os-border">
          <p className="text-xs text-os-text-secondary mb-1">📍 {language === "fr" ? "Localisation" : "Location"}</p>
          <p className="text-sm font-medium text-os-text">{PROFILE.location[language]}</p>
        </div>
        <div className="p-3 rounded-lg bg-os-accent/5 border border-os-border">
          <p className="text-xs text-os-text-secondary mb-1">📧 Email</p>
          <p className="text-sm font-medium text-os-text truncate">{PROFILE.email}</p>
        </div>
      </motion.div>

      {/* Social links */}
      <motion.div
        className="flex justify-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <a
          href={PROFILE.github}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-lg bg-os-accent/10 hover:bg-os-accent/20 text-os-accent text-sm font-medium transition-colors"
        >
          GitHub
        </a>
        <a
          href={PROFILE.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-lg bg-os-accent/10 hover:bg-os-accent/20 text-os-accent text-sm font-medium transition-colors"
        >
          LinkedIn
        </a>
      </motion.div>
    </div>
  );
}
