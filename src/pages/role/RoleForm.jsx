import React, { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import apiPermission from "../../services/apiPermission";

function RoleForm(props) {
  const [permission, setPermission] = useState([]);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {
    apiPermission.getPermissions().then((res) => setPermission(res));
  }, []);

  useEffect(() => {
    reset();
  }, [props.permission]);

  const sendData = (data) => {
    console.log(data);
    props.submit(data);
  };

  return (
    <div className="row">
      <div className="card card-primary col-md-8 offset-md-2 p-0 mt-5">
        <div className="card-header">
          <h3 className="card-title">{props.type} Role</h3>
        </div>

        <form onSubmit={handleSubmit(sendData)}>
          <div className="card-body">
            <div className="form-group">
              <label htmlFor="role">Role Name :</label>
              <input
                type="text"
                className="form-control"
                name="name"
                id="role"
                defaultValue={
                  props?.data?.role_name ? props.data.role_name : ""
                }
                placeholder="Enter role name"
                {...register("name", { required: true })}
              />
            </div>
            {errors?.name && (
              <p className="text-danger"> Please enter role name </p>
            )}
            <label> Permission : </label>
            <div className="form-group row m-0">
              {console.log(props?.permission)}
              {permission.map((elem, i) => (
                <div
                  className="custom-control custom-switch col-sm-3 p-1 pl-5"
                  key={i}
                >
                  <input
                    type="checkbox"
                    name="permission[]"
                    className="custom-control-input"
                    value={elem.id}
                    defaultChecked={
                      props?.permission?.indexOf(elem.id) == -1 ? false : true
                    }
                    id={i}
                    {...register("permission", { required: true })}
                  />
                  <label className="custom-control-label" htmlFor={i}>
                    {elem.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="card-footer">
            <button type="submit" className="btn btn-primary">
              {props.type}
            </button>{" "}
            <Link to="/role" className="btn btn-danger">
              Cancle
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RoleForm;
