import CartItem from "./CartItem";
import EmptyState from "./EmptyState";

export default function CartSummary({ cart, onRemove, onClear, onCheckout }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  return <div className="panel">
    <p>Выбранные блюда:</p>
    <div id="cart">{cart.length
      ? cart.map((item, index) => <CartItem key={`${item.id}-${index}`} item={item} index={index} onRemove={onRemove} />)
      : <EmptyState>Корзина пуста</EmptyState>}</div>
    <hr />
    <h3>Итого: <span>{total}</span> сом</h3>
    <button className="primary" onClick={onCheckout}>Оформить заказ</button>
    <button onClick={onClear}>Очистить корзину</button>
  </div>;
}
