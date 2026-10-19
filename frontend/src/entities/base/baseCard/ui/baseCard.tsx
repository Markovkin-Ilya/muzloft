import { FC } from "react";
import styles from "./baseCard.module.css";
import { TBaseCardUIProps } from "./type";
import starIcon from "@assets/images/icons/star.svg";
import mapIcon from "@assets/images/icons/map.svg";

export const BaseCardUI: FC<TBaseCardUIProps> = ({
  name,
  image,
  address,
  rating,
  onClick,
  onMap,
}) => (
  <article
    className={styles.card}
    onClick={onClick}
    onKeyDown={(event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onClick();
      }
    }}
    role="button"
    tabIndex={0}
  >
    <div className={styles.top}>
      <div className={styles.info}>
        <span className={styles.name}>{name}</span>
        <span className={styles.address}>{address}</span>
      </div>
      <img src={image} alt={name} className={styles.image} />
    </div>
    <div className={styles.bottom}>
      <div
        className={`${styles.rating} ${rating >= 4.7 ? styles.ratingHigh : rating >= 4.3 ? styles.ratingMedium : styles.ratingLow}`}
      >
        <span className={styles.ratingValue}>
          {rating.toFixed(1).replace(".", ",")}
        </span>
        <img src={starIcon} alt="Рейтинг" className={styles.starIcon} />
      </div>
      <button
        type="button"
        className={styles.mapBtn}
        onKeyDown={(event) => event.stopPropagation()}
        onClick={(e) => {
          e.stopPropagation();
          onMap();
        }}
        aria-label={`Показать ${name} на карте`}
      >
        <img src={mapIcon} alt="Показать на карте" className={styles.mapIcon} />
      </button>
    </div>
  </article>
);
