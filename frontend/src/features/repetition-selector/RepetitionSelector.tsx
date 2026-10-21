import { FC, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "@services/store";
import { selectRepetitions } from "@services/user/slice";
import { TRepetition } from "@utils/types";
import { RepetitionSelectorUI } from "./ui";

const getEndTime = (repetition: TRepetition) =>
  new Date(repetition.slot.date).getTime() +
  Number(repetition.slot.period) * 60 * 60 * 1000;

export const RepetitionSelector: FC = () => {
  const repetitions = useSelector(selectRepetitions);
  const location = useLocation();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [now, setNow] = useState(() => Date.now());
  const nextEndTime = repetitions.reduce((nearestEndTime, repetition) => {
    const endTime = getEndTime(repetition);
    return endTime > now && endTime < nearestEndTime ? endTime : nearestEndTime;
  }, Number.POSITIVE_INFINITY);
  const visibleRepetitions = repetitions.filter((repetition) =>
    activeIndex === 0
      ? getEndTime(repetition) > now
      : getEndTime(repetition) <= now,
  );

  useEffect(() => {
    if (!Number.isFinite(nextEndTime)) {
      return;
    }

    const maxTimeout = 2_147_483_647;
    const timeout = window.setTimeout(
      () => setNow(Date.now()),
      Math.min(nextEndTime - now, maxTimeout),
    );

    return () => window.clearTimeout(timeout);
  }, [nextEndTime, now]);

  return (
    <RepetitionSelectorUI
      repetitions={visibleRepetitions}
      activeIndex={activeIndex}
      onSelect={setActiveIndex}
      onInstruments={(repetitionId) =>
        navigate(`/repetitions/${repetitionId}`, {
          state: { background: location },
        })
      }
    />
  );
};
