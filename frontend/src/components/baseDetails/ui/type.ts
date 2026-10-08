import { TBase, TRoom } from "@utils/types";

export type TBasDetailsUIProps = {
  base: TBase;
  reviewCount: number;
  onBook?: () => void;
  onRoomSelect?: (room: TRoom) => void;
  onRentInstruments?: () => void;
  onShowReviews?: () => void;
};
