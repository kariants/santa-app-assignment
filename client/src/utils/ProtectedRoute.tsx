import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "./AuthProvider";

type ProtectedRouteProps = PropsWithChildren;

export default function ProtectedRoute({children}: ProtectedRouteProps): JSX.Element {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null || !localStorage.getItem("santa-app")) {
      navigate('/login', { replace: true });
    }
  }, [navigate, user]);

  return <>{children}</>;
}