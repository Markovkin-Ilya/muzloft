import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "@shared/ui/modal";
import { clearOrderDraft, startOrderDraft } from "@services/bases/slice";
import { bookRepetition } from "@services/user/actions";
import { selectUser } from "@services/user/slice";
import { useDispatch, useSelector } from "@services/store";
import { selectOrderDraft } from "@services/bases/slice";
import type { TBase } from "@utils/types";
import {
  buildRepetition,
  getBookingSteps,
  getDraftSummary,
  TBookingStep,
} from "./model";
import { BookingFooter } from "./ui/BookingFooter";
import { SuccessStepUI } from "./ui/SuccessStepUI";
import {
  ConfirmationStep,
  InstrumentStep,
  PaymentStep,
  RoomStep,
  SlotStep,
} from "./ui/steps";

export type TBookingFlowProps = {
  base: TBase;
  initialRoomId?: string;
  onClose: () => void;
};

export const BookingFlow: FC<TBookingFlowProps> = ({
  base,
  initialRoomId,
  onClose,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const draft = useSelector(selectOrderDraft);
  const [stepIndex, setStepIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingNumber, setBookingNumber] = useState("");
  const [showBookedInstruments, setShowBookedInstruments] = useState(false);

  useEffect(() => {
    dispatch(startOrderDraft({ baseid: base._id, roomid: initialRoomId }));
    return () => {
      dispatch(clearOrderDraft());
    };
  }, [dispatch, base._id, initialRoomId]);

  const steps = getBookingSteps({
    hasRoomStep: !initialRoomId,
    hasInstrumentsStep: base.instruments.length > 0,
  });
  const step: TBookingStep = steps[stepIndex];

  if (!draft || draft.baseid !== base._id) {
    return <Modal onClose={onClose} />;
  }

  const summary = getDraftSummary(base, draft);
  const previewRepetition = summary
    ? buildRepetition(base, draft, summary)
    : null;
  const goToStep = (target: TBookingStep) =>
    setStepIndex(Math.max(steps.indexOf(target), 0));

  const isNextDisabled =
    isSubmitting ||
    (step === "room" && !draft.roomid) ||
    (step === "slot" && !draft.slot) ||
    (step === "payment" && !draft.payment);

  const handleSubmit = async () => {
    if (!summary || !draft.roomid || !draft.payment || !user) {
      return;
    }
    const repetition = buildRepetition(base, draft, summary);
    setIsSubmitting(true);
    try {
      const booked = await dispatch(
        bookRepetition({
          repetition,
          order: {
            userId: user._id,
            baseid: base._id,
            roomid: draft.roomid,
            slot: { ...repetition.slot, price: summary.total },
            instrumentsId: draft.instrumentsId,
            payment: draft.payment,
          },
        }),
      ).unwrap();
      setBookingNumber(booked._id);
      goToStep("success");
    } catch {
      // ошибка бронирования: остаёмся на шаге подтверждения
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    if (step === "confirmation") {
      void handleSubmit();
      return;
    }
    setStepIndex((index) => Math.min(index + 1, steps.length - 1));
  };

  const stepProps = { base, draft };

  return (
    <Modal
      onClose={onClose}
      dop={
        <BookingFooter
          currentStep={stepIndex + 1}
          price={summary?.total ?? 0}
          onBack={() => setStepIndex((index) => Math.max(index - 1, 0))}
          onNext={handleNext}
          isNextDisabled={isNextDisabled}
          nextText={step === "confirmation" ? "Бронировать" : "Далее"}
          finalAction={
            showBookedInstruments
              ? {
                  text: "К подтверждению",
                  onClick: () => setShowBookedInstruments(false),
                }
              : step === "success"
                ? {
                    text: "График репетиций",
                    onClick: () => navigate("/repetitions"),
                  }
                : undefined
          }
        />
      }
    >
      {step === "room" && <RoomStep {...stepProps} />}
      {step === "slot" && <SlotStep {...stepProps} />}
      {step === "instruments" && <InstrumentStep />}
      {step === "payment" && <PaymentStep {...stepProps} />}
      {step === "confirmation" &&
        showBookedInstruments &&
        previewRepetition && (
          <InstrumentStep mode="repetition" repetition={previewRepetition} />
        )}
      {step === "confirmation" && !showBookedInstruments && (
        <ConfirmationStep
          {...stepProps}
          onShowInstruments={() => setShowBookedInstruments(true)}
        />
      )}
      {step === "success" && <SuccessStepUI bookingNumber={bookingNumber} />}
    </Modal>
  );
};
