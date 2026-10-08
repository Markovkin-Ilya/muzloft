import { FC } from "react";
import styles from "./eventDetails.module.css";
import { TEventDetailsUIProps } from "./type";

export const EventDetailsUI: FC<TEventDetailsUIProps> = ({ event }) => (
  <article className={styles.card}>
    <header className={styles.header}>
      <h1 className={styles.title}>{event.title}</h1>
      {event.subtitle && <h2 className={styles.subtitle}>{event.subtitle}</h2>}
      <p className={styles.description}>{event.description}</p>
    </header>

    {event.image.length > 0 && (
      <div className={styles.images} aria-label="Фотографии события">
        {event.image.map((image, index) => (
          <img
            key={`${image}-${index}`}
            className={styles.image}
            src={image}
            alt={`${event.title} — фото ${index + 1}`}
          />
        ))}
      </div>
    )}

    {event.promoсode && (
      <p className={styles.promoCode}>
        <span className={styles.promoLabel}>Промокод:</span>{" "}
        <span className={styles.promoValue}>{event.promoсode}</span>
      </p>
    )}

    <div className={styles.text}>
      {event.text
        .split(/\n\s*\n/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean)
        .map((paragraph, index) => (
          <p key={`${index}-${paragraph}`}>{paragraph}</p>
        ))}
    </div>
  </article>
);
