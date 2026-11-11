import { FC, useState } from "react";
import styles from "./repetition.module.css";
import { TRepetitionUIProps } from "./type";
import { Button } from "@shared/ui/button";
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
  hasInstruments = true,
  instrumentsLabel = "Инструменты",
  showMap = true,
}) => {
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    if (!address) return;
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {}
  };

  return (
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
          <button
            type="button"
            className={`${styles.value} ${styles.copyable}`}
            onClick={copyAddress}
            title="Нажмите, чтобы скопировать адрес"
          >
            {copied ? "Скопировано" : address}
          </button>
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
                    ? `оплачено онлайн ${price}.00`
                    : ""}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <Button size="small" onClick={onInstruments} disabled={!hasInstruments}>
          {hasInstruments ? instrumentsLabel : "Без инструмента"}
        </Button>
        {showMap && (
          <button
            type="button"
            className={styles.mapBtn}
            onClick={onMap}
            aria-label="Показать на карте"
          >
            <img
              src={Icon}
              alt="Показать на карте"
              className={styles.mapIcon}
            />
          </button>
        )}
      </div>
    </div>
  );
};
