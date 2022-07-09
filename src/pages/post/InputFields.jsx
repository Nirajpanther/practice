import React, { useEffect, useReducer, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import postService from "../../services/postService";
import { Card, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

function InputFields() {
  const location = useLocation();
  const navigate = useNavigate();
  const [slug, setSlug] = useState("");
  const [formdata, setFormdata] = useState({
    title: "",
    description: "",
    images: "",
  });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [img_src, setSrc] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    if (location.pathname == "/edit") {
      setId(localStorage.getItem("id"));

      postService.showPost(id).then((response) => {
        setTitle(response.title);
        setDescription(response.Description);
        setSrc("http://crud-api.test/" + response.image);
      });

      setSlug("Update");
    } else {
      setSlug("Create");
    }
  });

  const setVal = (elem) => {
    setFormdata((previousState) => {
      let name = elem.name;
      let value = elem.value;
      let obj = previousState;
      obj[name] = value;
      return { ...obj };
    });
  };

  const set_image = (e) => {
    setSrc(URL.createObjectURL(e.target.files[0]));
    setFormdata((previousState) => {
      return { ...previousState, images: e.target.files[0] };
    });
  };

  const ajax_call = () => {
    // prepare the form data
    const data = new FormData();

    if (formdata.title != null && formdata.title != "")
      data.append("title", formdata.title);
    else data.append("title", title);
    if (formdata.description != null && formdata.description != "")
      data.append("description", formdata.description);
    else data.append("description", description);

    if (formdata.images != null && formdata.images != "")
      data.append("images", formdata.images);

    // check the slug

    if (location.pathname == "/edit") {
      postService.editPost(id, data).then((response) => navigate(-1));
    } else {
      postService.createPost(data).then((response) => navigate(-1));
    }
  };

  return (
    <Card className="mt-5 mx-auto" style={{ width: "50rem" }}>
      <Card.Header as="h2" style={{ display: "flex" }}>
        <p onClick={() => navigate(-1)}>
          <BsFillArrowLeftCircleFill />
        </p>{" "}
        <p> {slug} Post </p>
      </Card.Header>
      <Card.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Title :</Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="Enter title"
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
              onChange={(e) => set_image(e)}
            />
            <img src={img_src} id="uploaded_img" />
          </Form.Group>
          <Button variant="success" onClick={ajax_call}>
            {slug}
          </Button>{" "}
          <Button variant="danger" type="reset">
            Reset
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default InputFields;
