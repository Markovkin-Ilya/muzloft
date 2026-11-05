import { TBase } from "@utils/types";

export type TBaseDetailsUIProps = {
  base: TBase;
  onBook: () => void;
  onRoomSelect: (roomId: string) => void;
  onRentInstruments: () => void;
  onShowReviews: () => void;
  onPhotoSelect: (photoIndex: number) => void;
};
