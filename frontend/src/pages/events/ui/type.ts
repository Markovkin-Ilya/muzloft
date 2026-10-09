import { TEventCardData } from "@services/events/slice";

export type TEventsUIProps = {
  events: TEventCardData[];
  onEventSelect: (eventId: string) => void;
};
