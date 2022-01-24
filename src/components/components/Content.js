import React from "react";

const Content = ({ key, info }) => {
  console.log(info)
  return (
    <div key={key} className="column is-one-quarter">
      <div className="card mb-5">
        <div className="card-image">
          <figure className="image is-3by4">
            <img src={info.cover} alt="Cover" />
          </figure>

          <div className="card-content">
            <div className="content">
              <p class="title">
                {info.title.text}
              </p>
            </div>
          </div>

          <footer class="card-footer">
            <a href="#" class="card-footer-item">Edit</a>
            <a href="#" class="card-footer-item">Delete</a>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default Content;
