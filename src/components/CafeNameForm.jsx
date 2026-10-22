import React from "react";
import { useState } from "react";

export default function CafeNameForm({ cafeName, setCafeName }) {
  const [draftName, setDraftName] = useState(cafeName);

  function saveName(event) {
    event.preventDefault();
    if (!draftName.trim()) return window.alert("Введите название кафе!");
    const name = draftName.trim();
    setCafeName(name);
    localStorage.setItem("cafeName", name);
    window.alert("Название кафе сохранено!");
  }

  return <form className="panel" onSubmit={saveName}>
    <label htmlFor="cafeName">Название кафе</label>
    <input id="cafeName" value={draftName} onChange={event => setDraftName(event.target.value)} maxLength="80" />
    <button className="primary">Сохранить</button>
  </form>;
}
