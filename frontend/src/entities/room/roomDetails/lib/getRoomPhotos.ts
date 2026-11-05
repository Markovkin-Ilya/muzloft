import { createImageItem } from "@shared/ui/image-viewer";
import type { TImageViewerItem } from "@shared/ui/image-viewer";
import type { TRoom } from "@utils/types";

export const getRoomPhotos = (room: TRoom): TImageViewerItem[] =>
  room.image.map((src, index) =>
    createImageItem({ id: room._id, src, title: room.title, index }),
  );
