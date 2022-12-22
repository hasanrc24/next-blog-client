import React from "react";

const login = () => {
  return (
    <div className="mx-auto login-comp my-5">
      <h4>Login</h4>
      <form>
        <div className="form-outline mb-4">
          <input
            type="email"
            placeholder="Your email"
            id="form2Example1"
            className="form-control"
          />
        </div>
        <div className="form-outline mb-4">
          <input
            type="password"
            placeholder="Password"
            id="form2Example2"
            className="form-control"
          />
        </div>

        <button type="button" className="btn btn-paginate mb-4">
          Sign in
        </button>

        <div className="text-center">
          <p>
            Not a member? <a href="#!">Register</a>
          </p>
          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-facebook-f"></i>
          </button>

          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-google"></i>
          </button>

          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-twitter"></i>
          </button>

          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-github"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default login;