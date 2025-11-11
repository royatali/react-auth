import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgotPasswordData } from "../types/authTypes.types";
import { forgotPassword } from "../api/serverApi";
import { ErrorEnum } from "../constants/errorConstants";
import ForgotPasswordSchema from "../schemas/forgotPasswordSchema.schema";
import { toast } from "react-toastify";
import { useDarkMode } from "./useDarKMode";

const useForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const { isDarkMode } = useDarkMode();

  const onSubmit = async (data: ForgotPasswordData): Promise<void> => {
    try {
      const { data: forgotPasswordData } = await forgotPassword(data);

      toast.success(forgotPasswordData);

      reset();
    } catch (error: any) {
      if (error?.message === ErrorEnum.NETWORK_ERROR) {
        toast.error(error?.message);
      } else {
        toast.error(error?.response?.data?.message);
      }
    }
  };

  return {
    register,
    isDarkMode,
    handleSubmit,
    errors,
    onSubmit,
    isSubmitting,
  };
};

export default useForgotPasswordForm;
