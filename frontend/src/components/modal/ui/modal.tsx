import { FC, memo} from 'react';

import styles from './modal.module.css';

import { TModalUIProps } from './type';
import { ModalOverlayUI } from './modal-overlay/modal-overlay';
import CloseIcon from '@assets/images/icons/cross.svg';

export const ModalUI: FC<TModalUIProps> = memo(
  ({ onClose, children }) => (
    <>
      <div className={styles.modal}>
        <div className={styles.header}>
          <button className={styles.button} type='button' onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
      <ModalOverlayUI onClick={onClose} />
    </>
  )
);