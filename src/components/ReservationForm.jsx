import React, { useState } from "react";
import { Minus, Plus, Check, AlertCircle, Phone } from "lucide-react";
import { TABLES } from "../tables";
import { useT } from "../i18n";

const toMinutes = time => {
  const [hours, minutes] = String(time).split(":").map(Number);
  return hours * 60 + minutes;
};

const normalizePhone = value => {
  let digits = value.replace(/\D/g, "");
  if (digits.length === 10 && digits.startsWith("0")) digits = "996" + digits.slice(1);
  return digits;
};

function FieldError({ text }) {
  if (!text) return null;
  return <p className="field-error"><AlertCircle size={14} /> {text}</p>;
}

export default function ReservationForm({ localDate, reservations, onSubmit }) {
  const t = useT();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+996 ");
  const [date, setDate] = useState(localDate);
  const [time, setTime] = useState("");
  const [table, setTable] = useState(null);
  const [guests, setGuests] = useState(2);
  const [errors, setErrors] = useState({});

  const selected = TABLES.find(item => item.id === table);
  const maxGuests = selected ? selected.seats : 10;
  const guestWord = count => count === 1 ? t("res.guest1") : count < 5 ? t("res.guest2") : t("res.guest5");
  const seatsWord = count => count < 5 ? t("res.seats2") : t("res.seats5");

  const isBusy = id => Boolean(time && date) && reservations.some(item =>
    item.status !== "Отменено" &&
    item.date === date &&
    String(item.table) === String(id) &&
    Math.abs(toMinutes(item.time) - toMinutes(time)) < 120
  );

  function clearError(field) {
    setErrors(current => ({ ...current, [field]: undefined }));
  }

  function pickTable(item) {
    if (isBusy(item.id)) return;
    setTable(item.id);
    setGuests(current => Math.min(current, item.seats));
    clearError("table");
  }

  function submit(event) {
    event.preventDefault();
    const next = {};
    const digits = normalizePhone(phone);

    if (name.trim().length < 2) next.name = t("res.errName");
    if (!/^996\d{9}$/.test(digits)) next.phone = t("res.errPhone");
    if (!date) next.date = t("res.errDate");
    if (!time) next.time = t("res.errTime");
    else if (date && new Date(`${date}T${time}`) <= new Date()) next.time = t("res.errPast");
    if (!table) next.table = t("res.errTable");
    else if (isBusy(table)) next.table = t("res.errBusy");

    setErrors(next);
    if (Object.keys(next).length) return;

    onSubmit({
      id: Date.now(),
      name: name.trim(),
      phone: `+${digits}`,
      date,
      time,
      guests,
      table: String(table),
      status: "Подтверждено"
    });
    setName("");
    setPhone("+996 ");
    setTime("");
    setTable(null);
    setGuests(2);
  }

  return (
    <div className="reservation-form">
      <form onSubmit={submit} noValidate>
        <label htmlFor="resName">{t("res.guestName")}</label>
        <input
          id="resName"
          className={errors.name ? "has-error" : ""}
          value={name}
          onChange={event => { setName(event.target.value); clearError("name"); }}
          placeholder={t("res.guestPlaceholder")}
        />
        <FieldError text={errors.name} />

        <label htmlFor="resPhone">{t("res.phone")}</label>
        <div className="phone-input-wrapper">
          <span className="phone-flag"><Phone size={16} /></span>
          <input
            id="resPhone"
            type="tel"
            className={errors.phone ? "has-error" : ""}
            value={phone}
            onChange={event => { setPhone(event.target.value); clearError("phone"); }}
            placeholder="+996..."
          />
        </div>
        <FieldError text={errors.phone} />

        <div className="res-two">
          <div>
            <label htmlFor="resDate">{t("res.date")}</label>
            <input
              id="resDate"
              type="date"
              min={localDate}
              className={errors.date ? "has-error" : ""}
              value={date}
              onChange={event => { setDate(event.target.value); clearError("date"); }}
            />
            <FieldError text={errors.date} />
          </div>
          <div>
            <label htmlFor="resTime">{t("res.time")}</label>
            <input
              id="resTime"
              type="time"
              className={errors.time ? "has-error" : ""}
              value={time}
              onChange={event => { setTime(event.target.value); clearError("time"); }}
            />
            <FieldError text={errors.time} />
          </div>
        </div>

        <label>{t("res.table")}</label>
        <div className="table-grid">
          {TABLES.map(item => {
            const busy = isBusy(item.id);
            return (
              <button
                type="button"
                key={item.id}
                disabled={busy}
                className={`table-btn ${table === item.id ? "active" : ""} ${busy ? "busy" : ""}`}
                onClick={() => pickTable(item)}
              >
                <strong>{item.id}</strong>
                <span>{busy ? t("res.busy") : `${item.seats} ${seatsWord(item.seats)}`}</span>
              </button>
            );
          })}
        </div>
        {selected && (
          <p className="table-hint">
            {t("res.tableN")}{selected.id} · {t("res.upTo")} {selected.seats} {guestWord(selected.seats)}
          </p>
        )}
        <FieldError text={errors.table} />

        <div className="guests-row">
          <label>{t("res.guests")}</label>
          <div className="stepper">
            <button type="button" disabled={guests <= 1} onClick={() => setGuests(current => current - 1)}>
              <Minus size={15} />
            </button>
            <span>{guests} {guestWord(guests)}</span>
            <button type="button" className="plus" disabled={guests >= maxGuests} onClick={() => setGuests(current => current + 1)}>
              <Plus size={15} />
            </button>
          </div>
        </div>

        <button className="primary res-submit" type="submit">
          <Check size={16} /> {t("res.submit")}
        </button>
      </form>
    </div>
  );
}