import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import styles from "./app.module.css";

//import { useDispatch } from '../../services/store';
//import { checkUserAuth } from '../../services/user/actions';

import { Header } from "@components/app/header";
import { Navigation } from "@components/app/navigation";
import { Modal } from "@components/app/modal";
import { BaseDetails } from "@components/base/baseDetails";
import { EventDetails } from "@components/event/eventDetails";
import { Room } from "@components/base/room";

import { Protected } from "../../components/protected";
//import { Login } from '../../pages/login/login'
//import { Register } from '../../pages/register/register'

import { Profile } from "@pages/profile";
import { Repetitions } from "@pages/repetitions";
import { Bases } from "@pages/bases";
import { Instruments } from "@pages/instruments";
import { Comments } from "@pages/comments";
import { useDispatch } from "@services/store";
import { clearBase } from "@services/bases/slice";
import { Events } from "@pages/events";
import { clearEvent } from "@services/events/slice";
import { checkUserAuth } from "@services/user/actions";
//import { EventDetails } from '@pages/eventDetails'
//import { NotFound404 } from '../../pages/not-fount-404/not-fount-404'

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const backgroundLocation = location.state?.background;

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (

    <div className={styles.app}>
      <Header />
      <div className={styles.page} id="app-page">
        <div
          key={backgroundLocation?.key ?? location.key}
          className={styles.pageContent}
        >
          <Routes location={backgroundLocation || location}>
            <Route
              path="/profile"
              element={<Protected component={<Profile />} />}
            />
            <Route
              path="/repetitions"
              element={<Protected component={<Repetitions />} />}
            />
            <Route path="/bases" element={<Bases />} />
            <Route path="/events" element={<Events />} />
          </Routes>
        </div>
      </div>
      <div className={styles.footer}>
        <Navigation />
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
            element={
              <Modal onClose={() => navigate(-1)} dop={<div />}>
              </Modal>
            }
          />

          <Route
            path="/bases/:baseId/instruments"
            element={
              <Modal onClose={() => navigate(-1)}>
                <Instruments mode="base" />
              </Modal>
            }
          />

          <Route
            path="/bases/:baseId/:roomId"
            element={
            <Modal
              onClose={() => {
                  navigate(-1);
                }}
              >
                <Room />
              </Modal>
            }
          />

          <Route
            path="/bases/:baseId/:roomId/instruments"
            element={
              <Modal onClose={() => navigate(-1)}>
                <Instruments mode="room" />
              </Modal>
            }
          />

          <Route
            path="/bases/:baseId/comments"
            element={
              <Modal onClose={() => navigate(-1)}>
                <Comments />
              </Modal>
            }
          />

          <Route
            path="/repetitions/:repetitionId"
            element={
              <Modal onClose={() => navigate(-1)}>
                <Instruments mode="repetition" />
              </Modal>
            }
          />
          
        </Routes>
      )}
    </div>
  );
};

export default App;
