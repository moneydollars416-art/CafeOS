import React, { useState } from "react";
import { Trash2 } from "lucide-react";

const statuses = ["Принят", "Готовится", "Готов", "Выдан", "Отменён"];

export default function AdminOrders({ orders, onStatus, onDelete }) {
  const [filter, setFilter] = useState("Все");

  const counts = orders.reduce((result, order) => {
    result[order.status] = (result[order.status] || 0) + 1;
    return result;
  }, {});

  const list = [...orders]
    .filter(order => filter === "Все" || order.status === filter)
    .sort((a, b) => Number(b.id) - Number(a.id));

  return (
    <div className="panel">
      <h3>Все заказы</h3>
      <div className="chips filter-row">
        <button type="button" className={`chip chip-btn ${filter === "Все" ? "active" : ""}`} onClick={() => setFilter("Все")}>
          Все · {orders.length}
        </button>
        {statuses.map(status => (
          <button
            key={status}
            type="button"
            className={`chip chip-btn ${filter === status ? "active" : ""}`}
            onClick={() => setFilter(status)}
          >
            {status} · {counts[status] || 0}
          </button>
        ))}
      </div>

      {list.length ? list.map(order => (
        <div className="admin-order" key={order.id}>
          <div className="admin-order-top">
            <strong>Заказ №{String(order.id).slice(-5)} · {order.total} сом</strong>
            <span className="muted-text">{order.date}</span>
          </div>
          <div>{order.customer || "—"}</div>
          <p className="muted-text">{(order.items || []).map(item => item.name).join(", ")}</p>
          <div className="admin-order-actions">
            <select value={order.status} onChange={event => onStatus(order.id, event.target.value)}>
              {statuses.map(status => <option key={status}>{status}</option>)}
            </select>
            <button type="button" className="icon-danger" onClick={() => onDelete(order)} aria-label="Удалить">
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      )) : <p className="muted-text">Заказов нет.</p>}
    </div>
  );
}