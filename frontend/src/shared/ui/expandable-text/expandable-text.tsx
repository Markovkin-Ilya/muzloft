import { FC, useId, useLayoutEffect, useRef, useState } from "react";
import arrowIcon from "@assets/images/icons/arrow.svg";
import styles from "./expandable-text.module.css";
import { TExpandableTextProps } from "./type";

export const ExpandableText: FC<TExpandableTextProps> = ({
  children,
  className,
  lines = 3,
}) => {
  const contentId = useId();
  const contentRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [collapsedHeight, setCollapsedHeight] = useState<number>();
  const [expandedHeight, setExpandedHeight] = useState<number>();

  // scrollHeight не зависит от max-height, поэтому замер верен и во время анимации.
  // Наблюдатель срабатывает и при смене ширины, и при смене высоты текста.
  useLayoutEffect(() => {
    const content = contentRef.current;

    if (!content) {
      return;
    }

    const measure = () => {
      const limit = parseFloat(getComputedStyle(content).lineHeight) * lines;
      const fullHeight = content.scrollHeight;

      setCollapsedHeight(limit);
      setExpandedHeight(fullHeight);
      setIsOverflowing(fullHeight > limit + 1);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(content);

    return () => observer.disconnect();
  }, [lines]);

  const maxHeight = !isOverflowing
    ? undefined
    : isExpanded
      ? expandedHeight
      : collapsedHeight;

  return (
    <>
      <div
        id={contentId}
        ref={contentRef}
        className={`${className ?? ""} ${isOverflowing ? styles.clipped : ""}`}
        style={maxHeight !== undefined ? { maxHeight } : undefined}
      >
        {children}
      </div>
      {isOverflowing && (
        <button
          type="button"
          className={styles.toggle}
          onClick={() => setIsExpanded((prev) => !prev)}
          aria-expanded={isExpanded}
          aria-controls={contentId}
          aria-label={isExpanded ? "Свернуть текст" : "Развернуть текст"}
        >
          <img
            src={arrowIcon}
            alt=""
            aria-hidden="true"
            className={`${styles.arrow} ${isExpanded ? "" : styles.arrowCollapsed}`}
          />
        </button>
      )}
    </>
  );
};
