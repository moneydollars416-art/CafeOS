import { NavLink } from "react-router-dom";
import { navigation } from "../data";
import SidebarBrand from "./SidebarBrand";

export default function Sidebar({ language }) {
  const languageIndex = language === "ky" ? 1 : language === "en" ? 2 : 0;
  return <aside className="sidebar">
    <SidebarBrand />
    {navigation.map(([id, icon, ...labels]) => (
      <NavLink key={id} to={id === "dashboard" ? "/" : `/${id}`} className="sidebar-link">
        {icon} {labels[languageIndex]}
      </NavLink>
    ))}
  </aside>;
}
