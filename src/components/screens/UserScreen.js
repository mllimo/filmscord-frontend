import React, { useContext, useEffect, useState, useRef } from "react";
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
  // Contexts
  const { user } = useContext(AuthContext);
  const { options } = useContext(OptionsContext);
  const { contents, dispatch: contentDispatch } = useContext(ContentContext);

  // States
  const [requestOptions, setRequestOptions] = useState(contentRequestOptions(user.token));
  const [actualContent, setActualContent] = useState([]);
  const [url, setUrl] = useState(URL.BASE_URL + URL.API_USER + "/" + user.username);
  const [searchUrl, setSearchUrl] = useState(URL.BASE_URL + URL.API_SEARCH);
  const [change, setChange] = useState(false);

  // Fetchs
  const { data, errors, isLoading, reFetch } = useFetch(url, requestOptions);
  const { data: dataAdd, errors: errorsAdd, isLoading: isLoadingAdd, reFetch: reFetchAdd } = useFetch(searchUrl, searchRequestOptions());

  // Cada vez que se haga una peticion al usuario se actualiza el estado
  useEffect(() => {
    if (data) {
      if (!errors) {
        contentDispatch({ type: types.update, payload: data.contents });
        contentDispatch({
          type: types.sort, payload: {
            by: options.sortBy,
            in: options.orderBy
          }
        });
      }
    }
  }, [data]);

  // Cada vez que se haga una peticion al api/search se actualiza el estado
  useEffect(() => {
    if (dataAdd) {
      if (!errorsAdd) {
        const formated = formatSearchData(dataAdd.contents);
        contentDispatch({ type: types.update, payload: formated });
      }
    }
  }, [dataAdd]);

  // Actualizar el contenido
  useEffect(() => {
    console.log('actualizando');
    contentDispatch({
      type: types.sort, payload: {
        by: options.sortBy,
        in: options.orderBy
      }
    });
    setActualContent(contents);
  }, [contents]);

  // Ordenar el contenido
  useEffect(() => {
    contentDispatch({
      type: types.sort, payload: {
        by: options.sortBy,
        in: options.orderBy
      }
    });
    setChange(!change);
  }, [options.sortBy, options.orderBy]);

  // Buscar contenido || memo?
  useEffect(() => {
    if (!options.isAdd) {
      const regex = new RegExp(options.search.toLowerCase());
      const filtered = contents.filter((content) => { return content.info.title.text.toLowerCase().match(regex) });
      setActualContent(filtered);
    } else if (options.isAdd) {
      if (options.search !== "") {
        setSearchUrl(URL.BASE_URL + URL.API_SEARCH + `?title=${options.search}&page=1`);
        reFetchAdd(searchUrl, searchRequestOptions());
      }
    }
  }, [options.search]);

  // Caso de añadir contenido
  useEffect(() => {
    console.log(options);
    if (options.isAdd) {
      setActualContent([])
      setRequestOptions(searchRequestOptions());
    } else {
      setUrl(URL.BASE_URL + URL.API_USER + "/" + user.username);
      setRequestOptions(contentRequestOptions(user.token));
    }
  }, [options.isAdd]);

  useEffect(() => {
    if (options.isAdd) {
      reFetchAdd(url, requestOptions);
    } else {
      reFetch(url, requestOptions);
    }
  }, [requestOptions]);



  return (
    <div className="mt-5">
      <div className="columns">

        <div className="column is-one-fifth mt-5 ml-5">
          <OptionMenu />
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
      runtime: (Array.isArray(content.runtime) ? content.runtime[0] : content.runtime),
      category: content.category,
      genres: content.genres
    };

    return {
      info,
      rate: rating
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