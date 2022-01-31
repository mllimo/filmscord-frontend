import React, { useContext, useEffect, useState } from "react";
import URL from "../../config/config";
import useFetch from "../../hooks/useFetch";
import AuthContext from "../../contexts/authContext";
import OptionMenu from "../components/OptionMenu";
import ContentList from "../components/ContentList";
import types from "../../types/types";
import ContentContext from "../../contexts/contentContext";
import LoadingBar from "../components/LoadingBar";
import OptionsContext from "../../contexts/optionsContext";

// Refactorizar
const UserScreen = () => {
  const { user } = useContext(AuthContext);
  const options = useContext(OptionsContext);
  const contentContext = useContext(ContentContext);

  const [requestOptions, setRequestOptions] = useState(contentRequestOptions(user.token));
  const [actualContent, setActualContent] = useState([]);
  const [url, setUrl] = useState(URL.BASE_URL + URL.API_USER + "/" + user.username);
  const [searchUrl, setSearchUrl] = useState(URL.BASE_URL + URL.API_SEARCH);
  const [change, setChange] = useState(false);

  // Recibir informacion del usuario
  const { data, errors, isLoading, reFetch } = useFetch(url, requestOptions);
  const { data: dataAdd, errors: errosAdd, isLoading: isLoadingAdd, reFetch: reFetchAdd } = useFetch(searchUrl, searchRequestOptions);

  // Cada vez que se haga una peticion al usuario se actualiza el estado
  useEffect(() => {
    if (data) {
      if (!errors) {
        contentContext.dispatch({ type: types.update, payload: data.contents });
        contentContext.dispatch({
          type: types.sort, payload: {
            by: options.options.sortBy,
            in: options.options.orderBy
          }
        });
      }
    }
  }, [isLoading]);

// Cada vez que se haga una peticion al api/search se actualiza el estado
useEffect(() => {
  if (dataAdd !== null) {
    if (errors === undefined) {
      const formated = formatSearchData(dataAdd.contents);
      console.log("formated", formated);
      contentContext.dispatch({ type: types.update, payload: formated });
    }
  }
}, [isLoadingAdd]);

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

// Buscar contenido || memo?
useEffect(() => {
  if (!options.options.isAdd) {
    const regex = new RegExp(options.options.search.toLowerCase());
    const filtered = contentContext.contents.filter((content) => { return content.info.title.text.toLowerCase().match(regex) });
    setActualContent(filtered);
  } else if (options.options.isAdd) {
    if (options.options.search !== "") {
      console.log("Enviando Api");
      setSearchUrl(URL.BASE_URL + URL.API_SEARCH + `?title=${options.options.search}&page=1`);
      reFetchAdd(searchUrl, searchRequestOptions());
    }
  }
}, [options.options.search]);

// Caso de añadir contenido
useEffect(() => {
  if (options.options.isAdd) {
    setRequestOptions(searchRequestOptions());
    setActualContent([])
  } else {
    setUrl(URL.BASE_URL + URL.API_USER + "/" + user.username);
    setRequestOptions(contentRequestOptions(user.token));
    reFetch(url, requestOptions);
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

// Refactorizar todo esto

const formatSearchData = (data) => {
  if (data === undefined) return [];

  let formated = data.map((content) => {
    const { rating } = content;
    const info = {
      title: content.title,
      cover: content.cover,
      runtime: content.runtime,
      category: content.category,
      genres: content.genres
    };

    return {
      info,
      rating: (Array.isArray(rating)) ? rating[0] : rating
    }
  });

  return formated;
}

const searchRequestOptions = () => {
  return {
    method: "GET"
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