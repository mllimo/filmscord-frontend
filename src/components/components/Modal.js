import React, { useRef, useState } from "react";
import { useEffect } from "react/cjs/react.development";
import useForm from "../../hooks/useForm";


const Modal = ({ content, url, options }) => {
  const testScore = 3;
  const modelRef = useRef();
  const { form, handleInputChange, handleSubmit } = useForm(initFields(content.id), url, options);
  const [scoreUi, setscoreUi] = useState(makeScoreUi(testScore));
  const [fillScore, setfillScore] = useState(testScore);

  useEffect(() => {
    console.log(form);
  }, [form]);

  const mouseOverOutStarHandler = (e) => {
    if (fillScore != testScore) {
      setscoreUi(makeScoreUi(testScore));
    }
  };

  const mouseOverStarHandler = (e, index) => {
    setscoreUi(makeScoreUi(index + 1));
    setfillScore(index + 1);
  };

  const closeHandler = (e) => {
    e.preventDefault();
    modelRef.current.classList.remove("is-active");
  };

  return (
    <div className="modal is-active" ref={modelRef}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Modal title</p>
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
              <input className="ml-5" type="date" name="fields.date_watched"
                onChange={handleInputChange}
              ></input>
            </div>

            <br />

            <div className="field">
              <label className="label">Comment:</label>
              <textarea className="textarea" name="comment" placeholder="e.g. Hello world"
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
  if (score == 0) score = 1;

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