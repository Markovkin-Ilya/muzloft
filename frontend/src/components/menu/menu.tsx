import { FC } from "react";
import { matchPath, useLocation } from "react-router-dom";
import { MenuUI } from "./ui/menu";
import { TMenuProps } from "./type";

export type { TMenuItem, TMenuProps } from "./type";

export const Menu: FC<TMenuProps> = ({ items }) => {
  const { pathname } = useLocation();

  const matchedIndex = items.reduce(
    (currentIndex, item, index) => {
      if (
        matchPath({ path: item.to, end: false }, pathname) &&
        (currentIndex === -1 ||
          item.to.length > items[currentIndex].to.length)
      ) {
        return index;
      }

      return currentIndex;
    },
    -1,
  );
  const activeIndex = matchedIndex === -1 && items.length > 0 ? 0 : matchedIndex;

  return <MenuUI items={items} activeIndex={activeIndex} />;
};
