import {
  CSSProperties,
  FC,
  memo,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import ReactDOM from "react-dom";

import { TModalProps } from "./type";
import { ModalUI } from "./ui/modal";
import { ModalOverlayUI } from "./ui/modal-overlay/modal-overlay";

export const Modal: FC<TModalProps> = memo(({ onClose, children }) => {
  const [modalStyle, setModalStyle] = useState<CSSProperties>();
  const [closeButtonStyle, setCloseButtonStyle] = useState<CSSProperties>();

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  const modalRoot = document.getElementById("modals");
  const overlayRoot = document.getElementById("modal-overlay");
  const page = document.getElementById("app-page");

  useLayoutEffect(() => {
    if (!page) {
      return;
    }

    const updateModalBounds = () => {
      const bounds = page.getBoundingClientRect();
      setModalStyle({
        top: `${bounds.top + bounds.height / 2}px`,
        left: `${bounds.left + bounds.width / 2}px`,
        width: `${bounds.width}px`,
        height: `${bounds.height}px`,
      });
      setCloseButtonStyle({
        top: `${bounds.top - 40}px`,
        left: `${bounds.right - 44}px`,
      });
    };

    updateModalBounds();

    const resizeObserver = new ResizeObserver(updateModalBounds);
    resizeObserver.observe(page);
    if (page.parentElement) {
      resizeObserver.observe(page.parentElement);
      Array.from(page.parentElement.children).forEach((element) => {
        resizeObserver.observe(element);
      });
    }
    window.addEventListener("resize", updateModalBounds);
    window.addEventListener("scroll", updateModalBounds, true);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateModalBounds);
      window.removeEventListener("scroll", updateModalBounds, true);
    };
  }, [page]);

  if (!modalRoot || !overlayRoot || !page) {
    throw new Error(
      'Modal roots "modals", "modal-overlay", or page element "app-page" were not found.',
    );
  }

  return (
    <>
      {ReactDOM.createPortal(
        <ModalUI
          onClose={onClose}
          modalStyle={modalStyle}
          closeButtonStyle={closeButtonStyle}
        >
          {children}
        </ModalUI>,
        modalRoot,
      )}
      {ReactDOM.createPortal(<ModalOverlayUI onClick={onClose} />, overlayRoot)}
    </>
  );
});
