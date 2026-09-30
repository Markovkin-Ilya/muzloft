import { FC } from "react";
import styles from "./header.module.css";
import { THeaderUIProps } from "./type";
import muzloftSvg from "@assets/images/header/muzloft.svg";

export const HeaderUI: FC<THeaderUIProps> = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <img src={muzloftSvg} alt="Muzloft" className={styles.logo} />
      </div>
    </header>
  );
};
