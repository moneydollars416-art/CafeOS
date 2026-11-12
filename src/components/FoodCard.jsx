import React from "react";
import { Plus, Minus, Heart, Star, Trash2 } from "lucide-react";
import { foodImages } from "../data";
import { useT, useFoodText } from "../i18n";

export default function FoodCard({ item, favorite, quantity = 0, onAdd, onRemoveOne, onFavorite, onDelete, onReview, canDelete = false }) {
  const t = useT();
  const { dish, desc } = useFoodText();

  function review() {
    const answer = window.prompt("1 – 5:");
    if (answer === null || answer.trim() === "") return;
    const rating = Number(answer);
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) return window.alert("1 – 5");
    onReview?.(item.id, rating);
  }

  return (
    <article className={`product food-card ${quantity ? "in-cart" : ""}`}>
      <div className="food-media">
        <img
          className="food-image"
          src={item.image || foodImages[item.name] || "https://placehold.co/600x400?text=Food"}
          alt={dish(item.name)}
          loading="lazy"
        />
        <button
          type="button"
          className={`fav-btn ${favorite ? "active" : ""}`}
          onClick={() => onFavorite(item.id)}
          aria-label={favorite ? t("food.inFav") : t("food.toFav")}
        >
          <Heart size={17} fill={favorite ? "currentColor" : "none"} />
        </button>
        {onReview && (
          <button type="button" className="rating-badge" onClick={review} aria-label={t("food.rate")}>
            <Star size={12} fill="currentColor" />
            {Number(item.rating || 5).toFixed(1)}
          </button>
        )}
        {canDelete && (
          <button type="button" className="food-delete" onClick={() => onDelete(item)} aria-label={t("food.delete")}>
            <Trash2 size={16} />
          </button>
        )}
      </div>

      <div className="food-body">
        <h3>{dish(item.name)}</h3>
        <p className="food-desc">{desc(item.description || "")}</p>
        <div className="food-bottom">
          <span className="food-price">{item.price} {t("currency")}</span>
          {quantity > 0 && onRemoveOne ? (
            <div className="qty">
              <button type="button" onClick={() => onRemoveOne(item.id)} aria-label="−"><Minus size={15} /></button>
              <span>{quantity}</span>
              <button type="button" className="plus" onClick={() => onAdd(item)} aria-label="+"><Plus size={15} /></button>
            </div>
          ) : (
            <button type="button" className="add-btn" onClick={() => onAdd(item)} aria-label={t("food.add")}>
              <Plus size={20} />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}