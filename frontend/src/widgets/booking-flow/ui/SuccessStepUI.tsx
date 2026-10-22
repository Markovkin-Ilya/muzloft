import { FC } from "react";
import styles from "./SuccessStepUI.module.css";
import checkmarkIcon from "@assets/images/icons/checkmark.svg";

export type TSuccessStepUIProps = {
  bookingNumber: string;
};

export const SuccessStepUI: FC<TSuccessStepUIProps> = ({ bookingNumber }) => (
  <section className={styles.card}>
    <h2 className={styles.title}>Ваша репетиция успешно забронирована!</h2>
    <img className={styles.check} src={checkmarkIcon} alt="" aria-hidden="true" />
    <div className={styles.bookingInfo}>
      <p className={styles.label}>Бронь</p>
      <p className={styles.number}>{bookingNumber}</p>
    </div>
    <p className={styles.text}>
      Чтобы не забыть детали, мы добавили ее в график ваших репетиций
    </p>
  </section>
);
