import { TRoom } from "@utils/types";

export type TRoomUIProps = {
  baseId: string | undefined;
  room: TRoom;
  priceRange: { min: number; max: number } | null;
};
