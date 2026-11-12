import React, { useState } from "react";
import {
  Wallet,
  ClipboardList,
  Receipt,
  UtensilsCrossed,
  CalendarCheck,
  TrendingUp,
  Download,
  Plus,
  Trash2,
  Users
} from "lucide-react";
import StatCard from "../components/StatCard";
import StaffPanel from "../components/StaffPanel";
import AdminOrders from "../components/AdminOrders";
import AdminReservations from "../components/AdminReservations";

const sections = [
  ["revenue", "Выручка", TrendingUp],
  ["orders", "Заказы", ClipboardList],
  ["dishes", "Блюда", UtensilsCrossed],
  ["reservations", "Брони", CalendarCheck],
  ["people", "Люди", Users],
  ["report", "Отчёт", Download]
];

const emptyForm = { name: "", price: "", category: "Еда", description: "", image: "" };
const fmt = date => date.toLocaleDateString("ru-RU");
const money = value => `${Number(value).toLocaleString("ru-RU")} сом`;

export default function AdminPage({
  menu, orders, revenue, reservations = [],
  onAddFood, onDelete, onExport, onStatus, onDeleteOrder, onCancelReservation
}) {
  const [section, setSection] = useState("revenue");
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  const active = orders.filter(order => order.status !== "Отменён");
  const todayKey = fmt(new Date());
  const todayOrders = active.filter(order => String(order.date).startsWith(todayKey));
  const todayRevenue = todayOrders.reduce((sum, order) => sum + Number(order.total || 0), 0);
  const average = active.length
    ? Math.round(active.reduce((sum, order) => sum + Number(order.total || 0), 0) / active.length)
    : 0;

  const days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - index));
    const key = fmt(date);
    const sum = active
      .filter(order => String(order.date).startsWith(key))
      .reduce((total, order) => total + Number(order.total || 0), 0);
    return { key, sum, today: index === 6, label: date.toLocaleDateString("ru-RU", { weekday: "short" }) };
  });
  const maxDay = Math.max(...days.map(day => day.sum), 1);

  const counts = {};
  active.forEach(order => (order.items || []).forEach(item => {
    counts[item.name] = (counts[item.name] || 0) + 1;
  }));
  const popular = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const maxPopular = popular[0]?.[1] || 1;

  function change(field) {
    return event => {
      setForm(current => ({ ...current, [field]: event.target.value }));
      setError("");
    };
  }

  async function submit(event) {
    event.preventDefault();
    const price = Number(form.price);
    if (!form.name.trim()) return setError("Введите название блюда");
    if (!price || price <= 0) return setError("Введите цену больше нуля");
    const dish = {
      name: form.name.trim(),
      price,
      category: form.category,
      description: form.description.trim(),
      rating: 5,
      reviews: 0
    };
    if (form.image.trim()) dish.image = form.image.trim();
    await onAddFood(dish);
    setForm(emptyForm);
  }

  return (
    <section className="page admin-page">
      <div className="admin-layout">
        <div className="admin-content">

          {section === "revenue" && (
            <>
              <h2 className="admin-title">Выручка</h2>
              <div className="stats">
                <StatCard icon={Wallet} label="Выручка за сегодня" value={money(todayRevenue)} />
                <StatCard icon={ClipboardList} label="Заказов за сегодня" value={todayOrders.length} />
                <StatCard icon={Receipt} label="Средний чек" value={money(average)} />
                <StatCard icon={TrendingUp} label="Общая выручка" value={money(revenue)} />
              </div>

              <div className="admin-grid">
                <div className="panel">
                  <h3>Выручка за 7 дней</h3>
                  <div className="bars">
                    {days.map(day => (
                      <div className="bar-col" key={day.key}>
                        <span className="bar-value">{day.sum ? day.sum : ""}</span>
                        <div
                          className={`bar ${day.today ? "today" : ""}`}
                          style={{ height: `${Math.max((day.sum / maxDay) * 100, 4)}%` }}
                        />
                        <span className="bar-label">{day.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="panel">
                  <h3>Популярные блюда</h3>
                  {popular.length ? popular.map(([name, count]) => (
                    <div className="rank" key={name}>
                      <div className="rank-top"><span>{name}</span><strong>{count}</strong></div>
                      <div className="rank-track"><div style={{ width: `${(count / maxPopular) * 100}%` }} /></div>
                    </div>
                  )) : <p className="muted-text">Пока нет заказов.</p>}
                </div>
              </div>
            </>
          )}

          {section === "orders" && (
            <>
              <h2 className="admin-title">Заказы</h2>
              <AdminOrders orders={orders} onStatus={onStatus} onDelete={onDeleteOrder} />
            </>
          )}

          {section === "dishes" && (
            <>
              <h2 className="admin-title">Блюда</h2>
              <div className="panel">
                <h3>Добавить блюдо</h3>
                <form className="admin-form" onSubmit={submit}>
                  <div>
                    <label>Название</label>
                    <input value={form.name} onChange={change("name")} placeholder="Например, Чизбургер" />
                  </div>
                  <div>
                    <label>Цена, сом</label>
                    <input type="number" min="1" value={form.price} onChange={change("price")} placeholder="250" />
                  </div>
                  <div>
                    <label>Категория</label>
                    <select value={form.category} onChange={change("category")}>
                      <option>Еда</option>
                      <option>Напитки</option>
                    </select>
                  </div>
                  <div>
                    <label>Описание</label>
                    <input value={form.description} onChange={change("description")} placeholder="Коротко о блюде" />
                  </div>
                  <div className="wide">
                    <label>Фото (ссылка на картинку)</label>
                    <input value={form.image} onChange={change("image")} placeholder="https://..." />
                  </div>
                  {error && <p className="wide form-message error">{error}</p>}
                  <div className="wide">
                    <button className="primary" type="submit"><Plus size={16} /> Добавить блюдо</button>
                  </div>
                </form>
              </div>

              <div className="panel">
                <h3>Все блюда · {menu.length}</h3>
                {menu.map(item => (
                  <div className="dish-row" key={item.id}>
                    <div>
                      <strong>{item.name}</strong>
                      <p className="muted-text">{item.category} · {item.price} сом</p>
                    </div>
                    <button type="button" className="icon-danger" onClick={() => onDelete(item)} aria-label="Удалить">
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {section === "reservations" && (
            <>
              <h2 className="admin-title">Брони</h2>
              <AdminReservations reservations={reservations} onCancel={onCancelReservation} />
            </>
          )}

          {section === "people" && (
            <>
              <h2 className="admin-title">Люди</h2>
              <StaffPanel />
            </>
          )}

          {section === "report" && (
            <>
              <h2 className="admin-title">Отчёт</h2>
              <div className="panel">
                <h3>Экспорт заказов</h3>
                <p className="muted-text">Файл CSV со всеми заказами открывается в Excel.</p>
                <button className="primary" onClick={onExport}><Download size={16} /> Скачать отчёт CSV</button>
              </div>
            </>
          )}
        </div>

        <nav className="admin-tabs">
          {sections.map(([id, label, Icon]) => (
            <button
              key={id}
              type="button"
              className={section === id ? "active" : ""}
              onClick={() => setSection(id)}
            >
              <Icon size={18} /> {label}
            </button>
          ))}
        </nav>
      </div>
    </section>
  );
}