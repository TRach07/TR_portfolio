/**
 * Certificates application — displays certifications and attestations.
 * Each card shows the title, issuer, date, and optional links to view/verify.
 */

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useSettingsStore } from "@/store/useSettingsStore";
import { CERTIFICATES } from "@/data/certificates";

export function CertificatesApp() {
  const language = useSettingsStore((s) => s.language);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-os-text">
        {language === "fr" ? "Certificats & Attestations" : "Certificates & Attestations"}
      </h2>

      {CERTIFICATES.length === 0 && (
        <p className="text-os-text-secondary text-sm">
          {language === "fr" ? "Aucun certificat ajouté." : "No certificates added yet."}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CERTIFICATES.map((cert, index) => (
          <motion.div
            key={cert.id}
            className="p-4 rounded-lg border border-os-border bg-os-accent/5 hover:bg-os-accent/10 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            {/* Certificate badge + title */}
            <div className="flex items-start gap-3">
              {cert.badge ? (
                <div className="w-10 h-10 relative shrink-0">
                  <Image
                    src={cert.badge}
                    alt={cert.issuer}
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <span className="text-2xl shrink-0">🏆</span>
              )}
              <div className="min-w-0">
                <h3 className="font-semibold text-os-text text-sm">{cert.title}</h3>
                <p className="text-xs text-os-accent mt-0.5">{cert.issuer}</p>
                <p className="text-xs text-os-text-secondary mt-0.5">{cert.date}</p>
              </div>
            </div>

            {/* Description */}
            {cert.description && (
              <p className="text-xs text-os-text-secondary leading-relaxed mt-3">
                {cert.description[language]}
              </p>
            )}

            {/* Action links */}
            <div className="flex gap-3 mt-3">
              {cert.file && (
                <a
                  href={cert.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-os-accent hover:underline"
                >
                  {language === "fr" ? "Voir le certificat" : "View Certificate"} →
                </a>
              )}
              {cert.verifyUrl && (
                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-os-accent hover:underline"
                >
                  {language === "fr" ? "Vérifier" : "Verify"} →
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
