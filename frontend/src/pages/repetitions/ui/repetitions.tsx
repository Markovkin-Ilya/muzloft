import { FC } from "react";

import styles from "./repetitions.module.css";
import { RepetitionsUIProps } from "./type";
import { Repetition } from "@entities/repetition";

export const RepetitionsUI: FC<RepetitionsUIProps> = ({
  repetitions,
  onInstruments,
}) => (
  <main className={styles.repetitions}>
    <section className={styles.list}>
      {repetitions.map((repetition) => (
        <Repetition
          key={repetition._id}
          repetition={repetition}
          onInstruments={() => onInstruments(repetition._id)}
        />
      ))}
    </section>
  </main>
);
