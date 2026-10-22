import React from "react";
import UserAvatar from "./UserAvatar";

export default function AppHeader({ title, user, onLogout }) {
  return <header>
    <div><h1>{title}</h1><p>Добро пожаловать в CafeOS 👋</p></div>
    <UserAvatar name={user.name} />
    <span id="currentUserLabel">👤 {user.name}</span>
    <button id="logoutButton" onClick={onLogout}>Выйти</button>
  </header>;
}
