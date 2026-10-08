import { FC } from "react";
import { ButtonUI } from "./ui/button";
import { TButtonUIProps } from "./ui/type";

export type { TButtonUIProps };

export const Button: FC<TButtonUIProps> = (props) => <ButtonUI {...props} />;
