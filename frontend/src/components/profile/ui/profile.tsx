import { FC } from "react";
import styles from "./profile.module.css";
import { ButtonUI } from "../../button/ui/button";
import { SearchUI } from "../../search/ui/search";
import pencilIcon from "@assets/images/icons/pancil.svg";
import { TProfileUIProps } from "./type";

export const ProfileUI: FC<TProfileUIProps> = ({
  avatar,
  phone = "",
  email = "",
  login = "",
  password = "",
  errors = {},
  isEditing,
  onEdit,
  onSave,
  onCancel,
  avatarRef,
  onAvatarClick,
  onPhoneChange,
  onEmailChange,
  onLoginChange,
  onPasswordChange,
  onFileChange,
}) => {
  return (
    <div className={styles.profile}>
      <div className={styles.header}>
        <div
          className={`${styles.avatarWrapper} ${isEditing ? styles.editing : ""}`}
          onClick={onAvatarClick}
        >
          {avatar && <img src={avatar} alt={login} className={styles.avatar} />}
          {isEditing && (
            <div className={styles.overlay}>
              <img
                src={pencilIcon}
                alt="Изменить аватар"
                className={styles.overlayIcon}
              />
            </div>
          )}
        </div>
        <input
          ref={avatarRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={onFileChange}
        />
        <span className={styles.login}>{login}</span>
      </div>

      <div className={styles.fields}>
        <div className={styles.field}>
          <span className={styles.label}>Телефон</span>
          {isEditing ? (
            <SearchUI
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
            <SearchUI
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
            <SearchUI
              size="small"
              value={login}
              onChange={onLoginChange}
              placeholder="Введите логин"
              error={errors.login}
            />
          ) : (
            <span className={styles.value}>{login}</span>
          )}
        </div>

        <div className={styles.field}>
          <span className={styles.label}>Пароль</span>
          {isEditing ? (
            <SearchUI
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
            <ButtonUI size="small" onClick={onSave}>
              Сохранить
            </ButtonUI>
            <ButtonUI size="small" onClick={onCancel}>
              Отмена
            </ButtonUI>
          </>
        ) : (
          <ButtonUI size="large" onClick={onEdit}>
            Редактировать
            <img
              src={pencilIcon}
              alt="Редактировать"
              className={styles.pencilIcon}
            />
          </ButtonUI>
        )}
      </div>
    </div>
  );
};
