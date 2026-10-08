import { CSSProperties, ReactNode } from "react";

export type TModalUIProps = {
  onClose: () => void;
  children?: ReactNode;
  modalStyle?: CSSProperties;
  closeButtonStyle?: CSSProperties;
};
