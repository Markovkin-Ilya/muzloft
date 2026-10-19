export type TMenuItem = {
  label: string;
  to: string;
};

export type TMenuMode = "default" | "compact";

export type TMenuProps = {
  items: TMenuItem[];
  mode?: TMenuMode;
  activeIndex?: number;
  onSelect: (index: number) => void;
};
