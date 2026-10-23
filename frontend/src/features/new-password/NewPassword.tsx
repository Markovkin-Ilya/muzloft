import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@shared/ui/button";
import { Input } from "@shared/ui/input";
import {
  forgotPasswordApi,
  resetPasswordApi,
  verifyResetCodeApi,
} from "@utils/api";
import eyeIcon from "@assets/images/icons/eye.svg";
import styles from "./NewPassword.module.css";

type TStep = "email" | "code" | "password";

const RESEND_TIMEOUT_SECONDS = 60;

const titles: Record<TStep, string> = {
  email: "Восстановление пароля",
  code: "Введите код",
  password: "Новый пароль",
};

export const NewPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<TStep>("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [resetToken, setResetToken] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timerId = window.setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => window.clearTimeout(timerId);
  }, [secondsLeft]);

  const clearError = () => setErrorMessage(null);

  const sendCode = async () => {
    await forgotPasswordApi({ email: email.trim() });
    setSecondsLeft(RESEND_TIMEOUT_SECONDS);
  };

  const handleResend = async () => {
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      await sendCode();
    } catch {
      setErrorMessage("Не удалось отправить код. Попробуйте ещё раз.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordSubmit = async () => {
    if (password !== confirmation) {
      setErrorMessage("Пароли не совпадают.");
      return;
    }
    if (!resetToken) {
      setStep("code");
      return;
    }
    await resetPasswordApi({ password, resetToken });
    navigate("/login", { replace: true });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      if (step === "email") {
        await sendCode();
        setStep("code");
      } else if (step === "code") {
        const response = await verifyResetCodeApi({ token: code.trim() });
        setResetToken(response.resetToken);
        setStep("password");
      } else {
        await handlePasswordSubmit();
      }
    } catch {
      if (step === "email") {
        setErrorMessage("Не удалось отправить код. Попробуйте ещё раз.");
      } else if (step === "code") {
        setErrorMessage("Неверный или просроченный код.");
      } else {
        setErrorMessage("Не удалось сохранить пароль. Запросите код заново.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const isResendDisabled = isSubmitting || secondsLeft > 0;

  return (
    <main className={styles.page}>
      <section className={styles.card} aria-labelledby="new-password-title">
        <h1 id="new-password-title" className={styles.title}>
          {titles[step]}
        </h1>

        {step === "email" && (
          <p className={styles.hint}>Укажите e-mail, привязанный к аккаунту</p>
        )}
        {step === "code" && (
          <p className={styles.hint}>Мы отправили код на {email.trim()}</p>
        )}
        {step === "password" && (
          <p className={styles.hint}>Придумайте новый пароль</p>
        )}

        <form className={styles.form} onSubmit={handleSubmit}>
          {step === "email" && (
            <>
              <label className={styles.visuallyHidden} htmlFor="reset-email">
                E-mail
              </label>
              <Input
                id="reset-email"
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
            </>
          )}

          {step === "code" && (
            <>
              <label className={styles.visuallyHidden} htmlFor="reset-code">
                Код из письма
              </label>
              <Input
                id="reset-code"
                type="text"
                name="code"
                placeholder="Код из письма"
                autoComplete="one-time-code"
                spellCheck={false}
                value={code}
                onChange={(value) => {
                  setCode(value);
                  clearError();
                }}
                required
                disabled={isSubmitting}
              />
            </>
          )}

          {step === "password" && (
            <>
              <div className={styles.field}>
                <label
                  className={styles.visuallyHidden}
                  htmlFor="reset-password"
                >
                  Новый пароль
                </label>
                <Input
                  id="reset-password"
                  className={styles.passwordInput}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Новый пароль"
                  autoComplete="new-password"
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
                  aria-label={
                    showPassword ? "Скрыть пароль" : "Показать пароль"
                  }
                  aria-pressed={showPassword}
                  disabled={isSubmitting}
                >
                  <img src={eyeIcon} alt="" aria-hidden="true" />
                </button>
              </div>

              <div className={styles.field}>
                <label
                  className={styles.visuallyHidden}
                  htmlFor="reset-confirmation"
                >
                  Повторите пароль
                </label>
                <Input
                  id="reset-confirmation"
                  className={styles.passwordInput}
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
                  <img src={eyeIcon} alt="" aria-hidden="true" />
                </button>
              </div>
            </>
          )}

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
              : step === "email"
                ? "Отправить код"
                : step === "code"
                  ? "Подтвердить"
                  : "Сохранить пароль"}
          </Button>

          {step === "code" && (
            <Button
              className={styles.submitButton}
              size="small"
              type="button"
              onClick={handleResend}
              disabled={isResendDisabled}
            >
              {secondsLeft > 0
                ? `Отправить код повторно через ${secondsLeft} с`
                : "Отправить код повторно"}
            </Button>
          )}
        </form>

        <div className={styles.links}>
          <p>
            Вспомнили пароль?{" "}
            <Link to="/login" replace>
              Войти
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};
