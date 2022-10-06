import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useWizard } from "react-use-wizard";
import Swal from "sweetalert2";

function Step3(props) {
  const { previousStep } = useWizard();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const createStudent = () => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your form has been saved",
      showConfirmButton: false,
      timer: 1500,
    });
    props.create();
  };

  return (
    <div className="card card-primary" style={{ borderRadius: "0" }}>
      <div className="card-header">
        <h3 className="card-title">Educational Details</h3>
      </div>

      <form onSubmit={handleSubmit(createStudent)}>
        <div className="card-body">
          <div className="form-group">
            <label htmlFor="school">School name :</label>
            <input
              type="text"
              name="school"
              className="form-control"
              id="school"
              defaultValue={props.data.school ? props.data.school : ""}
              placeholder="Enter previous school name"
              {...register("school", { required: true })}
              onChange={(e) => props.change(e.target)}
            />
          </div>
          {errors?.school && (
            <p className="text-danger"> Please enter school name </p>
          )}
          <div className="form-group">
            <label htmlFor="standard">Standard :</label>
            <input
              type="text"
              name="standard"
              className="form-control"
              id="standard"
              defaultValue={props.data.standard ? props.data.standard : ""}
              placeholder="Enter standard name"
              {...register("standard", { required: true })}
              onChange={(e) => props.change(e.target)}
            />
          </div>
          {errors?.standard && (
            <p className="text-danger"> Please enter standard </p>
          )}
          <div className="form-group">
            <label htmlFor="mark">Marks :</label>
            <input
              type="text"
              name="mark"
              className="form-control"
              id="mark"
              defaultValue={props.data.mark ? props.data.mark : ""}
              placeholder="Enter marks name"
              {...register("mark", { required: true })}
              onChange={(e) => props.change(e.target)}
            />
          </div>
          {errors?.mark && <p className="text-danger"> Please enter marks </p>}
        </div>

        <div className="card-footer">
          <button className="btn btn-primary" onClick={() => previousStep()}>
            Previous
          </button>{" "}
          <button type="submit" className="btn btn-success">
            {props.type}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Step3;
