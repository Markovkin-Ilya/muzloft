import { FC } from "react";
import { TBase, TRoom } from "@utils/types";
import { BasDetailsUI } from "./ui/basDetails";

export type TBaseDetailsProps = {
  base: TBase;
  onBook?: () => void;
  onRoomSelect?: (room: TRoom) => void;
  onRentInstruments?: () => void;
  onShowReviews?: () => void;
};

export const BaseDetails: FC<TBaseDetailsProps> = ({
  base,
  onBook,
  onRoomSelect,
  onRentInstruments,
  onShowReviews,
}) => {
  const reviewCount = base.comments.length;

  return (
    <BasDetailsUI
      base={base}
      reviewCount={reviewCount}
      onBook={onBook}
      onRoomSelect={onRoomSelect}
      onRentInstruments={onRentInstruments}
      onShowReviews={onShowReviews}
    />
  );
};
