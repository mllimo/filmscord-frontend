import React, { useReducer } from "react";
import FilmscordRouter from "./routers/FilmscordRouter";
import authReducer from "../auth/authReducer";
import AuthContext from "../auth/authContext";

const init = () => {
  return {
    logged: false,
    username: "",
  };
}

const Filmscord = () => {
  const [user, dispatch] = useReducer(authReducer, {}, init);

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