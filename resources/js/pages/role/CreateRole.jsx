import React from "react";
import { Navigate, useNavigate, useOutletContext } from "react-router-dom";

import apiRole from "../../services/apiRole";
import RoleForm from "./RoleForm";

function Component() {
  const navigate = useNavigate();

  const createRole = (data) => {
    apiRole.createRole(data).then((res) => navigate(-1));
  };

  return (
    <RoleForm
      type="Create"
      data={{}}
      permission={[]}
      submit={(data) => createRole(data)}
    />
  );
}

function CreateRole() {
  const [...userPermissions] = useOutletContext();
  const navigate = useNavigate();

  return (
    <>
      {userPermissions?.indexOf("add role") != -1 &&
      userPermissions.length > -1 ? (
        <Component />
      ) : (
        navigate("/", true)
      )}
    </>
  );

  // return userPermissions?.indexOf("add role") != -1 ? (
  //   <Component />
  // ) : (
  //   <Navigate to="/" />
  // );
}

export default CreateRole;
