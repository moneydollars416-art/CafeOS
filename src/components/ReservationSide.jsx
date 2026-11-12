import React from "react";
import { User, CalendarDays, Armchair, Phone, X } from "lucide-react";
import { useT } from "../i18n";

const shortDate = value => String(value).split("-").reverse().join(".");

export default function ReservationSide({ reservations, onCancel }) {
  const t = useT();
  const now = new Date();
  const guestWord = count => count === 1 ? t("res.guest1") : count < 5 ? t("res.guest2") : t("res.guest5");
  const statusText = value => {
    const text = t(`status.${value}`);
    return text === `status.${value}` ? value : text;
  };
  const isUpcoming = item => item.status !== "Отменено" && new Date(`${item.date}T${item.time}`) > now;

  const main = reservations.find(isUpcoming);
  const rest = reservations.filter(item => item !== main);

  function cancel(item) {
    if (window.confirm(t("res.cancelConfirm"))) onCancel(item);
  }

  return (
    <aside className="res-side">
      {main ? (
        <div className="res-box">
          <div className="res-box-head">
            <h3>{t("res.mine")}</h3>
            <span className="reservation-status">{statusText(main.status)}</span>
          </div>
          <p><User size={16} /> {main.name}</p>
          <p><CalendarDays size={16} /> {shortDate(main.date)}, {main.time}</p>
          <p><Armchair size={16} /> {t("res.tableN")}{main.table} · {main.guests} {guestWord(Number(main.guests))}</p>
          <p><Phone size={16} /> {main.phone}</p>
          <button type="button" className="res-cancel" onClick={() => cancel(main)}>
            <X size={14} /> {t("res.cancel")}
          </button>
        </div>
      ) : (
        <div className="panel res-empty">{t("res.empty")}</div>
      )}

      {rest.length > 0 && (
        <div className="panel">
          <h3>{t("res.others")}</h3>
          {rest.map(item => (
            <div className="res-mini" key={item.id}>
              <div>
                <strong>{shortDate(item.date)}, {item.time}</strong>
                <p className="muted-text">{t("res.tableN")}{item.table} · {item.guests} {guestWord(Number(item.guests))}</p>
              </div>
              <div className="res-mini-right">
                <span className="reservation-status">{statusText(item.status)}</span>
                {isUpcoming(item) && (
                  <button type="button" className="icon-danger" onClick={() => cancel(item)} aria-label={t("res.cancel")}>
                    <X size={15} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </aside>
  );
}