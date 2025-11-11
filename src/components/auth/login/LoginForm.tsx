import Label from "../../common/Label";
import Input from "../../common/Input";
import FormError from "../../common/FormError";
import Button from "../../common/Button";
import { FaUserLock } from "react-icons/fa";
import PasswordVisibility from "../signup/PasswordVisibility";
import AccountOptions from "../signup/AccountOptions";
import useLoginForm from "../../../hooks/useLoginForm";

const LoginForm = (): JSX.Element => {
  const {
    register,
    errors,
    handleSubmit,
    onSubmit,
    isSubmitting,
    passwordVisible,
    togglePasswordVisibility,
    persist,
    isDarkMode,
    togglePersist,
  } = useLoginForm();

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
        <div className="mb-4 items-start">
          <Label label="Email" />
          <Input
            register={register}
            fieldName="email"
            placeholder="Enter email"
            type="text"
            className={`mt-1 block w-full px-3 py-2 border  ${
              isDarkMode
                ? "border-white text-white bg-[#0d0c26]"
                : "bg-gray-100"
            }  rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-left`}
          />
          {errors.email && <FormError message={errors.email.message} />}
        </div>

        <div className="mb-4">
          <Label label="Password" />
          <div className="relative">
            <Input
              register={register}
              fieldName="password"
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
          {errors.password && <FormError message={errors.password.message} />}
        </div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="persist"
            onChange={togglePersist}
            checked={persist}
            className={`cursor-pointer mr-2 ${
              isDarkMode ? "accent-white" : "accent-black"
            }`}
          />
          <label htmlFor="persist" className="cursor-pointer">
            Trust This Device
          </label>
        </div>
        <div className="flex justify-center mb-4">
          <Button
            type="submit"
            text="Login"
            disabled={isSubmitting}
            className={`${
              isDarkMode
                ? "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          />
        </div>
        <AccountOptions isLogin />
      </form>
    </div>
  );
};

export default LoginForm;
