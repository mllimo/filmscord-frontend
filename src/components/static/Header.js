import React from "react";
import { Link } from "react-router-dom";
import DropDownItem from "../components/DropdownItem";
import DropDownMenu from "../components/DropdownMenu";
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
        <DropDownMenu>
          <DropDownItem>
            <Link to="/about">about</Link>
          </DropDownItem>
        </DropDownMenu>
      </div>

    </div>
  );
}

export default Header;