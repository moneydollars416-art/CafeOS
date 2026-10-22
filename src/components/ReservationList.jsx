import React from "react";
import EmptyState from "./EmptyState";
import ReservationCard from "./ReservationCard";

export default function ReservationList({ reservations, onCancel }) {
  return <>
    <h3>📋 Список бронирований</h3>
    {reservations.length
      ? reservations.map(item => <ReservationCard key={item.id} item={item} onCancel={onCancel} />)
      : <EmptyState>Пока бронирований нет 🪑</EmptyState>}
  </>;
}
