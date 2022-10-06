import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Add from "./post/Add";
import InputFields from "./post/Modal";
import PostTable from "./post/Table";

function Home() {
  const [modalShow, setModalShow] = useState(false);
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="justify-content-end">
        <Button
          variant="primary"
          value="create"
          onClick={() => setModalShow(true)}
        >
          Add Post
        </Button>
        {modalShow ? (
          <Add
            show={modalShow}
            onHide={() => setModalShow(false)}
            created={() => setCount(count + 1)}
          />
        ) : (
          ""
        )}
      </div>
      <PostTable data={count} />
    </>
  );
}

export default Home;
