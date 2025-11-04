import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    en: {
        translation: {
            'language.en': 'English',
            'language.hi': 'Hindi',
            'language.te': 'Telugu',
            'selectLanguage': 'Select Language',
        }
    },
    hi: {
        translation: {
            'language.en': 'अंग्रेज़ी',
            'language.hi': 'हिंदी',
            'language.te': 'तेलुगू',
            'selectLanguage': 'भाषा चुनें',
        }
    },
    te: {
        translation: {
            'language.en': 'ఇంగ్లీషు',
            'language.hi': 'హిందీ',
            'language.te': 'తెలుగు',
            'selectLanguage': 'భాషా చుండి',
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        debug: false,
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
