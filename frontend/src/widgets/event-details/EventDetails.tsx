import { FC } from "react";
import { EventDetailsUI } from "@entities/event";
import { selectEventDetails } from "@services/events/slice";
import { useSelector } from "@services/store";
import { Preloader } from "@shared/ui/preloader";

export const EventDetails: FC = () => {
  const event = useSelector(selectEventDetails);

  if (!event) {
    return <Preloader />;
  }

  return <EventDetailsUI event={event} />;
};
