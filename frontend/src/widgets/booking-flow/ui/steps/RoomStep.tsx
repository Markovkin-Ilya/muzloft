import { FC } from "react";
import { setOrderDraftRoom } from "@services/bases/slice";
import { useDispatch } from "@services/store";
import { SelectionStepUI } from "../SelectionStepUI";
import type { TBookingStepProps } from "./types";

export const RoomStep: FC<TBookingStepProps> = ({ base, draft }) => {
  const dispatch = useDispatch();

  return (
    <SelectionStepUI
      title="Выберите комнату"
      options={base.rooms.map((room) => ({ id: room._id, label: room.title }))}
      selectedId={draft.roomid}
      onSelect={(roomId) => dispatch(setOrderDraftRoom(roomId))}
    />
  );
};
