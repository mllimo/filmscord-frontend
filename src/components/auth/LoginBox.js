import React from "react";
import { Link } from "react-router-dom";

const LoginBox = () => {
  return (
    <div className="full-center height-90">
      <div>
        <form className="auth__box-container">
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input className="input" type="email" placeholder="e.g. alex@example.com" />
            </div>
          </div>

          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input className="input" type="password" placeholder="********" />
            </div>
          </div>

          <button className="button is-primary">Sign in</button>

          <hr className="has-background-black" />

          <h5> <Link to="/signup">Are you not registered?</Link></h5>
        </form>
      </div>
    </div>
  );
}

export default LoginBox;