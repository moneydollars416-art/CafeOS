export default function MenuFilters({ search, setSearch, category, setCategory, favoritesOnly, setFavoritesOnly }) {
  return <div className="panel menu-controls">
    <input aria-label="Поиск блюда" value={search} onChange={event => setSearch(event.target.value)} placeholder="Поиск блюда..." />
    <select aria-label="Категория" value={category} onChange={event => setCategory(event.target.value)}>
      <option>Все</option><option>Еда</option><option>Напитки</option>
    </select>
    <button className={favoritesOnly ? "primary" : ""} onClick={() => setFavoritesOnly(true)}>⭐ Избранное</button>
    <button onClick={() => setFavoritesOnly(false)}>🍽️ Все блюда</button>
  </div>;
}
