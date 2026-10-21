import { FC } from "react";
import { setOrderDraftPayment } from "@services/bases/slice";
import { useDispatch } from "@services/store";
import { PAYMENT_OPTIONS } from "../../model";
import { SelectionStepUI } from "../SelectionStepUI";
import type { TBookingStepProps } from "./types";

export const PaymentStep: FC<TBookingStepProps> = ({ draft }) => {
  const dispatch = useDispatch();

  return (
    <SelectionStepUI
      title="Выберите способ оплаты"
      options={PAYMENT_OPTIONS}
      selectedId={draft.payment}
      onSelect={(id) =>
        dispatch(
          setOrderDraftPayment(
            PAYMENT_OPTIONS.find((option) => option.id === id)?.id ?? null,
          ),
        )
      }
    />
  );
};
