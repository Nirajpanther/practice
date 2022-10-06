import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useOutletContext } from "react-router-dom";

import apiRole from "../../services/apiRole";
import RoleForm from "./RoleForm";

function Component() {
  const navigate = useNavigate();
  const [role, setRole] = useState([]);
  const [permission, setPermission] = useState([]);
  const id = localStorage.getItem("id");

  useEffect(() => {
    apiRole.showRole(id).then((res) => {
      const arr = [];
      res.map((elem, i) => {
        arr.push(elem.id);
      });
      console.log(arr);
      setPermission(arr);
    });
    setRole({
      role_name: localStorage.getItem("roleName"),
      role_id: id,
    });
  }, []);

  const updateRole = (data) => {
    apiRole.updateRole(id, data).then((res) => navigate(-1));
  };

  return (
    <RoleForm
      type="Update"
      data={role}
      permission={permission}
      submit={(data) => updateRole(data)}
    />
  );
}

function EditRole() {
  const [...userPermissions] = useOutletContext();
  const navigate = useNavigate();

  return (
    <>
      {userPermissions?.indexOf("edit role") != -1 &&
      userPermissions.length > -1 ? (
        <Component />
      ) : (
        navigate("/", true)
      )}
    </>
  );

  // return userPermissions?.indexOf("edit role") != -1 ? (
  //   <Component />
  // ) : (
  //   <Navigate to="/" />
  // );
}

export default EditRole;
