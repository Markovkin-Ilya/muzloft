export type TRepetitionUIProps = {
  date: string;
  time: string;
  base: string;
  address: string;
  room: string;
  payment: "online" | "card" | "cash";
  onInstruments: () => void;
  onMap: () => void;
};
