import React, { useContext, useEffect } from "react";
import URL from "../../config/config";
import useFetch from "../../hooks/useFetch";
import AuthContext from "../../auth/authContext";
import OptionMenu from "../components/OptionMenu";
import useOptions from "../../hooks/useOptions";
import ContentList from "../components/ContentList";
import types from "../../types/types";
import ContentContext from "../../content/contentContext";
import LoadingBar from "../components/LoadingBar";

const defaultOptions = {
  isAdd: false,
  sortBy: types.rating,
  orderBy: types.asc,
  search: "",
};

const UserScreen = () => {

  const options = useOptions(defaultOptions);
  const contentContext = useContext(ContentContext);
  const { user } = useContext(AuthContext);
  const url = URL.BASE_URL + URL.API_USER + "/" + user.username;

  // Recibir informacion del usuario
  const { data, isLoading, isSuccess } = useFetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "authorization": `${user.token}`
    }
  });

  useEffect(() => {
    if (isSuccess) {
      contentContext.dispatch({ type: types.add, payload: data.contents });
      contentContext.dispatch({
        type: types.sort, payload: {
          by: options.options.sortBy,
          in: options.options.orderBy
        }
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    console.log(options);
    contentContext.dispatch({
      type: types.sort, payload: {
        by: options.options.sortBy,
        in: options.options.orderBy
      }
    });
  }, [options.options.sortBy, options.options.orderBy]);



  return (
    <div className="mt-5">
      <div className="columns">

        <div className="column is-one-fifth mt-5 ml-5">
          <OptionMenu options={options} />
        </div>

        <div className="column is-four-fifths mt-5 pr-5">
          {
            isLoading
              ? loadingBar
              : <ContentList />
          }
        </div>

      </div>
    </div>
  );
}

const loadingBar = (
  <div className="container">
    <LoadingBar />
  </div>
);


export default UserScreen;