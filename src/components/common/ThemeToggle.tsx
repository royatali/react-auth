import { BsSun, BsMoon } from "react-icons/bs";
import { useDarkMode } from "../../hooks/useDarKMode";
const ThemeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <div className="absolute top-4 right-4">
      <button
        onClick={toggleDarkMode}
        className="p-2 rounded-full border border-gray-400 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        aria-label="Toggle theme"
      >
        {isDarkMode ? (
          <BsSun className="h-5 w-5 text-yellow-400" />
        ) : (
          <BsMoon className="h-5 w-5 text-gray-800" />
        )}
      </button>
    </div>
  );
};

export default ThemeToggle;
