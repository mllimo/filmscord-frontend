import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../auth/authContext";

const PublicRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  console.log('public');
  return !user.logged ? children : <Navigate to={`/user/${user.username}`} />
}

export default PublicRoute;