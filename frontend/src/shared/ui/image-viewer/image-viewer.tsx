import {
  FC,
  TouchEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { TImageViewerProps } from "./type";
import styles from "./image-viewer.module.css";

const SWIPE_THRESHOLD = 50;

export const ImageViewer: FC<TImageViewerProps> = ({
  images,
  initialIndex = 0,
}) => {
  const count = images.length;
  const [index, setIndex] = useState(
    Math.min(Math.max(initialIndex, 0), Math.max(count - 1, 0)),
  );
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const showNext = useCallback(() => {
    setIndex((current) => (current + 1) % count);
  }, [count]);

  const showPrev = useCallback(() => {
    setIndex((current) => (current - 1 + count) % count);
  }, [count]);

  useEffect(() => {
    if (count < 2) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        showNext();
      } else if (event.key === "ArrowLeft") {
        showPrev();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [count, showNext, showPrev]);

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = touchStart.current;
    touchStart.current = null;

    if (!start || count < 2) {
      return;
    }

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;

    if (
      Math.abs(deltaX) < SWIPE_THRESHOLD ||
      Math.abs(deltaX) < Math.abs(deltaY)
    ) {
      return;
    }

    if (deltaX < 0) {
      showNext();
    } else {
      showPrev();
    }
  };

  const current = images[index];

  if (!current) {
    return null;
  }

  return (
    <div className={styles.viewer}>
      <div
        className={styles.stage}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {count > 1 && (
          <button
            className={`${styles.arrow} ${styles.arrowPrev}`}
            type="button"
            onClick={showPrev}
            aria-label="Предыдущее фото"
          >
            ‹
          </button>
        )}
        <img
          key={current.src}
          className={styles.image}
          src={current.src}
          alt={current.alt ?? `Фото ${index + 1}`}
          draggable={false}
        />
        {count > 1 && (
          <button
            className={`${styles.arrow} ${styles.arrowNext}`}
            type="button"
            onClick={showNext}
            aria-label="Следующее фото"
          >
            ›
          </button>
        )}
      </div>
      {count > 1 && (
        <p className={styles.counter} aria-live="polite">
          {index + 1} / {count}
        </p>
      )}
    </div>
  );
};
