import { FC } from "react";
import styles from "./ProfileEditUI.module.css";
import { Button } from "@shared/ui/button";
import { Input } from "@shared/ui/input";
import pencilIcon from "@assets/images/icons/pencil.svg";
import logoutIcon from "@assets/images/icons/logout.svg";
import { TProfileEditUIProps } from "./type";

export const ProfileEditUI: FC<TProfileEditUIProps> = ({
  avatar,
  phone = "",
  email = "",
  name = "",
  password = "",
  errors = {},
  isEditing,
  isFormChanged,
  onEdit,
  onLogout,
  onSave,
  onCancel,
  avatarRef,
  onAvatarClick,
  onPhoneChange,
  onEmailChange,
  onNameChange,
  onPasswordChange,
  onFileChange,
}) => {
  const avatarInitial =
    name.trim().charAt(0).toLocaleUpperCase("ru-RU") || "?";

  return (
    <div className={styles.profile}>
      <div className={styles.header}>
        <button
          type="button"
          className={`${styles.avatarWrapper} ${isEditing ? styles.editing : ""}`}
          onClick={onAvatarClick}
          disabled={!isEditing}
          aria-label="Изменить аватар"
        >
          {avatar ? (
            <img src={avatar} alt={name} className={styles.avatar} />
          ) : (
            <span className={styles.avatarFallback} aria-hidden="true">
              {avatarInitial}
            </span>
          )}
          {isEditing && (
            <span className={styles.overlay}>
              <img
                src={pencilIcon}
                alt=""
                aria-hidden="true"
                className={styles.overlayIcon}
              />
            </span>
          )}
        </button>
        <input
          ref={avatarRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={onFileChange}
        />
        <span className={styles.login}>{name}</span>
      </div>

      <div className={styles.fields}>
        <div className={styles.field}>
          <span className={styles.label}>Телефон</span>
          {isEditing ? (
            <Input
              size="small"
              value={phone}
              onChange={onPhoneChange}
              placeholder="Введите телефон"
              error={errors.phone}
            />
          ) : (
            <span className={styles.value}>{phone}</span>
          )}
        </div>

        <div className={styles.field}>
          <span className={styles.label}>Почта</span>
          {isEditing ? (
            <Input
              size="small"
              value={email}
              onChange={onEmailChange}
              placeholder="Введите почту"
              error={errors.email}
            />
          ) : (
            <span className={styles.value}>{email}</span>
          )}
        </div>

        <div className={styles.field}>
          <span className={styles.label}>Логин</span>
          {isEditing ? (
            <Input
              size="small"
              value={name}
              onChange={onNameChange}
              placeholder="Введите логин"
              error={errors.name}
            />
          ) : (
            <span className={styles.value}>{name}</span>
          )}
        </div>

        <div className={styles.field}>
          <span className={styles.label}>Пароль</span>
          {isEditing ? (
            <Input
              size="small"
              value={password}
              onChange={onPasswordChange}
              placeholder="Введите пароль"
              type="password"
              error={errors.password}
            />
          ) : (
            <span className={styles.value}>••••••••</span>
          )}
        </div>
      </div>

      <div className={styles.footer}>
        {isEditing ? (
          <>
            <Button size="large" onClick={onSave} disabled={!isFormChanged}>
              Сохранить
            </Button>
            <Button size="large" onClick={onCancel}>
              Отмена
            </Button>
          </>
        ) : (
          <>
            <Button size="large" onClick={onLogout}>
              Выйти
              <img
                src={logoutIcon}
                className={styles.icon}
              />
            </Button>
          <Button size="large" onClick={onEdit}>
            Редактировать
            <img
              src={pencilIcon}
              className={styles.icon}
            />
          </Button>
          </>
        )}
      </div>
    </div>
  );
};
