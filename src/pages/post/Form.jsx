import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

function PostForm(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imgSrc, setImgsrc] = useState("");
  const [formdata, setFormdata] = useState({});
  const [flag, setFlag] = useState(true);

  useEffect(() => {
    if (props.data != "") {
      setTitle(props.data.title);
      setDescription(props.data.description);
      if (flag) setImgsrc("http://crud-api.test/" + props.data.image);
    }
  });

  const setVal = (elem) => {
    setFormdata((previousState) => {
      let obj = previousState;
      obj[elem.name] = elem.value;
      return { ...obj };
    });
  };

  const setImage = (elem) => {
    setFlag(false);
    setFormdata((previousState) => {
      return { ...previousState, images: elem.files[0] };
    });
    setImgsrc(URL.createObjectURL(elem.files[0]));
  };

  console.log(formdata);

  return (
    <>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Title :</Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="enter title"
              defaultValue={title}
              onChange={(e) => setVal(e.target)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              defaultValue={description}
              onChange={(e) => setVal(e.target)}
              rows={3}
            />
          </Form.Group>
          <Form.Group controlId="formFileSm" className="mb-3">
            <Form.Label>Upload image</Form.Label>
            <Form.Control
              type="file"
              name="images"
              size="sm"
              className="mb-3"
              onChange={(e) => setImage(e.target)}
            />
            <img
              src={imgSrc}
              id="uploaded_img"
              width={"100px"}
              height={"100px"}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={() => props.onSubmit(formdata)}>
          {props.slug}
        </Button>
      </Modal.Footer>
    </>
  );
}

export default PostForm;
