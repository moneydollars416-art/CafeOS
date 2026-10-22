import React from "react";
import AppearanceSettings from "../components/AppearanceSettings";
import CafeNameForm from "../components/CafeNameForm";
import PageTitle from "../components/PageTitle";

export default function SettingsPage({ cafeName, setCafeName, language, setLanguage, dark, setDark }) {
  return <section className="page">
    <PageTitle>Настройки ⚙️</PageTitle>
    <CafeNameForm cafeName={cafeName} setCafeName={setCafeName} />
    <AppearanceSettings language={language} setLanguage={setLanguage} dark={dark} setDark={setDark} />
  </section>;
}
