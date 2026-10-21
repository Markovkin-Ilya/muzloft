import { FC, PropsWithChildren, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  clearOrderDraft,
  setBaseDetails,
  setOrderDraftPayment,
  setOrderDraftSlot,
  startOrderDraft,
  toggleOrderInstrument,
} from "@services/bases/slice";
import { setEventDetails, setEvents } from "@services/events/slice";
import {
  setAuthCheckError,
  setIsAuthChecked,
  setUser,
} from "@services/user/slice";
import { useDispatch } from "@services/store";
import { clearAuthTokens } from "@utils/tokenStorage";
import { TBase, TEvent, TOrderDraft, TUser } from "@utils/types";

export type TStoryAuthResponse = {
  status: number;
  body: unknown;
  delayMs?: number;
};

export type TStoryAuthResponses = {
  login?: TStoryAuthResponse;
  register?: TStoryAuthResponse;
};

type TStoryPageSetupProps = PropsWithChildren<{
  path?: string;
  locationState?: unknown;
  user?: TUser | null;
  bases?: TBase[];
  base?: TBase;
  orderDraft?: TOrderDraft;
  events?: TEvent[];
  event?: TEvent;
  isolatedAuth?: boolean;
  authResponses?: TStoryAuthResponses;
}>;

export const StoryPageSetup: FC<TStoryPageSetupProps> = ({
  children,
  path,
  locationState,
  user,
  bases,
  base,
  orderDraft,
  events,
  event,
  isolatedAuth = false,
  authResponses,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navigatedPath = useRef<string | null>(null);
  const [isReady, setIsReady] = useState(!isolatedAuth);

  useEffect(() => {
    if (isolatedAuth) {
      clearAuthTokens();
    }

    if (user !== undefined) {
      dispatch(setUser(user));
      dispatch(setIsAuthChecked(true));
      dispatch(setAuthCheckError(null));
    }
    if (events) {
      dispatch(setEvents(events));
    }
    setIsReady(true);
  }, [dispatch, events, isolatedAuth, user]);

  useEffect(() => {
    if (path && navigatedPath.current !== path) {
      navigatedPath.current = path;
      navigate(path, { replace: true, state: locationState });
    }
  }, [locationState, navigate, path]);

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
          ? events.find((storyEvent) => storyEvent._id === eventId)
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

      const authRoute = pathname.match(
        /\/auth\/(login|register|token|user|logout)\/?$/,
      );
      if (authRoute) {
        const authResponse =
          authRoute[1] === "login"
            ? authResponses?.login
            : authRoute[1] === "register"
              ? authResponses?.register
              : undefined;
        const response =
          authResponse ??
          ({
            status: 501,
            body: {
              success: false,
              message: "No auth response configured for this Story.",
            },
          } satisfies TStoryAuthResponse);

        if (response.delayMs) {
          await new Promise((resolve) =>
            window.setTimeout(resolve, response.delayMs),
          );
        }

        return new Response(JSON.stringify(response.body), {
          status: response.status,
          headers: { "Content-Type": "application/json" },
        });
      }

      return originalFetch(input, init);
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, [authResponses, bases, events]);

  useEffect(() => {
    if (base) {
      dispatch(setBaseDetails(base));
    }
  }, [base, dispatch]);

  const orderDraftKey = JSON.stringify(orderDraft ?? null);

  useEffect(() => {
    const draft: TOrderDraft | null = JSON.parse(orderDraftKey);
    if (!draft) {
      return;
    }
    dispatch(clearOrderDraft());
    dispatch(startOrderDraft({ baseid: draft.baseid, roomid: draft.roomid }));
    dispatch(setOrderDraftSlot(draft.slot));
    dispatch(setOrderDraftPayment(draft.payment));
    draft.instrumentsId.forEach((id) => dispatch(toggleOrderInstrument(id)));
  }, [dispatch, orderDraftKey]);

  useEffect(() => {
    if (event) {
      dispatch(setEventDetails(event));
    }
  }, [dispatch, event]);

  return isolatedAuth && !isReady ? null : children;
};
