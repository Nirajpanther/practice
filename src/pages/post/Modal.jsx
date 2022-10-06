import React, { useEffect, useReducer, useState } from "react";
import { Modal } from "react-bootstrap";
import PostForm from "./Form";

function InputFields(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.type} Post
        </Modal.Title>
      </Modal.Header>

      <PostForm
        submit={(formdata) => props.submit(formdata)}
        data={props.data}
        slug={props.type}
      />
    </Modal>
  );
}

export default InputFields;
