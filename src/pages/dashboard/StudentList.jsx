import React, { useEffect, useState } from "react";
import { Link, Navigate, useOutletContext } from "react-router-dom";
import Swal from "sweetalert2";
import apiService from "../../services/apiService";

function Edit(props) {
  const setId = (id) => {
    localStorage.setItem("student_id", id);
  };

  return (
    <Link to="/edit">
      <button className="btn btn-info btn-sm" onClick={() => setId(props.id)}>
        Edit
      </button>
    </Link>
  );
}

function Delete(props) {
  const deleteRecord = (id) => {
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
        apiService.deleteStudent(id).then((res) => {
          props.data(res);
        });

        Swal.fire("Deleted!", "Record has been deleted.", "success");
      }
    });
  };

  return (
    <button
      className="btn btn-danger btn-sm"
      onClick={() => deleteRecord(props.id)}
    >
      Delete
    </button>
  );
}

function AddStudent() {
  return (
    <Link to="/create" className="col-md-2 offset-md-9 btn btn-success">
      Add Student
    </Link>
  );
}

function Component(props) {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    apiService.getStudents().then((resposne) => setStudents(resposne));
  }, []);

  return (
    <div className="card">
      <div className="card-header row align-items-center m-0">
        <h3 className="card-title col-md-1">Students</h3>
        {props.perms?.indexOf("add student") != -1 && <AddStudent />}
      </div>

      <div className="card-body p-0">
        <table className="table table-striped">
          <thead>
            <tr>
              <th style={{ width: "10px" }}>#</th>
              <th>Name</th>
              <th>Father name</th>
              <th>Marks</th>
              <th>Contact</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((items, i) => (
              <tr key={i}>
                <td> {i + 1} </td>
                <td> {items.name} </td>
                <td> {items.father_name} </td>
                <td> {items.mark} </td>
                <td> {items.contact_no} </td>
                <td> {items.address} </td>
                <td>
                  {props.perms?.indexOf("edit student") != -1 && (
                    <Edit id={items.id} />
                  )}{" "}
                  {props.perms?.indexOf("delete student") != -1 && (
                    <Delete id={items.id} data={(res) => setStudents(res)} />
                  )}{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StudentList() {
  const [...userPermissions] = useOutletContext();

  return (
    <>
      {userPermissions?.indexOf("view student") != -1 &&
      userPermissions.length > -1 ? (
        <Component perms={userPermissions} />
      ) : userPermissions.length >= 0 ? (
        console.log("failed")
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
}

export default StudentList;
