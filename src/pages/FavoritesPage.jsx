import PageTitle from "../components/PageTitle";
import ProductGrid from "../components/ProductGrid";

export default function FavoritesPage({ menu, favorites, onAdd, onFavorite, onReview }) {
  const favoriteFoods = menu.filter(item => favorites.includes(Number(item.id)));
  return <section className="page">
    <PageTitle>Избранные блюда ❤️</PageTitle>
    <ProductGrid items={favoriteFoods} favorites={favorites} onAdd={onAdd} onFavorite={onFavorite} onReview={onReview} canDelete={false} emptyMessage="В избранном пока нет блюд ❤️" />
  </section>;
}
