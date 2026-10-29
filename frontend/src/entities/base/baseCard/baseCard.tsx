import { FC } from "react";
import { TBaseCardProps } from "./type";
import { BaseCardUI } from "./ui/baseCard";
import { openInYandexMaps } from "@utils/yandexMaps";

export const BaseCard: FC<TBaseCardProps> = ({
  name,
  image,
  address,
  rating,
  onClick,
  onMap,
}) => {
  const handleClick = () => {
    onClick?.();
  };

  const handleMap = () => {
    openInYandexMaps(address);
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
