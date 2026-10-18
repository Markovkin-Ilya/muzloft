export type TButtonSize = "large" | "small";

export type TButtonUIProps = {
  size?: TButtonSize;
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
};
