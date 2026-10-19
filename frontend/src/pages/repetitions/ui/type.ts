import { TRepetition } from "@utils/types";

export type RepetitionsUIProps = {
  repetitions: TRepetition[];
  onInstruments: (repetitionId: string) => void;
};
