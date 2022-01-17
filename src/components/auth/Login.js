import React, { useEffect, useRef } from "react";
import useForm from "../../hooks/useForm";
import { Link } from "react-router-dom";
import URLS from "../../config/config";

const Login = () => {

  const { form, response, isLoading, isSuccess, handleInputChange, handleSubmit } =
    useForm({ email_username: "", password: "" }, URLS.BASE_URL + "/api/login", {
      method: "POST",
    });

  const email_username_ref = useRef();
  const password_ref = useRef();
  const container_ref = useRef();
  const button_ref = useRef();

  useEffect(() => {
    console.log('response: ', response)
    if (isSuccess) {
      if (response.status === 200) {
        localStorage.setItem("token", response.token);
        container_ref.current.classList.add("animate__animated", "animate__bounceOutDown");
        window.history.pushState({}, undefined, "/" + response.username);
      } else if (response.status === 400) {
        email_username_ref.current.classList.add("is-danger");
        password_ref.current.classList.add("is-danger");
        email_username_ref.current.placeholder = "email or username incorrect";
        password_ref.current.placeholder = "password incorrect";
      }
    } else if (response instanceof TypeError) {
      container_ref.current.classList.add("animate__animated", "animate__bounceOutDown");
      window.history.pushState({}, undefined, "/ups");
    }
    return () => { };
  }, [response, isSuccess]);

  useEffect(() => {
    if (email_username_ref.current.classList.contains("is-danger")) {
      email_username_ref.current.classList.remove("is-danger");
      password_ref.current.classList.remove("is-danger");
    }
    return () => { };
  }, [form]);

  useEffect(() => {
    if (isLoading) {
      button_ref.current.classList.add("is-loading");
    } else {
      button_ref.current.classList.remove("is-loading");
    }
  }, [isLoading]);


  return (
    <div className="full-center height-90">
      <div>
        <form className="auth__box-container animate__animated animate__bounceInDown" ref={container_ref}>
          <div className="field">
            <label className="label">Email or usermane</label>
            <div className="control">
              <input className="input"
                ref={email_username_ref}
                name="email_username"
                type="email"
                placeholder="e.g. alex@example.com or alex99"
                onChange={handleInputChange}
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
                onChange={handleInputChange}
              />
            </div>
          </div>

          <button className="button is-primary"
            ref={button_ref}
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

export default Login;