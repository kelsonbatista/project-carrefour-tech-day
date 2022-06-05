import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import App from "../App";
import NotFound from "../components/NotFound";
import Product from "../pages/Product";

const RoutesApp = () => {
  return (
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/product/:productId" component={Product} />
      <Route path="*" component={NotFound} />
    </Switch>
  );
};

export default withRouter(RoutesApp);
