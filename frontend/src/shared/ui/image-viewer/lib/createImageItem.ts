import type { TImageViewerItem } from "../type";

type TCreateImageItemParams = {
  id: string;
  src: string;
  title: string;
  index?: number;
};

export const createImageItem = ({
  id,
  src,
  title,
  index = 0,
}: TCreateImageItemParams): TImageViewerItem => ({
  key: `${id}-${src}-${index}`,
  src,
  alt: `${title} — фото ${index + 1}`,
});
