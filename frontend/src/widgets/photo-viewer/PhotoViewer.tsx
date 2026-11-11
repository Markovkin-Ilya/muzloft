import { FC } from "react";
import { useParams } from "react-router-dom";
import { getBasePhotos } from "@entities/base";
import { getInstrumentPhotos } from "@entities/instrument";
import { getRoomPhotos } from "@entities/room";
import { selectBaseDetails, selectRoom } from "@services/bases/slice";
import { useSelector } from "@services/store";
import { selectRepetitions } from "@services/user/slice";
import { ImageViewer } from "@shared/ui/image-viewer";
import type { TInstrument } from "@utils/types";

export const PhotoViewer: FC = () => {
  const { baseId, roomId, instrumentId, index } = useParams();
  const base = useSelector(selectBaseDetails);
  const room = useSelector((state) => selectRoom(state, roomId ?? null));
  const repetitions = useSelector(selectRepetitions);
  const initialIndex = Number(index);

  if (instrumentId) {
    const instruments: TInstrument[] = [
      ...(base?.instruments ?? []),
      ...(base?.rooms.flatMap((item) => item.instruments) ?? []),
      ...repetitions.flatMap((item) => item.instruments),
    ];
    const instrument = instruments.find((item) => item._id === instrumentId);

    return instrument ? (
      <ImageViewer images={getInstrumentPhotos(instrument)} />
    ) : null;
  }

  if (!base || base._id !== baseId) {
    return null;
  }

  if (roomId) {
    return room ? (
      <ImageViewer images={getRoomPhotos(room)} initialIndex={initialIndex} />
    ) : null;
  }

  return (
    <ImageViewer images={getBasePhotos(base)} initialIndex={initialIndex} />
  );
};
