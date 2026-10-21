import { FC } from "react";
import { BackNextUI } from "./ui/backNext";
import { TBackNextUIProps } from "./ui/type";

export const BackNext: FC<TBackNextUIProps> = ({
  price,
  nextText,
  backText,
  onNext,
  onBack,
  nextDisabled,
  backDisabled,
}) => (
  <BackNextUI
    price={price}
    nextText={nextText}
    backText={backText}
    onNext={onNext}
    onBack={onBack}
    nextDisabled={nextDisabled}
    backDisabled={backDisabled}
  />
);
