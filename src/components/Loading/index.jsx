import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Spinner } from "react-bootstrap";
import "./styles.css";

const Loading = () => {
  return (
    <div className="loading">
      <Spinner animation="border" variant="primary" />
    </div>
  );
};

export default Loading;
