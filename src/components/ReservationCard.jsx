import React from "react";
export default function ReservationCard({ item, onCancel }) {
  return <article className="reservation-card">
    <h4>🪑 Столик №{item.table}</h4>
    <p><strong>Гость:</strong> {item.name}</p>
    <p><strong>Телефон:</strong> {item.phone}</p>
    <p><strong>Дата:</strong> {item.date}</p>
    <p><strong>Время:</strong> {item.time}</p>
    <p><strong>Гостей:</strong> {item.guests}</p>
    <span className="reservation-status">{item.status}</span>
    {item.status !== "Отменено" && <div><button className="cancel-reservation" onClick={() => onCancel(item)}>Отменить бронь</button></div>}
  </article>;
}
