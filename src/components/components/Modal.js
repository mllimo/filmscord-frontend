import React, { useRef, useState, useEffect, useContext } from "react";
import * as DateParser from "../../helpers/date-parser";
import OptionsContext from "../../contexts/optionsContext";
import AuthContext from "../../contexts/authContext";
import useFetch from "../../hooks/useFetch";
import URL from "../../config/config";
import types from "../../types/types";
import ContentContext from "../../contexts/contentContext";


const Modal = () => {
  const defaultRate = 0;
  const modelRef = useRef();

  // Context
  const { dispatch: dispatchContent } = useContext(ContentContext);
  const { options, dispatch } = useContext(OptionsContext);
  const { user } = useContext(AuthContext);

  // States
  const [scoreUi, setscoreUi] = useState(makeScoreUi(0));
  const [fillScore, setfillScore] = useState(0);
  const [date, setDate] = useState("1999-12-14");
  const [rate, setRate] = useState(defaultRate);
  const [comment, setComment] = useState("");
  const [title, setTitle] = useState("");
  const [id, setId] = useState(0);
  const [category, setCategory] = useState("");

  // Custom Hooks
  const { reFetch } = useFetch("/", {});

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

  const submitHandler = (e) => {
    e.preventDefault();
    let url;
    let requestOptions;

    const body = {
      id,
      title,
      rate,
      comment,
      date_watched: date,
      category
    }

    console.log(body);

    if (options.isAdd) {
      url = URL.BASE_URL + URL.API_USER + "/" + user.username + URL.CONTENT;
      requestOptions = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          authorization: `${user.token}`
        },
        data: body
      };
    } else {
      url = URL.BASE_URL + URL.API_USER + "/" + user.username + URL.CONTENT;
      requestOptions = {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          authorization: `${user.token}`
        },
        data: body
      };
    }

    dispatchContent({ type: types.updateContent, payload: { ...body } });
    reFetch(url, requestOptions);
  }

  useEffect(() => {
    if (options.isAddContent || options.isUpdateContent) {
      const auxDate = options.addContent?.date_watched || options.updateContent?.date_watched || DateParser.YYYYMMDD(new Date());
      setDate(DateParser.YYYYMMDD(auxDate));
      setCategory(options.addContent?.info?.category || options.updateContent?.info?.category || "");
      setTitle(options.addContent?.info?.title.text || options.updateContent?.info?.title.text || "");
      setRate((options.addContent?.rate || options.updateContent?.rate) || defaultRate);
      setComment(options.addContent?.comment || options.updateContent?.comment || "");
      setId(options.addContent?.info?.title.id || options.updateContent?.info?.title.id || 0);
      modelRef.current.classList.add("is-active");
    }
  }, [options.isAddContent, options.isUpdateContent]);

  useEffect(() => {
    setscoreUi(makeScoreUi(rate));
  }, [rate]);

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
                value={date}
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
            onClick={submitHandler}
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