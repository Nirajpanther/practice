import React, { useEffect, useState } from "react";
import postService from "../../services/postService";
import InputFields from "./Modal";

function Add(props) {
  const { show } = props;

  const [modalShow, setModalShow] = useState(show);

  useEffect(() => {
    if (modalShow == false) props.onHide();
  });

  const addPost = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("images", data.images);
    props.created();
    postService.createPost(formData).then(setModalShow(false));
  };

  return (
    <InputFields
      onSubmit={(data) => addPost(data)}
      data=""
      type="Create"
      show={modalShow}
      onHide={() => {
        setModalShow(false);
      }}
    />
  );
}

export default Add;
