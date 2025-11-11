import { useDarkMode } from "../../hooks/useDarKMode";

type LabelProps = {
  label: string;
};
const Label = ({ label }: LabelProps): JSX.Element => {
  const { isDarkMode } = useDarkMode();
  return (
    <label
      htmlFor={label}
      className={`flex items-start text-sm ${
        isDarkMode ? "text-white " : "text-black"
      } font-medium`}
    >
      {label}
    </label>
  );
};

export default Label;
