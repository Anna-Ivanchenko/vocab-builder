import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAppSelector } from "../redux/hooks";
import { selectIsLoggedIn } from "../redux/auth/selectors";

interface RestrictedRouteProps {
  children: ReactNode;
}

const RestrictedRoute = ({ children }: RestrictedRouteProps) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return isLoggedIn ? <Navigate to="/dictionary" replace /> : children;
};

export default RestrictedRoute;
