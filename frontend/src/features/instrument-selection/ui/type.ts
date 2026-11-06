import type { TInstrumentSelectionCategory } from "../types";

export type TInstrumentSelectionViewProps = {
  categories: TInstrumentSelectionCategory[];
  initialCategoryIndex?: number;
  onCategoryChange?: (index: number) => void;
};
