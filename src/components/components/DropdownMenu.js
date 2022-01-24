import React, { useEffect, useRef, useState } from "react";


const DropDownMenu = ({ children, className }) => {
  const childs = [children];

  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef();
  const dropdownRef = useRef();

  const handleClick = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      dropdownRef.current.classList.add("is-active");
    } else {
      dropdownRef.current.classList.remove("is-active");
    }
  }, [isOpen]);


  return (
    <div className={"dropdown is-right " + className} ref={dropdownRef}>
      <div className="dropdown-trigger">
        <button className="button" aria-haspopup="true" aria-controls="dropdown-menu3" onClick={handleClick}>
          <span className="icon is-small">
          <i className="fas fa-ellipsis-h"></i>
          </span>
        </button>
      </div>
      <div className="dropdown-menu" id="dropdown-menu3" role="menu">
        <div className="dropdown-content">
          {childs}
        </div>
      </div>
    </div>
  );
}

export default DropDownMenu;