import { FC } from "react";
import { TRoom } from "@utils/types";
import { RoomUI } from "./ui/room";

export type TRoomProps = {
  room: TRoom;
  onBook?: (room: TRoom) => void;
  onShowInstruments?: (room: TRoom) => void;
};

export const Room: FC<TRoomProps> = ({
  room,
  onBook,
  onShowInstruments,
}) => {
  const availableSlotPrices = room.slots.map((slot) => slot.price);
  const priceRange =
    availableSlotPrices.length > 0
      ? {
          min: Math.min(...availableSlotPrices),
          max: Math.max(...availableSlotPrices),
        }
      : null;

  return (
    <RoomUI
      room={room}
      priceRange={priceRange}
      onBook={() => onBook?.(room)}
      onShowInstruments={() => onShowInstruments?.(room)}
    />
  );
};
