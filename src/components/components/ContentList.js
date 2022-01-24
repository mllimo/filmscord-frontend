import React from "react";
import Content from "./Content";

const ContentList = (props) => {
  const { contents, dispatch } = props.contentReducer;

  return (
    <div className="card-grid is-flex is-align-items-center is-justify-content-space-between mr-6">
        {
          contents != undefined
            ? contents.map((content, index) => (
              <div key={index}>
              <Content info={content.info} />
              </div>
            ))
            : emptyList 
        }
    </div>
  );
}
const emptyList = (
  <div className="container">
    <h1>No hay contenido</h1>
  </div>
);



export default ContentList;