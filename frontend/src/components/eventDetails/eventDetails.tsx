import { FC } from "react";
import { Preloader } from "@components/preloader/preloader";
import { selectEventDetails } from "@services/events/slice";
import { useSelector } from "@services/store";
import { EventDetailsUI } from "./ui/eventDetails";

export const EventDetails: FC = () => {
  const event = useSelector(selectEventDetails);

  if (!event) {
    return <Preloader />;
  }

  return <EventDetailsUI event={event} />;
};
