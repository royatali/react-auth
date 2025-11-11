import { z } from "zod";
import { SignupSchema } from "../schemas/signupSchema.schema";
import LoginSchema from "../schemas/loginSchema.schema";
import ForgotPasswordSchema from "../schemas/forgotPasswordSchema.schema";
import ResetPasswordSchema from "../schemas/resetPasswordSchema.schema";
import { AllowedRoles } from "./roles.types";

export type SignupData = z.infer<typeof SignupSchema>;
export type LoginData = z.infer<typeof LoginSchema>;
export type ForgotPasswordData = z.infer<typeof ForgotPasswordSchema>;
export type ResetPasswordData = z.infer<typeof ResetPasswordSchema>;

export type Auth = {
  accessToken: string;
  refreshToken?: string;
  message: string;
};

export interface ResetPasswordDTO {
  token: string;
  expires: Date;
}

export type UserResponse = {
  _id: string;
  username: string;
  email: string;
  roles: AllowedRoles[];
  resetPassword: ResetPasswordDTO;
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface UserResponseDTO {
  user: UserResponse;
  message: string;
}

export type RefreshTokenResponse = {
  accessToken: string;
  message: string;
};

export interface DecodedToken {
  id: string;
  exp: number;
  username: string;
  email: string;
  roles: AllowedRoles[];
}
