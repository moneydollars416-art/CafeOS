import { useState } from "react";
import AddFoodForm from "../components/AddFoodForm";
import MenuFilters from "../components/MenuFilters";
import PageTitle from "../components/PageTitle";
import ProductGrid from "../components/ProductGrid";

export default function MenuPage({ menu, favorites, onAdd, onFavorite, onDelete, onAddFood, onReview }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Все");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const visibleFoods = menu.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()) &&
    (category === "Все" || item.category === category) &&
    (!favoritesOnly || favorites.includes(item.id))
  );

  return <section className="page">
    <PageTitle>Наше меню 🍽️</PageTitle>
    <MenuFilters search={search} setSearch={setSearch} category={category} setCategory={setCategory} favoritesOnly={favoritesOnly} setFavoritesOnly={setFavoritesOnly} />
    <ProductGrid items={visibleFoods} favorites={favorites} onAdd={onAdd} onFavorite={onFavorite} onDelete={onDelete} onReview={onReview} emptyMessage="Блюда не найдены." />
    <AddFoodForm onAddFood={onAddFood} />
  </section>;
}
