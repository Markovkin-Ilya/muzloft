import { TMenuItem, TMenuMode } from "../type";

export type TMenuUIProps = {
  items: TMenuItem[];
  activeIndex: number;
  mode?: TMenuMode;
};
