import { FC } from "react";
import styles from "./eventCard.module.css";
import { TEventCardUIProps } from "./type";

export const EventCardUI: FC<TEventCardUIProps> = ({
    title,
    subtitle,
    description,
    image,
    onClick,
}) => (
    <div className={styles.card} onClick={onClick}>
        <div className={styles.top}>
            <div className={styles.info}>
                <span className={styles.title}>{title}</span>
                <span className={styles.subtitle}>{subtitle}</span>
                <span className={styles.description}>{description}</span>
            </div>
            <img src={image} alt={title} className={styles.image} />
        </div>
    </div>
);
