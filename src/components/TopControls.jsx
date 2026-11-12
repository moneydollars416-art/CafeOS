import React from "react";
import { Sun, Moon } from "lucide-react";

const languages = [
  ["ru", "RU"],
  ["ky", "KY"],
  ["en", "EN"]
];

export default function TopControls({ language, setLanguage, dark, setDark }) {
  return (
    <div className="top-controls">
      <div className="lang-switch" role="group" aria-label="Язык">
        {languages.map(([code, label]) => (
          <button
            key={code}
            type="button"
            className={language === code ? "active" : ""}
            onClick={() => setLanguage(code)}
          >
            {label}
          </button>
        ))}
      </div>
      <button
        type="button"
        className="theme-toggle"
        onClick={() => setDark(current => !current)}
        aria-label={dark ? "Светлая тема" : "Тёмная тема"}
      >
        {dark ? <Sun size={17} /> : <Moon size={17} />}
      </button>
    </div>
  );
}