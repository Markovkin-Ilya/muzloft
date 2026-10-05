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
  <div className={styles.card} onClick={onClick}>
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
        <img src={starIcon} alt="Рейтинг" className={styles.starIcon} />
        <span className={styles.ratingValue}>{rating}</span>
      </div>
      <div
        className={styles.mapBtn}
        onClick={(e) => {
          e.stopPropagation();
          onMap();
        }}
      >
        <img src={mapIcon} alt="Показать на карте" className={styles.mapIcon} />
      </div>
    </div>
  </div>
);
