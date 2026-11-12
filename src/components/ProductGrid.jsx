import React from "react";
import EmptyState from "./EmptyState";
import FoodCard from "./FoodCard";

export default function ProductGrid({ items, favorites, cart = [], onAdd, onRemoveOne, onFavorite, onDelete, onReview, emptyMessage, canDelete = false }) {
  return <div className="food-grid">
    {items.length ? items.map(item => (
      <FoodCard
        key={item.id}
        item={item}
        favorite={favorites.some(id => String(id) === String(item.id))}
        quantity={cart.filter(entry => String(entry.id) === String(item.id)).length}
        onAdd={onAdd}
        onRemoveOne={onRemoveOne}
        onFavorite={onFavorite}
        onDelete={onDelete}
        onReview={onReview}
        canDelete={canDelete}
      />
    )) : <EmptyState>{emptyMessage}</EmptyState>}
  </div>;
}