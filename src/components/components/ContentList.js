import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../contexts/authContext";
import OptionsContext from "../../contexts/optionsContext";
import URL from "../../config/config";
import Content from "./Content";
import Modal from "./Modal";

const ContentList = ({ contents }) => {
  const options = useContext(OptionsContext);
  const [forceUpdate, setForceUpdate] = useState(false);

  useEffect(() => {
    setForceUpdate(!forceUpdate);
  }, [options.options.isAddContent, options.options.isUpdateContent]);

  return (
    <div className="card-grid is-flex is-align-items-center is-justify-content-space-evenly mr-6">
      <Modal/>
      {
        contents !== undefined
          ? contents.map((content, index) => (
            <Content key={index} content={{...content}} />
          ))
          : emptyList
      }
    </div >
  );
}

const emptyList = (
  <div className="container">
    <h1>No hay contenido</h1>
  </div>
);



export default ContentList;