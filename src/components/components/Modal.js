import React, { useRef, useState, useEffect, useContext } from "react";
import * as DateParser from "../../helpers/date-parser";
import OptionsContext from "../../contexts/optionsContext";
import AuthContext from "../../contexts/authContext";
import useForm from "../../hooks/useForm";
import URL from "../../config/config";
import { isCompositeComponent } from "react-dom/cjs/react-dom-test-utils.production.min";


const Modal = () => {
  const defaultRate = 0;
  const modelRef = useRef();

  const { user } = useContext(AuthContext);
  const { options, dispatch } = useContext(OptionsContext);
  const [title, setTitle] = useState("");
  const [rate, setRate] = useState(defaultRate);
  const [comment, setComment] = useState("");
  const [date, setDate] = useState("1999-12-14");
  const [id, setId] = useState(0);


  const { form, handleInputChange, handleSubmit, changeUrl, changeOptions } = useForm(initFields(id), "/", {});
  const [scoreUi, setscoreUi] = useState(makeScoreUi(rate));
  const [fillScore, setfillScore] = useState(rate);

  useEffect(() => {
    console.log(form);
  }, [form]);

  const mouseOnClickStartHandler = (index) => {
    let newScore = index + 1;
    if (rate == newScore) newScore = 0;
    setfillScore(newScore);
    setRate(newScore);
    setscoreUi(makeScoreUi(newScore));
  };

  const mouseOverOutStarHandler = (e) => {
    if (fillScore !== rate) {
      setscoreUi(makeScoreUi(rate));
    }
  };

  const mouseOverStarHandler = (index) => {
    setscoreUi(makeScoreUi(index + 1));
    setfillScore(index + 1);
  };

  const closeHandler = (e) => {
    e.preventDefault();
    modelRef.current.classList.remove("is-active");
    dispatch({ name: "isAddContent", payload: false });
    dispatch({ name: "isUpdateContent", payload: false });
    dispatch({ name: "addContent", payload: null });
    dispatch({ name: "updateContent", payload: null });
  };

  useEffect(() => {
    if (options.isAddContent || options.isUpdateContent) {
      modelRef.current.classList.add("is-active");
      setTitle(options.addContent?.info?.title.text || options.updateContent?.info?.title.text || "");
      setRate((options.addContent?.rate || options.updateContent?.rate) || defaultRate);
      setComment(options.addContent?.comment || options.updateContent?.comment || "");
      const auxDate = options.addContent?.date_watched || options.updateContent?.date_watched || DateParser.YYYYMMDD(new Date());
      setDate(DateParser.YYYYMMDD(auxDate));
      setId(options.addContent?.info?.title.id || options.updateContent?.info?.title.id || 0);
    }

    if (options.isAdd) {
      changeUrl(URL.BASE_URL + URL.API_USER + "/" + user.username + URL.CONTENT);
      changeOptions({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `${user.token}`
        }
      });
    } else {
      changeUrl(URL.BASE_URL + URL.API_USER + "/" + user.username + URL.CONTENT);
      changeOptions({
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `${user.token}`
        }
      });
    }
  }, [options.isAddContent, options.isUpdateContent]);

  useEffect(() => {
    makeScoreUi(rate);
    handleInputChange({ target: { name: "rate", value: rate } });
  }, [rate]);

  useEffect(() => {
    console.log(date);
    handleInputChange({ target: { name: "date_watched", value: date } });
  }, [date]);

  useEffect(() => {
    handleInputChange({ target: { name: "comment", value: comment } });
  }, [comment]);

  useEffect(() => {
    handleInputChange({ target: { name: "id", value: id } });
  }, [id]);

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
                        onClick={(e) => mouseOnClickStartHandler(index)}
                        onMouseOver={(e) => mouseOverStarHandler(index)}
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
                value={DateParser.YYYYMMDD(date)}
                onChange={(e) => {
                  setDate(DateParser.YYYYMMDD(e.target.value));
                }}
              ></input>
            </div>

            <br />

            <div className="field">
              <label className="label">Comment:</label>
              <textarea className="textarea" name="comment" placeholder="e.g. Hello world"
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
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
    rate: 1
  };
}

const emptyStar = (
  <i className="far fa-star"></i>
);

const fillStar = (
  <i className="fas fa-star"></i>
);

export default Modal;