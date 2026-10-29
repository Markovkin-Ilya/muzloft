import { FC } from "react";
import { Repetition } from "@entities/repetition";
import { Menu, TMenuItem } from "@shared/ui/menu";
import styles from "./RepetitionSelectorUI.module.css";
import { RepetitionSelectorUIProps } from "./type";

const menuItems: TMenuItem[] = [
  { label: "Актуально", to: "current" },
  { label: "История", to: "history" },
];

export const RepetitionSelectorUI: FC<RepetitionSelectorUIProps> = ({
  repetitions,
  activeIndex,
  onSelect,
  onInstruments,
}) => (
  <main className={styles.repetitions}>
    <Menu items={menuItems} activeIndex={activeIndex} onSelect={onSelect} />
    {repetitions.length > 0 ? (
      <section className={styles.list}>
        {repetitions.map((repetition) => (
          <Repetition
            key={repetition._id}
            repetition={repetition}
            onInstruments={() => onInstruments(repetition._id)}
          />
        ))}
      </section>
    ) : (
      <p className={styles.message}>
        {activeIndex === 0
          ? "Актуальных репетиций нет"
          : "История репетиций пуста"}
      </p>
    )}
  </main>
);
