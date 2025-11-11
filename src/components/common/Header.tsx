import { useDarkMode } from "../../hooks/useDarKMode";

type HeaderProps = {
  title?: string;
  sm?: boolean;
};

const Header = ({ title, sm }: HeaderProps): JSX.Element => {
  const { isDarkMode } = useDarkMode();

  return (
    <header
      className={`${
        sm ? "text-3xl" : "text-6xl"
      } font-bold p-4 text-center transition-colors duration-300  ${
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      }
              `}
      style={{ lineHeight: "1.4", paddingBottom: "0.5em" }}
    >
      <h1
        className={`bg-clip-text text-transparent ${
          isDarkMode ? "bg-white" : "bg-black"
        }`}
      >
        {title}
      </h1>
    </header>
  );
};

export default Header;
