import React from "react";

const DropDownItem = ({ children }) => {
  const childs = [children];
  return (
    <>
      {
        childs.map((child, index) => {
          return (
            <div className="dropdown-item" key={index}>
              {child}
            </div>
          )
        })
      }
    </>
  );
}

export default DropDownItem;