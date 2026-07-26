import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import he from './locales/he.json'

export const SUPPORTED_LOCALES = [
  { code: 'en', label: 'English', dir: 'ltr' },
  { code: 'he', label: 'עברית', dir: 'rtl' },
] as const

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number]['code']

export const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: { en, he },
})
