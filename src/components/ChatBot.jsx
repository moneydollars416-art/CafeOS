import React, { useContext, useEffect, useRef, useState } from "react";
import { Bot, MessageCircle, Send, X } from "lucide-react";
import { LanguageContext, useT, useFoodText } from "../i18n";

const copy = {
  ru: {
    title: "Помощник CafeOS",
    online: "онлайн",
    hint: "Нужна помощь?",
    placeholder: "Напишите вопрос...",
    hello: "Здравствуйте! Я помогу с вопросами о кафе. Выберите тему или напишите свой вопрос.",
    chips: [
      ["hours", "Часы работы"],
      ["address", "Адреса"],
      ["phone", "Телефон"],
      ["booking", "Как забронировать"],
      ["order", "Как заказать"],
      ["menu", "Меню"]
    ],
    hours: "Мы работаем круглосуточно, 24/7, без выходных.",
    address: "У нас три адреса, работаем круглосуточно:\n• Киевский 149\n• Аалы Токомбаева 17/2\n• Чынгыза Айтматова 97/1",
    phone: "Позвоните нам:\n• 0777 889 955\n• 557 998 877",
    booking: "Чтобы забронировать столик, откройте раздел «Бронирование», укажите имя, телефон, дату и время, затем выберите столик. Бронь появится справа на странице.",
    order: "Откройте «Меню», нажмите «+» у нужных блюд, затем перейдите в корзину и нажмите «Оформить заказ». Статус заказа виден в разделе «Заказы».",
    menuIntro: "Наше меню:",
    menuOutro: "Подробнее и с фото в разделе «Меню».",
    greeting: "Здравствуйте! Чем могу помочь?",
    thanks: "Пожалуйста! Обращайтесь, если будут вопросы.",
    fallback: "Я пока не знаю ответа на этот вопрос. Выберите тему кнопками ниже или позвоните нам: 0777 889 955."
  },
  ky: {
    title: "CafeOS жардамчысы",
    online: "онлайн",
    hint: "Жардам керекпи?",
    placeholder: "Суроону жазыңыз...",
    hello: "Саламатсызбы! Кафе жөнүндө суроолорго жардам берем. Теманы тандаңыз же суроонузду жазыңыз.",
    chips: [
      ["hours", "Иштөө убактысы"],
      ["address", "Даректер"],
      ["phone", "Телефон"],
      ["booking", "Кантип брондоо"],
      ["order", "Кантип буйрутма берүү"],
      ["menu", "Меню"]
    ],
    hours: "Биз күнү-түнү, 24/7, дем алыш күнсүз иштейбиз.",
    address: "Бизде үч дарек бар, күнү-түнү иштейбиз:\n• Киевский 149\n• Аалы Токомбаева 17/2\n• Чынгыза Айтматова 97/1",
    phone: "Бизге чалыңыз:\n• 0777 889 955\n• 557 998 877",
    booking: "Үстөл брондоо үчүн «Брондоо» бөлүмүн ачыңыз, атыңызды, телефонуңузду, күнүн жана убактысын жазыңыз, анан үстөлдү тандаңыз. Брондоо барактын оң жагында чыгат.",
    order: "«Меню» бөлүмүнөн керектүү тамактарга «+» басыңыз, андан кийин себетке өтүп, «Буйрутма берүү» баскычын басыңыз. Буйрутманын абалы «Буйрутмалар» бөлүмүндө көрүнөт.",
    menuIntro: "Биздин меню:",
    menuOutro: "Сүрөттөрү менен «Меню» бөлүмүндө.",
    greeting: "Саламатсызбы! Эмне жардам бере алам?",
    thanks: "Эч нерсе эмес! Суроо болсо, кайрылыңыз.",
    fallback: "Бул суроонун жообун билбейм. Төмөндөгү баскычтардан тандаңыз же чалыңыз: 0777 889 955."
  },
  en: {
    title: "CafeOS assistant",
    online: "online",
    hint: "Need help?",
    placeholder: "Type your question...",
    hello: "Hello! I can help with questions about the cafe. Pick a topic or type your question.",
    chips: [
      ["hours", "Opening hours"],
      ["address", "Addresses"],
      ["phone", "Phone"],
      ["booking", "How to book"],
      ["order", "How to order"],
      ["menu", "Menu"]
    ],
    hours: "We are open 24/7, every day.",
    address: "We have three locations, open around the clock:\n• Kievskiy 149\n• Aaly Tokombaev 17/2\n• Chyngyz Aitmatov 97/1",
    phone: "Call us:\n• 0777 889 955\n• 557 998 877",
    booking: "To book a table, open the Reservations page, enter your name, phone, date and time, then pick a table. Your booking will appear on the right.",
    order: "Open the Menu, tap “+” on the dishes you want, then go to the cart and press “Place order”. You can follow the status on the Orders page.",
    menuIntro: "Our menu:",
    menuOutro: "See photos on the Menu page.",
    greeting: "Hello! How can I help?",
    thanks: "You are welcome! Ask anytime.",
    fallback: "I don't know the answer yet. Pick a topic below or call us: 0777 889 955."
  }
};

// Слова, по которым бот понимает вопрос. "=слово" значит точное слово целиком.
const intents = [
  ["booking", ["брон", "столик", "резерв", "брондо", "үстөл", "book", "reserv", "table"]],
  ["hours", ["=24", "часы", "работаете", "работает", "открыт", "закрыт", "график", "круглосуточ", "иштейс", "иштейт", "саат", "ачык", "hour", "open", "close", "schedule"]],
  ["address", ["адрес", "где", "находи", "локаци", "добраться", "дарек", "кайда", "жайгаш", "address", "where", "location"]],
  ["phone", ["телефон", "позвон", "звон", "связ", "контакт", "чалуу", "чалса", "байланыш", "phone", "call", "contact"]],
  ["order", ["заказ", "оформ", "корзин", "оплат", "буйрутма", "себет", "төлөм", "order", "cart", "pay"]],
  ["menu", ["меню", "блюд", "=еда", "поесть", "кушать", "цена", "цены", "напит", "тамак", "суусундук", "menu", "dish", "food", "price", "drink"]],
  ["thanks", ["спасибо", "благодар", "рахмат", "thank"]],
  ["greeting", ["=привет", "здравств", "салам", "=hello", "=hi", "=hey", "добрый"]]
];

function detect(text) {
  const lower = text.toLowerCase();
  const tokens = lower.split(/[^\p{L}\p{N}]+/u).filter(Boolean);
  let best = null;
  let bestScore = 0;
  intents.forEach(([name, keys]) => {
    const score = keys.filter(key =>
      key.startsWith("=") ? tokens.includes(key.slice(1)) : lower.includes(key)
    ).length;
    if (score > bestScore) {
      best = name;
      bestScore = score;
    }
  });
  return best;
}

export default function ChatBot({ menu = [] }) {
  const language = useContext(LanguageContext);
  const c = copy[language] || copy.ru;
  const t = useT();
  const { dish } = useFoodText();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  function answerFor(intent) {
    if (intent === "menu") {
      const lines = menu.slice(0, 8).map(item => `• ${dish(item.name)} — ${item.price} ${t("currency")}`);
      return [c.menuIntro, ...lines, c.menuOutro].join("\n");
    }
    return c[intent] || c.fallback;
  }

  function ask(text, intent) {
    const question = text.trim();
    if (!question) return;
    const found = intent || detect(question);
    setMessages(current => [...current, { from: "user", text: question }]);
    setInput("");
    setTimeout(() => {
      setMessages(current => [...current, { from: "bot", text: answerFor(found) }]);
    }, 350);
  }

  return (
    <>
      {open && (
        <div className="chat-window" role="dialog" aria-label={c.title}>
          <div className="chat-head">
            <span className="chat-avatar"><Bot size={19} /></span>
            <div>
              <strong>{c.title}</strong>
              <small><i className="chat-dot" />{c.online}</small>
            </div>
            <button type="button" className="chat-close" onClick={() => setOpen(false)} aria-label="Close">
              <X size={18} />
            </button>
          </div>

          <div className="chat-body">
            <div className="chat-msg bot">{c.hello}</div>
            {messages.map((message, index) => (
              <div key={index} className={`chat-msg ${message.from}`}>{message.text}</div>
            ))}
            <div ref={endRef} />
          </div>

          <div className="chat-chips">
            {c.chips.map(([intent, label]) => (
              <button key={intent} type="button" onClick={() => ask(label, intent)}>{label}</button>
            ))}
          </div>

          <form className="chat-input" onSubmit={event => { event.preventDefault(); ask(input); }}>
            <input value={input} onChange={event => setInput(event.target.value)} placeholder={c.placeholder} />
            <button type="submit" aria-label="Send"><Send size={16} /></button>
          </form>
        </div>
      )}

      {!open && <span className="chat-hint">{c.hint}</span>}
      <button type="button" className="chat-fab" onClick={() => setOpen(current => !current)} aria-label={c.title}>
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </>
  );
}