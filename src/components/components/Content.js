import React, { useContext } from "react";
import OptionsContext from "../../contexts/optionsContext";

const Content = ({ content }) => {
  const optionContext = useContext(OptionsContext);
  
  return (
    <div className="column is-one-quarter">
      <div className="card mb-5">
        <div className="card-image">
          <figure className="image is-3by4">
            <img src={content.info.cover} alt="Cover" />
          </figure>

          <div className="card-content">
            <div className="content">
              <p className="title">
                {content.info.title.text}
              </p>
            </div>
          </div>

          <footer className="card-footer">
            {
              optionContext.options.isAdd
                ? addCardOptions(optionContext, content)
                : normalCardOptions(optionContext, content)
            }
          </footer>
        </div>
      </div>
    </div>
  );
}

function changeAdd(optionContext, info) {
  optionContext.dispatch({ name: "isAddContent", payload: true });
  optionContext.dispatch({ name: "addContent", payload: info });
}

const addCardOptions = (optionContext, info) => {
  return (
    <>
      <a className="card-footer-item mouse-pointer"
        onClick={(e) => changeAdd(optionContext, info)}
      >
        Add
      </a>
    </>
  )
};

function changeUpdate(optionContext, info) {
  optionContext.dispatch({name: "isUpdateContent", payload: true});
  optionContext.dispatch({name: "updateContent", payload: info});
}

const normalCardOptions = (optionContext, info) => {
  return (
    <>
      <a className="card-footer-item mouse-pointer" onClick={(e) => changeUpdate(optionContext, info)}>Edit</a>
      <a className="card-footer-item mouse-pointer" onClick={(e) => { }}>Delete</a>
    </>
  )
};

export default Content;
