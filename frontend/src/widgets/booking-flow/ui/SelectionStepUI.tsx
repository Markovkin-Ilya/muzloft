import { FC } from "react";
import { Button } from "@shared/ui/button";
import styles from "./SelectionStepUI.module.css";

export type TSelectionOption = { id: string; label: string };

export type TSelectionStepUIProps = {
  title: string;
  options: readonly TSelectionOption[];
  selectedId: string | null;
  onSelect: (id: string) => void;
};

export const SelectionStepUI: FC<TSelectionStepUIProps> = ({
  title,
  options,
  selectedId,
  onSelect,
}) => (
  <section className={styles.card}>
    <h2 className={styles.title}>{title}</h2>
    <div className={styles.options} role="radiogroup" aria-label={title}>
      {options.map((option) => (
        <Button
          key={option.id}
          size="large"
          className={
            option.id === selectedId
              ? `${styles.option} ${styles.selected}`
              : styles.option
          }
          onClick={() => onSelect(option.id)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  </section>
);
