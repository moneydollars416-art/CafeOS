import { useState } from "react";

export default function AddFoodForm({ onAddFood }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  function submit(event) {
    event.preventDefault();
    const numericPrice = Number(price);
    if (!name.trim() || !Number.isFinite(numericPrice) || numericPrice <= 0) {
      return window.alert("Введите название и правильную цену блюда.");
    }
    onAddFood({ id: Date.now(), name: name.trim(), price: numericPrice, category: "Еда", description: "Новое блюдо", rating: 5, reviews: 0 });
    setName("");
    setPrice("");
  }

  return <form className="panel" onSubmit={submit}>
    <h3>Добавить блюдо</h3>
    <input value={name} onChange={event => setName(event.target.value)} placeholder="Название блюда" maxLength="80" required />
    <input value={price} onChange={event => setPrice(event.target.value)} type="number" min="1" placeholder="Цена в сомах" required />
    <button className="primary" type="submit">＋ Добавить блюдо</button>
  </form>;
}
