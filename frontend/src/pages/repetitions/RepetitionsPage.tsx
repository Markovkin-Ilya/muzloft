import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "@services/store";
import { selectRepetitions } from "@services/user/slice";
import { RepetitionsUI } from "./ui";

export const RepetitionsPage: FC = () => {
  const repetitions = useSelector(selectRepetitions);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <RepetitionsUI
      repetitions={repetitions}
      onInstruments={(repetitionId) =>
        navigate(`/repetitions/${repetitionId}`, {
          state: { background: location },
        })
      }
    />
  );
};
