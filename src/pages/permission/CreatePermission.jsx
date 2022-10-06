import React from "react";
import { Navigate, useNavigate, useOutletContext } from "react-router-dom";

import apiPermission from "../../services/apiPermission";
import PermissionForm from "./PermissionForm";

function Component() {
  const create = (data) => {
    apiPermission.createPermission(data);
  };

  return (
    <PermissionForm type="Create" data={{}} submit={(data) => create(data)} />
  );
}

function CreatePermission() {
  const [...userPermissions] = useOutletContext();
  const navigate = useNavigate();

  return (
    <>
      {userPermissions?.indexOf("add permission") != -1 &&
      userPermissions.length > -1 ? (
        <Component />
      ) : (
        navigate("/", true)
      )}
    </>
  );

  // return userPermissions?.indexOf("add permission") != -1 ? (
  //   <Component />
  // ) : (
  //   <Navigate to="/" />
  // );
}

export default CreatePermission;
