import { FC, WheelEvent } from "react";
import { Button } from "@components/button";
import styles from "./room.module.css";
import { TRoomUIProps } from "./type";

export const RoomUI: FC<TRoomUIProps> = ({
  room,
  priceRange,
  onBook,
  onShowInstruments,
}) => {
  const handleGalleryWheel = (event: WheelEvent<HTMLDivElement>) => {
    if (event.ctrlKey) {
      return;
    }

    const delta = event.deltaX || event.deltaY;
    const gallery = event.currentTarget;
    const maxScrollLeft = gallery.scrollWidth - gallery.clientWidth;
    const nextScrollLeft = Math.max(
      0,
      Math.min(gallery.scrollLeft + delta, maxScrollLeft),
    );

    if (nextScrollLeft !== gallery.scrollLeft) {
      gallery.scrollBy({
        left: nextScrollLeft - gallery.scrollLeft,
        behavior: "smooth",
      });
      event.preventDefault();
    }
  };

  return (
    <article className={styles.card}>
      <div className={styles.content}>
        <h1 className={styles.title}>{room.title}</h1>

        <p className={styles.description}>{room.description}</p>

        {room.image.length > 0 && (
          <div
            className={styles.images}
            aria-label={`Фотографии комнаты ${room.title}`}
            onWheel={handleGalleryWheel}
          >
            {room.image.map((image, index) => (
              <img
                key={`${image}-${index}`}
                className={styles.image}
                src={image}
                alt={`${room.title} — фото ${index + 1}`}
              />
            ))}
          </div>
        )}

        <section className={styles.equipment}>
          <h2 className={styles.sectionTitle}>Оборудование в комнате:</h2>
          <Button
            size="small"
            className={styles.equipmentButton}
            onClick={onShowInstruments}
          >
            Оборудование
          </Button>
        </section>

        <section className={styles.price}>
          <h2 className={styles.sectionTitle}>Стоимость слота</h2>
          <p className={styles.priceValue}>
            {priceRange
              ? `от ${priceRange.min.toFixed(2)} до ${priceRange.max.toFixed(2)}`
              : "Нет доступных слотов"}
          </p>
        </section>

        <Button size="large" className={styles.bookButton} onClick={onBook}>
          Бронировать репетицию
        </Button>
      </div>
    </article>
  );
};
