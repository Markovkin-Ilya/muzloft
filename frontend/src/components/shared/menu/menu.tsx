import { FC } from "react";
import { MenuUI } from "./ui/menu";
import { TMenuProps } from "./type";

export type { TMenuItem, TMenuMode, TMenuProps } from "./type";

export const Menu: FC<TMenuProps> = ({
  items,
  mode = "default",
  activeIndex = 0,
  onSelect,
}) => {
  return (
    <MenuUI
      items={items}
      activeIndex={activeIndex}
      mode={mode}
      onSelect={onSelect}
    />
  );
};
