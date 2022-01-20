import React, { useContext, useEffect } from "react";
import URL from "../../config/config";
import useFetch from "../../hooks/useFetch";
import AuthContext from "../../auth/authContext";
const UserScreen = () => {
  
  // Recibir informacion del usuario
  const {user} = useContext(AuthContext);
  const url = URL.BASE_URL + URL.API_USER + "/" + user.username;
  const { data, isLoading, isSuccess } = useFetch(url , {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "authorization": `${user.token}`
    }
  });

  useEffect(() => {console.log(data)}, [isSuccess]);

  return (
    <div>
      {isLoading ? (<h1>Cargando...</h1>) : (<h1>Cargado</h1>)}
    </div>
  );
}

export default UserScreen;