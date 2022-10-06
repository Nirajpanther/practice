import React, { useEffect, useState } from "react";
import {
  Link,
  Navigate,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import Swal from "sweetalert2";

import apiRole from "../../services/apiRole";

function Edit(props) {
  const store = (data) => {
    localStorage.setItem("id", data.id);
    localStorage.setItem("roleName", data.name);
  };

  return (
    <Link
      to="/role/edit"
      className="btn btn-info btn-sm"
      onClick={() => store(props.data)}
    >
      Edit
    </Link>
  );
}

function Delete(props) {
  const deleteRole = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert record!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        apiRole.deleteRole(id).then((res) => props.data(res));
        Swal.fire("Deleted!", "Record has been deleted.", "success");
      }
    });
  };

  return (
    <button
      className="btn btn-danger btn-sm"
      onClick={() => deleteRole(props.id)}
    >
      Delete
    </button>
  );
}

function AddRole() {
  return (
    <Link to="/role/create" className="col-md-2 offset-md-9 btn btn-success">
      Add Role
    </Link>
  );
}

function Component(props) {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    apiRole.getRoles().then((res) => setRoles(res));
  }, []);

  return (
    <div className="card">
      <div className="card-header row align-items-center m-0">
        <h3 className="card-title col-md-1">Roles</h3>
        {props.perms?.indexOf("add role") != -1 && <AddRole />}
      </div>

      <div className="card-body p-0">
        <table className="table table-striped">
          <thead>
            <tr>
              <th style={{ width: "10px" }}>#</th>
              <th>Name</th>
              <th>Permissions</th>
              <th style={{ width: "13%" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((items, i) => (
              <tr key={i}>
                <td> {i + 1} </td>
                <td> {items.name} </td>
                <td>
                  <ul style={{ columnCount: 4, marginBottom: "0" }}>
                    {items.permission.map((val, i) => (
                      <li key={i}> {val.name} </li>
                    ))}
                  </ul>
                </td>
                <td>
                  {props.perms?.indexOf("edit role") != -1 && (
                    <Edit data={items} />
                  )}{" "}
                  {props.perms?.indexOf("delete role") != -1 && (
                    <Delete id={items.id} data={(res) => setRoles(res)} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Rolelist() {
  const [...userPermissions] = useOutletContext();
  const navigate = useNavigate();

  return (
    <>
      {userPermissions?.indexOf("view role") != -1 &&
      userPermissions.length > -1 ? (
        <Component perms={userPermissions} />
      ) : (
        navigate("/", true)
      )}
    </>
  );

  // return userPermissions?.indexOf("view role") != -1 ? (
  //   <Component />
  // ) : (
  //   <Navigate to="/" />
  // );
}

export default Rolelist;
