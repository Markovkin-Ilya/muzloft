import { FC, WheelEvent } from "react";
import { Button } from "@shared/ui/button";
import { ExpandableText } from "@shared/ui/expandable-text";
import { getRoomPhotos } from "../lib";
import styles from "./RoomDetailsUI.module.css";
import { TRoomDetailsUIProps } from "./type";

export const RoomDetailsUI: FC<TRoomDetailsUIProps> = ({
  room,
  priceRange,
  onBook,
  onShowInstruments,
  onPhotoSelect,
}) => {
  const photos = getRoomPhotos(room);
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

        <ExpandableText className={styles.description}>
          {room.description}
        </ExpandableText>

        {room.image.length > 0 && (
          <div
            className={styles.images}
            aria-label={`Фотографии комнаты ${room.title}`}
            onWheel={handleGalleryWheel}
          >
            {photos.map((photo, photoIndex) => (
              <img
                key={photo.key}
                className={styles.image}
                src={photo.src}
                alt={photo.alt}
                role="button"
                tabIndex={0}
                onClick={() => onPhotoSelect(photoIndex)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onPhotoSelect(photoIndex);
                  }
                }}
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
          <h2 className={styles.sectionTitle}>Стоимость часа</h2>
          <p className={styles.priceValue}>
            {priceRange
              ? priceRange.min === priceRange.max
                ? priceRange.min.toFixed(2)
                : `от ${priceRange.min.toFixed(2)} до ${priceRange.max.toFixed(2)}`
              : "Стоимость не указана"}
          </p>
        </section>

        <Button size="large" className={styles.bookButton} onClick={onBook}>
          Бронировать в этой комнате
        </Button>
      </div>
    </article>
  );
};
