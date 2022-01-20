import React, { useContext } from "react";
import { Navigate, useParams } from "react-router-dom";
import AuthContext from "../../auth/authContext";

const PrivateRoute = ({children}) => {
  const { user } = useContext(AuthContext);
  const params = useParams();
  console.log('private');
  return (user.logged && user.username === params.username) ? children : <h1>MAL</h1>
}

export default PrivateRoute;