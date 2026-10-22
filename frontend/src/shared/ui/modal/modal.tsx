import {
  CSSProperties,
  FC,
  memo,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import ReactDOM from "react-dom";
import { useLocation } from "react-router-dom";

import { TModalProps } from "./type";
import { ModalUI } from "./ui/modal";
import { ModalOverlayUI } from "./ui/modal-overlay/modal-overlay";

export const Modal: FC<TModalProps> = memo(({ onClose, children, dop }) => {
  const location = useLocation();
  const contentRef = useRef<HTMLDivElement>(null);
  const [modalTargets, setModalTargets] = useState<{
    modalRoot: HTMLElement;
    overlayRoot: HTMLElement;
    page: HTMLElement;
  } | null>(null);
  const [modalStyle, setModalStyle] = useState<CSSProperties>();
  const [dopStyle, setDopStyle] = useState<CSSProperties>();
  const [closeButtonStyle, setCloseButtonStyle] = useState<CSSProperties>();

  useLayoutEffect(() => {
    const modalRoot = document.getElementById("modals");
    const overlayRoot = document.getElementById("modal-overlay");
    const page = document.getElementById("app-page");

    if (!modalRoot || !overlayRoot || !page) {
      throw new Error(
        'Modal roots "modals", "modal-overlay", or page element "app-page" were not found.',
      );
    }

    setModalTargets({ modalRoot, overlayRoot, page });
  }, []);

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

  useLayoutEffect(() => {
    contentRef.current?.scrollTo(0, 0);
  }, [location.key]);

  useLayoutEffect(() => {
    const page = modalTargets?.page;
    if (!page) {
      return;
    }

    const updateModalBounds = () => {
      const bounds = page.getBoundingClientRect();
      const parentBounds = page.parentElement?.getBoundingClientRect();
      const dopHeight = Math.max(
        0,
        (parentBounds?.bottom ?? window.innerHeight) - bounds.bottom,
      );

      setModalStyle({
        top: `${bounds.top + bounds.height / 2}px`,
        left: `${bounds.left + bounds.width / 2}px`,
        width: `${bounds.width}px`,
        height: `${bounds.height}px`,
      });
      setDopStyle({
        top: `${bounds.bottom}px`,
        left: `${bounds.left}px`,
        width: `${bounds.width}px`,
        height: `${dopHeight}px`,
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
  }, [modalTargets]);

  if (!modalTargets) {
    return null;
  }

  return (
    <>
      {ReactDOM.createPortal(
        <ModalUI
          onClose={onClose}
          modalStyle={modalStyle}
          closeButtonStyle={closeButtonStyle}
          contentRef={contentRef}
          dop={dop}
          dopStyle={dopStyle}
        >
          {children}
        </ModalUI>,
        modalTargets.modalRoot,
      )}
      {ReactDOM.createPortal(
        <ModalOverlayUI onClick={onClose} />,
        modalTargets.overlayRoot,
      )}
    </>
  );
});
