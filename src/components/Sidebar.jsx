import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  UtensilsCrossed,
  ClipboardList,
  CalendarCheck,
  Wallet,
  Heart,
  ShieldCheck,
  User
} from "lucide-react";
import { navigation } from "../data";
import { isAdmin } from "../config";
import SidebarBrand from "./SidebarBrand";
import TopControls from "./TopControls";

const icons = {
  dashboard: LayoutDashboard,
  menu: UtensilsCrossed,
  orders: ClipboardList,
  reservations: CalendarCheck,
  cashier: Wallet,
  favorites: Heart,
  admin: ShieldCheck,
  settings: User
};

export default function Sidebar({ language, user, setLanguage, dark, setDark }) {
  const languageIndex = language === "ky" ? 1 : language === "en" ? 2 : 0;

  return (
    <aside className="sidebar">
      <SidebarBrand />
      <nav className="nav-scroll">
        {navigation
          .filter(([id]) => id !== "admin" || isAdmin(user))
          .map(([id, icon, ...labels]) => {
            const Icon = icons[id];
            return (
              <NavLink
                key={id}
                to={id === "dashboard" ? "/" : `/${id}`}
                end={id === "dashboard"}
                className="sidebar-link"
              >
                {Icon ? <Icon size={18} strokeWidth={2} /> : <span>{icon}</span>}
                <span>{labels[languageIndex]}</span>
              </NavLink>
            );
          })}
      </nav>
      <TopControls language={language} setLanguage={setLanguage} dark={dark} setDark={setDark} />
    </aside>
  );
}