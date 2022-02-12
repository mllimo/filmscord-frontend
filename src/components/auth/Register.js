import React, { useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom"
import AuthContext from "../../contexts/authContext";
import useForm from "../../hooks/useForm";
import { Link } from "react-router-dom";
import URLS from "../../config/config";
import types from "../../types/types";

const Register = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const email_ref = useRef();
  const username_ref = useRef();
  const password_ref = useRef();
  const container_ref = useRef();
  const button_ref = useRef();

  const { form, response, isLoading, isSuccess,
    handleInputChange, handleSubmit }
    = useForm({ username: "", email: "", password: "" }, URLS.BASE_URL + "/api/auth/signup", {
      method: "POST",
    });

  // Actualizar el estado del usuario
  const handleRegister = () => {
    if (isSuccess) {
      const action = {
        type: types.login,
        payload: {
          username: form.username,
          token: response.body.token,
        }
      };
      dispatch(action);
    }
  }

  useEffect(() => {
    if (user.username != '' && user.logged)
      navigate("/user/" + user.username, { replace: true });
  }, [user.username]);

  // Observamos si el usuario se ha podido restistrar
  useEffect(() => {
    handleRegister();
    if (isSuccess) {
      if (response.status === 200) {
        container_ref.current.classList.add("animate__bounceOutDown");
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
      container_ref.current.classList.add("animate__bounceOutDown");
    }
    return () => { };
  }, [response, isSuccess]);

  // Observamos el formulario para poder añadir las clases correspondientes a cada caso
  useEffect(() => {
    if (username_ref.current.classList.contains("is-danger")) {
      username_ref.current.classList.remove("is-danger");
    }

    if (email_ref.current.classList.contains("is-danger")) {
      email_ref.current.classList.remove("is-danger");
    }
    return () => { };
  }, [form]);

  // Observamos si se está procesando la peticion
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
                placeholder="e.g. antonio99"
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
                placeholder="e.g. antonio@example.com"
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