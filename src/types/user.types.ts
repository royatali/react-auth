import { AllowedRoles } from "./roles.types";

export type Bio = {
  id: number;
  welcomeMessage: string;
  avatar: string;
};

export type User = {
  id: number;
  username: string;
  email: string;
  roles: AllowedRoles[];
  bio: Bio;
  createdAt: string;
  updatedAt: string;
};
