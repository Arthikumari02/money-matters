import { i18n } from 'i18next';

declare module '@money-matters/app/i18n' {
  export * from '../i18n/I18nProvider';
  export * from '../i18n/useTranslation';

  // Export i18n instance types for type safety
  export interface I18n extends i18n { }

  // Re-export the i18n instance
  export const i18n: I18n;
}
