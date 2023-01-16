import React from "react";
import { AuthContext } from "../components/AuthContext";
import { Navigate } from "react-router-dom";

export function PrivateRoute({ children }) {
  const { isAuth } = React.useContext(AuthContext);

  if (!isAuth) {
    return <Navigate to="/signUp" />;
  }

  return children;
}
