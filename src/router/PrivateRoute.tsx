import { Navigate, useLocation } from "react-router-dom";
import { UserRole } from "../entities/User";
import { useAuthStore } from "../zustand/auth.store";

interface PrivateRouteProps {
  children: React.ReactNode;
  roles: UserRole[];
}
export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, roles }) => {
  const { user, loading } = useAuthStore();
  const location = useLocation();

  if(loading || !user.role) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!roles.includes(user.role)) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};