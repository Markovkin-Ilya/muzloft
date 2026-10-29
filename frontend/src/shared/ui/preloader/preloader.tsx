import styles from "./preloader.module.css";

export const Preloader = () => (
  <div className={styles.preloader} role="status" aria-label="Загрузка">
    <div className={styles.preloader_circle} aria-hidden="true" />
  </div>
);
