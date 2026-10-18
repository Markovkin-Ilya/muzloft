export type TRepetitionUIProps = {
  base: string; // название базы
  address: string; // адрес базы
  room: string; // название комнаты
  date: string;
  time: string;
  payment: "online" | "card" | "cash";
  price: number; // цена репетиции
  onInstruments: () => void;
  onMap: () => void;
};
