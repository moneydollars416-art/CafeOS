import React from "react";
import { useT } from "../i18n";

export default function AppHeader({ title }) {
  const t = useT();
  return <header>
    <div><h1>{title}</h1><p>{t("header.welcome")}</p></div>
  </header>;
}