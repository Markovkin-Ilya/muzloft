import { FC, useState, useRef, useMemo, useCallback } from 'react';
import { useSelector } from '@services/store';
import { useDispatch } from '@services/store';
import { selectUser } from '@services/user/slice';
import { update } from '@services/user/actions';

import { ProfileUI } from './ui';
import { TProfileUIProps } from './ui/type';

export type TProfileProps = Omit<TProfileUIProps, 'isEditing' | 'isFormChanged'> & {
  initiallyEditing?: boolean;
};

export const Profile: FC<TProfileProps> = ({
  avatar,
  phone = '',
  email = '',
  login = '',
  errors = {},
  initiallyEditing = false,
}) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(initiallyEditing);
  const [formData, setFormData] = useState({
    phone: user?.phone || phone,
    email: user?.email || email,
    login: user?.login || login,
    password: '',
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(() => {
    dispatch(update({
      email: formData.email,
      name: formData.login,
      password: formData.password,
      phone: formData.phone,
      login: formData.login,
    }));
    setIsEditing(false);
  }, [dispatch, formData]);

  const handleCancel = () => {
    setFormData({
      phone: user?.phone || phone,
      email: user?.email || email,
      login: user?.login || login,
      password: '',
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
      formData.login !== (user?.login || login) ||
      !!formData.password,
    [formData.phone, formData.email, formData.login, formData.password, user?.phone, user?.email, user?.login, phone, email, login]
  );

  return (
    <ProfileUI
      avatar={user?.avatar || avatar}
      phone={formData.phone}
      email={formData.email}
      login={formData.login}
      password={formData.password}
      errors={errors}
      isEditing={isEditing}
      isFormChanged={isFormChanged}
      onEdit={() => setIsEditing(true)}
      onSave={handleSubmit}
      onCancel={handleCancel}
      avatarRef={fileInputRef}
      onAvatarClick={handleAvatarClick}
      onPhoneChange={(value) => handleInputChange('phone', value)}
      onEmailChange={(value) => handleInputChange('email', value)}
      onLoginChange={(value) => handleInputChange('login', value)}
      onPasswordChange={(value) => handleInputChange('password', value)}
      onFileChange={handleFileChange}
    />
  );
};
