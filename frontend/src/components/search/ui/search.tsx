import { FC, useState, useRef } from "react";
import styles from "./search.module.css";

export type TSearchUIProps = {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  icon?: React.ReactNode;
  onIconClick?: () => void;
};

export const SearchUI: FC<TSearchUIProps> = ({
  value = "",
  onChange,
  placeholder = "",
  disabled = false,
  error,
  icon,
  onIconClick,
}) => {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isActive = focused && !disabled;
  const isDisabled = disabled;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const handleIconClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (disabled) return;
    onIconClick?.();
  };

  const handleContainerClick = () => {
    if (disabled) return;
    inputRef.current?.focus();
  };

  return (
    <div>
      <div className={`${styles.input} ${styles.inputDefault} ${isActive ? styles.inputStatusActive : ""} ${error ? styles.inputStatusError : ""} ${isDisabled ? styles.inputStatusDisabled : ""}`}>
        <div className={styles.inputContainer} onClick={handleContainerClick}>
          <input
            ref={inputRef}
            type="text"
            className={`${styles.inputTextfield} ${isDisabled ? styles.inputTextfieldDisabled : ""}`}
            value={value}
            onChange={handleChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            disabled={isDisabled}
            placeholder={placeholder}
          />
        </div>
        {icon && (
          <span
            className={`${styles.inputIcon} ${isDisabled ? styles.inputIconDisabled : ""}`}
            onClick={handleIconClick}
          >
            {icon}
          </span>
        )}
      </div>
      {error && <span className={styles.inputError}>{error}</span>}
    </div>
  );
};
