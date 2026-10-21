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

  const configuredPrices = [
    room.basePrice,
    ...(room.tariffs ?? []).map((tariff) => tariff.price),
  ].filter(
    (price): price is number =>
      typeof price === "number" && Number.isFinite(price),
  );
  const priceRange =
    configuredPrices.length > 0
      ? {
          min: Math.min(...configuredPrices),
          max: Math.max(...configuredPrices),
        }
      : null;
  const background = location.state?.background ?? location;

  return (
    <RoomDetailsUI
      room={room}
      priceRange={priceRange}
      onBook={() =>
        navigate(`/bases/${baseId}/${room._id}/book`, {
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
