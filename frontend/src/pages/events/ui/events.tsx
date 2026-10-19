import { FC } from "react";
import { EventCard } from "@entities/event";
import styles from "./events.module.css";
import { TEventsUIProps } from "./type";

export const EventsUI: FC<TEventsUIProps> = ({ events, onEventSelect }) => (
  <main className={styles.events}>
    <section className={styles.list} aria-label="Список событий">
      {events.map((event) => {
        const eventId = event._id ?? "";

        return (
          <EventCard
            key={eventId}
            title={event.title}
            subtitle={event.subtitle ?? ""}
            description={event.description}
            image={event.image[0] ?? ""}
            onClick={() => onEventSelect(eventId)}
          />
        );
      })}
    </section>
  </main>
);
