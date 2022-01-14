import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import URLS from "../../config/config";

const LoginBox = () => {
  // TODO: Generar hook para formularios de auth

  const [loginInfo, setLoginInfo] = useState({ email_username: "", password: "" });

  const email_username_ref = useRef();
  const password_ref = useRef();

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setLoginInfo({ ...loginInfo, [name]: value });

    if (email_username_ref.current.classList.contains("is-danger")) {
      email_username_ref.current.classList.remove("is-danger");
      password_ref.current.classList.remove("is-danger");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(URLS.BASE_URL + "/api/login")
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("token", res.token);
          window.history.pushState({}, undefined, "/" + res.username);
        } else if (res.status === 400) {
          email_username_ref.current.classList.add("is-danger");
          password_ref.current.classList.add("is-danger");
          email_username_ref.current.placeholder = "email or username incorrect";
          password_ref.current.placeholder = "password incorrect";
        }
      })
      .catch((err) => {
        // Redirigir a pagina de error
        window.history.pushState({}, undefined, "/ups");
      });
  };

  return (
    <div className="full-center height-90">
      <div>
        <form className="auth__box-container">
          <div className="field">
            <label className="label">Email or usermane</label>
            <div className="control">
              <input className="input"
                ref={email_username_ref}
                name="email_username"
                type="email"
                placeholder="e.g. alex@example.com or alex99"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input className="input"
                ref={password_ref}
                name="password"
                type="password"
                placeholder="********"
                onChange={handleChange}
              />
            </div>
          </div>

          <button className="button is-primary"
            onClick={handleSubmit}
          >
            Sign in
          </button>

          <hr className="has-background-black" />

          <h5> <Link to="/signup">Are you not registered?</Link></h5>
        </form>
      </div>
    </div>
  );
}

export default LoginBox;