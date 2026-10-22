import React from "react";
export default function LanguageSelector({ language, setLanguage }) {
  return <>
    <label htmlFor="languageSelect">Язык</label>
    <select id="languageSelect" value={language} onChange={event => {
      setLanguage(event.target.value);
      localStorage.setItem("language", event.target.value);
    }}>
      <option value="ru">Русский</option><option value="ky">Кыргызча</option><option value="en">English</option>
    </select>
  </>;
}
