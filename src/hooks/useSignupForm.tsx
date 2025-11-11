import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { signUp } from "../api/serverApi";
import useCustomNavigate from "./useCustomNavigate";
import { SignupData } from "../types/authTypes.types";
import { NavigateOptions } from "react-router-dom";
import { SignupSchema } from "../schemas/signupSchema.schema";
import { ErrorEnum } from "../constants/errorConstants";
import { toast } from "react-toastify";
import { useDarkMode } from "./useDarKMode";
import { HttpStatus } from "../constants/httpStatusCodes";

const useSignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupData>({
    resolver: zodResolver(SignupSchema),
  });

  const customNavigate: (
    path: string,
    options?: NavigateOptions | undefined
  ) => void = useCustomNavigate();

  const { isDarkMode } = useDarkMode();

  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const togglePasswordVisibility = (): void => {
    setPasswordVisible((prev: boolean) => !prev);
  };

  const onSubmit = async (data: SignupData): Promise<void> => {
    try {
      const { confirmPassword, ...finalFormData } = data;
      const { data: Response } = await signUp(finalFormData);

      customNavigate("/", { replace: true });
      toast.success(Response.message);
    } catch (error: any) {
      console.log(error);
      if (error?.message === ErrorEnum.NETWORK_ERROR) {
        toast.error(error?.message);
      } else if (error?.response?.data?.statusCode === HttpStatus.BAD_REQUEST) {
        toast.error(error?.response?.data?.message[0]);
      } else if (error?.response?.data?.statusCode === HttpStatus.CONFLICT) {
        toast.error(error?.response?.data?.message);
      }
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isDarkMode,
    isSubmitting,
    passwordVisible,
    setPasswordVisible,
    togglePasswordVisibility,
    onSubmit,
  };
};

export default useSignupForm;
