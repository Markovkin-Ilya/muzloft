import { FC, useState, useRef, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "@services/store";
import { useDispatch } from "@services/store";
import { selectUser } from "@services/user/slice";
import { update } from "@services/user/actions";

import { ProfileEditUI } from "./ui";
import type { TProfileEditUIProps } from "./ui";

export type TProfileEditProps = Omit<
  TProfileEditUIProps,
  "isEditing" | "isFormChanged"
> & {
  initiallyEditing?: boolean;
};

export const ProfileEdit: FC<TProfileEditProps> = ({
  avatar,
  phone = "",
  email = "",
  name = "",
  errors = {},
  initiallyEditing = false,
}) => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(initiallyEditing);
  const [formData, setFormData] = useState({
    phone: user?.phone || phone,
    email: user?.email || email,
    name: user?.name || name,
    password: "",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogout = () => {
    navigate(`/profile/logout`);
  };

  const handleSubmit = useCallback(() => {
    dispatch(
      update({
        email: formData.email,
        name: formData.name,
        password: formData.password,
        phone: formData.phone,
      }),
    );
    setIsEditing(false);
  }, [dispatch, formData]);

  const handleCancel = () => {
    setFormData({
      phone: user?.phone || phone,
      email: user?.email || email,
      name: user?.name || name,
      password: "",
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

  const handleFileChange = () => {
    // TODO: implement avatar upload logic
  };

  const isFormChanged = useMemo(
    () =>
      formData.phone !== (user?.phone || phone) ||
      formData.email !== (user?.email || email) ||
      formData.name !== (user?.name || name) ||
      !!formData.password,
    [
      formData.phone,
      formData.email,
      formData.name,
      formData.password,
      user?.phone,
      user?.email,
      user?.name,
      phone,
      email,
      name,
    ],
  );

  return (
    <ProfileEditUI
      avatar={user?.avatar || avatar}
      phone={formData.phone}
      email={formData.email}
      name={formData.name}
      password={formData.password}
      errors={errors}
      isEditing={isEditing}
      isFormChanged={isFormChanged}
      onEdit={() => setIsEditing(true)}
      onLogout={handleLogout}
      onSave={handleSubmit}
      onCancel={handleCancel}
      avatarRef={fileInputRef}
      onAvatarClick={handleAvatarClick}
      onPhoneChange={(value) => handleInputChange("phone", value)}
      onEmailChange={(value) => handleInputChange("email", value)}
      onNameChange={(value) => handleInputChange("name", value)}
      onPasswordChange={(value) => handleInputChange("password", value)}
      onFileChange={handleFileChange}
    />
  );
};
