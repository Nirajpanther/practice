import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Link,
  Navigate,
  useNavigate,
  useOutletContext,
} from "react-router-dom";

import apiRole from "../../services/apiRole";
import apiUser from "../../services/apiUser";

function Component() {
  const navigate = useNavigate();
  const [user, setuser] = useState({});
  const [role, setRole] = useState([]);
  const id = localStorage.getItem("id");
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {
    apiUser.showUser(id).then((res) => setuser(res));
    apiRole.getRoles().then((res) => setRole(res));
  }, []);

  useEffect(() => {
    reset({
      role: user.role_id,
      name: user.name,
      email: user.email,
    });
  }, [user]);

  const formHandler = (data) => {
    apiUser.updateUser(id, data).then(navigate("/user"));
  };

  return (
    <div className="row">
      <div className="card card-primary col-md-8 offset-md-2 p-0 mt-5">
        <div className="card-header">
          <h3 className="card-title">Edit User</h3>
        </div>

        <form onSubmit={handleSubmit(formHandler)}>
          <div className="card-body">
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select
                className="custom-select rounded"
                name="role"
                value={user?.role_id}
                id="role"
                {...register("role", {
                  validate: (value) => value != "select",
                })}
                onChange={(e) => setuser({ ...user, role_id: e.target.value })}
              >
                <option>select</option>
                {role.map((elem, i) => (
                  <option
                    key={i}
                    value={elem.id}
                    // selected={user?.role_id == elem.id ? true : false}
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
                // defaultValue={user.name && user.name}
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
                // defaultValue={user.email && user.email}
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
          </div>

          <div className="card-footer">
            <button type="submit" className="btn btn-primary">
              Update
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

function EditUser() {
  const [...userPermissions] = useOutletContext();
  const navigate = useNavigate();

  return (
    <>
      {userPermissions?.indexOf("edit user") != -1 &&
      userPermissions.length > -1 ? (
        <Component />
      ) : (
        navigate("/", true)
      )}
    </>
  );

  // return userPermissions?.indexOf("edit user") != -1 ? (
  //   <Component />
  // ) : (
  //   <Navigate to="/" />
  // );
}

export default EditUser;
