import { useCallback, useEffect, useMemo, useState } from "react";
import { LanguageContext } from "./languageContext";
import { translations } from "../i18n/translations";
import { translateTerm } from "../i18n/terms";

const SUPPORTED = ["en", "es"];

const getInitialLanguage = () => {
  const stored = localStorage.getItem("language");
  if (SUPPORTED.includes(stored)) return stored;
  // fall back to the browser preference on first visit
  const browser = navigator.language?.slice(0, 2);
  return SUPPORTED.includes(browser) ? browser : "en";
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(getInitialLanguage);

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.setAttribute("lang", language);
  }, [language]);

  const toggleLanguage = useCallback(
    () => setLanguage((prev) => (prev === "en" ? "es" : "en")),
    [],
  );

  // t("key", { name }) — looks up the string and fills {placeholders}
  const t = useCallback(
    (key, vars) => {
      let str = translations[language]?.[key] ?? translations.en[key] ?? key;
      if (vars) {
        for (const [name, value] of Object.entries(vars)) {
          str = str.replaceAll(`{${name}}`, value);
        }
      }
      return str;
    },
    [language],
  );

  const value = useMemo(
    () => ({
      language,
      toggleLanguage,
      t,
      // translate a dataset category value (body part / muscle / equipment)
      term: (rawValue) => translateTerm(rawValue, language),
    }),
    [language, toggleLanguage, t],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
