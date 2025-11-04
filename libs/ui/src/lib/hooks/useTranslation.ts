import { useTranslation as useI18nTranslation } from 'react-i18next';

export function useTranslation() {
  const { t, i18n } = useI18nTranslation();

  const translate = (key: string, options?: Record<string, any>) => {
    return t(key, options);
  };

  const changeLanguage = (lng: string) => {
    return i18n.changeLanguage(lng);
  };

  const currentLanguage = i18n.language;

  return {
    t: translate,
    changeLanguage,
    currentLanguage,
    i18n
  };
}
