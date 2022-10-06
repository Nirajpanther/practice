import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import apiService from "../services/apiService";
import { useForm } from "react-hook-form";

function Component() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const loginCall = (data) => {
    apiService.logedUser(data).then(
      (response) => {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        navigate("/dashboard");
      },
      (error) => {
        setMessage(error);
      }
    );
  };

  return (
    <div className="hold-transition login-page">
      <div className="login-box">
        <div className="card card-outline card-primary">
          <div className="card-header text-center">
            <p className="h1">My App</p>
          </div>
          <div className="card-body">
            <p className="login-box-msg">Sign in to start your session</p>
            <p className="text-danger login-box-msg">{message}</p>
            <form onSubmit={handleSubmit(loginCall)}>
              <div className="input-group mb-3">
                <input
                  type="text"
                  name="email"
                  className={
                    errors?.email ? "form-control is-invalid" : "form-control"
                  }
                  placeholder="Email"
                  {...register("email", {
                    required: true,
                    pattern: /^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[A-Za-z]+$/,
                  })}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope"></span>
                  </div>
                </div>
              </div>
              {errors?.email?.type == "required" && (
                <p className="text-danger">email required</p>
              )}
              {errors?.email?.type == "pattern" && (
                <p className="text-danger">enter valid email</p>
              )}
              <div className="input-group mb-3">
                <input
                  type="password"
                  name="password"
                  className={
                    errors?.password
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  placeholder="Password"
                  autoComplete="on"
                  {...register("password", { required: true })}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock"></span>
                  </div>
                </div>
              </div>
              {errors?.password && (
                <p className="text-danger">password required</p>
              )}
              <div className="row">
                <div className="col-8">
                  <div className="icheck-primary">
                    <input type="checkbox" id="remember" />
                    <label htmlFor="remember">Remember Me</label>
                  </div>
                </div>
                <div className="col-4">
                  <button type="submit" className="btn btn-primary btn-block">
                    Login
                  </button>
                </div>
              </div>
            </form>
            <p className="mb-0">
              <Link to="/register" className="text-center">
                create account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Login() {
  return localStorage.getItem("token") ? (
    <Navigate to="/dashboard" />
  ) : (
    <Component />
  );
}

export default Login;
