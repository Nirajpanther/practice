import React, { useEffect, useState } from "react";
import postService from "../../services/postService";
import InputFields from "./Modal";

function Edit(props) {
  const { show } = props;
  const [modalShow, setModalShow] = useState(show);

  useEffect(() => {
    if (modalShow == false) props.onHide();
  });

  const editPost = (data) => {
    const formData = new FormData();

    if (data.title == undefined) formData.append("title", props.data.title);
    else formData.append("title", data.title);
    if (data.description == undefined)
      formData.append("description", props.data.description);
    else formData.append("description", data.description);
    if (data.images != undefined) formData.append("images", data.images);

    postService.editPost(props.data.id, formData).then((response) => {
      setModalShow(false);
      props.edited(props.data.index, response);
    });
  };

  return (
    <InputFields
      onSubmit={(data) => editPost(data)}
      data={props.data}
      type="Update"
      show={modalShow}
      onHide={() => setModalShow(false)}
    />
  );
}

export default Edit;
