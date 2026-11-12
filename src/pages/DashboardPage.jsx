import React from "react";
import { Link } from "react-router-dom";
import {
  Leaf,
  Zap,
  Sofa,
  UtensilsCrossed,
  CalendarPlus,
  Armchair,
  ChevronRight,
  Clock,
  MapPin,
  Phone
} from "lucide-react";
import { useT } from "../i18n";

const addresses = ["Киевский 149", "Аалы Токомбаева 17/2", "Чынгыза Айтматова 97/1"];
const phones = ["0777889955", "557998877"];
const steps = ["Принят", "Готовится", "Готов", "Выдан"];

export default function DashboardPage({ orders = [] }) {
  const t = useT();
  const status = value => {
    const text = t(`status.${value}`);
    return text === `status.${value}` ? value : text;
  };
  const latest = [...orders].sort((a, b) => Number(b.id) - Number(a.id))[0];
  const stepIndex = latest ? steps.indexOf(latest.status) : -1;

  return (
    <section className="page home">
      <div className="hero">
        <div className="hero-content">
          <span className="hero-tag">{t("home.tag")}</span>
          <h1>{t("home.title1")}<br />{t("home.title2")}</h1>
          <p>{t("home.subtitle")}</p>
          <div className="hero-actions">
            <Link to="/menu" className="hero-btn gold">
              <UtensilsCrossed size={16} />
              {t("home.menuBtn")}
            </Link>
            <Link to="/reservations" className="hero-btn outline">
              <CalendarPlus size={16} />
              {t("home.bookBtn")}
            </Link>
          </div>
        </div>
      </div>

      <div className="features">
        <div className="card feature"><Leaf size={22} /><p>{t("home.fresh")}</p></div>
        <div className="card feature"><Zap size={22} /><p>{t("home.fast")}</p></div>
        <div className="card feature"><Sofa size={22} /><p>{t("home.cozy")}</p></div>
      </div>

      {latest && (
        <div className="panel">
          <div className="order-top">
            <h3>{t("home.order")}{String(latest.id).slice(-5)}</h3>
            <span className="reservation-status">{status(latest.status)}</span>
          </div>
          <div className="order-steps">
            {steps.map((step, index) => (
              <span key={step} className={index <= stepIndex ? "done" : ""} />
            ))}
          </div>
          <div className="order-labels">
            {steps.map(step => <span key={step}>{status(step)}</span>)}
          </div>
        </div>
      )}

      <Link to="/reservations" className="home-link">
        <Armchair size={24} />
        <div>
          <h3>{t("home.bookTitle")}</h3>
          <p>{t("home.bookText")}</p>
        </div>
        <ChevronRight size={20} />
      </Link>

      <div className="panel">
        <h3>{t("home.about")}</h3>
        <div className="about-grid">
          <div className="info-row">
            <Clock size={18} />
            <div><strong>{t("home.hours")}</strong><p>{t("home.hoursValue")}</p></div>
          </div>
          <div className="info-row">
            <MapPin size={18} />
            <div>
              <strong>{t("home.addresses")}</strong>
              {addresses.map(address => <p key={address}>{address}</p>)}
            </div>
          </div>
          <div className="info-row">
            <Phone size={18} />
            <div>
              <strong>{t("home.phones")}</strong>
              {phones.map(phone => <p key={phone}><a href={`tel:${phone}`}>{phone}</a></p>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}