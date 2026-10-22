import EmptyState from "../components/EmptyState";
import RecentOrders from "../components/RecentOrders";
import StatCard from "../components/StatCard";

export default function DashboardPage({ revenue, orders, menu }) {
  return <section className="page">
    <div className="stats">
      <StatCard label="💰 Выручка" value={`${revenue} сом`} />
      <StatCard label="📋 Заказы" value={orders.length} />
      <StatCard label="🍔 Блюда в меню" value={menu.length} />
    </div>
    {orders.length ? <RecentOrders orders={orders} /> : <div className="panel"><h2>Последние заказы</h2><EmptyState>Заказов пока нет</EmptyState></div>}
  </section>;
}
