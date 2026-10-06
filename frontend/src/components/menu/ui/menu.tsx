import { FC, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./menu.module.css";
import { TMenuUIProps } from "./type";

export const MenuUI: FC<TMenuUIProps> = ({ items, activeIndex }) => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  useEffect(() => {
    const viewport = viewportRef.current;
    const activeItem = itemRefs.current[activeIndex];

    if (!viewport || !activeItem) {
      return;
    }

    const centerActiveItem = () => {
      const viewportBounds = viewport.getBoundingClientRect();
      const itemBounds = activeItem.getBoundingClientRect();

      viewport.scrollTo({
        left:
          viewport.scrollLeft +
          itemBounds.left -
          viewportBounds.left -
          (viewport.clientWidth - itemBounds.width) / 2,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
    };

    centerActiveItem();
    window.addEventListener("resize", centerActiveItem);

    return () => window.removeEventListener("resize", centerActiveItem);
  }, [activeIndex, items.length]);

  return (
    <nav className={styles.menu} aria-label="Разделы">
      <div className={styles.viewport} ref={viewportRef}>
        <div className={styles.track}>
          {items.map((item, index) => {
            const isActive = index === activeIndex;

            return (
              <Link
                key={item.to}
                ref={(element) => {
                  itemRefs.current[index] = element;
                }}
                to={item.to}
                className={`${styles.item} ${isActive ? styles.itemActive : ""}`}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
