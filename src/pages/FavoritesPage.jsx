import React from "react";
import PageTitle from "../components/PageTitle";
import ProductGrid from "../components/ProductGrid";
import { Heart } from "lucide-react";
import { useT } from "../i18n";

export default function FavoritesPage({ menu, favorites, cart = [], onAdd, onRemoveOne, onFavorite, onReview }) {
  const t = useT();
  const favoriteFoods = menu.filter(item => favorites.some(id => String(id) === String(item.id)));
  return <section className="page">
    <PageTitle icon={Heart}>{t("favorites.title")}</PageTitle>
    <ProductGrid items={favoriteFoods} favorites={favorites} cart={cart} onAdd={onAdd} onRemoveOne={onRemoveOne} onFavorite={onFavorite} onReview={onReview} canDelete={false} emptyMessage={`${t("favorites.empty")} ❤️`} />
  </section>;
}