import { FC } from "react";
import styles from "./SuccessStepUI.module.css";

export type TSuccessStepUIProps = {
  bookingNumber: string;
};

export const SuccessStepUI: FC<TSuccessStepUIProps> = ({ bookingNumber }) => (
  <section className={styles.card}>
    <h2 className={styles.title}>Ваша репетиция успешно забронирована!</h2>
    <svg
      className={styles.check}
      viewBox="0 0 100 100"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 55 L38 80 L88 12" />
    </svg>
    <p className={styles.label}>Бронь</p>
    <p className={styles.number}>{bookingNumber}</p>
    <p className={styles.text}>
      Чтобы не забыть детали, мы добавили ее в график ваших репетиций
    </p>
  </section>
);
