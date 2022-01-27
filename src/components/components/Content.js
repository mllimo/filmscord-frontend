import React, { useContext } from "react";
import OptionsContext from "../../contexts/optionsContext";

const Content = ({ info }) => {
  const optionContext = useContext(OptionsContext);
  return (
    <div className="column is-one-quarter">
      <div className="card mb-5">
        <div className="card-image">
          <figure className="image is-3by4">
            <img src={info.cover} alt="Cover" />
          </figure>

          <div className="card-content">
            <div className="content">
              <p className="title">
                {info.title.text}
              </p>
            </div>
          </div>

          <footer className="card-footer">
            {
              optionContext.options.isAdd
                ? addCardOptions
                : normalCardOptions
            }
          </footer>
        </div>
      </div>
    </div>
  );
}

const addCardOptions = (
  <>
    <a href="#" className="card-footer-item">Add</a>
  </>
);

const normalCardOptions = (
  <>
    <a href="#" className="card-footer-item">Edit</a>
    <a href="#" className="card-footer-item">Delete</a>
  </>
);

export default Content;
