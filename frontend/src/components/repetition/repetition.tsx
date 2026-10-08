import { FC, memo } from "react";
import { TRepetitionProps } from "./type";
import { RepetitionUI } from "./ui/repetition";

export const Repetition: FC<TRepetitionProps> = memo(({ repetition }) => {
  const slotDate = new Date(repetition.slot.date);
  const date = slotDate.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const slotEnd = new Date(
    slotDate.getTime() + Number(repetition.slot.period) * 60 * 60 * 1000,
  );
  const formatTime = (value: Date) =>
    `${String(value.getHours()).padStart(2, "0")}:${String(value.getMinutes()).padStart(2, "0")}`;
  const time = `${formatTime(slotDate)} - ${formatTime(slotEnd)}`;

  const handleInstrument = () => {};

  const handleMap = () => {};

  const instrumentsPrice = repetition.instruments.reduce(
    (acc, instrument) => acc + instrument.slot.price,
    0,
  );
  const totalPrice = repetition.slot.price + instrumentsPrice;

  return (
    <RepetitionUI
      date={date}
      time={time}
      base={repetition.base}
      address={repetition.address}
      room={repetition.room}
      price={totalPrice}
      payment={repetition.payment}
      onInstruments={handleInstrument}
      onMap={handleMap}
    />
  );
});
