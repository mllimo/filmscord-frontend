import React, { useContext, useEffect, useState } from "react";
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
  const [actualContent, setActualContent] = useState([]);
  const url = URL.BASE_URL + URL.API_USER + "/" + user.username;

  // Solucion temporal para que se renderice el componente por actualizacion
  const [ change, setChange ] = useState(false); 

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
    setActualContent(contentContext.contents);
  }, [contentContext.contents]);

  useEffect(() => {
    contentContext.dispatch({
      type: types.sort, payload: {
        by: options.options.sortBy,
        in: options.options.orderBy
      }
    });
    setChange(!change);
  }, [options.options.sortBy, options.options.orderBy]);

  useEffect(() => {
    const regex = new RegExp(options.options.search.toLowerCase());
    const filtered = contentContext.contents.filter((content) => { return content.info.title.text.toLowerCase().match(regex) });
    setActualContent(filtered);
  }, [options.options.search]);



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
              : <ContentList contents={actualContent} />
          }
        </div>

        <div name={`${change}`}></div>
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