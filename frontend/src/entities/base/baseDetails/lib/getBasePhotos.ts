import { createImageItem } from "@shared/ui/image-viewer";
import type { TImageViewerItem } from "@shared/ui/image-viewer";
import type { TBase } from "@utils/types";

export const getBasePhotos = (base: TBase): TImageViewerItem[] =>
  base.rooms.flatMap((room) =>
    room.image.map((src, index) =>
      createImageItem({ id: room._id, src, title: room.title, index }),
    ),
  );
