import { FaUserLock } from "react-icons/fa";
import Label from "../../common/Label";
import Input from "../../common/Input";
import PasswordVisibility from "../signup/PasswordVisibility";
import FormError from "../../common/FormError";
import Button from "../../common/Button";
import useResetPasswordForm from "../../../hooks/useResetPasswordForm";

type ResetPasswordFormProps = {
  token: string;
};

const ResetPasswordForm = ({ token }: ResetPasswordFormProps): JSX.Element => {
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    passwordVisible,
    togglePasswordVisibility,
    onSubmit,
    isDarkMode,
  } = useResetPasswordForm(token);

  return (
    <div className="flex items-center justify-center mt-32">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`max-w-md w-full p-8 shadow-md rounded-md border transition-colors duration-300 ${
          isDarkMode ? "shadow-gray-700" : "border-gray-200 shadow-gray-300"
        }`}
      >
        <div className="flex flex-col items-center">
          <FaUserLock size={50} />
        </div>

        <div className="mb-4">
          <Label label="Password" />
          <div className="relative">
            <Input
              register={register}
              fieldName="newPassword"
              placeholder="Enter password"
              type={passwordVisible ? "text" : "password"}
              className={`mt-1 block w-full px-3 py-2 border  ${
                isDarkMode
                  ? "border-white text-white bg-[#0d0c26]"
                  : "bg-gray-100"
              }  rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-left`}
            />
            <PasswordVisibility
              passwordVisible={passwordVisible}
              togglePasswordVisibility={togglePasswordVisibility}
            />
          </div>
          {errors.newPassword && (
            <FormError message={errors.newPassword.message} />
          )}
        </div>
        <div className="mb-4">
          <Label label="Confirm Password" />
          <div className="relative">
            <Input
              register={register}
              fieldName="confirmNewPassword"
              placeholder="Confirm password"
              type={passwordVisible ? "text" : "password"}
              className={`mt-1 block w-full px-3 py-2 border  ${
                isDarkMode
                  ? "border-white text-white bg-[#0d0c26]"
                  : "bg-gray-100"
              }  rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-left`}
            />
            <PasswordVisibility
              passwordVisible={passwordVisible}
              togglePasswordVisibility={togglePasswordVisibility}
            />
          </div>

          {errors.confirmNewPassword && (
            <FormError message={errors.confirmNewPassword?.message} />
          )}
        </div>
        <div className="flex justify-center mb-4">
          <Button
            type="submit"
            text="Reset Password"
            disabled={isSubmitting}
            className={`${
              isDarkMode
                ? "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          />
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
