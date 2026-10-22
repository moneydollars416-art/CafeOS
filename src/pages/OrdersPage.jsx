import React from "react";
import EmptyState from "../components/EmptyState";
import OrderCard from "../components/OrderCard";
import PageTitle from "../components/PageTitle";

export default function OrdersPage({ orders, onStatus, onDelete }) {
  return <section className="page">
    <PageTitle>Все заказы 📋</PageTitle>
    {orders.length
      ? orders.map(order => <OrderCard key={order.id} order={order} onStatus={onStatus} onDelete={onDelete} />)
      : <div className="panel"><EmptyState>Заказов пока нет.</EmptyState></div>}
  </section>;
}
