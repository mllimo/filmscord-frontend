import React, { useContext, useEffect } from "react";
import URL from "../../config/config";
import useFetch from "../../hooks/useFetch";
import AuthContext from "../../auth/authContext";
import OptionMenu from "../components/OptionMenu";
import useOptions from "../../hooks/useOptions";

const UserScreen = () => {
  const options = useOptions({
    isAdd: false,
    sortBy: "",
    orderBy: "",
    search: "",
  });
  
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

  useEffect(() => { console.log(data) }, [isSuccess]);

  return (
    <div>
      {isLoading ? (<h1>Cargando...</h1>) : (<h1>Cargado</h1>)}
      <div className="columns">

        <div className="column is-one-fifth mt-5 ml-5">
          <OptionMenu options={options}/>
        </div>

        <div className="column is-four-fifths mt-5">
          Contenido
        </div>

      </div>
    </div>
  );
}

export default UserScreen;