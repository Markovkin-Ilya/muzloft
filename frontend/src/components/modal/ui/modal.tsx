import { FC, memo } from "react";

import styles from "./modal.module.css";

import { TModalUIProps } from "./type";
import closeIcon from "@assets/images/icons/cross.svg";

export const ModalUI: FC<TModalUIProps> = memo(
  ({ onClose, children, modalStyle, closeButtonStyle }) => (
    <>
      <div className={styles.modal} style={modalStyle}>
        <div className={styles.content}>{children}</div>
      </div>
      <button
        className={styles.button}
        style={closeButtonStyle}
        type="button"
        onClick={onClose}
        aria-label="Закрыть окно"
      >
        <img src={closeIcon} alt="" aria-hidden="true" />
      </button>
    </>
  ),
);
