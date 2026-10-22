import { foodImages } from "../data";

export default function FoodCard({ item, favorite, onAdd, onFavorite, onDelete, onReview, canDelete = true }) {
  function review() {
    const answer = window.prompt("Поставьте оценку от 1 до 5:");
    if (answer === null || answer.trim() === "") return;
    const rating = Number(answer);
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) return window.alert("Введите число от 1 до 5.");
    onReview?.(item.id, rating);
  }

  return <article className="product">
    <img className="food-image" src={foodImages[item.name] || "https://placehold.co/600x400?text=Food"} alt={item.name} loading="lazy" />
    <h3>{item.name}</h3>
    <p>{item.price} сом</p>
    <p>{item.description || ""}</p>
    <p>⭐ {item.rating || 5} ({item.reviews || 0} отзывов)</p>
    <button className="primary" onClick={() => onAdd(item)}>🛒 Добавить</button>
    <button onClick={() => onFavorite(item.id)}>{favorite ? "❤️ В избранном" : "🤍 В избранное"}</button>
    {onReview && <button onClick={review}>⭐ Оценить</button>}
    {canDelete && <button onClick={() => onDelete(item)}>🗑️ Удалить</button>}
  </article>;
}
