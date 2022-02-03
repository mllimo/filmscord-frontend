import React, { useContext, useRef, useState } from "react";
import AuthContext from "../../contexts/authContext";
import OptionsContext from "../../contexts/optionsContext";
import URL from "../../config/config";
import Content from "./Content";
import Modal from "./Modal";
import { useEffect } from "react/cjs/react.development";

const ContentList = ({ contents }) => {
  const { user } = useContext(AuthContext);
  const options = useContext(OptionsContext);
  const [isActive, setIsActive] = useState(false);
  const modalRef = useRef();

  const reqOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${user.token}`
    },
  };

  useEffect(() => {
    if (options.options.isAddContent || options.options.isUpdate) {
      setIsActive(true);
    }
  }, [options.options.isAddContent, options.options.isUpdate]);

  return (
    <div className="card-grid is-flex is-align-items-center is-justify-content-space-evenly mr-6">
      <Modal
        isActive={{ isActive, setIsActive }}
        ref={modalRef}
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
    </div >
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