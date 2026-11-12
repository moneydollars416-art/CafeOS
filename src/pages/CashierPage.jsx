import React from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Plus, Minus, Trash2, UtensilsCrossed, Check } from "lucide-react";
import PageTitle from "../components/PageTitle";
import { foodImages } from "../data";
import { useT, useFoodText } from "../i18n";

export default function CashierPage({ cart, onAdd, onRemoveOne, onClear, onCheckout }) {
  const t = useT();
  const { dish } = useFoodText();

  const lines = [];
  cart.forEach(item => {
    const found = lines.find(line => String(line.item.id) === String(item.id));
    if (found) found.count += 1;
    else lines.push({ item, count: 1 });
  });
  const total = cart.reduce((sum, item) => sum + Number(item.price || 0), 0);

  function removeAll(line) {
    for (let i = 0; i < line.count; i += 1) onRemoveOne(line.item.id);
  }

  if (!lines.length) {
    return (
      <section className="page">
        <PageTitle icon={ShoppingBag}>{t("cart.title")}</PageTitle>
        <div className="panel cart-empty">
          <ShoppingBag size={44} />
          <h3>{t("cart.empty")}</h3>
          <p>{t("cart.emptyText")}</p>
          <Link to="/menu" className="hero-btn gold">
            <UtensilsCrossed size={16} /> {t("cart.toMenu")}
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="page">
      <PageTitle icon={ShoppingBag}>{t("cart.title")}</PageTitle>
      <div className="cart-layout">
        <div className="panel">
          <h3>{t("cart.items")}</h3>
          {lines.map(line => (
            <div className="cart-row" key={line.item.id}>
              <img
                src={line.item.image || foodImages[line.item.name] || "https://placehold.co/120x120?text=Food"}
                alt={dish(line.item.name)}
              />
              <div className="cart-row-info">
                <strong>{dish(line.item.name)}</strong>
                <span className="muted-text">{line.item.price} {t("currency")}</span>
              </div>
              <div className="qty">
                <button type="button" onClick={() => onRemoveOne(line.item.id)} aria-label="−">
                  <Minus size={15} />
                </button>
                <span>{line.count}</span>
                <button type="button" className="plus" onClick={() => onAdd(line.item)} aria-label="+">
                  <Plus size={15} />
                </button>
              </div>
              <strong className="cart-row-total">{Number(line.item.price) * line.count} {t("currency")}</strong>
              <button type="button" className="icon-danger" onClick={() => removeAll(line)} aria-label="Удалить">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        <aside className="panel cart-summary">
          <h3>{t("cart.summary")}</h3>
          {lines.map(line => (
            <div className="ticket-line" key={line.item.id}>
              <span>{dish(line.item.name)} × {line.count}</span>
              <span>{Number(line.item.price) * line.count} {t("currency")}</span>
            </div>
          ))}
          <div className="ticket-line ticket-total">
            <span>{t("orders.sum")}</span>
            <strong>{total} {t("currency")}</strong>
          </div>
          <button type="button" className="primary res-submit" onClick={onCheckout}>
            <Check size={16} /> {t("cart.checkout")}
          </button>
          <button type="button" className="cart-clear" onClick={onClear}>{t("cart.clear")}</button>
        </aside>
      </div>
    </section>
  );
}