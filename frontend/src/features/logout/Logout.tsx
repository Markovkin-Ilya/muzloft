import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "@services/store";
import { logout } from "@services/user/actions";
import { Button } from "@shared/ui/button";
import styles from "./Logout.module.css";

export const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [hasError, setHasError] = useState(false);

  const handleConfirm = async () => {
    setHasError(false);
    const result = await dispatch(logout());
    if (logout.rejected.match(result)) {
      setHasError(true);
      return;
    }
    navigate("/login", { replace: true });
  };

  return (
    <main className={styles.page}>
      <div className={styles.logout}>
        <p className={styles.text}>
          Вы действительно хотите выйти из аккаунта?
        </p>
        {hasError && (
          <p role="alert" className={styles.error}>
            Проблемы с работой сервера, повторите попытку позже
          </p>
        )}
        <div className={styles.actions}>
          <Button size="large" onClick={() => navigate(-1)}>
            Нет
          </Button>
          <Button size="large" onClick={handleConfirm}>
            Да
          </Button>
        </div>
      </div>
    </main>
  );
};
