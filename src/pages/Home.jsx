import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { confirm } from "react-confirm-box";
import postService from "../services/postService";
import Button from "react-bootstrap/Button";
import { Table } from "react-bootstrap";

function Home() {
  const [post, setPost] = useState([]);
  const options = {
    labels: {
      confirmable: "Confirm",
      cancellable: "Cancel",
    },
  };

  const set_localstorage = (elem) => {
    localStorage.setItem("id", elem);
  };

  const ajax_call = async (id) => {
    let result = await confirm("Deleted data cannot be retrived.", options);
    if (result == false) return false;

    postService.deletePost(id).then((reponse) => setPost(reponse));
  };

  useEffect(() => {
    postService.showList().then((reponse) => setPost(reponse));
  }, []);

  return (
    <>
      <div className="justify-content-end">
        <Link to="/create">
          <Button variant="primary">Add Post</Button>
        </Link>
      </div>
      <Table striped bordered hover>
        {/* <caption>Posts</caption> */}
        <thead>
          <tr>
            <th> No. </th>
            <th> Title </th>
            <th> Body </th>
            <th> Image </th>
            <th style={{ width: "8%" }}> Action </th>
          </tr>
        </thead>
        <tbody id="screen">
          {post.map((val, index) => (
            <tr key={index}>
              <td> {index + 1} </td>
              <td> {val.title} </td>
              <td> {val.Description} </td>
              <td>
                <img
                  src={"http://crud-api.test/" + val.image}
                  alt="post image"
                  width="100px"
                  height="100px"
                />
              </td>
              <td>
                <Link to="/edit">
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => set_localstorage(val.id)}
                  >
                    Edit
                  </Button>
                </Link>{" "}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => ajax_call(val.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default Home;
