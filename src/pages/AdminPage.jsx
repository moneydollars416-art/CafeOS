import React from "react";
import PageTitle from "../components/PageTitle";
import StatCard from "../components/StatCard";

export default function AdminPage({ menu, orders, revenue, onExport }) {
  return <section className="page">
    <PageTitle>Панель управления 🛠️</PageTitle>
    <div className="stats">
      <StatCard label="Всего товаров" value={menu.length} />
      <StatCard label="Всего заказов" value={orders.length} />
      <StatCard label="Выручка" value={`${revenue} сом`} />
    </div>
    <div className="panel"><h3>Управление товарами</h3><p>Добавляй блюда через раздел «Меню», удаляй ненужные товары там же.</p></div>
    <div className="panel"><h3>Экспорт заказов</h3><button className="primary" onClick={onExport}>📥 Скачать отчёт CSV</button></div>
  </section>;
}
