import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import apiRole from "../../services/apiRole";

function UserForm(props) {
  const [role, setRole] = useState([]);
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm();

  useEffect(() => {
    apiRole.getRoles().then((res) => setRole(res));
  }, []);

  const formHandler = (data) => {
    props.submit(data);
  };

  return (
    <div className="row">
      <div className="card card-primary col-md-8 offset-md-2 p-0 mt-5">
        <div className="card-header">
          <h3 className="card-title">{props.type} User</h3>
        </div>

        <form onSubmit={handleSubmit(formHandler)}>
          <div className="card-body">
            <div className="form-group">
              <label htmlFor="role">Role</label>
              {console.log(props?.data?.role?.name)}
              <select
                className="custom-select rounded"
                name="role"
                // value={props?.data?.role_id}
                id="role"
                {...register("role", {
                  validate: (value) => value != "select",
                })}
              >
                <option>select</option>
                {role.map((elem, i) => (
                  <option
                    key={i}
                    value={elem.id}
                    selected={props?.data?.role_id == elem.id ? true : false}
                  >
                    {elem.name}
                  </option>
                ))}
              </select>
              {errors?.role && (
                <p className="text-danger"> please select role </p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="name">Name :</label>
              <input
                type="text"
                name="name"
                className="form-control"
                id="name"
                defaultValue={props.data.name && props.data.name}
                placeholder="Enter user full name"
                {...register("name", { required: true })}
              />
            </div>
            {errors?.name && <p className="text-danger"> please enter name </p>}

            <div className="form-group">
              <label htmlFor="email">E-mail :</label>
              <input
                type="email"
                name="email"
                className="form-control"
                id="email"
                defaultValue={props.data.email && props.data.email}
                placeholder="Enter e-mail"
                {...register("email", {
                  required: true,
                  pattern: /^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[A-Za-z]+$/,
                })}
              />
            </div>
            {errors?.email?.type == "required" && (
              <p className="text-danger">email is required</p>
            )}
            {errors?.email?.type == "pattern" && (
              <p className="text-danger">enter valid email</p>
            )}

            <div className={props?.data?.id ? "d-none" : ""}>
              <div className="form-group">
                <label htmlFor="password">Password :</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter password"
                  autoComplete="on"
                  {...register("password", { required: true })}
                />
              </div>
              {errors?.password && (
                <p className="text-danger"> Please enter password </p>
              )}

              <div className="form-group">
                <label htmlFor="confirm_password">Confirm Password :</label>
                <input
                  type="password"
                  name="confirm_password"
                  className="form-control"
                  id="confirm_password"
                  placeholder="Renter password"
                  autoComplete="on"
                  {...register("confirm_password", {
                    required: true,
                    validate: (value) => value == getValues("password"),
                  })}
                />
              </div>
              {errors?.confirm_password?.type == "required" && (
                <p className="text-danger">Please enter password again</p>
              )}
              {errors?.confirm_password?.type == "validate" && (
                <p className="text-danger">password missmatch</p>
              )}
            </div>
          </div>

          <div className="card-footer">
            <button type="submit" className="btn btn-primary">
              {props.type}
            </button>{" "}
            <Link to="/user" className="btn btn-danger">
              Cancle
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserForm;
