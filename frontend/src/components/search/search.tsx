import { FC } from "react";
import { SearchUI, TSearchUIProps } from "./ui/search";

export type { TSearchUIProps };

export const Search: FC<TSearchUIProps> = (props) => <SearchUI {...props} />;