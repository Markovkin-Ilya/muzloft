import { FC, useState, useRef } from "react";
import { ProfileUI } from "./ui";
import { TProfileProps } from "./type";

export const Profile: FC<TProfileProps> = ({
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
    <ProfileUI
      avatar={avatar}
      phone={formData.phone}
      email={formData.email}
      login={formData.login}
      password={formData.password}
      errors={errors}
      isEditing={isEditing}
      onEdit={() => setIsEditing(true)}
      onSave={handleSave}
      onCancel={handleCancel}
      avatarRef={fileInputRef}
      onAvatarClick={handleAvatarClick}
      onPhoneChange={(value) => handleInputChange("phone", value)}
      onEmailChange={(value) => handleInputChange("email", value)}
      onLoginChange={(value) => handleInputChange("login", value)}
      onPasswordChange={(value) => handleInputChange("password", value)}
      onFileChange={handleFileChange}
    />
  );
};
