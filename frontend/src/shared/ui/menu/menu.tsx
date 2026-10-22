import {
  FC,
  useEffect,
  useRef,
  WheelEvent as ReactWheelEvent,
} from "react";
import styles from "./menu.module.css";
import { TMenuProps } from "./type";

export const Menu: FC<TMenuProps> = ({
  items,
  mode = "default",
  activeIndex = 0,
  onSelect,
}) => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const handleWheel = (event: ReactWheelEvent<HTMLDivElement>) => {
    const viewport = event.currentTarget;

    if (
      viewport.scrollWidth > viewport.clientWidth &&
      Math.abs(event.deltaY) > Math.abs(event.deltaX)
    ) {
      event.preventDefault();
      viewport.scrollLeft += event.deltaY;
    }
  };

  useEffect(() => {
    const viewport = viewportRef.current;
    const activeItem = itemRefs.current[activeIndex];

    if (!viewport || !activeItem) {
      return;
    }

    const alignActiveItem = () => {
      const viewportBounds = viewport.getBoundingClientRect();
      const itemBounds = activeItem.getBoundingClientRect();
      const isLastItem = activeIndex === items.length - 1;
      const targetLeft = isLastItem
        ? viewport.scrollLeft + itemBounds.right - viewportBounds.right
        : viewport.scrollLeft +
          itemBounds.left -
          viewportBounds.left -
          (viewport.clientWidth - itemBounds.width) / 2;

      viewport.scrollTo({
        left: targetLeft,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
    };

    alignActiveItem();
    window.addEventListener("resize", alignActiveItem);

    return () => window.removeEventListener("resize", alignActiveItem);
  }, [activeIndex, items.length]);

  return (
    <nav className={styles.menu} aria-label="Разделы">
      <div className={styles.viewport} ref={viewportRef} onWheel={handleWheel}>
        <div className={styles.track}>
          {items.map((item, index) => {
            const isActive = index === activeIndex;

            const className = `${styles.item} ${mode === "compact" ? styles.itemCompact : ""} ${isActive ? styles.itemActive : ""}`;

            return (
              <button
                key={item.to}
                ref={(element) => {
                  itemRefs.current[index] = element;
                }}
                type="button"
                className={className}
                aria-pressed={isActive}
                onClick={() => onSelect(index)}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

