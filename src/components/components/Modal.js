import React, { useRef, useState, useEffect, useContext } from "react";
import OptionsContext from "../../contexts/optionsContext";
import useForm from "../../hooks/useForm";


const Modal = ({ url, options: optionsReq }) => {
  const defaultRate = 3;
  const modelRef = useRef();

  const options = useContext(OptionsContext);
  const [title, setTitle] = useState("");
  const [rate, setRate] = useState(defaultRate);
  const [comment, setComment] = useState("");
  const [date, setDate] = useState("1999-12-14");
  const [id, setId] = useState(0);


  const { form, handleInputChange, handleSubmit } = useForm(initFields(id), url, optionsReq);
  const [scoreUi, setscoreUi] = useState(makeScoreUi(rate));
  const [fillScore, setfillScore] = useState(rate);

  useEffect(() => {
    console.log(form);
  }, [form]);

  const mouseOverOutStarHandler = (e) => {
    if (fillScore !== rate) {
      setscoreUi(makeScoreUi(rate));
    }
  };

  const mouseOverStarHandler = (e, index) => {
    setscoreUi(makeScoreUi(index + 1));
    setfillScore(index + 1);
  };

  const closeHandler = (e) => {
    e.preventDefault();
    modelRef.current.classList.remove("is-active");
    options.dispatch({ name: "isAddContent", payload: false });
    options.dispatch({ name: "isUpdateContent", payload: false });
    options.dispatch({ name: "addContent", payload: null });
    options.dispatch({ name: "updateContent", payload: null });
  };

  useEffect(() => {
    if (options.options.isAddContent || options.options.isUpdateContent) {
      modelRef.current.classList.add("is-active");
      setTitle(options.options.addContent?.title?.text || options.options.updateContent?.title?.text || "");
      setRate(options.options.addContent?.score || options.options.updateContent?.score || defaultRate);
      setComment(options.options.addContent?.comment || options.options.updateContent?.comment || "");
      setDate(options.options.addContent?.date_watched || options.options.updateContent?.date_watched || "1999-12-14");
      setId(options.options.addContent?.id || options.options.updateContent?.id || 0);
    }
  }, [options.options.isAddContent, options.options.isUpdateContent]);

  return (
    <div className="modal" ref={modelRef}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{title}</p>
          <button className="delete" aria-label="close" onClick={closeHandler}></button>
        </header>
        <section className="modal-card-body">

          <form>
            <div className="field is-inline-flex">
              <label className="label">Score: </label>
              <div className="ml-5">
                {
                  scoreUi.map((star, index) => {
                    return (
                      <div className="is-inline-flex mouse-hover" key={index}
                        onMouseOver={(e) => mouseOverStarHandler(e, index)}
                        onMouseOut={mouseOverOutStarHandler}
                      >{star}</div>
                    );
                  })
                }
              </div>
            </div>

            <br />

            <div className="field is-inline-flex">
              <label className="label">Date watched:</label>
              <input className="ml-5" type="date" name="date_watched"
                value={date}
                onChange={handleInputChange}
              ></input>
            </div>

            <br />

            <div className="field">
              <label className="label">Comment:</label>
              <textarea className="textarea" name="comment" placeholder="e.g. Hello world" value={comment}
                onChange={handleInputChange}
              ></textarea>
            </div>

          </form>

        </section>
        <footer className="modal-card-foot">
          <button className="button is-success"
            onClick={handleSubmit}
          >Save</button>
        </footer>
      </div>
    </div>
  )
};

function makeScoreUi(score) {
  let stars = [];
  if (score === 0) score = 1;

  for (let i = 1; i <= score; i++) {
    stars.push(fillStar);
  }

  for (let i = 0; i < 5 - score; i++) {
    stars.push(emptyStar);
  }

  return stars;
}

function initFields(id) {
  return {
    id,
    date_watched: "",
    comment: "",
    score: 1
  };
}


const emptyStar = (
  <i className="far fa-star"></i>
);

const fillStar = (
  <i className="fas fa-star"></i>
);

export default Modal;