import { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BookingFlow } from "@widgets/booking-flow";
import { Modal } from "@shared/ui/modal";
import { Preloader } from "@shared/ui/preloader";
import { fetchBaseDetails } from "@services/bases/actions";
import { selectBaseDetails } from "@services/bases/slice";
import { useDispatch, useSelector } from "@services/store";

export const BookingPage: FC = () => {
  const { baseId, roomId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const base = useSelector(selectBaseDetails);
  const isBaseLoaded = !!base && base._id === baseId;

  useEffect(() => {
    if (baseId && !isBaseLoaded) {
      dispatch(fetchBaseDetails(baseId));
    }
  }, [dispatch, baseId, isBaseLoaded]);

  const handleClose = () => navigate(-1);

  if (!isBaseLoaded) {
    return (
      <Modal onClose={handleClose}>
        <Preloader />
      </Modal>
    );
  }

  return (
    <BookingFlow base={base} initialRoomId={roomId} onClose={handleClose} />
  );
};
