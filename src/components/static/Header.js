import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import DropDownItem from "../components/DropdownItem";
import DropDownMenu from "../components/DropdownMenu";
import AuthContext from "../../contexts/authContext";
import types from "../../types/types";

const Header = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    let ref = e.target.id;
    if (user.logged && e.target.id === "logout") {
      dispatch({
        type: types.logout,
        payload: user,
      });
      ref = "/";
    }
    navigate(ref, { replace: true });
  };

  return (
    <div className="columns has-background-black mb-0">
      <div className="column has-text-centered has-text-white p-0 mt-3">
      </div>

      <div className="column has-text-centered has-text-white p-0 mt-3">
        <h1 className="text-font-fredoka is-size-1 is-clickable" id="/"  onClick={handleClick}>FILMSCORD</h1>
      </div>

      <div
        className="column is-flex is-align-items-center is-justify-content-end has-text-white is-size-4 mt-3">
        <DropDownMenu className="pr-6">
          <DropDownItem> <div className="is-clickable has-text-link" id="/about" onClick={handleClick} >About</div> </DropDownItem>
          {
            user.logged
              ? <DropDownItem> <div className="is-clickable has-text-link" id={"logout"}  onClick={handleClick}>Logout</div> </DropDownItem>
              : <DropDownItem> <div className="is-clickable has-text-link" id={"/"}  onClick={handleClick}>Login </div> </DropDownItem>
          }
        </DropDownMenu>
      </div>

    </div>
  );
}

export default Header;