import { FC, WheelEvent } from "react";
import { Button } from "@components/button/button";
import styles from "./basDetails.module.css";
import { TBasDetailsUIProps } from "./type";
import starIcon from "@assets/images/icons/star.svg";

const getReviewLabel = (count: number) => {
  const lastTwoDigits = count % 100;
  const lastDigit = count % 10;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return "отзывов";
  }

  if (lastDigit === 1) {
    return "отзыв";
  }

  return lastDigit >= 2 && lastDigit <= 4 ? "отзыва" : "отзывов";
};

export const BasDetailsUI: FC<TBasDetailsUIProps> = ({
  base,
  reviewCount,
  onBook,
  onRoomSelect,
  onRentInstruments,
  onShowReviews,
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
    <div>
      <article className={styles.card}>
        <header className={styles.header}>
          <h1 className={styles.title}>{base.title}</h1>
          <p className={styles.address}>{base.address}</p>
        </header>

        <p className={styles.description}>{base.description}</p>

        <a
          className={styles.phone}
          href={`tel:${base.phone.replace(/[^\d+]/g, "")}`}
        >
          Телефон: {base.phone}
        </a>

        {base.rooms.some((room) => room.image.length > 0) && (
          <div
            className={styles.images}
            aria-label="Фотографии комнат базы"
            onWheel={handleGalleryWheel}
          >
            {base.rooms.flatMap((room) =>
              room.image.map((image, index) => (
                <img
                  key={`${room._id}-${image}-${index}`}
                  className={styles.image}
                  src={image}
                  alt={`${room.title} — фото ${index + 1}`}
                />
              )),
            )}
          </div>
        )}

        <Button size="large" className={styles.bookButton} onClick={onBook}>
          Бронировать репетицию
        </Button>

        {base.rooms.length > 0 && (
          <section className={styles.rooms} aria-label="Комнаты базы">
            <h2 className={styles.sectionTitle}>Посмотреть комнаты</h2>
            <div className={styles.roomList}>
              {base.rooms.map((room) => (
                <Button
                  key={room._id}
                  size="small"
                  className={styles.roomButton}
                  onClick={() => onRoomSelect?.(room)}
                >
                  {room.title}
                </Button>
              ))}
            </div>
          </section>
        )}

        <section className={styles.rent}>
          <h2 className={styles.sectionTitle}>
            Взять инструмент на репетицию:
          </h2>
          <Button
            size="large"
            className={styles.rentButton}
            onClick={onRentInstruments}
          >
            Инструменты в аренду
          </Button>
        </section>

        <button
          className={styles.rating}
          onClick={onShowReviews}
          aria-label={`Рейтинг ${base.rating.toFixed(1)}, ${reviewCount} ${getReviewLabel(reviewCount)}`}
          type="button"
        >
          <div className={styles.ratingScore}>
            <span className={styles.ratingValue}>
              {base.rating.toFixed(1).replace(".", ",")}
            </span>
            <img
              src={starIcon}
              alt=""
              className={styles.starIcon}
              aria-hidden="true"
            />
          </div>
          <span className={styles.reviewCount}>
            {reviewCount} {getReviewLabel(reviewCount)}
          </span>
        </button>
      </article>
    </div>
  );
};
