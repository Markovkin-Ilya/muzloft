export type TUser = {
  _id: string;
  login: string;
  email: string;
  phone: string;
  avatar?: string;
  repetitions:TRepetition[]; // Данные о забронированных репетициях
};

export type TRepetition = {
  _id: string;
  base: string; // название базы
  address: string; // адрес базы
  room: string; // название комнаты
  slot: ISlot; // забронированный слот
  instruments:IInstrument[]; // инструмент
  payment: "online" | "card" | "cash"; // способ оплаты
};

export type ISlot = {
  _id: string;
  date: Date; // дата и время начала слота
  period: string; // продолжительность слота
  price: number; // цена слота
};

export type IInstrument = {
  _id:string; // ID инструмента
  title:string // название инструмента
  category:string; // Категория инструмента
  image:string;  // картинка инструмента
  slot:ISlot; // забронированный слот
  binding:boolean; // привязан инструмент к комнате или нет
}