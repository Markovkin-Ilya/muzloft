import { FC } from "react";
import { NavLink } from "react-router-dom";
import styles from "./navigation.module.css";
import { TNavigationUIProps } from "./type";
import newIcon from "@/assets/images/navigation/new.png";
import bookingIcon from "@/assets/images/navigation/booking.png";
import scheduleIcon from "@/assets/images/navigation/schedule.png";
import profileIcon from "@/assets/images/navigation/profile.png";

export const NavigationUI: FC<TNavigationUIProps> = () => (
  <div className={styles.navigate}>
    <nav className={styles.menu}>
      <NavLink
        to="/new"
        className={({ isActive }) =>
          isActive ? styles.linkActive : styles.link
        }
      >
        {() => (
          <>
            <img
              src={newIcon}
              alt="Изображение конпки собития"
              className={styles.icon}
            />
            <p className={styles.text}>События</p>
          </>
        )}
      </NavLink>

      <NavLink
        to="/booking"
        className={({ isActive }) =>
          isActive ? styles.linkActive : styles.link
        }
      >
        {() => (
          <>
            <img
              src={bookingIcon}
              alt="Изображение конпки записи на репетиции"
              className={styles.icon}
            />
            <p className={styles.text}>Бронировать</p>
          </>
        )}
      </NavLink>

      <NavLink
        to="/repetitions"
        className={({ isActive }) =>
          isActive ? styles.linkActive : styles.link
        }
      >
        {() => (
          <>
            <img
              src={scheduleIcon}
              alt="Изображение конпки расписания ваших репетиций"
              className={styles.icon}
            />
            <p className={styles.text}>Репетиции</p>
          </>
        )}
      </NavLink>

      <NavLink
        to="/profile"
        className={({ isActive }) =>
          isActive ? styles.linkActive : styles.link
        }
      >
        {() => (
          <>
            <img
              src={profileIcon}
              alt="Изображение конпки вашего профиля"
              className={styles.icon}
            />
            <p className={styles.text}>Профиль</p>
          </>
        )}
      </NavLink>
    </nav>
  </div>
);
