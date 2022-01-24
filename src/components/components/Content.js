import React from "react";

const Content = ({info}) => {
  console.log(info)
  return (

    <div className="card card-size mb-5">
      <div className="card-image">
        <figure className="image">
          <img src={info.cover} alt="Cover" />
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <p className="title is-4">{info.title.text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Content;