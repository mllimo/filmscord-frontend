import React, {useRef, useContext} from "react";
import AuthContext from "../../contexts/authContext";
import useForm from "../../hooks/useForm";

const Modal = ({title, url, options}) => {
  const modelRef = useRef();
  
  const handleClose = (e) => {
    e.preventDefault();
    modelRef.current.classList.remove("is-active");
  };

  const handleSave = (e) => {
    e.preventDefault();
  };

  return (
    <div className="modal is-active" ref={modelRef}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Modal title</p>
          <button className="delete" aria-label="close" onClick={handleClose}></button>
        </header>
        <section className="modal-card-body">

          <form>
            <div className="field is-inline-flex">
              <label className="label">Score: </label>
              <div className="ml-5">
                {fillStar}
                {fillStar}
                {fillStar}
                {emptyStar}
                {emptyStar}
              </div>
            </div>

            <br/>
            
            <div className="field is-inline-flex">
              <label className="label">Date watched:</label>
              <input className="ml-5" type="date"></input>
            </div>

            <br/>

            <div className="field">
              <label className="label">Comment:</label>
              <textarea className="textarea" placeholder="e.g. Hello world"></textarea>
            </div>

          </form>

        </section>
        <footer className="modal-card-foot">
          <button className="button is-success">Save</button>
        </footer>
      </div>
    </div>
  )
};

const emptyStar = (
  <i className="far fa-star"></i>
);

const fillStar = (
  <i className="fas fa-star"></i>
);

export default Modal;