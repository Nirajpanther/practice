import React, { useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import Swal from "sweetalert2";

import apiUser from "../../services/apiUser";

function Edit(props) {
  const setId = (id) => {
    localStorage.setItem("id", id);
  };

  return (
    <Link to="/user/edit">
      <button className="btn btn-info btn-sm" onClick={() => setId(props.id)}>
        Edit
      </button>
    </Link>
  );
}

function Delete(props) {
  const deleteUser = (id) => {
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
        apiUser.deleteUser(id).then((res) => props.data(res));
        Swal.fire("Deleted!", "Record has been deleted.", "success");
      }
    });
  };

  return (
    <button
      className="btn btn-danger btn-sm"
      onClick={() => deleteUser(props.id)}
    >
      Delete
    </button>
  );
}

function AddUser() {
  return (
    <Link to="/user/create" className="col-md-2 offset-md-9 btn btn-success">
      Add User
    </Link>
  );
}

function Component(props) {
  const [user, setUser] = useState([]);

  useEffect(() => {
    // setTimeout(() => {
    apiUser.getUsers().then((res) => setUser(res));
    // }, 100);
  }, []);

  useEffect(() => {
    console.log("state =>", user);
  });

  return (
    <div className="card">
      <div className="card-header row align-items-center m-0">
        <h3 className="card-title col-md-1">Users</h3>
        {props.perms?.indexOf("add user") != -1 && <AddUser />}
      </div>

      <div className="card-body p-0">
        <table className="table table-striped">
          <thead>
            <tr>
              <th style={{ width: "10px" }}>#</th>
              <th>Name</th>
              <th>E-mail</th>
              <th>Role</th>
              <th style={{ width: "13%" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {user?.map((items, i) => (
              <tr key={i}>
                <td> {i + 1} </td>
                <td> {items.name} </td>
                <td> {items.email} </td>
                <td> {items.role.name} </td>
                <td>
                  {props.perms?.indexOf("edit user") != -1 && (
                    <Edit id={items.id} />
                  )}{" "}
                  {props.perms?.indexOf("delete user") != -1 && (
                    <Delete id={items.id} data={(res) => setUser(res)} />
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

function Userlist() {
  const [...userPermissions] = useOutletContext();
  const navigate = useNavigate();

  return (
    <>
      {userPermissions?.indexOf("view user") != -1 &&
      userPermissions.length > -1 ? (
        <Component perms={userPermissions} />
      ) : (
        navigate("/", true)
      )}
    </>
  );

  // return userPermissions?.indexOf("view user") != -1 ? (
  //   <Component />
  // ) : (
  //   <Navigate to="/" />
  // );
}

export default Userlist;
