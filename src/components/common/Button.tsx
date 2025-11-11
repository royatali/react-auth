import { ButtonType } from "../../types/buttonTypes";
import Spinner from "./Spinner";
import { useDarkMode } from "../../hooks/useDarKMode";

interface ButtonProps {
  text: string;
  type: ButtonType;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

const Button = ({
  text,
  type,
  onClick,
  disabled,
  className = "",
}: ButtonProps): JSX.Element => {
  const { isDarkMode } = useDarkMode();
  return (
    <button
      type={type}
      className={`${className} inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        disabled
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-indigo-600 text-white focus:ring-indigo-500"
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {disabled ? (
        <Spinner size={20} color={`${isDarkMode ? "white" : "blue"}`} />
      ) : (
        text
      )}
    </button>
  );
};

export default Button;
