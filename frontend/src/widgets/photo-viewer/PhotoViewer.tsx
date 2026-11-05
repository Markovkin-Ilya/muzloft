import { FC } from "react";
import { useParams } from "react-router-dom";
import { getBasePhotos } from "@entities/base";
import { getRoomPhotos } from "@entities/room";
import { selectBaseDetails, selectRoom } from "@services/bases/slice";
import { useSelector } from "@services/store";
import { ImageViewer } from "@shared/ui/image-viewer";

export const PhotoViewer: FC = () => {
  const { baseId, roomId, index } = useParams();
  const base = useSelector(selectBaseDetails);
  const room = useSelector((state) => selectRoom(state, roomId ?? null));

  if (!base || base._id !== baseId) {
    return null;
  }

  if (roomId) {
    return room ? (
      <ImageViewer images={getRoomPhotos(room)} initialIndex={Number(index)} />
    ) : null;
  }

  return (
    <ImageViewer images={getBasePhotos(base)} initialIndex={Number(index)} />
  );
};
