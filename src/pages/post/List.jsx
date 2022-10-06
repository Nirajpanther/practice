import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import Edit from "./Edit";

function PostList(props) {
  const [modalShow, setModalShow] = useState(false);

  const deletePost = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        props.deletePost(props.id);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  return (
    <>
      {modalShow ? (
        <Edit
          edited={(i, data) => props.edited(i, data)}
          data={props}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      ) : null}
      <tr>
        <td> {props.index + 1} </td>
        <td> {props.title} </td>
        <td> {props.description} </td>
        <td>
          <img
            src={"http://crud-api.test/" + props.image}
            alt="post image"
            width="100px"
            height="100px"
          />
        </td>
        <td>
          <Button
            variant="success"
            value="edit"
            size="sm"
            onClick={() => setModalShow(true)}
          >
            Edit
          </Button>{" "}
          <Button variant="danger" size="sm" onClick={() => deletePost()}>
            Delete
          </Button>
          {/* <SweetAlert2 {...swalProps} /> */}
        </td>
      </tr>
    </>
  );
}

export default PostList;
