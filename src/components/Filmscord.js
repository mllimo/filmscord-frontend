import React, { useReducer, useEffect } from "react";
import FilmscordRouter from "./routers/FilmscordRouter";
import authReducer from "../auth/authReducer";
import AuthContext from "../auth/authContext";

const init = () => {
  return JSON.parse( localStorage.getItem('user') ) || { logged: false, username: "", token: "" };
}

const Filmscord = () => {
  const [user, dispatch] = useReducer(authReducer, {}, init);

  useEffect(() => {
    if (!user) return;
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <>
      <AuthContext.Provider value={{
        user,
        dispatch
      }}>
        <FilmscordRouter />
      </AuthContext.Provider>
    </>
  );
}

export default Filmscord;