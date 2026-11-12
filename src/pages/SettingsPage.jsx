import React, { useState } from "react";
import { Lock, Bell, Phone, LogOut } from "lucide-react";
import UserAvatar from "../components/UserAvatar";
import CafeNameForm from "../components/CafeNameForm";
import useStoredState from "../hooks/useStoredState";
import { getUsers, updateUser } from "../api";
import { isAdmin } from "../config";
import { useT } from "../i18n";

function Switch({ on, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      className={`switch ${on ? "on" : ""}`}
      onClick={onChange}
    />
  );
}

export default function SettingsPage({ user, onLogout, cafeName, setCafeName }) {
  const t = useT();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [notify, setNotify] = useStoredState("cafeNotify", { order: true, promo: false });

  async function changePassword(event) {
    event.preventDefault();
    setMessage(null);
    if (newPassword.length < 4) {
      return setMessage({ type: "error", text: t("settings.passwordShort") });
    }
    try {
      const users = await getUsers();
      const account = users.find(item => String(item.id) === String(user.id));
      if (!account || account.password !== currentPassword) {
        return setMessage({ type: "error", text: t("settings.passwordWrong") });
      }
      await updateUser(account.id, { ...account, password: newPassword });
      setCurrentPassword("");
      setNewPassword("");
      setMessage({ type: "ok", text: t("settings.passwordSaved") });
    } catch (error) {
      console.error(error);
      setMessage({ type: "error", text: t("settings.passwordError") });
    }
  }

  return (
    <section className="page">
      

      <div className="panel">
        <div className="settings-profile">
          <UserAvatar name={user.name} />
          <div className="settings-profile-info">
            <strong>{user.name}</strong>
            <p>{t("settings.yourProfile")}</p>
          </div>
          <button type="button" className="settings-logout" onClick={onLogout}>
            <LogOut size={16} /> {t("header.logout")}
          </button>
        </div>
      </div>

      <div className="panel">
        <h3 className="settings-title"><Lock size={18} /> {t("settings.password")}</h3>
        <form onSubmit={changePassword}>
          <input
            type="password"
            value={currentPassword}
            onChange={event => setCurrentPassword(event.target.value)}
            placeholder={t("settings.currentPassword")}
            autoComplete="current-password"
            required
          />
          <input
            type="password"
            value={newPassword}
            onChange={event => setNewPassword(event.target.value)}
            placeholder={t("settings.newPassword")}
            autoComplete="new-password"
            required
          />
          <button className="primary" type="submit">{t("settings.savePassword")}</button>
        </form>
        {message && <p className={`form-message ${message.type}`}>{message.text}</p>}
      </div>

      <div className="panel">
        <h3 className="settings-title"><Bell size={18} /> {t("settings.notifications")}</h3>
        <div className="setting-row">
          <span>{t("settings.notifyOrder")}</span>
          <Switch
            on={notify.order}
            label={t("settings.notifyOrder")}
            onChange={() => setNotify(current => ({ ...current, order: !current.order }))}
          />
        </div>
        <div className="setting-row">
          <span>{t("settings.notifyPromo")}</span>
          <Switch
            on={notify.promo}
            label={t("settings.notifyPromo")}
            onChange={() => setNotify(current => ({ ...current, promo: !current.promo }))}
          />
        </div>
      </div>

      <div className="panel contact-list">
        <h3 className="settings-title"><Phone size={18} /> {t("settings.contact")}</h3>
        <p><a href="tel:0777889955">0777 889 955</a></p>
        <p><a href="tel:557998877">557 998 877</a></p>
        <p className="muted-text">{t("settings.open")}</p>
      </div>

      {isAdmin(user) && <CafeNameForm cafeName={cafeName} setCafeName={setCafeName} />}
    </section>
  );
}