export default function CartItem({ item, index, onRemove }) {
  return <div className="cart-item" key={`${item.id}-${index}`}>
    <span>{item.name} — {item.price} сом</span>
    <button onClick={() => onRemove(index)}>Удалить</button>
  </div>;
}
