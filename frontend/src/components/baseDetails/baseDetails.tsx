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
  const rating =
    reviewCount === 0
      ? 0
      : base.comments.reduce((sum, comment) => sum + comment.scores, 0) /
        reviewCount;

  return (
    <BasDetailsUI
      base={base}
      rating={rating}
      reviewCount={reviewCount}
      onBook={onBook}
      onRoomSelect={onRoomSelect}
      onRentInstruments={onRentInstruments}
      onShowReviews={onShowReviews}
    />
  );
};
