import { FC, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { searchBasesByName } from "@features/base-search";
import { fetchBaseDetails, fetchBases } from "@services/bases/actions";
import { selectBases } from "@services/bases/slice";
import { useDispatch, useSelector } from "@services/store";
import { BaseListUI } from "./ui";

export const BaseList: FC = () => {
  const dispatch = useDispatch();
  const bases = useSelector(selectBases);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const hasRequestedBases = useRef(false);

  useEffect(() => {
    if (hasRequestedBases.current) {
      return;
    }

    hasRequestedBases.current = true;
    dispatch(fetchBases());
  }, [dispatch]);

  const foundBases = useMemo(() => {
    return searchBasesByName(bases, searchValue);
  }, [bases, searchValue]);

  const handleBaseSelect = (baseId: string) => {
    dispatch(fetchBaseDetails(baseId));
    navigate(`/bases/${baseId}`, {
      state: { background: location },
    });
  };

  return (
    <BaseListUI
      bases={foundBases}
      searchValue={searchValue}
      onSearchChange={setSearchValue}
      onBaseSelect={handleBaseSelect}
    />
  );
};
