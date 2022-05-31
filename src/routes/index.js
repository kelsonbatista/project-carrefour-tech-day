import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import App from "../App";

const RoutesApp = () => {
  return (
    <Switch>
      <Route exact path="/" component={App} />
    </Switch>
  );
};

export default withRouter(RoutesApp);
