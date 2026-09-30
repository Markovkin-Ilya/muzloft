import { FC } from "react";
import { ButtonUI, TButtonUIProps } from "./ui/button";

export type { TButtonUIProps };

export const Button: FC<TButtonUIProps> = (props) => <ButtonUI {...props} />;
