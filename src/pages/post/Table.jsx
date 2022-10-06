import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import postService from "../../services/postService";
import PostList from "./List";
// import { confirm } from "react-confirm-box";

function PostTable(props) {
  const [post, setPost] = useState([]);
  const [count, setCount] = useState(0);

  // const options = {
  //   labels: {
  //     confirmable: "Confirm",
  //     cancellable: "Cancel",
  //   },
  // };

  useEffect(() => {
    postService.showList().then((reponse) => setPost(reponse));
  }, [count, props.data]);

  const deletePost = async (id) => {
    // let result = await confirm("Deleted data cannot be retrived.", options);
    // if (result == false) return false;
    postService.deletePost(id).then((reponse) => setPost(reponse));
  };

  return (
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
        {post.map((val, i) => (
          <PostList
            key={i}
            index={i}
            title={val.title}
            description={val.Description}
            image={val.image}
            id={val.id}
            deletePost={(id) => deletePost(id)}
            edited={() => setCount(count + 1)}
          />
        ))}
      </tbody>
    </Table>
  );
}

export default PostTable;
