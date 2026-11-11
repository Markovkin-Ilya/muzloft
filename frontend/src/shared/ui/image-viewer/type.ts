export type TImageViewerItem = {
  key: string;
  src: string;
  alt?: string;
};

export type TImageViewerProps = {
  images: TImageViewerItem[];
  initialIndex?: number;
};
