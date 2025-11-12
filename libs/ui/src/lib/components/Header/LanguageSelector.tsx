import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import * as styles from './Styles';

interface Language {
  code: string;
  name: string;
}

export function LanguageSelector() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages: Language[] = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'te', name: 'తెలుగు' },
  ];

  const currentLang =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  const toggleLanguageMenu = () => {
    setIsOpen(!isOpen);
  };

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    setIsOpen(false);
  };

  const handleLanguageSelect = (language: string) => () => {
    changeLanguage(language);
  };

  return (
    <div className={styles.LanguageSelectorContainer}>
      <button
        type="button"
        onClick={toggleLanguageMenu}
        className={styles.LanguageButton}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>{currentLang?.name || 'English'}</span>
        <ChevronDown className={styles.ChevronIcon(isOpen)} />
      </button>

      {isOpen && (
        <div className={styles.LanguageMenu}>
          <div className={styles.LanguageMenuList} role="menu">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={handleLanguageSelect(lang.code)}
                className={styles.LanguageOption(currentLang.code === lang.code)}
                role="menuitem"
                aria-current={currentLang.code === lang.code}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
