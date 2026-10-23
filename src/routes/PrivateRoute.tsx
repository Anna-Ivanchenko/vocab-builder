import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const isLoggedIn = false;

  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;