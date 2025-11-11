import { useState } from "react";
import { useDarkMode } from "./useDarKMode";

const useSettings = () => {
  const [isThemeOpen, setIsThemeOpen] = useState<boolean>(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const handleThemeChange = (mode: string) => {
    if ((mode === "dark" && !isDarkMode) || (mode === "light" && isDarkMode)) {
      toggleDarkMode();
    }
  };

  return {
    isDarkMode,
    isThemeOpen,
    setIsThemeOpen,
    handleThemeChange,
  };
};

export default useSettings;
