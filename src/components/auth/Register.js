import React, { useEffect, useRef } from "react";
import useForm from "../../hooks/useForm";
import { Link } from "react-router-dom";
import URLS from "../../config/config";

const Register = () => {
  // TODO: Generar hook para formularios de auth

  const { form, response, isLoading, isSuccess,
    handleInputChange, handleSubmit }
    = useForm({ username: "", email: "", password: "" }, URLS.BASE_URL + "/api/auth/signup", {
      method: "POST",
    });

  const email_ref = useRef();
  const username_ref = useRef();
  const password_ref = useRef();
  const container_ref = useRef();
  const button_ref = useRef();

  useEffect(() => {
    if (isSuccess) {
      console.log(response);
      if (response.status === 200) {
        localStorage.setItem("token", response.body.token);
        container_ref.current.classList.add("animate__animated", "animate__bounceOutDown");
        window.history.pushState({}, undefined, "/" + response.body.username);
      } else if (response.status === 422) {
        for (const error of response.body.errors) {
          if (error.param === "email") {
            email_ref.current.classList.add("is-danger");
          }

          if (error.param === "username") {
            username_ref.current.classList.add("is-danger");
          }

          if (error.param === "password") {
            password_ref.current.classList.add("is-danger");

          }
        }
      }
    } else if (response instanceof TypeError) {
      container_ref.current.classList.add("animate__animated", "animate__bounceOutDown");
      window.history.pushState({}, undefined, "/ups");
    }
    return () => { };
  }, [response, isSuccess]);

  useEffect(() => {
    if (username_ref.current.classList.contains("is-danger")) {
      username_ref.current.classList.remove("is-danger");
    }

    if (email_ref.current.classList.contains("is-danger")) {
      email_ref.current.classList.remove("is-danger");
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
        <form className="auth__box-container animate__animated animate__bounceInDown"
          ref={container_ref}>

          <div className="field">
            <label className="label">Usermane</label>
            <div className="control">
              <input className="input"
                ref={username_ref}
                name="username"
                type="text"
                placeholder="e.g. alex99"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input className="input"
                ref={email_ref}
                name="email"
                type="email"
                placeholder="e.g. alex@example.com"
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
            Sign up
          </button>

          <hr className="has-background-black" />

          <h5> <Link to="/">Have an account?</Link></h5>
        </form>
      </div>
    </div>
  );
}

export default Register;