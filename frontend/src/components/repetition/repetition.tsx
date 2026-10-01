import { FC } from "react";
import { TRepetitionProps } from "./type";
import { RepetitionUI } from "./ui/repetition";

export const Repetition: FC<TRepetitionProps> = ({
    date = "",
    time = "",
    base = "",
    address = "",
    room = "",
    payment = "cash",
}) => {

    const handleInstrument = () => {

    }

    const handleMap = () => {

    }

    return (
        <RepetitionUI
           date={date}
           time={time}
           base={base}
           address={address}
           room={room}
           payment={payment}
           onInstruments={handleInstrument}
           onMap={handleMap}
        />
    )
}