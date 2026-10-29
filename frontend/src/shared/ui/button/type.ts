export type TButtonSize = "large" | "small";

export type TButtonProps = {
  size?: TButtonSize;
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
  type?: "button" | "submit" | "reset";
};
