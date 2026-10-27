import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

interface RestrictedRouteProps {
  children: ReactNode;
}

const RestrictedRoute = ({ children }: RestrictedRouteProps) => {
  const isLoggedIn = false;

  return isLoggedIn ? <Navigate to="/dictionary" replace /> : children;
};

export default RestrictedRoute;
