import { TRoom } from "@utils/types";

export type TRoomUIProps = {
  room: TRoom;
  priceRange: { min: number; max: number } | null;
  onBook?: () => void;
  onShowInstruments?: () => void;
};
