import type { TInstrument } from "@utils/types";
import { TInstrumentButtonState } from "@entities/instrument";

export type TInstrumentSelectionMode =
  | "room"
  | "base"
  | "repetition"
  | "booking";

export type TInstrumentSelectionProps = {
  mode: TInstrumentSelectionMode;
};

export type TInstrumentCardProps = {
  instrument: TInstrument;
  repetitionDate?: Date;
  repetitionPrice?: number;
  buttonState?: TInstrumentButtonState;
  buttonDisabled?: boolean;
  hideSlotPrice?: boolean;
  onBook?: () => void;
};

export type TInstrumentSelectionCategory = {
  name: string;
  instruments: TInstrumentCardProps[];
};
