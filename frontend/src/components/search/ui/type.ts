export type TSearchUIProps = {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  size?: "default" | "small";
  icon?: React.ReactNode;
  onIconClick?: () => void;
};