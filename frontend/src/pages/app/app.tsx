//import { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import styles from './app.module.css';

//import { useDispatch } from '../../services/store';
//import { checkUserAuth } from '../../services/user/actions';

import { Header } from '@components/header/header';
import { Navigation } from "@components/navigation/navigation";
import { Modal } from '@components/modal/modal';

import { Protected } from "../../components/protected"
//import { Login } from '../../pages/login/login'
//import { Register } from '../../pages/register/register'

import { Profile } from '@pages/profile'
//import { EventDetails } from '@pages/eventDetails'
//import { NotFound404 } from '../../pages/not-fount-404/not-fount-404'

const App = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const backgroundLocation = location.state?.background
/*
  const dispatch = useDispatch();
  const profileMatch = useMatch('/profile/orders/:number');

  useEffect(() => {
    dispatch(checkUserAuth())
  }, []);
*/
  return (
    <div className={styles.app}>
      <Header />
      <div className={styles.page}>
        <Routes location={backgroundLocation || location}>
          <Route path='/profile' element={<Protected component={<Profile />} />} />
        </Routes>
      </div>
      <Navigation />

      {backgroundLocation && <Routes>
        <Route path='/events/:eventId' element={<Modal onClose={() => navigate(-1)} ></Modal>} />
      </Routes>
      }
    </div>
  )
};

export default App;
