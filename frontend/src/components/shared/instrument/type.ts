import { TInstrument } from "@utils/types";

export type TInstrumentButtonState = "busy" | "available" | "booked";

type TInstrumentActionProps =
  | {
      buttonState: "available";
      buttonDisabled?: boolean;
      onBook?: () => void;
    }
  | {
      buttonState: "busy" | "booked";
      buttonDisabled?: boolean;
      onBook?: () => void;
    }
  | {
      buttonState?: undefined;
      buttonDisabled?: never;
      onBook?: never;
    };

export type TInstrumentProps = {
  instrument: TInstrument;
  repetitionDate?: Date;
  repetitionPrice?: number;
  hideSlotPrice?: boolean;
} & TInstrumentActionProps;
