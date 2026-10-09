import { FC } from "react";

import styles from "./repetitions.module.css";
import { RepetitionsUIProps } from "./type";
import { Repetition } from "@components/repetition/repetition";

export const RepetitionsUI: FC<RepetitionsUIProps> = ({ repetitions }) => (
  <main className={styles.repetitions}>
    <section className={styles.list}>
      {repetitions.map((repetition) => (
      <Repetition key={repetition._id} repetition={repetition} />
      ))}
    </section>
  </main> 
);
