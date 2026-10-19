import type { TRoom } from "@utils/types";

export type TRoomDetailsUIProps = {
  room: TRoom;
  priceRange: { min: number; max: number } | null;
  onBook: () => void;
  onShowInstruments: () => void;
};
