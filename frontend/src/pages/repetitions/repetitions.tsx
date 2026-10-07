import { FC } from "react";
import { useSelector } from "@services/store";
import { selectRepetitions } from "@services/user/slice";
import { RepetitionsUI } from "./ui/repetitions";

export const Repetitions: FC = () => {
  const repetitions = useSelector(selectRepetitions);

  return <RepetitionsUI repetitions={repetitions} />;
};