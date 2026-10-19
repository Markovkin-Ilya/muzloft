import type { TRepetition } from "@utils/types";

export type TRepetitionProps = {
  repetition: TRepetition;
  onInstruments: () => void;
  onMap?: () => void;
};
