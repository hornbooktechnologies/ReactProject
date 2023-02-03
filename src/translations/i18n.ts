import { initReactI18next } from 'react-i18next'
import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { TRANSLATIONS_EN } from './en/Translations'
import { TRANSLATIONS_JA } from './ja/Translations'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: 'en',
    resources: {
      en: {
        translation: TRANSLATIONS_EN,
      },
      ja: {
        translation: TRANSLATIONS_JA,
      },
    },
  })

export default i18n
