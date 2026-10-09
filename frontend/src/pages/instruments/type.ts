import { TInstrument } from "@utils/types";
import { TInstrumentButtonState } from "@components/instrument";

export type TInstrumentsMode = "room" | "base" | "repetition" | "booking";

export type TInstrumentsProps = {
  mode: TInstrumentsMode;
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

export type TInstrumentsCategory = {
  name: string;
  instruments: TInstrumentCardProps[];
};
