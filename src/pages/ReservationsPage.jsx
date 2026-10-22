import PageTitle from "../components/PageTitle";
import ReservationForm from "../components/ReservationForm";
import ReservationList from "../components/ReservationList";

export default function ReservationsPage({ reservations, onAdd, onCancel }) {
  const today = new Date();
  const localDate = [today.getFullYear(), String(today.getMonth() + 1).padStart(2, "0"), String(today.getDate()).padStart(2, "0")].join("-");
  const sorted = [...reservations].sort((a, b) => `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`));

  function submit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const reservation = {
      id: Date.now(), name: String(data.get("name")).trim(), phone: String(data.get("phone")).trim(),
      date: String(data.get("date")), time: String(data.get("time")), guests: Number(data.get("guests")),
      table: String(data.get("table")), status: "Подтверждено"
    };
    if (new Date(`${reservation.date}T${reservation.time}`) <= new Date()) return window.alert("Выбери будущую дату и время!");
    if (reservations.some(item => item.table === reservation.table && item.date === reservation.date && item.time === reservation.time && item.status !== "Отменено")) {
      return window.alert("Этот столик уже забронирован на выбранное время!");
    }
    onAdd(reservation);
    event.currentTarget.reset();
  }

  return <section className="page">
    <PageTitle>🪑 Бронирование столиков</PageTitle>
    <p>Забронируй столик для гостей кафе</p>
    <ReservationForm localDate={localDate} onSubmit={submit} />
    <ReservationList reservations={sorted} onCancel={onCancel} />
  </section>;
}
