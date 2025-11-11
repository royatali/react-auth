import { useDarkMode } from "../hooks/useDarKMode";
import { FaHome, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import { FaShield } from "react-icons/fa6";
import decodeToken from "../utils/decodeToken";
import { UserRoles } from "../types/roles.types";
import { useAuth } from "../context/auth";
import { DecodedToken } from "../types/authTypes.types";

type SidebarProps = {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
};

const Sidebar = ({ isSidebarOpen, toggleSidebar }: SidebarProps) => {
  const { auth } = useAuth();
  const decodedToken: DecodedToken | null = decodeToken(auth?.accessToken);

  const logout = useLogout();
  const { isDarkMode } = useDarkMode();

  return (
    <aside
      className={`z-50 h-screen w-64 p-5 flex flex-col justify-between fixed left-0 top-0 transition-transform duration-300 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-64"
      } ${
        isDarkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-900"
      } shadow-lg`}
    >
      {/* Header with Back Button */}
      <div className="flex items-center justify-between py-4 px-2">
        {/* Back Button */}
        <button
          onClick={toggleSidebar}
          className="text-2xl focus:outline-none transition-transform duration-300 hover:scale-110"
        >
          <FiArrowLeft />
        </button>

        {/* Logo */}
        <div className="text-xl font-bold">React Auth App</div>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col space-y-4">
        <SidebarLink
          to="/dashboard"
          icon={<FaHome />}
          text="Dashboard"
          isDarkMode={isDarkMode}
        />

        <SidebarLink
          to={`/profile/${decodedToken?.id}`}
          icon={<FaUser />}
          text="Profile"
          isDarkMode={isDarkMode}
        />

        <SidebarLink
          to="/settings"
          icon={<FaCog />}
          text="Settings"
          isDarkMode={isDarkMode}
        />

        {decodedToken?.roles.includes(UserRoles.ADMIN) && (
          <SidebarLink
            to="/admin"
            icon={<FaShield />}
            text="Admin"
            isDarkMode={isDarkMode}
          />
        )}
      </nav>

      {/* Logout Button */}
      <button
        onClick={() => {
          logout();
        }}
        className={`flex items-center space-x-2 w-full py-2 px-4 rounded-lg transition-all duration-200 ${
          isDarkMode
            ? "hover:bg-red-600 text-red-400 hover:text-white"
            : "hover:bg-red-500 text-red-500 hover:text-white"
        }`}
      >
        <FaSignOutAlt className="text-lg" />
        <span>Logout</span>
      </button>
    </aside>
  );
};

// Reusable Sidebar Link Component
const SidebarLink = ({
  to,
  icon,
  text,
  isDarkMode,
}: {
  to: string;
  icon: React.ReactNode;
  text: string;
  isDarkMode: boolean;
}) => (
  <Link
    to={to}
    className={`flex items-center space-x-3 py-2 px-4 rounded-lg transition-all duration-200 ${
      isDarkMode
        ? "hover:bg-gray-700 hover:text-white"
        : "hover:bg-gray-200 hover:text-gray-900"
    }`}
  >
    <span className="text-lg">{icon}</span>
    <span>{text}</span>
  </Link>
);

export default Sidebar;
