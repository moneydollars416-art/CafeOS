import React from "react";
export default function ReservationForm({ localDate, onSubmit }) {
  return <div className="reservation-form"><form onSubmit={onSubmit}>
    <label htmlFor="reservationName">Имя гостя</label><input id="reservationName" name="name" placeholder="Например, Али" required />
    <label htmlFor="reservationPhone">Номер телефона</label><input id="reservationPhone" name="phone" type="tel" placeholder="+996..." required />
    <label htmlFor="reservationDate">Дата</label><input id="reservationDate" name="date" type="date" min={localDate} defaultValue={localDate} required />
    <label htmlFor="reservationTime">Время</label><input id="reservationTime" name="time" type="time" min="09:00" max="22:00" required />
    <label htmlFor="reservationGuests">Количество гостей</label>
    <select id="reservationGuests" name="guests" defaultValue="2">
      {[1, 2, 3, 4, 5, 6].map(count => <option key={count} value={count}>{count} {count === 1 ? "гость" : "гостей"}</option>)}
    </select>
    <label htmlFor="reservationTable">Столик</label>
    <select id="reservationTable" name="table" defaultValue="1">
      {[1, 2, 3, 4, 5, 6].map(table => <option key={table} value={table}>Столик №{table}</option>)}
    </select>
    <button className="primary" type="submit">✅ Забронировать столик</button>
  </form></div>;
}
