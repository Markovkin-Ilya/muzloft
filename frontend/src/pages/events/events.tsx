import { FC, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchEventDetails, fetchEvents } from "@services/events/actions";
import { selectEvents } from "@services/events/slice";
import { useDispatch, useSelector } from "@services/store";
import { EventsUI } from "./ui";

export const Events: FC = () => {
  const dispatch = useDispatch();
  const events = useSelector(selectEvents);
  const location = useLocation();
  const navigate = useNavigate();
  const hasRequestedEvents = useRef(false);

  useEffect(() => {
    if (hasRequestedEvents.current) {
      return;
    }

    hasRequestedEvents.current = true;
    dispatch(fetchEvents());
  }, [dispatch]);

  const handleEventSelect = (eventId: string) => {
    dispatch(fetchEventDetails(eventId));
    navigate(`/events/${eventId}`, {
      state: { background: location },
    });
  };

  return <EventsUI events={events} onEventSelect={handleEventSelect} />;
};
