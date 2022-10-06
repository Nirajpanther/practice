import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useOutletContext } from "react-router-dom";

import apiService from "../../services/apiService";
import StudentForm from "./StudentForm";

function Component() {
  const navigate = useNavigate();
  const [state, setState] = useState({});

  useEffect(() => {
    apiService
      .showStudent(localStorage.getItem("student_id"))
      .then((response) => setState(response));
  }, []);

  const edit = (formData) => {
    apiService
      .editStudent(formData, localStorage.getItem("student_id"))
      .then((response) => navigate("/dashboard"));
  };

  return (
    <StudentForm
      data={state}
      finalsubmit={(formData) => edit(formData)}
      type="Update"
    />
  );
}

function EditStudent() {
  const [...userPermissions] = useOutletContext();
  const navigate = useNavigate();

  return (
    <>
      {userPermissions?.indexOf("edit student") != -1 &&
      userPermissions.length > -1 ? (
        <Component />
      ) : (
        navigate("/", true)
      )}
    </>
  );

  // return userPermissions?.indexOf("edit student") != -1 ? (
  //   <Component />
  // ) : (
  //   <Navigate to="/" />
  // );
}

export default EditStudent;
