import { FC } from "react";
import styles from "./repetition.module.css";
import { TRepetitionUIProps } from "./type";
import { ButtonUI } from "../../button/ui/button";
import Icon from "@assets/images/icons/map.svg";

export const RepetitionUI: FC<TRepetitionUIProps> = ({
  date,
  time,
  base,
  address,
  room,
  price,
  payment,
  onInstruments,
  onMap,
}) => (
  <div className={styles.repetition}>
    <div className={styles.header}>
      <span className={styles.date}>{date}</span>
      <span className={styles.time}>{time}</span>
    </div>
    <div className={styles.fields}>
      <div className={styles.field}>
        <span className={styles.value}>{base}</span>
        <span className={styles.label}>База</span>
      </div>
      <div className={styles.field}>
        <span className={styles.value}>{address}</span>
        <span className={styles.label}>Адрес</span>
      </div>
      <div className={styles.field}>
        <span className={styles.value}>{room}</span>
        <span className={styles.label}>Комната</span>
      </div>
      <div className={styles.payment}>
        <div
          className={`${payment === "cash" || payment === "card" ? styles.unpaid : styles.paid}`}
        >
          <span className={styles.text}>
            {payment === "cash"
              ? `оплата наличными на базе ${price}.00`
              : payment === "card"
                ? `оплата картой на базе ${price}.00`
                : payment === "online"
                  ? "оплачено"
                  : ""}
          </span>
        </div>
      </div>
    </div>
    <div className={styles.footer}>
      <ButtonUI size="small" onClick={onInstruments}>
        Инструменты
      </ButtonUI>
      <div onClick={onMap}>
        <img
          src={Icon}
          alt="Кнопка показывает на карте репбазу"
          className={styles.icon}
        />
      </div>
    </div>
  </div>
);
