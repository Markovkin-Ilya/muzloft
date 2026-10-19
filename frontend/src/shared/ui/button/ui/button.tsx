import { FC } from "react";
import styles from "./button.module.css";
import { TButtonUIProps } from "./type";

const sizeMap: Record<NonNullable<TButtonUIProps["size"]>, string> = {
  large: styles.large,
  small: styles.small,
};

export const ButtonUI: FC<TButtonUIProps> = ({
  size = "small",
  children,
  onClick,
  disabled,
  className,
  icon,
}) => {
  return (
    <button
      className={`${styles.button} ${sizeMap[size]} ${className || ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </button>
  );
};
