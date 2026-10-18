import { FC } from "react";
import { selectBaseDetails } from "@services/bases/slice";
import { useSelector } from "@services/store";
import { BasDetailsUI } from "./ui/basDetails";
import { Preloader } from "@components/app/preloader";

export const BaseDetails: FC = (() => {
  const base = useSelector(selectBaseDetails);

  if (!base) {
    return <Preloader />;
  }

  const reviewCount = base.comments.length;

  return <BasDetailsUI base={base} reviewCount={reviewCount} />;
});

