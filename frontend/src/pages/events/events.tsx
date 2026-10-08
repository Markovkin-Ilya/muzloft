import { FC, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { EventCard } from "@components/eventCard";
import { fetchEventDetails, fetchEvents } from "@services/events/actions";
import { selectEvents } from "@services/events/slice";
import { useDispatch, useSelector } from "@services/store";
import styles from "./events.module.css";

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

  return (
    <main className={styles.events}>
      <section className={styles.list} aria-label="Список событий">
        {events.map((event) => (
          <EventCard
            key={event.id}
            title={event.title}
            subtitle={event.subtitle ?? ""}
            description={event.description}
            image={event.image[0] ?? ""}
            onClick={() => handleEventSelect(event.id)}
          />
        ))}
      </section>
    </main>
  );
};
