import { FC } from "react";
import { ProfileEdit } from "@features/profile-edit";
import type { TProfileEditProps } from "@features/profile-edit";

export type TProfilePageProps = TProfileEditProps;

export const ProfilePage: FC<TProfilePageProps> = (props) => (
  <ProfileEdit {...props} />
);
