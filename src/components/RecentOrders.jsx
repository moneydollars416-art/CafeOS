import EmptyState from "./EmptyState";
import Panel from "./Panel";

export default function RecentOrders({ orders }) {
  return <Panel>
    <h2>Последние заказы</h2>
    {orders.length ? orders.slice(0, 3).map(order => (
      <p key={order.id}>Заказ №{String(order.id).slice(-5)} — {order.total} сом</p>
    )) : <EmptyState>Заказов пока нет</EmptyState>}
  </Panel>;
}
