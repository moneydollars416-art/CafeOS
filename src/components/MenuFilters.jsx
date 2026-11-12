import React from "react";
import { Search, X, UtensilsCrossed, Star } from "lucide-react";
import { useT } from "../i18n";

const categories = [
  ["Еда", "menu.food"],
  ["Напитки", "menu.drinks"]
];

export default function MenuFilters({ search, setSearch, category, setCategory, favoritesOnly, setFavoritesOnly }) {
  const t = useT();

  function showAll() {
    setCategory("Все");
    setFavoritesOnly(false);
  }

  function pickCategory(name) {
    setCategory(name);
    setFavoritesOnly(false);
  }

  return (
    <div className="menu-controls">
      <div className="modern-search-wrapper">
        <input
          type="text"
          className="modern-search-input"
          placeholder={t("menu.search")}
          value={search}
          onChange={event => setSearch(event.target.value)}
        />
        <button className="search-action-btn" type="button" onClick={() => setSearch("")}>
          {search ? <X size={18} /> : <Search size={18} />}
        </button>
      </div>

      <div className="modern-filters">
        <button
          className={`filter-chip ${category === "Все" && !favoritesOnly ? "active" : ""}`}
          type="button"
          onClick={showAll}
        >
          <UtensilsCrossed size={16} /> {t("menu.all")}
        </button>

        {categories.map(([name, key]) => (
          <button
            key={name}
            className={`filter-chip ${category === name && !favoritesOnly ? "active" : ""}`}
            type="button"
            onClick={() => pickCategory(name)}
          >
            {t(key)}
          </button>
        ))}

        <button
          className={`filter-chip ${favoritesOnly ? "active" : ""}`}
          type="button"
          onClick={() => setFavoritesOnly(current => !current)}
        >
          <Star size={16} /> {t("menu.favorites")}
        </button>
      </div>
    </div>
  );
}