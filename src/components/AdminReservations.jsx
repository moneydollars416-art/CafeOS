import React from "react";
import { X } from "lucide-react";

const shortDate = value => String(value).split("-").reverse().join(".");

export default function AdminReservations({ reservations, onCancel }) {
  const list = [...reservations].sort((a, b) =>
    `${b.date}T${b.time}`.localeCompare(`${a.date}T${a.time}`)
  );

  function cancel(item) {
    if (window.confirm("Отменить эту бронь?")) onCancel(item);
  }

  return (
    <div className="panel">
      <h3>Все брони</h3>
      {list.length ? list.map(item => (
        <div className="admin-order" key={item.id}>
          <div className="admin-order-top">
            <strong>{shortDate(item.date)}, {item.time} · Столик №{item.table}</strong>
            <span className="reservation-status">{item.status}</span>
          </div>
          <div>{item.name} · {item.phone}</div>
          <p className="muted-text">
            {item.guests} гост.{item.customer ? ` · ${item.customer}` : ""}
          </p>
          {item.status !== "Отменено" && (
            <button type="button" className="res-cancel" onClick={() => cancel(item)}>
              <X size={14} /> Отменить
            </button>
          )}
        </div>
      )) : <p className="muted-text">Броней нет.</p>}
    </div>
  );
}