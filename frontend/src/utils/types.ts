export type TUser = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  repetitions: TRepetition[]; // Данные о забронированных репетициях
};

export type TRepetition = {
  _id: string;
  base: string; // название базы
  address: string; // адрес базы
  room: string; // название комнаты
  slot: TSlot; // забронированный слот
  instruments: TBookedInstrument[]; // инструменты забронированные из общего доступа базы
  payment: "online" | "card" | "cash"; // способ оплаты
};

export type TSlot = {
  _id: string;
  date: Date; // дата и время начала слота
  period: string; // продолжительность слота
  price: number; // цена за репетицию
};

export type TInstrument = {
  _id: string; // ID инструмента
  title: string; // название инструмента
  category: string; // Категория инструмента
  image: string; // картинка инструмента
  slots?: TSlot[]; // забронированные слоты (если инструмент в общем доступе)
  price?: number; // цена за один слот (если инструмент в общем доступе)
};

export type TBookedInstrument = TInstrument & {
  slot: TSlot; // слот бронирования инструмента
};

export type TBase = {
  _id: string; // ID базы
  title: string; // название базы
  description: string; // описание базы
  image: string; // аватар базы
  address: string; // адрес базы
  rating: number; // средний рейтинг базы
  workingHours?: TWorkingHours; // часы работы базы (по умолчанию 10:00-22:00)
  phone: string; // Телефон для связи с базой
  ownerid: string; // ID владельца
  rooms: TRoom[]; // комнаты для репетицый
  instruments: TInstrument[]; // ID инструментов в общем доступе
  comments: TComment[]; // отзывы о базе от посетителей
};

export type TRoom = {
  _id: string; // ID комнаты
  title: string; // название комнаты
  description: string; // описание комнаты
  image: string[]; // картинки комнаты
  slots: TSlot[]; // забронированные слоты
  instruments: TInstrument[]; // инструменты в комнате
  basePrice: number; // цена часа по умолчанию
  tariffs?: TTariff[]; // тарифы часа, применяется первый подходящий
};

export type TWorkingHours = { from: number; to: number } | "24h";

export type TTariff = {
  price: number; // цена одного часа
  weekdays?: number[]; // дни недели (0 - вс), по умолчанию все
  fromHour?: number; // с какого часа (включительно)
  toHour?: number; // до какого часа (не включительно)
};

export type TComment = {
  _id: string; // ID отзыва
  artistid: string; // ID музыканта
  author?: {
    login: string;
    avatar?: string;
  }; // данные автора отзыва
  room: string; // название комнаты
  scores: number; // оценка репбазы
  date: string; // дата отзыва в формате YYYY-MM-DD
  comment: string; // комментарий к отзыву
};

export type TEvent = {
  _id?: string; // ID ивента
  title: string; // название ивента
  subtitle?: string; // подзагаловок ивента
  text: string;
  description: string; // описание ивента
  image: string[]; // картинки ивента
  promoсode?: string; // промокод ивента
  basesid?: string[]; // ID баз участвующих в акции
};

export type TOrder = {
  _id: string; // ID заказа
  userId: string; // ID пользователя
  baseid: string; // ID базы
  roomid: string; // ID комнаты
  slot: TSlot; // забронированный слот
  instrumentsId: string[]; // ID инструментов забронированных из общего доступа
  payment: "online" | "card" | "cash"; // способ оплаты
};

export type TOrderDraft = {
  baseid: string;
  roomid: string | null;
  slot: { date: string; period: TSlot["period"] } | null; // начало и число часов
  instrumentsId: string[];
  payment: TOrder["payment"] | null;
};
