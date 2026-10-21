import { FormEvent, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "@services/store";
import { Button } from "@shared/ui/button";
import { Search } from "@shared/ui/search";
import {
  login as loginUser,
  register as registerUser,
} from "@services/user/actions";
import { ApiError } from "@utils/api";
import styles from "./AuthForm.module.css";

type TAuthFormProps = {
  mode: "login" | "register";
};

type TAuthLocationState = {
  from?: {
    pathname?: string;
    search?: string;
    hash?: string;
    state?: unknown;
  };
};

const isEmailAlreadyRegistered = (error: unknown): boolean => {
  const body =
    error instanceof ApiError
      ? error.body
      : typeof error === "object" && error !== null
        ? error
        : null;
  const status = error instanceof ApiError ? error.status : undefined;

  if (status === 409) {
    return true;
  }
  if (!body || typeof body !== "object") {
    return false;
  }

  const code =
    "code" in body && typeof body.code === "string"
      ? body.code.toLowerCase()
      : "";
  const message =
    "message" in body && typeof body.message === "string"
      ? body.message.toLowerCase()
      : "";

  return (
    code === "email_already_exists" ||
    code === "email_exists" ||
    /email.*(already|exists|taken)|почт.*(занят|существ)/i.test(message)
  );
};

export const AuthForm = ({ mode }: TAuthFormProps) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const isRegister = mode === "register";
  const locationState = location.state as TAuthLocationState | null;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const clearError = () => setErrorMessage(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }

    if (isRegister && password !== confirmation) {
      setErrorMessage("Пароли не совпадают.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      if (isRegister) {
        await dispatch(
          registerUser({
            name: name.trim(),
            email: email.trim(),
            password,
            rememberMe,
          }),
        ).unwrap();
      } else {
        await dispatch(
          loginUser({
            email: email.trim(),
            password,
            rememberMe,
          }),
        ).unwrap();
      }

      const from = locationState?.from;
      if (from?.pathname) {
        navigate(
          {
            pathname: from.pathname,
            search: from.search,
            hash: from.hash,
          },
          { replace: true, state: from.state },
        );
      } else {
        navigate("/bases", { replace: true });
      }
    } catch (error) {
      if (isRegister && isEmailAlreadyRegistered(error)) {
        setErrorMessage("Этот адрес электронной почты уже зарегистрирован.");
      } else if (isRegister) {
        setErrorMessage("Не удалось зарегистрироваться. Попробуйте ещё раз.");
      } else {
        setErrorMessage("Неверная почта или пароль.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextPath = isRegister ? "/login" : "/register";

  return (
    <main className={styles.page}>
      <section className={styles.card} aria-labelledby="auth-title">
        <h1 id="auth-title" className={styles.title}>
          {isRegister ? "Регистрация" : "Вход"}
        </h1>

        <form className={styles.form} onSubmit={handleSubmit}>
          {isRegister && (
            <div className={styles.field}>
              <label className={styles.visuallyHidden} htmlFor="auth-name">
                Имя
              </label>
              <Search
                id="auth-name"
                className={styles.searchInput}
                type="text"
                name="name"
                placeholder="Имя"
                autoComplete="name"
                value={name}
                onChange={(value) => {
                  setName(value);
                  clearError();
                }}
                required
                disabled={isSubmitting}
              />
            </div>
          )}

          <div className={styles.field}>
            <label className={styles.visuallyHidden} htmlFor="auth-email">
              E-mail
            </label>
            <Search
              id="auth-email"
              type="email"
              name="email"
              placeholder="E-mail"
              autoComplete="email"
              spellCheck={false}
              value={email}
              onChange={(value) => {
                setEmail(value);
                clearError();
              }}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className={`${styles.field} ${styles.passwordField}`}>
            <label className={styles.visuallyHidden} htmlFor="auth-password">
              Пароль
            </label>
            <Search
              id="auth-password"
              className={`${styles.searchInput} ${styles.passwordInput}`}
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Пароль"
              autoComplete={isRegister ? "new-password" : "current-password"}
              minLength={8}
              value={password}
              onChange={(value) => {
                setPassword(value);
                clearError();
              }}
              required
              disabled={isSubmitting}
            />
            <button
              className={styles.passwordToggle}
              type="button"
              onClick={() => setShowPassword((visible) => !visible)}
              aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
              aria-pressed={showPassword}
              disabled={isSubmitting}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 5c-5.2 0-9.3 4.1-10.8 6.2a1.3 1.3 0 0 0 0 1.6C2.7 14.9 6.8 19 12 19s9.3-4.1 10.8-6.2a1.3 1.3 0 0 0 0-1.6C21.3 9.1 17.2 5 12 5Zm0 11.2a4.2 4.2 0 1 1 0-8.4 4.2 4.2 0 0 1 0 8.4Zm0-2.2a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
              </svg>
            </button>
          </div>

          {isRegister && (
            <div className={`${styles.field} ${styles.passwordField}`}>
              <label
                className={styles.visuallyHidden}
                htmlFor="auth-confirmation"
              >
                Повторите пароль
              </label>
              <Search
                id="auth-confirmation"
                className={`${styles.searchInput} ${styles.passwordInput}`}
                type={showConfirmation ? "text" : "password"}
                name="passwordConfirmation"
                placeholder="Повторите пароль"
                autoComplete="new-password"
                minLength={8}
                value={confirmation}
                onChange={(value) => {
                  setConfirmation(value);
                  clearError();
                }}
                required
                disabled={isSubmitting}
              />
              <button
                className={styles.passwordToggle}
                type="button"
                onClick={() => setShowConfirmation((visible) => !visible)}
                aria-label={
                  showConfirmation
                    ? "Скрыть подтверждение пароля"
                    : "Показать подтверждение пароля"
                }
                aria-pressed={showConfirmation}
                disabled={isSubmitting}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 5c-5.2 0-9.3 4.1-10.8 6.2a1.3 1.3 0 0 0 0 1.6C2.7 14.9 6.8 19 12 19s9.3-4.1 10.8-6.2a1.3 1.3 0 0 0 0-1.6C21.3 9.1 17.2 5 12 5Zm0 11.2a4.2 4.2 0 1 1 0-8.4 4.2 4.2 0 0 1 0 8.4Zm0-2.2a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                </svg>
              </button>
            </div>
          )}

          <label className={styles.rememberMe}>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(event) => setRememberMe(event.target.checked)}
              disabled={isSubmitting}
            />
            <span>Запомнить меня</span>
          </label>

          {errorMessage && (
            <p className={styles.error} role="alert">
              {errorMessage}
            </p>
          )}

          <Button
            className={styles.submitButton}
            size="small"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Подождите..."
              : isRegister
                ? "Зарегистрироваться"
                : "Войти"}
          </Button>
        </form>

        <div className={styles.links}>
          {isRegister ? (
            <p>
              Уже зарегистрированы?{" "}
              <Link to={nextPath} state={location.state}>
                Войти
              </Link>
            </p>
          ) : (
            <>
              <p>
                Вы — новый пользователь?{" "}
                <Link to={nextPath} state={location.state}>
                  Зарегистрироваться
                </Link>
              </p>
              <p>
                Забыли пароль?{" "}
                <button
                  className={styles.disabledLink}
                  type="button"
                  disabled
                  aria-disabled="true"
                  title="Восстановление пароля скоро будет доступно"
                >
                  Восстановить пароль
                </button>
              </p>
            </>
          )}
        </div>
      </section>
    </main>
  );
};
