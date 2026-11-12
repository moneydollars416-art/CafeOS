import React, { useState } from "react";
import AddFoodForm from "../components/AddFoodForm";
import MenuFilters from "../components/MenuFilters";
import PageTitle from "../components/PageTitle";
import { UtensilsCrossed } from "lucide-react";
import ProductGrid from "../components/ProductGrid";
import { useT } from "../i18n";

export default function MenuPage({ menu, favorites, cart = [], canManage = false, onAdd, onRemoveOne, onFavorite, onDelete, onAddFood, onReview }) {
  const t = useT();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Все");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const visibleFoods = menu.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()) &&
    (category === "Все" || item.category === category) &&
    (!favoritesOnly || favorites.some(id => String(id) === String(item.id)))
  );

  return <section className="page">
    <PageTitle icon={UtensilsCrossed}>{t("menu.title")}</PageTitle>
    <MenuFilters search={search} setSearch={setSearch} category={category} setCategory={setCategory} favoritesOnly={favoritesOnly} setFavoritesOnly={setFavoritesOnly} />
    <ProductGrid items={visibleFoods} favorites={favorites} cart={cart} canDelete={canManage} onAdd={onAdd} onRemoveOne={onRemoveOne} onFavorite={onFavorite} onDelete={onDelete} onReview={onReview} emptyMessage={t("menu.empty")} />
    {canManage && <AddFoodForm onAddFood={onAddFood} />}
  </section>;
}