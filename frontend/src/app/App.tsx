import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { BaseDetails } from "@widgets/base-details";
import { EventDetails } from "@widgets/event-details";
import { AppHeader } from "@widgets/app-header";
import { AppNavigation } from "@widgets/app-navigation";
import { RoomDetailsWidget } from "@widgets/room-details";
import { CommentsPage } from "@pages/comments";
import { EventsPage } from "@pages/events";
import { BasesPage } from "@pages/bases";
import { BookingPage } from "@pages/booking";
import { ProfilePage } from "@pages/profile";
import { RepetitionsPage } from "@pages/repetitions";
import { LoginPage } from "@pages/login";
import { RegisterPage } from "@pages/register";
import { LogoutPage } from "@pages/logout";
import { NewPasswordPage } from "@pages/new-password";
import { InstrumentSelection } from "@features/instrument-selection";
import { ProtectedRoute } from "./router/ProtectedRoute";
import { Modal } from "@shared/ui/modal";
import { useDispatch, useSelector } from "@services/store";
import { clearBase } from "@services/bases/slice";
import { clearEvent } from "@services/events/slice";
import { checkUserAuth } from "@services/user/actions";
import { selectIsAuthChecked } from "@services/user/slice";
import styles from "./App.module.css";

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const backgroundLocation = location.state?.background;

  useEffect(() => {
    if (!isAuthChecked) {
      dispatch(checkUserAuth());
    }
  }, [dispatch, isAuthChecked]);

  const isStandaloneAuthRoute = [
    "/login",
    "/register",
    "/newpassword",
    "/profile/logout",
  ].includes(location.pathname);
  if (isStandaloneAuthRoute) {
    return (
      <div className={styles.authApp}>
        <Routes>
          <Route
            path="/login"
            element={<ProtectedRoute onlyUnAuth component={<LoginPage />} />}
          />
          <Route
            path="/register"
            element={<ProtectedRoute onlyUnAuth component={<RegisterPage />} />}
          />
          <Route
            path="/newpassword"
            element={
              <ProtectedRoute onlyUnAuth component={<NewPasswordPage />} />
            }
          />
          <Route path="/profile/logout" element={<LogoutPage />} />
        </Routes>
      </div>
    );
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      <div className={styles.page} id="app-page">
        <div
          key={backgroundLocation?.key ?? location.key}
          className={styles.pageContent}
        >
          <Routes location={backgroundLocation || location}>
            <Route
              path="/profile"
              element={<ProtectedRoute component={<ProfilePage />} />}
            />
            <Route
              path="/repetitions"
              element={<ProtectedRoute component={<RepetitionsPage />} />}
            />
            <Route path="/bases" element={<BasesPage />} />
            <Route path="/events" element={<EventsPage />} />
          </Routes>
        </div>
      </div>
      <div className={styles.footer}>
        <AppNavigation />
      </div>

      {backgroundLocation && (
        <Routes>
          <Route
            path="/events/:eventId"
            element={
              <Modal
                onClose={() => {
                  dispatch(clearEvent());
                  navigate(-1);
                }}
              >
                <EventDetails />
              </Modal>
            }
          />
          <Route
            path="/bases/:baseId"
            element={
              <Modal
                onClose={() => {
                  dispatch(clearBase());
                  navigate(-1);
                }}
              >
                <BaseDetails />
              </Modal>
            }
          />
          <Route
            path="/bases/:baseId/book"
            element={<ProtectedRoute component={<BookingPage />} />}
          />
          <Route
            path="/bases/:baseId/:roomId/book"
            element={<ProtectedRoute component={<BookingPage />} />}
          />
          <Route
            path="/bases/:baseId/instruments"
            element={
              <Modal onClose={() => navigate(-1)}>
                <InstrumentSelection mode="base" />
              </Modal>
            }
          />
          <Route
            path="/bases/:baseId/:roomId"
            element={
              <Modal onClose={() => navigate(-1)}>
                <RoomDetailsWidget />
              </Modal>
            }
          />
          <Route
            path="/bases/:baseId/:roomId/instruments"
            element={
              <Modal onClose={() => navigate(-1)}>
                <InstrumentSelection mode="room" />
              </Modal>
            }
          />
          <Route
            path="/bases/:baseId/comments"
            element={
              <Modal onClose={() => navigate(-1)}>
                <CommentsPage />
              </Modal>
            }
          />
          <Route
            path="/repetitions/:repetitionId"
            element={
              <Modal onClose={() => navigate(-1)}>
                <InstrumentSelection mode="repetition" />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
