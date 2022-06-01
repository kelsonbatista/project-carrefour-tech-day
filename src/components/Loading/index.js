import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Spinner } from "react-bootstrap";

const Loading = () => {
  return (
    <>
      <Spinner animation="border" variant="primary" />
    </>
  );
};

export default Loading;
