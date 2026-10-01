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
