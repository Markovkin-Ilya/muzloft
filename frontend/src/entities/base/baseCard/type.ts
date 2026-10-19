export type TBaseCardProps = {
  name: string;
  image: string;
  address: string;
  rating: number;
  onClick?: () => void;
  onMap?: () => void;
};
