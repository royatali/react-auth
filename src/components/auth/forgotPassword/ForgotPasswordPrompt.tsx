import { useDarkMode } from "../../../hooks/useDarKMode";

const ForgotPasswordPrompt = (): JSX.Element => {
  const { isDarkMode } = useDarkMode();
  return (
    <p
      className={`text-xl text-center  mb-4 ${
        isDarkMode ? "text-white" : "text-black"
      }`}
    >
      Enter your email address below and we'll send you a link to reset your
      password.
    </p>
  );
};

export default ForgotPasswordPrompt;
