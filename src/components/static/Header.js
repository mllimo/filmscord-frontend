import React from "react";

const Header = () => {
  return (
    <div className="columns has-background-black mb-0">
      <div className="column has-text-centered has-text-white p-0 mt-3">
      </div>

      <div className="column has-text-centered has-text-white p-0 mt-3">
        <h1 className="text-font-fredoka is-size-1">FILMSCORD</h1>
      </div>


      <div
        className="column is-flex is-align-items-center is-justify-content-center has-text-white is-size-4 mt-3">
        <button className="button  is-active">
          <i className="fas fa-bars"></i>
        </button>
      </div>

    </div>
  );
}

export default Header;