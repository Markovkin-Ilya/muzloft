import { FC, KeyboardEvent, useEffect, useState } from "react";
import { Button } from "@shared/ui/button";
import styles from "./instrument.module.css";
import { TInstrumentUIProps } from "./type";

const buttonText = {
  busy: "Занят",
  available: "Забронировать",
  booked: "Забронировано",
} as const;

export const InstrumentUI: FC<TInstrumentUIProps> = ({
  title,
  image,
  slotPrice,
  repetitionPrice,
  buttonState,
  buttonDisabled = false,
  onBook,
  onPhotoSelect,
}) => {
  const [currentButtonState, setCurrentButtonState] = useState(buttonState);

  useEffect(() => {
    setCurrentButtonState(buttonState);
  }, [buttonState]);

  const handleBookClick = () => {
    if (currentButtonState === "available") {
      onBook?.();
      setCurrentButtonState("booked");
    } else if (currentButtonState === "booked") {
      onBook?.();
      setCurrentButtonState("available");
    }
  };

  const handleImageKeyDown = (event: KeyboardEvent<HTMLImageElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onPhotoSelect?.();
    }
  };

  return (
    <div className={styles.content}>
      <div className={styles.details}>
        <div className={styles.heading}>
          <h2 className={styles.title}>{title}</h2>
        </div>
        {(repetitionPrice !== undefined || slotPrice !== undefined) && (
          <div className={styles.prices}>
            {repetitionPrice !== undefined && (
              <p className={styles.price}>
                <span className={styles.priceLabel}>Цена за репетицию</span>
                <span className={styles.priceValue}>
                  {repetitionPrice.toFixed(2)}
                </span>
              </p>
            )}
            {slotPrice !== undefined && (
              <p className={styles.price}>
                <span className={styles.priceLabel}>Цена за час</span>
                <span className={styles.priceValue}>
                  {slotPrice.toFixed(2)}
                </span>
              </p>
            )}
          </div>
        )}
        {currentButtonState && (
          <Button
            size="small"
            className={`${styles.bookButton} ${styles[`${currentButtonState}Button`]}`}
            onClick={handleBookClick}
            disabled={
              currentButtonState === "busy" ||
              (currentButtonState === "booked" && buttonDisabled) ||
              (currentButtonState === "available" && buttonDisabled)
            }
          >
            {buttonText[currentButtonState]}
          </Button>
        )}
      </div>
      <div className={styles.imageContainer}>
        <img
          className={`${styles.image} ${onPhotoSelect ? styles.clickableImage : ""}`}
          src={image}
          alt={title}
          role={onPhotoSelect ? "button" : undefined}
          tabIndex={onPhotoSelect ? 0 : undefined}
          onClick={() => onPhotoSelect?.()}
          onKeyDown={onPhotoSelect ? handleImageKeyDown : undefined}
        />
      </div>
    </div>
  );
};
