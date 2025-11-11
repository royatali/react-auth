import React from "react";
import { TailSpin } from "react-loader-spinner";
import { SpinnerEnum } from "../../types/spinnerTypes.types";
import { useDarkMode } from "../../hooks/useDarKMode";

interface SpinnerProps {
  size?: number;
  color?: string;
}

const Spinner: React.FC<SpinnerProps> = ({
  size = SpinnerEnum.SIZE,
  color = SpinnerEnum.COLOR,
}): JSX.Element => {
  return (
    <div className="flex justify-center items-center">
      <TailSpin height={size} width={size} color={color} ariaLabel="loading" />
    </div>
  );
};

export const PersistLoginSpinner: React.FC<SpinnerProps> = ({
  size = SpinnerEnum.SIZE,
  color = SpinnerEnum.COLOR,
}): JSX.Element => {
  const { isDarkMode } = useDarkMode();
  return (
    <div
      className={`flex justify-center items-center h-screen ${
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      }`}
    >
      <TailSpin height={size} width={size} color={color} ariaLabel="loading" />
    </div>
  );
};

export default Spinner;
