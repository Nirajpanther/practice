import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

function PermissionForm(props) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const formHandler = (data) => {
    props.submit(data);
  };

  return (
    <div className="row">
      <div className="card card-primary col-md-8 offset-md-2 p-0 mt-5">
        <div className="card-header">
          <h3 className="card-title">{props.type} Permission</h3>
        </div>

        <form onSubmit={handleSubmit(formHandler)}>
          <div className="card-body">
            <div className="form-group">
              <label htmlFor="permission">Permission Name :</label>
              <input
                type="text"
                name="name"
                className="form-control"
                id="permission"
                defaultValue={props.data.name && props.data.name}
                placeholder="Enter permission name"
                {...register("name", { required: true })}
              />
            </div>
            {errors?.name && <p className="text-danger"> please enter name </p>}
          </div>

          <div className="card-footer">
            <button type="submit" className="btn btn-primary">
              {props.type}
            </button>{" "}
            <Link to="/permission" className="btn btn-danger">
              Cancle
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PermissionForm;
