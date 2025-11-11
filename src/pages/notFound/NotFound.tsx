import { MdErrorOutline } from "react-icons/md";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import Button from "../../components/common/Button";
import useGoBack from "../../hooks/useGoBack";
import { useDarkMode } from "../../hooks/useDarKMode";
import ThemeToggle from "../../components/common/ThemeToggle";

const PageNotFound = (): JSX.Element => {
  useDocumentTitle("Page not found");
  const goBack = useGoBack();

  const { isDarkMode } = useDarkMode();
  return (
    <div
      className={`flex flex-col items-center justify-center h-screen ${
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      }`}
    >
      <ThemeToggle />
      <MdErrorOutline className="text-6xl text-red-500" />
      <h1
        className={`text-2xl font-semibold text-gray-800 mt-4 ${
          isDarkMode ? "text-white" : ""
        }`}
      >
        Page Not Found
      </h1>
      <p className={`text-gray-600 mb-4 ${isDarkMode ? "text-white" : ""}`}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Button
        type="button"
        onClick={goBack}
        text="Go Back"
        className={`${
          isDarkMode
            ? "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      />
    </div>
  );
};

export default PageNotFound;
