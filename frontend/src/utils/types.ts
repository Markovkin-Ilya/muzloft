export type TUser = {
  _id: string;
  login: string;
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
  instruments: TInstrument[]; // инструмент
  payment: "online" | "card" | "cash"; // способ оплаты
};

export type TSlot = {
  _id: string;
  date: Date; // дата и время начала слота
  period: string; // продолжительность слота
  price: number; // цена слота
};

export type TInstrument = {
  _id: string; // ID инструмента
  title: string; // название инструмента
  category: string; // Категория инструмента
  image: string; // картинка инструмента
  slot: TSlot; // забронированный слот
  binding: boolean; // привязан инструмент к комнате или нет
};

export type TBase = {
  _id: string; // ID базы
  title: string; // название базы
  description: string; // описание базы
  image: string; // аватар базы
  address: string; // адрес базы
  rating: number; // средний рейтинг базы
  phone: string; // Телефон для связи с базой
  ownerid: string; // ID владельца
  rooms: TRoom[]; // комнаты для репетицый
  instruments: TInstrument[]; // инструменты в общем доступе
  comments: TComment[]; // отзывы о базе от посетителей
};

export type TRoom = {
  _id: string; // ID комнаты
  title: string; // название комнаты
  description: string; // описание комнаты
  image: string[]; // картинки комнаты
  slots: TSlot[]; // слоты для бронирования
  instruments: TInstrument[]; // инструменты в комнате
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
  id: string; // ID ивента
  title: string; // название ивента
  subtitle?: string; // подзагаловок ивента
  text: string;
  description: string; // описание ивента
  image: string[]; // картинки ивента
  promoсode?: string; // промокод ивента
  basesid?: string[]; // ID баз участвующих в акции
};
