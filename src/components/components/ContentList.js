import React, { useContext } from "react";
import AuthContext from "../../contexts/authContext";
import OptionsContext from "../../contexts/optionsContext";
import ContentContext from "../../contexts/contentContext";
import URL from "../../config/config";
import Content from "./Content";
import Modal from "./Modal";

const ContentList = ({ contents }) => {
  const { user } = useContext(AuthContext);
  const options = useContext(OptionsContext);

  const reqOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${user.token}`
    },
  };

  return (
    <div className="card-grid is-flex is-align-items-center is-justify-content-space-evenly mr-6">
      <Modal 
        content={(options.isUpdate ? options.updateContent : options.addContent)} 
        url={(options.isUpdate ? updateUrl : addUrl)} 
        options={reqOptions}
      />
      {
        contents != undefined
          ? contents.map((content, index) => (
            <Content key={index} info={content.info} />
          ))
          : emptyList
      }
    </div>
  );
}

const updateUrl = URL.BASE_URL + URL.API_USER_CONTENT;
const addUrl = URL.BASE_URL + URL.USER_CONTENT;

const emptyList = (
  <div className="container">
    <h1>No hay contenido</h1>
  </div>
);



export default ContentList;