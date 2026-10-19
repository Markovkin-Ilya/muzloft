import { TBaseCardData } from "@services/bases/slice";

export type TBaseListUIProps = {
  bases: TBaseCardData[];
  searchValue: string;
  onSearchChange: (value: string) => void;
  onBaseSelect: (baseId: string) => void;
};
