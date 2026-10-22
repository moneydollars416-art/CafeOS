import EmptyState from "./EmptyState";
import FoodCard from "./FoodCard";

export default function ProductGrid({ items, favorites, onAdd, onFavorite, onDelete, onReview, emptyMessage, canDelete = true }) {
  return <div className="food-grid">
    {items.length ? items.map(item => (
      <FoodCard
        key={item.id}
        item={item}
        favorite={favorites.includes(Number(item.id))}
        onAdd={onAdd}
        onFavorite={onFavorite}
        onDelete={onDelete}
        onReview={onReview}
        canDelete={canDelete}
      />
    )) : <EmptyState>{emptyMessage}</EmptyState>}
  </div>;
}
