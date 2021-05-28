import React, { ReactElement } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import ProductList from "./ProductList";

function Routes(): ReactElement {
  return (
    <Switch>
      <Route path="/home">
        <Home />
      </Route>
      <Route path="/products">
        <ProductList />
      </Route>
    </Switch>
  );
}

export default Routes;
