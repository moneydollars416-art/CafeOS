import React, { useEffect, useState } from "react";
import { UserPlus } from "lucide-react";
import { createUser, getUsers } from "../api";
import { isAdmin } from "../config";

export default function StaffPanel() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  async function load() {
    try {
      setUsers(await getUsers());
    } catch {
      setMessage({ type: "error", text: "Не удалось загрузить список." });
    }
  }

  useEffect(() => { load(); }, []);

  async function submit(event) {
    event.preventDefault();
    const login = name.trim();
    if (login.length < 2) return setMessage({ type: "error", text: "Имя: минимум 2 символа." });
    if (password.length < 4) return setMessage({ type: "error", text: "Пароль: минимум 4 символа." });
    if (users.some(user => user.name.toLowerCase() === login.toLowerCase())) {
      return setMessage({ type: "error", text: "Такое имя уже есть." });
    }
    try {
      await createUser({ name: login, password });
      setName("");
      setPassword("");
      setMessage({ type: "ok", text: "Аккаунт создан." });
      load();
    } catch {
      setMessage({ type: "error", text: "Не удалось создать аккаунт." });
    }
  }

  return (
    <div className="panel">
      <h3 className="settings-title"><UserPlus size={18} /> Пользователи</h3>
      <form className="admin-form" onSubmit={submit}>
        <div>
          <label>Имя или Gmail</label>
          <input value={name} onChange={event => setName(event.target.value)} placeholder="staff@gmail.com" />
        </div>
        <div>
          <label>Пароль</label>
          <input type="password" value={password} onChange={event => setPassword(event.target.value)} placeholder="Минимум 4 символа" autoComplete="new-password" />
        </div>
        <div className="wide">
          <button className="primary" type="submit">Создать аккаунт</button>
        </div>
      </form>
      {message && <p className={`form-message ${message.type}`}>{message.text}</p>}

      <div className="user-list">
        {users.map(user => (
          <div className="user-row" key={user.id}>
            <span>{user.name}</span>
            {isAdmin({ name: user.name }) && <span className="badge">админ</span>}
          </div>
        ))}
      </div>
    </div>
  );
}