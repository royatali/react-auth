import { Helmet } from "react-helmet";
import Header from "../common/Header";
import ThemeToggle from "../common/ThemeToggle";
import { useDarkMode } from "../../hooks/useDarKMode";

type AuthLayoutProps = {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
};

const AuthLayout = ({
  children,
  title,
  description,
  keywords,
  author,
}: AuthLayoutProps): JSX.Element => {
  const { isDarkMode } = useDarkMode();
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <div>
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <meta name="author" content={author} />
        </div>
        <title>{title}</title>
      </Helmet>
      <Header sm title={title} />
      <ThemeToggle />
      <div className="flex-wrap">
        <main
          className={`min-h-screen flex flex-col transition-colors duration-300 flex-1 flex-wrap p-4 ${
            isDarkMode
              ? "bg-gray-900 text-gray-100"
              : "bg-gray-100 text-gray-900"
          }`}
        >
          {children}
        </main>
      </div>
    </>
  );
};

export default AuthLayout;
