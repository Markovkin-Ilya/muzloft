export type TSearchUIProps = {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  size?: "default" | "small";
  type?: "text" | "email" | "password";
  icon?: React.ReactNode;
  onIconClick?: () => void;
  id?: string;
  name?: string;
  autoComplete?: string;
  required?: boolean;
  spellCheck?: boolean;
  minLength?: number;
  maxLength?: number;
  className?: string;
};
