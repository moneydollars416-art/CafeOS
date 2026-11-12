import React from "react";
import EmptyState from "../components/EmptyState";
import OrderCard from "../components/OrderCard";
import PageTitle from "../components/PageTitle";
import { ClipboardList } from "lucide-react";
import { useT } from "../i18n";

export default function OrdersPage({ orders, user }) {
  const t = useT();
  const mine = orders
    .filter(order => order.customer && user && String(order.customer).toLowerCase() === user.name.toLowerCase())
    .sort((a, b) => Number(b.id) - Number(a.id));

  return <section className="page">
    <PageTitle icon={ClipboardList}>{t("orders.mine")}</PageTitle>
    {mine.length
      ? mine.map(order => <OrderCard key={order.id} order={order} />)
      : <div className="panel"><EmptyState>{t("orders.empty")}</EmptyState></div>}
  </section>;
}