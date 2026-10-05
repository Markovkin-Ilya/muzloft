import { FC } from "react";
import { TBaseCardProps } from "./type";
import { BaseCardUI } from "./ui/baseCard";

export const BaseCard: FC<TBaseCardProps> = ({
  name = "",
  image = "",
  address = "",
  rating = 0,
  onClick,
  onMap,
}) => {
  const handleClick = () => {
    onClick?.();
  };

  const handleMap = () => {
    onMap?.();
  };

  return (
    <BaseCardUI
      name={name}
      image={image}
      address={address}
      rating={rating}
      onClick={handleClick}
      onMap={handleMap}
    />
  );
};
