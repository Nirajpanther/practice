import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useOutletContext } from "react-router-dom";

import apiPermission from "../../services/apiPermission";
import PermissionForm from "./PermissionForm";

function Component() {
  const [permission, setPermission] = useState([]);
  const navigate = useNavigate();
  const id = localStorage.getItem("id");

  useEffect(() => {
    apiPermission.showPermission(id).then((res) => setPermission(res));
  }, []);

  const update = (data) => {
    apiPermission.updatePermission(id, data).then(navigate(-1));
  };

  return (
    <PermissionForm
      type="Update"
      data={permission}
      submit={(data) => update(data)}
    />
  );
}

function EditPermission() {
  const [...userPermissions] = useOutletContext();
  const navigate = useNavigate();

  return (
    <>
      {userPermissions?.indexOf("edit permission") != -1 &&
      userPermissions.length > -1 ? (
        <Component />
      ) : (
        navigate("/", true)
      )}
    </>
  );

  // return userPermissions?.indexOf("edit permission") != -1 ? (
  //   <Component />
  // ) : (
  //   <Navigate to="/" />
  // );
}

export default EditPermission;
