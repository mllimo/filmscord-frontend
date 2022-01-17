import React, { useRef, useState } from "react";


const DropDownMenu = ({ children }) => {
  const childs = [children];

  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef();
  const dropdownRef = useRef();

  const handleClick = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
    if (isOpen) {
      dropdownRef.current.classList.add("is-active");
    } else {
      dropdownRef.current.classList.remove("is-active");
    }
  };


  return (
    <div className="dropdown animate__animated"
      ref={dropdownRef}
    >
      <div className="dropdown-trigger">
        <button className="button" aria-haspopup="true" aria-controls="dropdown-menu2"
          ref={buttonRef}
          onClick={handleClick}
        >
          <span className="icon is-small">
            <i className="fas fa-bars" aria-hidden="true"></i>
          </span>
        </button>

        <div className="dropdown-menu" id="dropdown-menu2" role="menu">
          <div className="dropdown-content">
            {
              childs.map((child, index) => {
                return (
                  <div key={index}>
                    {child}
                  </div>
                )
              })
            }
          </div>
        </div>
      </div >
    </div>
  );
}

export default DropDownMenu;