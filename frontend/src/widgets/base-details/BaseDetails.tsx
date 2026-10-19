import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { selectBaseDetails } from "@services/bases/slice";
import { useSelector } from "@services/store";
import { Preloader } from "@shared/ui/preloader";
import { BaseDetailsUI } from "@entities/base";

export const BaseDetails: FC = () => {
  const base = useSelector(selectBaseDetails);
  const location = useLocation();
  const navigate = useNavigate();

  if (!base) {
    return <Preloader />;
  }

  const background = location.state?.background ?? location;

  return (
    <BaseDetailsUI
      base={base}
      onBook={() =>
        navigate(`/bases/${base._id}/book`, {
          state: { background },
        })
      }
      onRoomSelect={(roomId) =>
        navigate(`/bases/${base._id}/${roomId}`, {
          state: { background },
        })
      }
      onRentInstruments={() =>
        navigate(`/bases/${base._id}/instruments`, {
          state: { background },
        })
      }
      onShowReviews={() =>
        navigate(`/bases/${base._id}/comments`, {
          state: { background },
        })
      }
    />
  );
};
