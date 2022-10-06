import React, { useEffect, useState } from "react";
import {
    Link,
    Navigate,
    useNavigate,
    useOutletContext,
} from "react-router-dom";
import Swal from "sweetalert2";

import apiPermission from "../../services/apiPermission";

function Edit(props) {
    const storeId = (id) => {
        localStorage.setItem("id", id);
    };

    return (
        <Link
            to="/permission/edit"
            className="btn btn-info btn-sm"
            onClick={() => storeId(props.id)}
        >
            Edit
        </Link>
    );
}

function Delete(props) {
    const deletePermission = (id) => {
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
                apiPermission
                    .deletePermission(id)
                    .then((res) => props.data(res));
                Swal.fire("Deleted!", "Record has been deleted.", "success");
            }
        });
    };

    return (
        <button
            className="btn btn-danger btn-sm"
            onClick={() => deletePermission(props.id)}
        >
            Delete
        </button>
    );
}

function AddPermission() {
    return (
        <Link
            to="/permission/create"
            className="col-md-2 offset-md-9 btn btn-success"
        >
            Add Permission
        </Link>
    );
}

function Component(props) {
    const [permission, setPermission] = useState([]);

    useEffect(() => {
        apiPermission.getPermissions().then((res) => setPermission(res));
    }, []);

    return (
        <div className="card">
            <div className="card-header row align-items-center m-0">
                <h3 className="card-title col-md-1">Permissions</h3>
                {props.perms?.indexOf("add permission") != -1 && (
                    <AddPermission />
                )}
            </div>

            <div className="card-body p-0">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th style={{ width: "10px" }}>#</th>
                            <th>Name</th>
                            <th style={{ width: "13%" }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {permission.map((items, i) => (
                            <tr key={i}>
                                <td> {i + 1} </td>
                                <td> {items.name} </td>
                                <td>
                                    {props.perms?.indexOf("edit permission") !=
                                        -1 && <Edit id={items.id} />}{" "}
                                    {props.perms?.indexOf(
                                        "delete permission"
                                    ) != -1 && (
                                        <Delete
                                            id={items.id}
                                            data={(res) => setPermission(res)}
                                        />
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

function Permissionlist() {
    const [...userPermissions] = useOutletContext();
    const navigate = useNavigate();

    return (
        <>
            {userPermissions?.indexOf("view permission") != -1 &&
            userPermissions?.length > -1 ? (
                <Component perms={userPermissions} />
            ) : (
                navigate("/", true)
            )}
        </>
    );

    // return userPermissions?.indexOf("view permission") != -1 ? (
    //   <Component />
    // ) : (
    //   <Navigate to="/" />
    // );
}

export default Permissionlist;
