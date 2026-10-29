import { FC } from "react";
import styles from "./button.module.css";
import { TButtonProps } from "./type";

const sizeMap: Record<NonNullable<TButtonProps["size"]>, string> = {
  large: styles.large,
  small: styles.small,
};

export const Button: FC<TButtonProps> = ({
  size = "small",
  children,
  onClick,
  disabled,
  className,
  icon,
  type,
}) => {
  return (
    <button
      className={`${styles.button} ${sizeMap[size]} ${className || ""}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </button>
  );
};
