import React, { useReducer, useEffect } from "react";
import FilmscordRouter from "./routers/FilmscordRouter";
import authReducer from "../auth/authReducer";
import AuthContext from "../auth/authContext";
import contentReducer from "../content/contentReducer";
import ContentContext from "../content/contentContext";

const initAuth = () => {
  return JSON.parse(localStorage.getItem('user')) || { logged: false, username: "", token: "" };
}

const Filmscord = () => {
  const userReducer = useReducer(authReducer, {}, initAuth);
  const contentsReducer = useReducer(contentReducer, []);

  useEffect(() => {
    if (!userReducer[0]) return;
    localStorage.setItem("user", JSON.stringify(userReducer[0]));
  }, [userReducer[0]]);

  return (
    <>
      <AuthContext.Provider value={{
        user: userReducer[0],
        dispatch: userReducer[1]
      }}>
        <ContentContext.Provider value={{
          contents: contentsReducer[0],
          dispatch: contentsReducer[1]
        }}>

          <FilmscordRouter />

        </ContentContext.Provider>
      </AuthContext.Provider>
    </>
  );
}

export default Filmscord;