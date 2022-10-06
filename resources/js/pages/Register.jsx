import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import apiService from "../services/apiService";
import { useForm } from "react-hook-form";

function Component() {
    const navigate = useNavigate();
    const {
        register,
        formState: { errors },
        handleSubmit,
        getValues,
    } = useForm();

    const registerUser = (data) => {
        apiService.register(data).then();
        navigate("/");
    };

    return (
        <div className="hold-transition register-page">
            <div className="register-box">
                <div className="card card-outline card-primary">
                    <div className="card-header text-center">
                        <p className="h1">My App</p>
                    </div>
                    <div className="card-body">
                        <p className="login-box-msg">
                            Register a new membership
                        </p>

                        <form onSubmit={handleSubmit(registerUser)}>
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    name="name"
                                    className={
                                        errors?.name
                                            ? "form-control is-invalid"
                                            : "form-control"
                                    }
                                    placeholder="Full name"
                                    {...register("name", { required: true })}
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-user"></span>
                                    </div>
                                </div>
                            </div>
                            {errors?.name && (
                                <p className="text-danger">
                                    {" "}
                                    Please enter name{" "}
                                </p>
                            )}
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    name="email"
                                    className={
                                        errors?.email
                                            ? "form-control is-invalid"
                                            : "form-control"
                                    }
                                    placeholder="Email"
                                    {...register("email", {
                                        required: true,
                                        pattern:
                                            /^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[A-Za-z]+$/,
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
                                    {...register("password", {
                                        required: true,
                                    })}
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock"></span>
                                    </div>
                                </div>
                            </div>
                            {errors?.password && (
                                <p className="text-danger">
                                    {" "}
                                    Please enter password{" "}
                                </p>
                            )}
                            <div className="input-group mb-3">
                                <input
                                    type="password"
                                    name="confirm_password"
                                    className={
                                        errors?.confirm_password
                                            ? "form-control is-invalid"
                                            : "form-control"
                                    }
                                    placeholder="Retype password"
                                    autoComplete="on"
                                    {...register("confirm_password", {
                                        required: true,
                                        validate: (value) =>
                                            value == getValues("password"),
                                    })}
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock"></span>
                                    </div>
                                </div>
                            </div>
                            {errors?.confirm_password?.type == "required" && (
                                <p className="text-danger">
                                    Please enter password again
                                </p>
                            )}
                            {errors?.confirm_password?.type == "validate" && (
                                <p className="text-danger">
                                    password missmatch
                                </p>
                            )}
                            <div className="row align-items-center">
                                <Link to="/" className="col-8">
                                    I already have a account
                                </Link>
                                <div className="col-4">
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-block"
                                    >
                                        Register
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Register() {
    return localStorage.getItem("token") ? (
        <Navigate to="/dashboard" />
    ) : (
        <Component />
    );
}

export default Register;
