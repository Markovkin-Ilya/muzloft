import { TRepetition } from "@utils/types";

export type RepetitionSelectorUIProps = {
  repetitions: TRepetition[];
  activeIndex: number;
  onSelect: (index: number) => void;
  onInstruments: (repetitionId: string) => void;
};
