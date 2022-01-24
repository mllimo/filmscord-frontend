import React, { useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import DropDownItem from "../components/DropdownItem";
import DropDownMenu from "../components/DropdownMenu";
import AuthContext from "../../auth/authContext";
import types from "../../types/types";

const Header = () => {
  const userContext = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    console.log(userContext.user);
    if (userContext.user.logged) {
      userContext.dispatch({
        type: types.logout,
        payload: userContext.user,
      });
    }
  };

  return (
    <div className="columns has-background-black mb-0">
      <div className="column has-text-centered has-text-white p-0 mt-3">
      </div>

      <div className="column has-text-centered has-text-white p-0 mt-3">
        <h1 className="text-font-fredoka is-size-1">FILMSCORD</h1>
      </div>

      <div
        className="column is-flex is-align-items-center is-justify-content-end has-text-white is-size-4 mt-3">
          <DropDownMenu className="pr-6">
            <DropDownItem> <Link to="about">About</Link> </DropDownItem>
            {
              userContext.user.logged 
              ? <DropDownItem> <Link to="/" onClick={handleClick}>Logout</Link> </DropDownItem> 
              : <DropDownItem> <Link to="/login"  onClick={handleClick}>Login</Link> </DropDownItem>
            }
          </DropDownMenu>
      </div>

    </div>
  );
}

export default Header;