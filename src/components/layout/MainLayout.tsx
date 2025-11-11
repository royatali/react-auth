import { Helmet } from "react-helmet";
import { useDarkMode } from "../../hooks/useDarKMode";
import { useState } from "react";
import Sidebar from "../Sidebar";
import MainHeader from "../common/MainHeader";

type LayoutProps = {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
};

export default function MainLayout({
  children,
  title,
  description,
  keywords,
  author,
}: LayoutProps): JSX.Element {
  const { isDarkMode } = useDarkMode();
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
        />

        {/* Main Content */}
        <div
          className={`flex-grow min-h-screen flex flex-col items-center transition-all duration-300 ${
            isDarkMode
              ? "bg-gray-900 text-gray-200"
              : "bg-gray-100 text-gray-900"
          }`}
        >
          <MainHeader
            title="React Auth App"
            toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
            isSidebarOpen={isSidebarOpen}
          />
          <main className="flex-grow p-6 w-full">{children}</main>
        </div>
      </div>
    </>
  );
}
