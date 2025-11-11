import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PersistLogin from "./components/auth/persistLogin/PersistLogin";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Login from "./pages/auth/Login";
import ResetPassword from "./pages/auth/ResetPassword";
import Signup from "./pages/auth/Signup";
import { UserRoles } from "./types/roles.types";
import Unauthorized from "./pages/unauthorized/Unauthorized";
import RequireAuth from "./components/RequireAuth";
import PageNotFound from "./pages/notFound/NotFound";
import Dashboard from "./pages/dashboard/Dashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Settings from "./pages/settings/Settings";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/edit-profile/EditProfile";

const AppRoutes = (): JSX.Element => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "/reset-password/:token",
      element: <ResetPassword />,
    },
    {
      path: "/unauthorized",
      element: <Unauthorized />,
    },
    {
      element: <PersistLogin />,
      children: [
        {
          element: (
            <RequireAuth allowedRoles={[UserRoles.ADMIN, UserRoles.USER]} />
          ),
          children: [
            {
              path: "/dashboard",
              element: <Dashboard />,
            },
            {
              path: "/settings",
              element: <Settings />,
            },
            {
              path: "/profile/:userId",
              element: <Profile />,
            },
            {
              path: "/edit-profile/:userId",
              element: <EditProfile />,
            },
          ],
        },
        {
          element: <RequireAuth allowedRoles={[UserRoles.ADMIN]} />,
          children: [
            {
              path: "/admin",
              element: <AdminDashboard />,
            },
          ],
        },
      ],
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default AppRoutes;
