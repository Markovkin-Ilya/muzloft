import { FC, useState, useRef } from "react";
import styles from "./profile.module.css";
import { ButtonUI } from "../../button/ui/button";
import { SearchUI } from "../../search/ui/search";
import pencilIcon from "@/assets/images/button/pancil.svg";

export type TProfileProps = {
  avatar?: string;
  phone?: string;
  email?: string;
  login?: string;
  password?: string;
  errors?: {
    phone?: string;
    email?: string;
    login?: string;
    password?: string;
  };
  initiallyEditing?: boolean;
  onAvatarChange?: (file: File) => void;
};

export const ProfileUI: FC<TProfileProps> = ({
  avatar,
  phone = "",
  email = "",
  login = "",
  password = "",
  errors = {},
  initiallyEditing = false,
  onAvatarChange,
}) => {
  const [isEditing, setIsEditing] = useState(initiallyEditing);
  const [formData, setFormData] = useState({
    phone,
    email,
    login,
    password,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      phone,
      email,
      login,
      password,
    });
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAvatarClick = () => {
    if (!isEditing) return;
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onAvatarChange) {
      onAvatarChange(file);
    }
  };

  return (
    <div className={styles.profile}>
      <div className={styles.header}>
        <div
          className={`${styles.avatarWrapper} ${isEditing ? styles.editing : ""}`}
          onClick={handleAvatarClick}
        >
          {avatar && <img src={avatar} alt={login} className={styles.avatar} />}
          {isEditing && (
            <div className={styles.overlay}>
              <img src={pencilIcon} alt="Изменить аватар" className={styles.overlayIcon} />
            </div>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <span className={styles.login}>{login}</span>
      </div>

      <div className={styles.fields}>
        <div className={styles.field}>
          <span className={styles.label}>Телефон</span>
          {isEditing ? (
            <SearchUI
              size="small"
              value={formData.phone}
              onChange={(value) => handleInputChange("phone", value)}
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
              value={formData.email}
              onChange={(value) => handleInputChange("email", value)}
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
              value={formData.login}
              onChange={(value) => handleInputChange("login", value)}
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
              value={formData.password}
              onChange={(value) => handleInputChange("password", value)}
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
            <ButtonUI size="small" onClick={handleSave}>
              Сохранить
            </ButtonUI>
            <ButtonUI size="small" onClick={handleCancel}>
              Отмена
            </ButtonUI>
          </>
        ) : (
          <ButtonUI size="large" onClick={() => setIsEditing(true)}>
            Редактировать
            <img src={pencilIcon} alt="Редактировать" className={styles.pencilIcon} />
          </ButtonUI>
        )}
      </div>
    </div>
  );
};
