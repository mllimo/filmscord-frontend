import React, { useContext, useEffect, useState } from "react";
import URL from "../../config/config";
import useFetch from "../../hooks/useFetch";
import AuthContext from "../../contexts/authContext";
import OptionMenu from "../components/OptionMenu";
import useOptions from "../../hooks/useOptions";
import ContentList from "../components/ContentList";
import types from "../../types/types";
import ContentContext from "../../contexts/contentContext";
import LoadingBar from "../components/LoadingBar";
import OptionsContext from "../../contexts/optionsContext";

// Refactor
const UserScreen = () => {
  const { user } = useContext(AuthContext);
  const options = useContext(OptionsContext);
  const contentContext = useContext(ContentContext);

  const [requestOptions, setRequestOptions] = useState(contentRequestOptions(user.token));
  const [actualContent, setActualContent] = useState([]);
  const [url, setUrl] = useState(URL.BASE_URL + URL.API_USER + "/" + user.username);

  const [change, setChange] = useState(false);

  // Recibir informacion del usuario
  const { data, isLoading, isSuccess } = useFetch(url, requestOptions);

  useEffect(() => {
    if (isSuccess) {
      contentContext.dispatch({ type: types.update, payload: data.contents });
      contentContext.dispatch({
        type: types.sort, payload: {
          by: options.options.sortBy,
          in: options.options.orderBy
        }
      });
    }
  }, [isSuccess]);

  // Actualizar el contenido
  useEffect(() => {
    setActualContent(contentContext.contents);
  }, [contentContext.contents]);

  // Ordenar el contenido
  useEffect(() => {
    contentContext.dispatch({
      type: types.sort, payload: {
        by: options.options.sortBy,
        in: options.options.orderBy
      }
    });
    setChange(!change);
  }, [options.options.sortBy, options.options.orderBy]);

  // Buscar contenido
  useEffect(() => {
    if (options.options.searchBy !== "" && !options.options.isAdd) {
      const regex = new RegExp(options.options.search.toLowerCase());
      const filtered = contentContext.contents.filter((content) => { return content.info.title.text.toLowerCase().match(regex) });
      setActualContent(filtered);
    } else {

    }
  }, [options.options.search]);

  // Caso de añadir contenido
  useEffect(() => {
    if (options.options.isAdd) {
      setUrl(URL.BASE_URL + URL.API_SEARCH);
      setRequestOptions(searchRequestOptions);
      setActualContent([])
    } else {
      setUrl(URL.BASE_URL + URL.API_USER	 + "/" + user.username);
      setRequestOptions(contentRequestOptions(user.token));
      setActualContent(contentContext.contents);
    }
  }, [options.options.isAdd]);



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

const searchRequestOptions = (title, page = 1) => {
  return {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify({
      "search": title,
      "page": page
    })
  }
}

const contentRequestOptions = (token) => {
  return {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "authorization": `${token}`
    }
  };
}
const loadingBar = (
  <div className="container">
    <LoadingBar />
  </div>
);


export default UserScreen;