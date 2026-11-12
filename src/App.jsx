import React, { useEffect, useState } from "react";
import { LanguageContext, translations } from "./i18n";
import Toast from "./components/Toast";
import ChatBot from "./components/ChatBot";
import { Navigate, Outlet, Route, Routes, useLocation, useNavigate } from "react-router-dom"
import {
  createOrder,
  createProduct,
  deleteOrderApi,
  deleteProduct,
  getOrders,
  getProducts,
  updateOrder,
  updateProduct
} from "./api";
import AppHeader from "./components/AppHeader";
import AuthScreen from "./components/AuthScreen";
import Sidebar from "./components/Sidebar";
import { defaultMenu, navigation } from "./data";
import useStoredState, { loadJSON } from "./hooks/useStoredState";
import AdminPage from "./pages/AdminPage";
import CashierPage from "./pages/CashierPage";
import DashboardPage from "./pages/DashboardPage";
import FavoritesPage from "./pages/FavoritesPage";
import MenuPage from "./pages/MenuPage";
import OrdersPage from "./pages/OrdersPage";
import ReservationsPage from "./pages/ReservationsPage";
import SettingsPage from "./pages/SettingsPage";
import { isAdmin } from "./config";

function ProtectedLayout({ user, language, setLanguage, dark, setDark, cafeName, onLogout }) {
  const location = useLocation();
  const pageId = location.pathname.split("/")[1] || "dashboard";
  const page = navigation.find(([id]) => id === pageId);
  const languageIndex = language === "ky" ? 3 : language === "en" ? 4 : 2;
  const title = page ? page[languageIndex] : cafeName;

  if (!user) return <Navigate to="/login" replace />;
  if (pageId === "admin" && !isAdmin(user)) return <Navigate to="/" replace />;
  return <div className="app-shell" data-area={pageId === "admin" ? "admin" : "client"}>
    <Sidebar language={language} user={user} setLanguage={setLanguage} dark={dark} setDark={setDark} />
    <main className="main">
      <AppHeader title={title} user={user} onLogout={onLogout} />
      <Outlet />
    </main>
  </div>;
}

export default function App() {
  const users = loadJSON("cafeUsers", []);
  const [user, setUser] = useState(() => {
    const saved = loadJSON("cafeCurrentUser", null);
    return saved && users.some(item => item.name === saved.name) ? saved : null;
  });
  const [menu, setMenu] = useState(defaultMenu);
  const [orders, setOrders] = useState([]);
  const [favorites, setFavorites] = useStoredState("favorites", []);
  const [cart, setCart] = useStoredState("cart", []);
  const [reservations, setReservations] = useStoredState("cafeReservations", []);
  const [revenue, setRevenue] = useState(() => Number(localStorage.getItem("revenue")) || 0);
  const [language, setLanguage] = useState(() => localStorage.getItem("language") || "ru");
  const [cafeName, setCafeName] = useState(() => localStorage.getItem("cafeName") || "CafeOS");
  const [dark, setDark] = useState(() => localStorage.getItem("darkTheme") === "true");
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);
  const tr = key => translations[language]?.[key] ?? translations.ru[key] ?? key;
  function notify(key, detail) {
    setToast({ title: tr(key), detail });
  }

  useEffect(() => {
    let cancelled = false;

    async function loadRemoteData() {
      try {
        const [products, remoteOrders] = await Promise.all([getProducts(), getOrders()]);
        if (!cancelled) {
          setMenu(products.length ? products : defaultMenu);
          setOrders(remoteOrders);
          setRevenue(remoteOrders.reduce((sum, order) => order.status !== "Отменён" ? sum + Number(order.total || 0) : sum, 0));
        }
      } catch (error) {
        console.error("Failed to load remote data", error);
        if (!cancelled) {
          setMenu(loadJSON("menu", defaultMenu));
          setOrders(loadJSON("orders", []));
        }
      }
    }

    loadRemoteData();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dark-theme", dark);
    localStorage.setItem("darkTheme", String(dark));
  }, [dark]);
  useEffect(() => { localStorage.setItem("revenue", String(revenue)); }, [revenue]);
  useEffect(() => { localStorage.setItem("language", language); }, [language]);
  useEffect(() => { document.title = `${cafeName} — Управление кафе`; }, [cafeName]);
  useEffect(() => { localStorage.setItem("menu", JSON.stringify(menu)); }, [menu]);
  useEffect(() => { localStorage.setItem("orders", JSON.stringify(orders)); }, [orders]);

  function login(signedInUser) {
    setUser(signedInUser);
    navigate("/", { replace: true });
  }

  function logout() {
    localStorage.removeItem("cafeCurrentUser");
    setUser(null);
    navigate("/login", { replace: true });
  }

  function addToCart(item) {
  setCart(current => [...current, { ...item }]);
}

function removeOneFromCart(id) {
  setCart(current => {
    const index = current.findLastIndex(item => String(item.id) === String(id));
    return index === -1 ? current : current.filter((_, i) => i !== index);
  });
}

  function toggleFavorite(id) {
  setFavorites(current =>
    current.some(item => String(item) === String(id))
      ? current.filter(item => String(item) !== String(id))
      : [...current, id]
  );
}

  async function deleteFood(item) {
    if (!window.confirm(`Удалить блюдо «${item.name}»?`)) return;

    try {
      await deleteProduct(item.id);
      setMenu(current => current.filter(food => food.id !== item.id));
      setFavorites(current => current.filter(id => id !== item.id));
      setCart(current => current.filter(food => food.id !== item.id));
    } catch (error) {
      console.error(error);
      window.alert("Не удалось удалить блюдо. Попробуйте позже.");
    }
  }

 async function updateReview(id, rating) {
  const currentItem = menu.find(item => String(item.id) === String(id));
  if (!currentItem) return;
  const reviews = Number(currentItem.reviews || 0);
  const nextItem = {
    ...currentItem,
    rating: Number((((Number(currentItem.rating) || 5) * reviews + rating) / (reviews + 1)).toFixed(1)),
    reviews: reviews + 1
  };

  setMenu(current => current.map(item => String(item.id) === String(id) ? nextItem : item));

  try {
    await updateProduct(id, nextItem);
  } catch (error) {
    console.error(error);
  }
}
  async function handleAddFood(item) {
    try {
      const savedItem = await createProduct(item);
      setMenu(current => [...current, savedItem]);
    } catch (error) {
      console.error(error);
      window.alert("Не удалось добавить блюдо.");
    }
  }

  async function checkout() {
    if (!cart.length) return window.alert("Сначала добавьте блюда в корзину!");
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const order = { items: cart.map(item => ({ ...item })), total, date: new Date().toLocaleString("ru-RU"), status: "Принят", customer: user.name };
    try {
      const createdOrder = await createOrder(order);
      setOrders(current => [createdOrder, ...current]);
      setRevenue(current => current + total);
      setCart([]);
      notify("toast.ordered", tr("toast.ordersHint"));
      navigate("/orders");
    } catch (error) {
      console.error(error);
      window.alert("Не удалось оформить заказ. Попробуйте позже.");
    }
  }

  async function deleteOrder(order) {
    if (!window.confirm("Удалить заказ?")) return;
    try {
      await deleteOrderApi(order.id);
      setOrders(current => current.filter(item => item.id !== order.id));
      if (order.status !== "Отменён") setRevenue(current => Math.max(0, current - order.total));
    } catch (error) {
      console.error(error);
      window.alert("Не удалось удалить заказ.");
    }
  }
  async function changeOrderStatus(id, status) {
  const currentOrder = orders.find(order => String(order.id) === String(id));
  if (!currentOrder) return;
  try {
    const savedOrder = await updateOrder(id, { ...currentOrder, status });
    setOrders(current => current.map(order => String(order.id) === String(id) ? savedOrder : order));
  } catch (error) {
    console.error(error);
    window.alert("Не удалось обновить статус заказа.");
  }
}

  function exportOrders() {
    const rows = [["Номер", "Блюда", "Сумма", "Дата", "Статус"], ...orders.map(order => [order.id, order.items.map(item => item.name).join("; "), order.total, order.date, order.status])];
    const csv = rows.map(row => row.map(value => `"${String(value).replaceAll('"', '""')}"`).join(",")).join("\n");
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8" }));
    link.download = "cafe-orders.csv";
    link.click();
    URL.revokeObjectURL(link.href);
  }
  function addReservation(item) {
    setReservations(current => [...current, item]);
    notify("toast.booked", `${tr("res.tableN")}${item.table} · ${item.date.split("-").reverse().join(".")}, ${item.time}`);
  }

  function cancelReservation(item) {
    setReservations(current => current.map(reservation => reservation.id === item.id ? { ...reservation, status: "Отменено" } : reservation));
  }

  return <LanguageContext.Provider value={language}><Routes>
    <Route path="/login" element={user ? <Navigate to="/" replace /> : <AuthScreen onLogin={login} />} />
    <Route element={<ProtectedLayout user={user} language={language} setLanguage={setLanguage} dark={dark} setDark={setDark} cafeName={cafeName} onLogout={logout} />}>
      <Route path="/" element={<DashboardPage revenue={revenue} orders={orders} menu={menu} />} />
      <Route path="/menu" element={<MenuPage menu={menu} favorites={favorites} cart={cart} canManage={isAdmin(user)} onAdd={addToCart} onRemoveOne={removeOneFromCart} onFavorite={toggleFavorite} onDelete={deleteFood} onAddFood={handleAddFood} onReview={updateReview} />} />
      <Route path="/orders" element={<OrdersPage orders={orders} user={user} />} />
      <Route path="/reservations" element={<ReservationsPage reservations={reservations} user={user} onAdd={addReservation} onCancel={cancelReservation} />} />
      <Route path="/cashier" element={<CashierPage cart={cart} onAdd={addToCart} onRemoveOne={removeOneFromCart} onClear={() => { if (window.confirm("Очистить корзину?")) setCart([]); }} onCheckout={checkout} />} />
      <Route path="/favorites" element={<FavoritesPage menu={menu} favorites={favorites} cart={cart} onAdd={addToCart} onRemoveOne={removeOneFromCart} onFavorite={toggleFavorite} onReview={updateReview} />} />
      <Route path="/admin" element={<AdminPage menu={menu} orders={orders} revenue={revenue} reservations={reservations} onAddFood={handleAddFood} onDelete={deleteFood} onExport={exportOrders} onStatus={changeOrderStatus} onDeleteOrder={deleteOrder} onCancelReservation={item => setReservations(current => current.map(reservation => reservation.id === item.id ? { ...reservation, status: "Отменено" } : reservation))} />} />
      <Route path="/settings" element={<SettingsPage user={user} onLogout={logout} cafeName={cafeName} setCafeName={setCafeName} />} />
    </Route>
    <Route path="*" element={<Navigate to={user ? "/" : "/login"} replace />} />
  </Routes>{user && <ChatBot menu={menu} />}<Toast toast={toast} onClose={() => setToast(null)} /></LanguageContext.Provider>;
}
