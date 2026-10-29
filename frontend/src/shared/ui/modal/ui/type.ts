import { CSSProperties, ReactNode, RefObject } from "react";

export type TModalUIProps = {
  onClose: () => void;
  children?: ReactNode;
  modalStyle?: CSSProperties;
  closeButtonStyle?: CSSProperties;
  dopStyle?: CSSProperties;
  contentRef: RefObject<HTMLDivElement | null>;
  dop?: ReactNode;
};
