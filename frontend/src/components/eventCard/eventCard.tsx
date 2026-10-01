import { FC } from "react";
import { TEventCardProps } from "./type";
import { EventCardUI } from "./ui/eventCard";

export const EventCard: FC<TEventCardProps> = ({
    title,
    subtitle,
    description,
    image,
    onClick,
}) => {
    const handleClick = () => {
        onClick?.();
    };

    return (
        <EventCardUI
            title={title}
            subtitle={subtitle}
            description={description}
            image={image}
            onClick={handleClick}
        />
    );
};
