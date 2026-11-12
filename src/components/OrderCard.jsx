import React from "react";
import { useT, useFoodText } from "../i18n";

const steps = ["Принят", "Готовится", "Готов", "Выдан"];

export default function OrderCard({ order }) {
  const t = useT();
  const { dish } = useFoodText();
  const statusText = value => {
    const text = t(`status.${value}`);
    return text === `status.${value}` ? value : text;
  };
  const stepIndex = steps.indexOf(order.status);
  const cancelled = order.status === "Отменён";
  const finished = order.status === "Выдан" || cancelled;

  const lines = [];
  (order.items || []).forEach(item => {
    const found = lines.find(line => line.name === item.name);
    if (found) found.count += 1;
    else lines.push({ name: item.name, price: Number(item.price || 0), count: 1 });
  });

  return (
    <article className={`panel order-item ticket ${finished ? "finished" : ""}`}>
      <div className="ticket-head">
        <h3>{t("orders.order")}{String(order.id).slice(-5)}</h3>
        <span className="reservation-status">{statusText(order.status)}</span>
      </div>
      <p className="ticket-time">{order.date}</p>

      {lines.map(line => (
        <div className="ticket-line" key={line.name}>
          <span>{dish(line.name)}{line.count > 1 ? ` × ${line.count}` : ""}</span>
          <span>{line.price * line.count} {t("currency")}</span>
        </div>
      ))}
      <div className="ticket-line ticket-total">
        <span>{t("orders.sum")}</span>
        <strong>{order.total} {t("currency")}</strong>
      </div>

      {!cancelled && (
        <>
          <div className="order-steps">
            {steps.map((step, index) => (
              <span key={step} className={index <= stepIndex ? "done" : ""} />
            ))}
          </div>
          <div className="order-labels">
            {steps.map(step => <span key={step}>{statusText(step)}</span>)}
          </div>
        </>
      )}
    </article>
  );
}