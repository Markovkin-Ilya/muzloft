export type TProfileUIProps = {
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
  isEditing: boolean;
  isFormChanged?: boolean;
  onEdit?: () => void;
  onSave?: () => void;
  onCancel?: () => void;
  avatarRef?: React.RefObject<HTMLInputElement | null>;
  onAvatarClick?: () => void;
  onPhoneChange?: (value: string) => void;
  onEmailChange?: (value: string) => void;
  onLoginChange?: (value: string) => void;
  onPasswordChange?: (value: string) => void;
  onFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
