import React from "react";
import { Navigate, useNavigate, useOutletContext } from "react-router-dom";

import apiService from "../../services/apiService";
import StudentForm from "./StudentForm";

function Component() {
  const navigate = useNavigate();

  const createStudent = (formData) => {
    apiService
      .createStudent(formData)
      .then((Response) => navigate("/dashboard"));
  };

  return (
    <StudentForm
      data={{}}
      finalsubmit={(formData) => createStudent(formData)}
      type="Create"
    />
  );
}

function CreateStudent() {
  const [...userPermissions] = useOutletContext();
  const navigate = useNavigate();

  return (
    <>
      {userPermissions?.indexOf("add student") != -1 ? (
        <Component />
      ) : (
        navigate("/", true)
      )}
    </>
  );

  // return userPermissions?.indexOf("add student") != -1 ? (
  //   <Component />
  // ) : (
  //   <Navigate to="/" />
  // );
}

export default CreateStudent;
