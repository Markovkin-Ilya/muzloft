import { FC } from "react";
import styles from "./backNext.module.css";
import { TBackNextUIProps } from "./type";
import { Button } from "@shared/ui/button";

export const BackNextUI: FC<TBackNextUIProps> = ({
  price,
  nextText,
  backText,
  onNext,
  onBack,
  nextDisabled,
  backDisabled,
}) => (
  <div className={styles.box}>
    <p className={styles.price}>Сумма: {price.toLocaleString("ru-RU")}</p>
    <div className={styles.buttons}>
      <Button
        className={styles.backbutton}
        size="small"
        onClick={onBack}
        disabled={backDisabled}
      >
        {backText}
      </Button>
      <Button
        className={styles.nextbutton}
        size="small"
        onClick={onNext}
        disabled={nextDisabled}
      >
        {nextText}
      </Button>
    </div>
  </div>
);
