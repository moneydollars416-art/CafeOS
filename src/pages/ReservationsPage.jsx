import React from "react";
import ReservationForm from "../components/ReservationForm";
import ReservationSide from "../components/ReservationSide";
import { isAdmin } from "../config";

export default function ReservationsPage({ reservations, user, onAdd, onCancel }) {
  const today = new Date();
  const localDate = [today.getFullYear(), String(today.getMonth() + 1).padStart(2, "0"), String(today.getDate()).padStart(2, "0")].join("-");
  const admin = isAdmin(user);

  const mine = reservations
    .filter(item => admin || (item.customer && user && String(item.customer).toLowerCase() === user.name.toLowerCase()))
    .sort((a, b) => `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`));

  return <section className="page">
    <div className="res-layout">
      <ReservationForm
        localDate={localDate}
        reservations={reservations}
        onSubmit={item => onAdd({ ...item, customer: user.name })}
      />
      <ReservationSide reservations={mine} onCancel={onCancel} />
    </div>
  </section>;
}