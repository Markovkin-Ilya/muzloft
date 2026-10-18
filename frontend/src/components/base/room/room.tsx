import { FC } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "@services/store";
import { selectRoom } from "@services/bases/slice";
import { RoomUI } from "./ui/room";

export const Room: FC = () => {
  const { baseId, roomId } = useParams();
  const room = useSelector((state) => selectRoom(state, roomId ?? null));

  if (!room) {
    return null;
  }

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
      baseId={baseId}
      room={room}
      priceRange={priceRange}
    />
  );
};
