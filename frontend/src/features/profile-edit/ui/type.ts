export type TProfileEditUIProps = {
  avatar?: string;
  phone?: string;
  email?: string;
  name?: string;
  password?: string;
  errors?: {
    phone?: string;
    email?: string;
    name?: string;
    password?: string;
  };
  isEditing: boolean;
  isFormChanged?: boolean;
  onEdit?: () => void;
  onLogout?: () => void;
  onSave?: () => void;
  onCancel?: () => void;
  avatarRef?: React.RefObject<HTMLInputElement | null>;
  onAvatarClick?: () => void;
  onPhoneChange?: (value: string) => void;
  onEmailChange?: (value: string) => void;
  onNameChange?: (value: string) => void;
  onPasswordChange?: (value: string) => void;
  onFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
