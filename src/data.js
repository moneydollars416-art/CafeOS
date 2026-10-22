export const defaultMenu = [
  { id: 1, name: "Бургер", price: 250, category: "Еда", description: "Сочный бургер", rating: 5, reviews: 0 },
  { id: 2, name: "Пицца", price: 450, category: "Еда", description: "Пицца с сыром", rating: 5, reviews: 0 },
  { id: 3, name: "Латте", price: 180, category: "Напитки", description: "Кофе с молоком", rating: 5, reviews: 0 },
  { id: 4, name: "Картофель фри", price: 150, category: "Еда", description: "Хрустящий картофель", rating: 5, reviews: 0 },
  { id: 5, name: "Кола", price: 100, category: "Напитки", description: "Холодный напиток", rating: 5, reviews: 0 }
];

export const navigation = [
  ["dashboard", "🏠", "Главная", "Башкы бет", "Dashboard"],
  ["menu", "🍔", "Меню", "Меню", "Menu"],
  ["orders", "📋", "Заказы", "Буйрутмалар", "Orders"],
  ["reservations", "🪑", "Бронирование", "Брондоо", "Reservations"],
  ["cashier", "💰", "Касса", "Касса", "Cashier"],
  ["favorites", "❤️", "Избранное", "Тандалгандар", "Favorites"],
  ["admin", "🛠️", "Админ-панель", "Админ-панель", "Admin panel"],
  ["settings", "⚙️", "Настройки", "Жөндөөлөр", "Settings"]
];

export const foodImages = {
  "Бургер": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
  "Пицца": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
  "Латте": "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&q=80",
  "Картофель фри": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80",
  "Кола": "https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=600&q=80"
};
