import { FC, PropsWithChildren, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { setSelectedBaseDetails } from "@services/bases/slice";
import { setIsAuthChecked, setUser } from "@services/user/slice";
import { useDispatch } from "@services/store";
import { TBase, TUser } from "@utils/types";
import { storyBases } from "./bases";

type TStoryPageSetupProps = PropsWithChildren<{
  path?: string;
  user?: TUser | null;
  base?: TBase;
}>;

export const StoryPageSetup: FC<TStoryPageSetupProps> = ({
  children,
  path,
  user,
  base,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) {
      return;
    }

    hasInitialized.current = true;

    if (path) {
      navigate(path, { replace: true });
    }

    if (user !== undefined) {
      dispatch(setUser(user));
      dispatch(setIsAuthChecked(true));
    }
  }, [dispatch, navigate, path, user]);

  useEffect(() => {
    const originalFetch = window.fetch;

    window.fetch = async (input, init) => {
      const requestUrl = input instanceof Request ? input.url : String(input);
      const pathname = new URL(requestUrl, window.location.origin).pathname;
      const baseRoute = pathname.match(/\/bases(?:\/([^/]+))?\/?$/);
      const method = init?.method ?? "GET";

      if (baseRoute && method.toUpperCase() === "GET") {
        const baseId = baseRoute[1] ? decodeURIComponent(baseRoute[1]) : null;
        const selectedBase = baseId
          ? storyBases.find((storyBase) => storyBase._id === baseId)
          : null;

        return new Response(
          JSON.stringify(
            baseId
              ? selectedBase
                ? { success: true, base: selectedBase }
                : { success: false, message: "База не найдена." }
              : { success: true, bases: storyBases },
          ),
          {
            status: baseId && !selectedBase ? 404 : 200,
            headers: { "Content-Type": "application/json" },
          },
        );
      }

      return originalFetch(input, init);
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, []);

  useEffect(() => {
    if (base) {
      dispatch(setSelectedBaseDetails(base));
    }
  }, [base, dispatch]);

  return children;
};
