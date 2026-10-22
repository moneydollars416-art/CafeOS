import React from "react";
import { useState } from "react";
import { createUser, getUsers } from "../api";

export default function AuthScreen({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [message, setMessage] = useState("");
  const [loginName, setLoginName] = useState("");

  async function submit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name")).trim();
    const password = String(data.get("password"));

    if (mode === "register") {
      const confirmation = String(data.get("confirmation"));
      if (password.length < 4) return setMessage("Пароль должен содержать минимум 4 символа.");
      if (password !== confirmation) return setMessage("Пароли не совпадают.");

      try {
        const users = await getUsers();
        if (users.some(user => user.name.toLowerCase() === name.toLowerCase())) {
          return setMessage("Такое имя уже зарегистрировано.");
        }

        const createdUser = await createUser({ name, password });
        setLoginName(createdUser.name || name);
        setMode("login");
        setMessage("Регистрация успешна! Теперь войдите.");
        return;
      } catch (error) {
        console.error(error);
        return setMessage("Не удалось создать аккаунт. Попробуйте позже.");
      }
    }

    try {
      const users = await getUsers();
      const user = users.find(item =>
        item.name.toLowerCase() === name.toLowerCase() && item.password === password
      );
      if (!user) return setMessage("Неверное имя или пароль.");
      const signedInUser = { id: user.id, name: user.name };
      localStorage.setItem("cafeCurrentUser", JSON.stringify(signedInUser));
      onLogin(signedInUser);
    } catch (error) {
      console.error(error);
      setMessage("Не удалось войти. Проверьте соединение и попробуйте снова.");
    }
  }

  return <section className="auth-screen">
    <div className="auth-card">
      <h1>☕ CafeOS</h1>
      <p>Система управления кафе</p>
      <div className="auth-tabs">
        <button type="button" className={mode === "login" ? "primary" : ""} onClick={() => { setMode("login"); setMessage(""); }}>Вход</button>
        <button type="button" className={mode === "register" ? "primary" : ""} onClick={() => { setMode("register"); setMessage(""); }}>Регистрация</button>
      </div>
      <form onSubmit={submit}>
        <h2>{mode === "login" ? "Вход в аккаунт" : "Создать аккаунт"}</h2>
        <label htmlFor="authName">Имя пользователя</label>
        <input id="authName" name="name" value={loginName} onChange={event => setLoginName(event.target.value)} required minLength="2" maxLength="40" autoComplete="username" placeholder="Введите имя" />
        <label htmlFor="authPassword">Пароль</label>
        <input id="authPassword" name="password" type="password" required minLength={mode === "register" ? 4 : undefined} autoComplete={mode === "login" ? "current-password" : "new-password"} placeholder="Введите пароль" />
        {mode === "register" && <>
          <label htmlFor="authConfirmation">Повторите пароль</label>
          <input id="authConfirmation" name="confirmation" type="password" required minLength="4" autoComplete="new-password" placeholder="Повторите пароль" />
        </>}
        <button className="primary auth-submit" type="submit">{mode === "login" ? "Войти" : "Зарегистрироваться"}</button>
      </form>
      <p id="authMessage" role="status">{message}</p>
    </div>
  </section>;
}
