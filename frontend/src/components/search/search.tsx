import { FC } from "react";
import { SearchUI } from "./ui/search";
import { TSearchUIProps } from "./ui/type";

export type { TSearchUIProps };

export const Search: FC<TSearchUIProps> = (props) => <SearchUI {...props} />;
