import React, { useReducer, useEffect } from "react";
import FilmscordRouter from "./routers/FilmscordRouter";
import authReducer from "../reducers/authReducer";
import AuthContext from "../contexts/authContext";
import OptionsContext from "../contexts/optionsContext";
import contentReducer from "../reducers/contentReducer";
import ContentContext from "../contexts/contentContext";
import useOptions from "../hooks/useOptions";
import types from "../types/types";

const initAuth = () => {
  return JSON.parse(localStorage.getItem('user')) || { logged: false, username: "", token: "" };
}

const DEFAULT_OPTIONS = {
  isAdd: false,
  sortBy: types.rating,
  orderBy: types.asc,
  search: "",
};

const Filmscord = () => {
  const userReducer = useReducer(authReducer, {}, initAuth);
  const contentsReducer = useReducer(contentReducer, []);
  const { options, changeOptions } = useOptions(DEFAULT_OPTIONS);

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

          <OptionsContext.Provider value={{
            options,
            changeOptions
          }}>

            <FilmscordRouter />

          </OptionsContext.Provider>
        </ContentContext.Provider>
      </AuthContext.Provider>

    </>
  );
}

export default Filmscord;