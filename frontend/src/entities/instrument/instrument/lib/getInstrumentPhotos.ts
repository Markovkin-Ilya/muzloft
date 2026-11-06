import { createImageItem } from "@shared/ui/image-viewer";
import type { TImageViewerItem } from "@shared/ui/image-viewer";
import type { TInstrument } from "@utils/types";

export const getInstrumentPhotos = (
  instrument: TInstrument,
): TImageViewerItem[] => [
  createImageItem({
    id: instrument._id,
    src: instrument.image,
    title: instrument.title,
  }),
];
