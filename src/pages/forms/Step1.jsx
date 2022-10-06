import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useWizard } from "react-use-wizard";

function Step1(props) {
  const { nextStep } = useWizard();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {
    reset({ ...props.data });
  }, [props.data]);

  return (
    <div className="card card-primary">
      <div className="card-header" style={{ borderRadius: "0" }}>
        <h3 className="card-title">Personal Details</h3>
      </div>
      <form onSubmit={handleSubmit(nextStep)}>
        <div className="card-body">
          <div className="form-group">
            <label htmlFor="name">Name :</label>
            <input
              type="text"
              name="name"
              className="form-control"
              id="name"
              placeholder="Enter name with surename"
              {...register("name", { required: true })}
              onChange={(e) => props.change(e.target)}
            />
          </div>
          {errors?.name && <p className="text-danger"> Please enter name </p>}
          <div className="form-group">
            <label htmlFor="father_name">Father name :</label>
            <input
              type="text"
              name="father_name"
              className="form-control"
              id="father_name"
              placeholder="Enter father name"
              {...register("father_name", { required: true })}
              onChange={(e) => props.change(e.target)}
            />
          </div>
          {errors?.father_name && (
            <p className="text-danger"> Please enter father name </p>
          )}
          <div className="form-group">
            <label htmlFor="mother_name">Mother name :</label>
            <input
              type="text"
              name="mother_name"
              className="form-control"
              id="mother_name"
              placeholder="Enter mother name"
              {...register("mother_name", { required: true })}
              onChange={(e) => props.change(e.target)}
            />
          </div>
          {errors?.mother_name && (
            <p className="text-danger"> Please enter mother name </p>
          )}
          <div className="form-group">
            <label htmlFor="contact_no">Contact no. :</label>
            <input
              type="text"
              name="contact_no"
              className="form-control"
              id="contact_no"
              placeholder="Enter contact number"
              {...register("contact_no", { required: true })}
              onChange={(e) => props.change(e.target)}
            />
          </div>
          {errors?.contact_no && (
            <p className="text-danger"> Please enter contact no </p>
          )}
        </div>

        <div className="card-footer">
          <button type="submit" className="btn btn-primary">
            Next
          </button>{" "}
        </div>
      </form>
    </div>
  );
}

export default Step1;
