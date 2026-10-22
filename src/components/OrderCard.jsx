export default function OrderCard({ order, onStatus, onDelete }) {
  const statuses = ["Принят", "Готовится", "Готов", "Выдан", "Отменён"];
  return <article className="panel order-item">
    <h3>Заказ №{String(order.id).slice(-5)}</h3>
    <p>{order.items.map(item => item.name).join(", ")}</p>
    <p>Сумма: {order.total} сом</p>
    <p>Дата: {order.date}</p>
    <label htmlFor={`status-${order.id}`}>Статус заказа</label>
    <select id={`status-${order.id}`} value={order.status} onChange={event => onStatus(order.id, event.target.value)}>
      {statuses.map(status => <option key={status}>{status}</option>)}
    </select>
    <button onClick={() => onDelete(order)}>Удалить заказ</button>
  </article>;
}
