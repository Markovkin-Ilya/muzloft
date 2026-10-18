import { FC } from "react";
import { BackNextUI } from "./ui/backNext";
import { TBackNextUIProps } from "./ui/type";

export const BackNext: FC<TBackNextUIProps> = ({
  price,
  nextText,
  backText,
  nextDesabled,
  backDesabled,
}) => (
  <BackNextUI
    price={price}
    nextText={nextText}
    backText={backText}
    nextDesabled={nextDesabled}
    backDesabled={backDesabled}
  />
);