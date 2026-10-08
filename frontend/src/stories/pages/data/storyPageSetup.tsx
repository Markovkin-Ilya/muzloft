import { FC, PropsWithChildren, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { setBaseDetails } from "@services/bases/slice";
import { setEventDetails, setEvents } from "@services/events/slice";
import { setIsAuthChecked, setUser } from "@services/user/slice";
import { useDispatch } from "@services/store";
import { TBase, TEvent, TUser } from "@utils/types";

type TStoryPageSetupProps = PropsWithChildren<{
  path?: string;
  user?: TUser | null;
  bases?: TBase[];
  base?: TBase;
  events?: TEvent[];
  event?: TEvent;
}>;

export const StoryPageSetup: FC<TStoryPageSetupProps> = ({
  children,
  path,
  user,
  bases,
  base,
  events,
  event,
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
    if (events) {
      dispatch(setEvents(events));
    }
  }, [dispatch, events, navigate, path, user]);

  useEffect(() => {
    const originalFetch = window.fetch;

    window.fetch = async (input, init) => {
      const requestUrl = input instanceof Request ? input.url : String(input);
      const pathname = new URL(requestUrl, window.location.origin).pathname;
      const baseRoute = pathname.match(/\/bases(?:\/([^/]+))?\/?$/);
      const eventRoute = pathname.match(/\/events(?:\/([^/]+))?\/?$/);
      const method = init?.method ?? "GET";

      if (baseRoute && bases && method.toUpperCase() === "GET") {
        const baseId = baseRoute[1] ? decodeURIComponent(baseRoute[1]) : null;
        const requestedBase = baseId
          ? bases.find((storyBase) => storyBase._id === baseId)
          : null;

        return new Response(
          JSON.stringify(
            baseId
              ? requestedBase
                ? { success: true, base: requestedBase }
                : { success: false, message: "База не найдена." }
              : { success: true, bases },
          ),
          {
            status: baseId && !requestedBase ? 404 : 200,
            headers: { "Content-Type": "application/json" },
          },
        );
      }

      if (eventRoute && events && method.toUpperCase() === "GET") {
        const eventId = eventRoute[1]
          ? decodeURIComponent(eventRoute[1])
          : null;
        const event = eventId
          ? events.find((storyEvent) => storyEvent.id === eventId)
          : null;

        return new Response(
          JSON.stringify(
            eventId
              ? event
                ? { success: true, event }
                : { success: false, message: "Событие не найдено." }
              : { success: true, events },
          ),
          {
            status: eventId && !event ? 404 : 200,
            headers: { "Content-Type": "application/json" },
          },
        );
      }

      return originalFetch(input, init);
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, [bases, events]);

  useEffect(() => {
    if (base) {
      dispatch(setBaseDetails(base));
    }
  }, [base, dispatch]);

  useEffect(() => {
    if (event) {
      dispatch(setEventDetails(event));
    }
  }, [dispatch, event]);

  return children;
};
