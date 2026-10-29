import { useLocation, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "@services/store";
import {
  selectAuthCheckError,
  selectIsAuthChecked,
  selectUser,
} from "@services/user/slice";
import { checkUserAuth } from "@services/user/actions";
import { Preloader } from "@shared/ui/preloader";

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  component: React.JSX.Element;
};

type TRouteTarget = {
  pathname: string;
  search?: string;
  hash?: string;
  state?: unknown;
};

const isRouteTarget = (value: unknown): value is TRouteTarget =>
  typeof value === "object" &&
  value !== null &&
  "pathname" in value &&
  typeof value.pathname === "string";

export const ProtectedRoute = ({
  onlyUnAuth = false,
  component,
}: ProtectedRouteProps): React.JSX.Element => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const authCheckError = useSelector(selectAuthCheckError);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (authCheckError) {
    return (
      <div role="alert">
        <p>
          Не удалось проверить авторизацию. Проверьте соединение и попробуйте
          ещё раз.
        </p>
        <button type="button" onClick={() => dispatch(checkUserAuth())}>
          Повторить
        </button>
      </div>
    );
  }

  if (!onlyUnAuth && !user) {
    return (
      <Navigate
        to="/login"
        state={{
          from: location,
        }}
        replace
      />
    );
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from;
    if (isRouteTarget(from)) {
      return (
        <Navigate
          to={{
            pathname: from.pathname,
            search: from.search,
            hash: from.hash,
          }}
          state={from.state}
          replace
        />
      );
    }
    return <Navigate to="/bases" replace />;
  }

  return component;
};
