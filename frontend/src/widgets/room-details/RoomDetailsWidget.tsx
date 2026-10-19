import { FC } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { RoomDetailsUI } from "@entities/room";
import { selectRoom } from "@services/bases/slice";
import { useSelector } from "@services/store";

export const RoomDetailsWidget: FC = () => {
  const { baseId, roomId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
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
  const background = location.state?.background ?? location;

  return (
    <RoomDetailsUI
      room={room}
      priceRange={priceRange}
      onBook={() =>
        navigate(`/bases/${baseId}/book`, {
          state: { background },
        })
      }
      onShowInstruments={() =>
        navigate(`/bases/${baseId}/${room._id}/instruments`, {
          state: { background },
        })
      }
    />
  );
};
