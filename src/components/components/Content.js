import React from "react";

const Content = ({ info }) => {

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
            <a href="#" className="card-footer-item">Edit</a>
            <a href="#" className="card-footer-item">Delete</a>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default Content;
