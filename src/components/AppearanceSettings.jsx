import React from "react";
import LanguageSelector from "./LanguageSelector";

export default function AppearanceSettings({ language, setLanguage, dark, setDark }) {
  return <div className="panel">
    <h3>Язык и оформление</h3>
    <LanguageSelector language={language} setLanguage={setLanguage} />
    <button id="themeButton" onClick={() => setDark(!dark)}>{dark ? "☀️ Светлая тема" : "🌙 Ночная тема"}</button>
  </div>;
}
