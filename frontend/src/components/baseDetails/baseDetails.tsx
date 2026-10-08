import { FC } from "react";
import { TRoom } from "@utils/types";
import { selectBaseDetails } from "@services/bases/slice";
import { useSelector } from "@services/store";
import { BasDetailsUI } from "./ui/basDetails";
import { Preloader } from "@components/preloader/preloader";

export type TBaseDetailsProps = {
  onBook?: () => void;
  onRoomSelect?: (room: TRoom) => void;
  onRentInstruments?: () => void;
  onShowReviews?: () => void;
};

export const BaseDetails: FC<TBaseDetailsProps> = ({
  onBook,
  onRoomSelect,
  onRentInstruments,
  onShowReviews,
}) => {
  const base = useSelector(selectBaseDetails);

  if (!base) {
    return <Preloader />;
  }

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
