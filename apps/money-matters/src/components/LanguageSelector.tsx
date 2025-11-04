import React from 'react';
import { useI18n } from '../i18n/useI18n';

const LanguageSelector: React.FC = () => {
  const { currentLanguage, changeLanguage, availableLanguages } = useI18n();

  return (
    <div className="language-selector">
      <select
        value={currentLanguage}
        onChange={(e) => changeLanguage(e.target.value as any)}
        className="px-3 py-1 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
      >
        {availableLanguages.map(({ code, name }) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
