import CartSummary from "../components/CartSummary";
import PageTitle from "../components/PageTitle";

export default function CashierPage({ cart, onRemove, onClear, onCheckout }) {
  return <section className="page">
    <PageTitle>Касса 💰</PageTitle>
    <CartSummary cart={cart} onRemove={onRemove} onClear={onClear} onCheckout={onCheckout} />
  </section>;
}
