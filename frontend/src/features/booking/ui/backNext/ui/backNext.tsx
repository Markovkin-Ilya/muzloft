import { FC } from "react";
import styles from "./backNext.module.css";
import { TBackNextUIProps } from "./type";
import { Button } from "@shared/ui/button";

export const BackNextUI: FC<TBackNextUIProps> = ({
  price,
  nextText,
  backText,
  nextDesabled,
  backDesabled,
}) => (
  <div className={styles.box}>
    <p className={styles.price}>Сумма: {price}</p>
    <div className={styles.buttons}>
      <Button
        className={styles.backbutton}
        size="large"
        disabled={backDesabled}
      >
        {backText}
      </Button>
      <Button
        className={styles.nextbutton}
        size="large"
        disabled={nextDesabled}
      >
        {nextText}
      </Button>
    </div>
  </div>
);
