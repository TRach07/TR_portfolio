/**
 * Lightweight i18n utility for client-side translations.
 * Resolves nested keys like "apps.about.title" from JSON translation files.
 */

import en from "@/i18n/en.json";
import fr from "@/i18n/fr.json";
import { Language } from "@/types/settings";

const translations: Record<Language, Record<string, unknown>> = { en, fr };

/**
 * Retrieves a translated string by its dot-separated key.
 * Falls back to the key itself if the translation is not found.
 *
 * @example
 * t("en", "apps.about.title") // "About Me"
 * t("fr", "apps.about.title") // "À propos"
 */
export function t(lang: Language, key: string): string {
  const keys = key.split(".");
  let result: unknown = translations[lang];

  for (const k of keys) {
    if (result && typeof result === "object" && k in result) {
      result = (result as Record<string, unknown>)[k];
    } else {
      return key; // Fallback to key if path not found
    }
  }

  return typeof result === "string" ? result : key;
}
