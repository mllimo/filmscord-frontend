import React, { useContext } from "react";
import { Navigate, useParams } from "react-router-dom";
import AuthContext from "../../auth/authContext";

const PrivateRoute = ({children}) => {
  const { user } = useContext(AuthContext);
  const params = useParams();
  return (user.logged && user.username == params.username) ? children : <Navigate to="/"/>
}

export default PrivateRoute;