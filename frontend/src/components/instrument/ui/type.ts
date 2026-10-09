import { TInstrumentButtonState } from "../type";

export type TInstrumentUIProps = {
  title: string;
  image: string;
  slotPrice?: number;
  repetitionPrice?: number;
  buttonState?: TInstrumentButtonState;
  buttonDisabled?: boolean;
  onBook?: () => void;
};
