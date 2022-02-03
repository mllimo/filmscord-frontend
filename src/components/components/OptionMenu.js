import React from "react";

const OptionMenu = ({ options }) => {
  const backIcon = (<i className="fas fa-caret-square-left is-size-2"></i>);
  const addIcon = (<i className="fas fa-plus-square is-size-2"></i>);

  return (
    <div>
      <div className="button is-flex is-justify-content-center is-full-width"
        name="isAdd"
        onClick={() => options.dispatch({ name: "isAdd" })}
      >
        {addIcon}
      </div>

      <div className="pt-5">
        <div className="columns">

          <div className="field column ">
            <label className="label">Sort by</label>
            <div className="control">
              <div className="select is-fullwidth">
                <select name="sortBy" onChange={(e) => options.dispatch({ name: e.target.name, payload: e.target.value })}>
                  <option value="rating">Rating</option>
                  <option value="runtime">Runtime</option>
                </select>
              </div>
            </div>
          </div>

          <div className="field column">
            <label className="label">Order by</label>
            <div className="control">
              <div className="select is-fullwidth">
                <select name="orderBy" onChange={(e) => options.dispatch({ name: e.target.name, payload: e.target.value })}>
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
            </div>
          </div>

        </div>

        <div>
          <label className="label">Search</label>
          <div className="control">
            <input className="input"
              name="search"
              type="text"
              placeholder="Spiderman"
              onChange={(e) => options.dispatch({ name: e.target.name, payload: e.target.value })}
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default OptionMenu;